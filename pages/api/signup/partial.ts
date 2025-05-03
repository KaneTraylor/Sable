// pages/api/signup/partial.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1) See if a user already exists
    const existing = await prisma.user.findUnique({ where: { email } });

    // 2) If they do AND they've completed signup (we'll consider
    //    "fully created" any user who has a firstName on record):
    if (existing && existing.firstName) {
      return res
        .status(409)
        .json({ error: "FULL_ACCOUNT_EXISTS", message: "User already exists" });
    }

    // 3) Hash password once
    const hashed = await bcrypt.hash(password, 10);

    let user;
    if (existing) {
      // Partial exists: bump them to step 2
      user = await prisma.user.update({
        where: { email },
        data: { password: hashed, currentStep: 2 },
      });
    } else {
      // No user yet: create them at step 2
      user = await prisma.user.create({
        data: { email, password: hashed, currentStep: 2 },
      });
    }

    return res.status(200).json({
      currentStep: 2,
      formData: {
        userId: user.id.toString(),
        email: user.email,
        firstName: "",
        lastName: "",
        password, // raw for front-end login later
      },
    });
  } catch (err) {
    console.error("❌ Partial signup error:", err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}
