// pages/api/creditbuilder/open.ts ideally this will connect to the creditbuilder widget and allow us to store the information entered for databasing.
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

  const loanEntry = await prisma.creditBuilderLoan.upsert({
    where: { userId: user.id },
    update: {
      lastOpenedAt: new Date(),
      status: "opened_widget",
    },
    create: {
      userId: user.id,
      status: "opened_widget",
      lastOpenedAt: new Date(),
    },
  });

  return res.status(200).json({ ok: true });
}
