// pages/api/user/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = (await getServerSession(req, res, authOptions)) as Session;

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        firstName: true,
        sentWithSable: true,
        lastDisputeSentAt: true,
        nextDisputeAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
