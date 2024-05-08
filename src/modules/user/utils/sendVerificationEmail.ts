import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const sendVerificationEmail = async (email: string, verificationToken: string, names: string) => {
  // Expiration time (24 hours from now)
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 24);

  // URL with token and expiration tim
  const verificationUrl = `https://my-brand-oxuh.onrender.com/api/auth/verify?token=${verificationToken}&expires=${expirationTime.getTime()}`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.APP,
    },
  });

  const mailOptions = {
    from: 'ijbapte@gmail.com',
    to: email,
    subject: 'Email Verification - My Brand',
    html: `
      <p>Hello, ${names}</p>
      <p>Thanks for getting started with My brand!</p>
      <p>I need a little more information to complete your registration, including a confirmation of your email address.</p>
      <p>Please click on the following link to verify your email address:</p>
      <p><a href="${verificationUrl}">Verify Email</a></p>
      <p>If that doesn't work, copy and paste the following link in your browser:</p>

      <p>${verificationUrl}</p>

      <p>This link will expire in 24 hours.</p>


      <p>Thank you!</p> 
      <p>My brand Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export default sendVerificationEmail;
