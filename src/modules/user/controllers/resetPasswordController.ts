// controllers/resetPasswordController.ts

import { Request, Response } from 'express';
import User from '../../../database/models/user';
import bcrypt from 'bcrypt';

const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    // Find user with the provided reset token
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      // Invalid or expired reset password token
      return res.status(404).json({ error: 'Invalid or expired reset password token' });
    }
    // Check if reset token is expired
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      // Token expired
      return res.status(400).json({ error: 'Reset password token has expired' });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user's password and reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    // Save the updated user
    await user.save();
    // Password reset successfully
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default resetPasswordController;
