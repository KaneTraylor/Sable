// pages/api/disputes/save.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

interface DisputeItemData {
  accountId: string;
  accountName: string;
  creditorName: string;
  bureau: string;
  reason: string;
  instruction: string;
}

interface SaveDisputeRequest {
  items: DisputeItemData[];
  deliveryMethod: "premium" | "self";
  trackingNumbers?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get session with proper error handling
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      console.error("No session found");
      return res.status(401).json({ error: "Unauthorized - no session" });
    }

    // Find user with proper error handling
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, plan: true },
    });

    if (!user) {
      console.error("User not found for email:", session.user.email);
      return res.status(404).json({ error: "User not found" });
    }

    const {
      items,
      deliveryMethod,
      trackingNumbers = [],
    }: SaveDisputeRequest = req.body;

    // Validate request data
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items data:", items);
      return res.status(400).json({ error: "Invalid items data" });
    }

    if (!deliveryMethod || !["premium", "self"].includes(deliveryMethod)) {
      console.error("Invalid delivery method:", deliveryMethod);
      return res.status(400).json({ error: "Invalid delivery method" });
    }

    // Check if user can dispute (not in cooldown)
    const lastDispute = await prisma.disputeRound.findFirst({
      where: {
        userId: user.id,
        status: { in: ["sent", "investigating", "completed"] },
      },
      orderBy: { sentAt: "desc" },
    });

    if (lastDispute?.sentAt) {
      const cooldownEnd = new Date(lastDispute.sentAt);
      cooldownEnd.setDate(cooldownEnd.getDate() + 35);

      if (new Date() < cooldownEnd && user.plan !== "premium") {
        const daysLeft = Math.ceil(
          (cooldownEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        console.log("User in cooldown period. Days left:", daysLeft);
        return res.status(400).json({
          error: "Still in cooldown period",
          daysLeft,
        });
      }
    }

    console.log("Creating dispute round for user:", user.id);

    // Create dispute round with transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the dispute round
      const disputeRound = await tx.disputeRound.create({
        data: {
          userId: user.id,
          status: deliveryMethod === "premium" ? "sent" : "draft",
          deliveryMethod,
          sentAt: deliveryMethod === "premium" ? new Date() : null,
          trackingNumbers,
          estimatedResponseDate:
            deliveryMethod === "premium"
              ? new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
              : null,
        },
      });

      console.log("Created dispute round:", disputeRound.id);

      // Create dispute items
      const disputeItems = await Promise.all(
        items.map((item) =>
          tx.disputeItem.create({
            data: {
              disputeRoundId: disputeRound.id,
              accountId: item.accountId,
              accountName: item.accountName,
              creditorName: item.creditorName,
              bureau: item.bureau,
              reason: item.reason,
              instruction: item.instruction,
              status:
                deliveryMethod === "premium" ? "investigating" : "pending",
              canDisputeAgain:
                deliveryMethod === "premium"
                  ? new Date(Date.now() + 35 * 24 * 60 * 60 * 1000) // 35 days from now
                  : null,
            },
          })
        )
      );

      console.log("Created dispute items:", disputeItems.length);

      // Update user's next dispute date
      if (deliveryMethod === "premium") {
        await tx.user.update({
          where: { id: user.id },
          data: {
            nextDisputeAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
            lastDisputeSentAt: new Date(),
            sentWithSable: true,
          },
        });
      }

      return { disputeRound, disputeItems };
    });

    console.log("Transaction completed successfully");

    return res.status(200).json({
      success: true,
      disputeRound: {
        id: result.disputeRound.id,
        status: result.disputeRound.status,
        itemCount: result.disputeItems.length,
      },
    });
  } catch (error: any) {
    console.error("Error saving dispute round:", error);
    console.error("Error stack:", error.stack);

    // Check for Prisma-specific errors
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Duplicate dispute entry",
        details: "A dispute with these details already exists",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Record not found",
        details: "The requested record was not found",
      });
    }

    return res.status(500).json({
      error: "Failed to save dispute round",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}
