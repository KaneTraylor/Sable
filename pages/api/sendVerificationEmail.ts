import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const token = randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { email },
    data: { verificationToken: token },
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  await transporter.sendMail({
    from: `"Sable Credit" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Please <a href="${verificationUrl}">click here to verify your email</a>.</p>`,
  });

  return res.status(200).json({ message: "Verification email sent" });
}
