
// sendPasswordResetEmail.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendPasswordResetEmail = async (email: string, resetToken: string, names: string) => {
  const resetTokenUrl = `https://todo-express-server-0yda.onrender.com/api/auth/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.APP,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Password Reset',
    html: `
      <p>Hello, ${names}</p>
      <p>Click the following link to reset your password:</p>
      <p><a href="${resetTokenUrl}">Reset Password</a></p>
      <p>If that doesn't work, copy and paste the following link in your browser:</p>
      <p>${resetTokenUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>Thank you!</p>
      <p>To Do APP Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export default sendPasswordResetEmail;
