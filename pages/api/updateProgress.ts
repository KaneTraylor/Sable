// DEV ONLY: Directly updates user step & formData without JWT
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, currentStep, formData } = req.body;

  if (!email || typeof currentStep !== "number") {
    return res.status(400).json({ error: "Missing email or currentStep" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        ...formData,
        currentStep,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Progress updated (dev route)",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Update progress error:", error);
    return res.status(500).json({ error: "Failed to update progress" });
  }
}
