// pages/api/signup/complete.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, firstName, lastName, ssn, dob, address, plan } = req.body;

  if (!userId || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        ssn,
        dob,
        address,
        plan,
      },
    });

    return res
      .status(200)
      .json({ message: "User completed", userId: updatedUser.id });
  } catch (err) {
    console.error("Complete signup error:", err);
    return res.status(500).json({ error: "Failed to complete user record" });
  }
}
