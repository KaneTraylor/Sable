// pages/api/signup/partial.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      const token = jwt.sign(
        { email: existing.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "lax",
        })
      );

      return res.status(200).json({
        userId: existing.id,
        currentStep: existing.currentStep,
        formData: existing,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        currentStep: 2,
      },
    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      })
    );

    return res.status(200).json({
      userId: newUser.id,
      currentStep: 2,
      formData: newUser,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create or fetch user" });
  }
}
