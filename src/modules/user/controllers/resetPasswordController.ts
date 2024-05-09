// resetPasswordController.ts
import { Request, Response } from 'express';
import User from '../../../database/models/user';
import bcrypt from 'bcrypt';

const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired reset password token' });
    }
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      return res.status(400).json({ error: 'Reset password token has expired' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default resetPasswordController;
