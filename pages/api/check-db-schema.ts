// pages/api/check-db-schema.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow in development or for authenticated admins
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Try to query the tables to see if they exist
    const checks = {
      users: false,
      disputeRounds: false,
      disputeItems: false,
      disputes: false,
    };

    try {
      await prisma.user.count();
      checks.users = true;
    } catch (e) {
      console.error("User table check failed:", e);
    }

    try {
      await prisma.disputeRound.count();
      checks.disputeRounds = true;
    } catch (e) {
      console.error("DisputeRound table check failed:", e);
    }

    try {
      await prisma.disputeItem.count();
      checks.disputeItems = true;
    } catch (e) {
      console.error("DisputeItem table check failed:", e);
    }

    try {
      await prisma.dispute.count();
      checks.disputes = true;
    } catch (e) {
      console.error("Dispute table check failed:", e);
    }

    // Get the current database URL (hide sensitive parts)
    const dbUrl = process.env.DATABASE_URL || "";
    const dbType = dbUrl.includes("postgresql")
      ? "PostgreSQL"
      : dbUrl.includes("mysql")
      ? "MySQL"
      : dbUrl.includes("sqlite")
      ? "SQLite"
      : "Unknown";

    return res.status(200).json({
      success: true,
      environment: process.env.NODE_ENV,
      database: dbType,
      tables: checks,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Schema check error:", error);
    return res.status(500).json({
      error: "Failed to check schema",
      details: error.message,
    });
  }
}
