import type { NextApiRequest, NextApiResponse } from "next";

// Dedicated signup token endpoint for Array widgets
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Expect email in request body
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: "Missing email in request body" });
  }

  const apiKey = process.env.ARRAY_API_KEY;
  if (!apiKey) {
    console.error("ARRAY_API_KEY not set");
    return res
      .status(500)
      .json({ error: "Server misconfiguration: missing ARRAY_API_KEY" });
  }

  try {
    // Call Array API for signup token
    const arrayRes = await fetch(
      "https://api.array.com/v2/authenticate/user-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          metadata: { from: "signup" },
          email,
        }),
      }
    );

    const text = await arrayRes.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from Array API: ", text);
      return res
        .status(502)
        .json({ error: "Invalid response from identity provider" });
    }

    if (!arrayRes.ok) {
      console.error("Array API error:", arrayRes.status, data.error || text);
      return res
        .status(arrayRes.status)
        .json({ error: data.error || "Failed to fetch widget token" });
    }

    if (!data.token) {
      console.error("Array API returned no token:", data);
      return res.status(502).json({ error: "No token in Array response" });
    }

    return res.status(200).json({ userToken: data.token });
  } catch (err: any) {
    console.error("Unexpected error in getSignupToken:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
