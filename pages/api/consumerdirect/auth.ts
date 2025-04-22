import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const basic = Buffer.from(
      `${process.env.SMARTCREDIT_CLIENT_ID}:${process.env.SMARTCREDIT_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch(
      `${process.env.SMARTCREDIT_BASE_URL}/v1/customer/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basic}`,
        },
        body: JSON.stringify({
          clientId: process.env.SMARTCREDIT_CLIENT_ID,
          clientSecret: process.env.SMARTCREDIT_CLIENT_SECRET,
        }),
      }
    );
    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return res.status(tokenRes.status).json({ error: err });
    }
    const { accessToken } = await tokenRes.json();
    res.status(200).json({ accessToken });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
