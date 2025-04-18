// pages/api/verifyEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!; // Make sure this is in your .env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: "Missing token" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid token" });
    }

    // Update user to mark email as verified and remove the token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    });

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}
