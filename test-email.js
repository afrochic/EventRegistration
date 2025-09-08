import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587, // STARTTLS
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 👈 bypass cert validation
  },
});



const mailOptions = {
  from: '"Test" <test@example.com>',
  to: "recipient@example.com",
  subject: "Hello from Node.js",
  text: "This is a test email sent using Mailtrap and Nodemailer.",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Error sending email:", err);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
