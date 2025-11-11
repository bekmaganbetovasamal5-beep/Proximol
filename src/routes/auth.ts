import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';
import { supabase } from '../config/supabase.js';
import { prisma } from '../config/database.js';

const router = Router();

// Schema validation
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Sign up
router.post('/signup', validateRequest(signupSchema), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Create user in our database
    if (authData.user) {
      const user = await prisma.user.create({
        data: {
          id: authData.user.id,
          email,
          name,
        },
      });

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        session: authData.session,
      });
    }

    res.status(400).json({ error: 'Failed to create user' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    // Update last login time
    if (authData.user) {
      await prisma.user.update({
        where: { id: authData.user.id },
        data: { updatedAt: new Date() },
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        name: authData.user?.user_metadata?.name,
      },
      session: authData.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;