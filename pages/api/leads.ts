// pages/api/leads.ts this route is for saving leads that input email on hero section
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email } = req.body;
  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  try {
    // upsert so we don’t create duplicates
    const lead = await prisma.lead.upsert({
      where: { email },
      create: { email },
      update: {},
    });
    return res.status(200).json(lead);
  } catch (error) {
    console.error("Lead save error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
