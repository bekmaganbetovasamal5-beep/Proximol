import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Get user profile from our backend
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3003'}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          set({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
          });
        }

        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  },

  signup: async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during signup' };
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Get user profile from our backend
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3003'}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          set({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));