// pages/api/array/getWidget.ts, leaving space to add other widgets in future -kane
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.user?.email)
    return res.status(401).json({ error: "Unauthorized" });

  try {
    const response = await fetch(
      "https://api.array.com/v2/authenticate/user-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ARRAY_API_KEY}`,
        },
        body: JSON.stringify({
          metadata: { from: "dashboard" },
          email: session.user.email,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Failed to fetch widget token");

    return res.status(200).json({ userToken: data.token });
  } catch (error) {
    console.error("Array token fetch failed", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
