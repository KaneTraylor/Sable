// pages/api/consumerdirect/token.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    SMARTCREDIT_CLIENT_ID,
    SMARTCREDIT_CLIENT_SECRET,
    SMARTCREDIT_BASE_URL,
  } = process.env;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: SMARTCREDIT_CLIENT_ID!,
    client_secret: SMARTCREDIT_CLIENT_SECRET!,
  });

  const tokenResponse = await fetch(`${SMARTCREDIT_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!tokenResponse.ok) {
    const text = await tokenResponse.text();
    return res.status(500).send(`Token error: ${text}`);
  }

  const data = await tokenResponse.json();
  return res.status(200).json(data);
}
