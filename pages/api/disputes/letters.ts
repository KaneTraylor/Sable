// pages/api/letters.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Missing or invalid userId" });
  }

  try {
    const letters = await prisma.dispute.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { occurredAt: "desc" },
    });

    // Format the response to match frontend expectations
    const formatted = letters.map((d) => ({
      id: d.id.toString(),
      bureau: d.bureau,
      date: new Date(d.occurredAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      body: d.letterBody,
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err });
  }
}
