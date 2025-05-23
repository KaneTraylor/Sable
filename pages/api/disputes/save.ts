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
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, plan: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      items,
      deliveryMethod,
      trackingNumbers = [],
    }: SaveDisputeRequest = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items data" });
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
        return res.status(400).json({
          error: "Still in cooldown period",
          daysLeft,
        });
      }
    }

    // Create dispute round
    const disputeRound = await prisma.disputeRound.create({
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

    // Create dispute items
    const disputeItems = await Promise.all(
      items.map((item) =>
        prisma.disputeItem.create({
          data: {
            disputeRoundId: disputeRound.id,
            accountId: item.accountId,
            accountName: item.accountName,
            creditorName: item.creditorName,
            bureau: item.bureau,
            reason: item.reason,
            instruction: item.instruction,
            status: deliveryMethod === "premium" ? "investigating" : "pending",
            canDisputeAgain:
              deliveryMethod === "premium"
                ? new Date(Date.now() + 35 * 24 * 60 * 60 * 1000) // 35 days from now
                : null,
          },
        })
      )
    );

    // Update user's next dispute date
    if (deliveryMethod === "premium") {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          nextDisputeAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
          lastDisputeSentAt: new Date(),
          sentWithSable: true,
        },
      });
    }

    return res.status(200).json({
      success: true,
      disputeRound: {
        id: disputeRound.id,
        status: disputeRound.status,
        itemCount: disputeItems.length,
      },
    });
  } catch (error: any) {
    console.error("Error saving dispute round:", error);
    return res.status(500).json({
      error: "Failed to save dispute round",
      details: error.message,
    });
  }
}
