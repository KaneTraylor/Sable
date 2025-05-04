import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.user?.email) return res.status(401).end();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  const loan = await prisma.creditBuilderLoan.create({
    data: { userId: user.id },
  });

  return res.status(200).json({ ok: true, loan });
}
