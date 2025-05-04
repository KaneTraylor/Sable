// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow re‑use of client during HMR in dev
  // (prevents “PrismaClient already exists” errors)
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  global.prisma = prisma;
}

export { prisma };
