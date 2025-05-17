// lib/arrayAuth.ts

let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getArrayAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch("https://api.array.com/v2/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId: process.env.ARRAY_CLIENT_ID,
      clientSecret: process.env.ARRAY_CLIENT_SECRET,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch Array access token");
  }

  cachedToken = data.accessToken;
  tokenExpiresAt = now + data.expiresIn * 1000 - 60_000; // minus 1 min for safety

  return cachedToken!;
}
