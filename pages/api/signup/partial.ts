// pages/api/signup/partial.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("🕵️ [partial] START", {
    method: req.method,
    body: req.body,
    envDb: process.env.DATABASE_URL,
  });

  if (req.method !== "POST") {
    console.log("🕵️ [partial] Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;
  console.log("🕵️ [partial] email, password present?", {
    email: !!email,
    pw: !!password,
  });

  if (!email || !password) {
    console.log("🕵️ [partial] Missing fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("🕵️ [partial] Looking for existing user");
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log("🕵️ [partial] existingUser:", existingUser);

    if (existingUser) {
      console.log("🕵️ [partial] User exists");
      return res.status(409).json({ error: "FULL_ACCOUNT_EXISTS" });
    }

    console.log("🕵️ [partial] Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🕵️ [partial] Creating new user");
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    console.log("🕵️ [partial] newUser:", {
      id: newUser.id,
      email: newUser.email,
    });

    return res.status(200).json({
      currentStep: 2,
      formData: {
        userId: newUser.id,
        email: newUser.email,
      },
    });
  } catch (err: any) {
    console.error("❌ [partial] ERROR", err);
    return res.status(500).json({ error: err.message });
  }
}
