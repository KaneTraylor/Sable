import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔒 Check for JWT in cookies
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const { step, formData } = req.body;

    if (!step || typeof step !== "number") {
      return res.status(400).json({ error: "Invalid step provided" });
    }

    const user = await prisma.user.update({
      where: { email: decoded.email },
      data: {
        currentStep: step,
        ...formData,
      },
    });

    return res.status(200).json({ message: "Progress saved", user });
  } catch (error) {
    console.error("UpdateStep error:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized or failed to update progress" });
  }
}
