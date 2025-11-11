import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { prisma } from '../config/database.js';

const router = Router();

// Schema validation
const updateProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  location: z.string().optional(),
  phone: z.string().optional(),
  preferences: z.any().optional(),
});

// Get current user profile
router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        profiles: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      profile: user.profiles[0] || null,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/me', authMiddleware, validateRequest(updateProfileSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const { name, bio, website, location, phone, preferences } = req.body;

    // Update user
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name: name !== undefined ? name : undefined,
      },
    });

    // Update or create profile
    let profile = await prisma.profile.findFirst({
      where: { userId: req.user!.id },
    });

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          bio: bio !== undefined ? bio : undefined,
          website: website !== undefined ? (website === '' ? null : website) : undefined,
          location: location !== undefined ? location : undefined,
          phone: phone !== undefined ? phone : undefined,
          preferences: preferences !== undefined ? preferences : undefined,
        },
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          userId: req.user!.id,
          bio: bio || null,
          website: website || null,
          location: location || null,
          phone: phone || null,
          preferences: preferences || null,
        },
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      profile,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;