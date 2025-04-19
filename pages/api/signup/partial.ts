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
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      currentStep: 2,
      formData: {
        userId: newUser.id,
        email: newUser.email,
        firstName: "", // Leave blank for now
        lastName: "", // Leave blank for now
        password, // Keep unhashed version for frontend login later
      },
    });
  } catch (error: any) {
    console.error("❌ Partial signup error:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}
