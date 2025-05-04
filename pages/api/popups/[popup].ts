// pages/api/popups/[popup].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // ✅ Type guard to ensure session and session.user exist
  if (!session || typeof session.user?.email !== "string") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = session.user.email;
  const popupName = req.query.popup;

  if (typeof popupName !== "string") {
    return res.status(400).json({ error: "Invalid popup name" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (req.method === "GET") {
    const lastSeenField =
      popupName === "popup1"
        ? user.popupOneLastSeen
        : popupName === "popup2"
        ? user.popupTwoLastSeen
        : null;

    if (lastSeenField === null) {
      return res.status(400).json({ error: "Invalid popup name" });
    }

    return res.status(200).json({ lastShown: lastSeenField });
  }

  if (req.method === "POST") {
    const now = new Date();

    if (popupName === "popup1") {
      await prisma.user.update({
        where: { email },
        data: { popupOneLastSeen: now },
      });
    } else if (popupName === "popup2") {
      await prisma.user.update({
        where: { email },
        data: { popupTwoLastSeen: now },
      });
    } else {
      return res.status(400).json({ error: "Invalid popup name" });
    }

    return res.status(200).json({ message: "Popup timestamp updated" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
