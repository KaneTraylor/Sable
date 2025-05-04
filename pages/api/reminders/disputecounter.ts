// /pages/api/reminders/disputecounter.ts

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export const config = {
  schedule: "0 12 * * *", // Runs daily at 12:00 UTC
};

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use a provider like Resend, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (user: {
  email: string;
  firstName: string | null;
}) => {
  const name = user.firstName || "there";
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "It's time to send your next round of disputes",
    html: `
      <p>Hi ${name},</p>
      <p>Your 30-day dispute cycle is up. Let’s get your next letters out to keep the pressure on the bureaus.</p>
      <p><a href="https://yourapp.com/dashboard/disputes">Go to Dispute Center</a></p>
      <p>– The Sable Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dueUsers = await prisma.user.findMany({
      where: {
        nextDisputeAt: {
          lte: new Date(),
        },
      },
    });

    const logs = [];

    for (const user of dueUsers) {
      await sendReminderEmail(user);
      logs.push(`Reminder sent to: ${user.email}`);
    }

    console.log("DisputeCounter Log:", logs);

    return res
      .status(200)
      .json({ message: `Reminders sent to ${dueUsers.length} users`, logs });
  } catch (err) {
    console.error("Reminder error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
