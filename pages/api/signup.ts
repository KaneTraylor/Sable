// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, password, ssn, dob, address, plan } =
    req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        ssn,
        dob,
        address,
        plan,
        verificationToken,
        emailVerified: null,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const verifyUrl = `${process.env.NEXTAUTH_URL}/onboarding/verify?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Sable Credit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Hi ${firstName || "there"},</h2>
        <p>Thanks for signing up! Please verify your email by clicking the link below:</p>
        <p><a href="${verifyUrl}">Verify your email</a></p>
        <p>If you didn’t create this account, you can ignore this email.</p>
      `,
    });

    return res.status(200).json({ message: "User created", userId: user.id });
  } catch (error: any) {
    console.error("Signup error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Email is already in use." });
    }

    return res.status(500).json({ error: "Failed to create user" });
  }
}
