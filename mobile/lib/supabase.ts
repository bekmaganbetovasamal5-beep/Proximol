import { createClient } from '@supabase/supabase-js';

// Используем те же данные что и в backend
const supabaseUrl = 'https://yswlqgfqsvwcmwnanmsc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzd2xxZ2Zxc3Z3Y213bmFubXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDAzNTksImV4cCI6MjA3NTQxNjM1OX0.example-key';

// Замените на реальный anon ключ от вашего Supabase проекта
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types для poll приложения
export interface Poll {
  id: string;
  question: string;
  author_id: string;
  is_active: boolean;
  multiple_selection: boolean;
  anonymous_voting: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    name: string;
    avatar?: string;
  };
  options?: PollOption[];
  _count?: {
    responses: number;
  };
}

export interface PollOption {
  id: string;
  poll_id: string;
  text: string;
  order_index: number;
  created_at: string;
}

export interface PollResponse {
  id: string;
  poll_id: string;
  option_id: string;
  user_id?: string;
  created_at: string;
  option?: {
    text: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created_at: string;
}