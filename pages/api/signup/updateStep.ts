// pages/api/signup/updateStep.ts
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

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const { step, formData, email } = req.body;

    if (!step || typeof step !== "number") {
      return res.status(400).json({ error: "Invalid step provided" });
    }

    const userEmail = email || decoded.email;

    console.log("📬 Incoming updateStep:", { userEmail, step, formData });

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Only allow fields defined in Prisma schema
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "ssn",
      "dob",
      "address",
      "plan",
      "city",
      "state",
      "zip",
      "phone",
      "consentGiven",
    ];

    const filteredFormData = Object.fromEntries(
      Object.entries(formData || {}).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    const user = await prisma.user.update({
      where: { email: userEmail },
      data: {
        currentStep: step,
        ...filteredFormData,
      },
    });

    return res.status(200).json({ message: "Step updated", user });
  } catch (error) {
    console.error("UpdateStep error:", error);
    return res.status(500).json({ error: "Failed to update progress" });
  }
}
