// controllers/resetPasswordController.ts

import { Request, Response } from 'express';
import User from '../../../database/models/user';
import bcrypt from 'bcrypt';

const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    // Find user with the provided reset token and ensure it's not expired
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
    if (!user) {
      // Invalid or expired reset password token
      return res.status(404).json({ error: 'Invalid or expired reset password token' });
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
