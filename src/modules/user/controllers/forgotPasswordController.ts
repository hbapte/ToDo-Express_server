// forgotPasswordController.ts
import { Request, Response } from 'express';
import User from '../../../database/models/user';
import sendPasswordResetEmail from '../utils/sendPasswordResetEmail';

const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resetPasswordToken = Math.random().toString(36).substring(7);
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24); 
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = expirationTime;
    await user.save();
    await sendPasswordResetEmail(email, resetPasswordToken, user.names); 
    res.status(200).json({ message: 'Reset password link sent successfully' });
  } catch (error) {
    console.error('Error sending reset password link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default forgotPasswordController;
