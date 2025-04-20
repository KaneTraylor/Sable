// pages/api/sendWelcomeEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // remember to change to sendgrid later
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // remember to add to .env.local
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Sable Credit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Sable Credit!",
      html: `<h1>Welcome, ${name}!</h1><p>Thanks for signing up. Your journey to better credit starts now.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Welcome email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send welcome email" });
  }
}
