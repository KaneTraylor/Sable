// pages/api/letters/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing letter ID" });
  }

  const { body } = req.body;

  if (!body || typeof body !== "string") {
    return res.status(400).json({ error: "Missing or invalid letter body" });
  }

  try {
    const updated = await prisma.dispute.update({
      where: { id: parseInt(id) },
      data: { letterBody: body },
    });

    return res.status(200).json({
      success: true,
      updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update letter" });
  }
}
