// lib/mailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  const mailOptions = {
    from: `"Event Team" <no-reply@eventapp.com>`,
    ...options,
  };

  return transporter.sendMail(mailOptions);
};
