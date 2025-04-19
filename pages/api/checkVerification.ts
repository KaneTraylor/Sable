import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token || typeof token.email !== "string") {
    return res.status(401).json({ verified: false });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    select: { emailVerified: true },
  });

  return res.status(200).json({ verified: !!user?.emailVerified });
}
