// controllers/verifyResetTokenController.ts

import { Request, Response } from 'express';
import User from '../../../database/models/user';

const verifyResetTokenController = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    // Find user with the provided reset token
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      // Invalid token, redirect back to forgot password form
      return res.redirect('/forgot-password?error=Invalid token');
    }
    // Check if reset token is expired
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      // Token expired, redirect back to forgot password form
      return res.redirect('/forgot-password?error=Reset token has expired');
    }
    // Token is valid, redirect to reset password form
    return res.redirect(`/reset-password-form?token=${token}`);
  } catch (error) {
    console.error('Error verifying reset token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default verifyResetTokenController;
