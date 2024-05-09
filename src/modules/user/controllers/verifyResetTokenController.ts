// controllers/verifyResetTokenController.ts

import { Request, Response } from 'express';
import User from '../../../database/models/user';

const verifyResetTokenController = async (req: Request, res: Response) => {
  const { token, expires } = req.query;
  try {
    // Find user with the provided reset token and ensure it's not expired
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date(Number(expires)) } });
    if (!user) {
      // Invalid token or expired, redirect back to forgot password form
      return res.redirect('/forgot-password?error=Invalid or expired token');
    }
    // Token is valid, redirect to reset password form
    return res.redirect(`/reset-password-form?token=${token}`);
  } catch (error) {
    console.error('Error verifying reset token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default verifyResetTokenController;
