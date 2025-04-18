import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { SignupFormData } from "@/types/signup";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    ssn,
    dob,
    address,
    plan,
  }: SignupFormData = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        ssn,
        dob,
        address,
        plan,
      },
    });

    return res.status(200).json({ message: "User created", userId: user.id });
  } catch (error) {
    console.error("Signup error:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Email is already in use." });
    }

    return res.status(500).json({ error: "Failed to create user" });
  }
}
