// lib/consumerDirect.ts
export async function fetchCDToken(): Promise<{ access_token: string }> {
  const {
    SMARTCREDIT_CLIENT_ID,
    SMARTCREDIT_CLIENT_SECRET,
    SMARTCREDIT_BASE_URL,
  } = process.env;

  if (
    !SMARTCREDIT_CLIENT_ID ||
    !SMARTCREDIT_CLIENT_SECRET ||
    !SMARTCREDIT_BASE_URL
  ) {
    throw new Error("Missing ConsumerDirect config in env");
  }

  const tokenRes = await fetch(`${SMARTCREDIT_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: SMARTCREDIT_CLIENT_ID,
      client_secret: SMARTCREDIT_CLIENT_SECRET,
    }),
  });
  if (!tokenRes.ok) {
    const txt = await tokenRes.text();
    throw new Error(`CD token error: ${txt}`);
  }
  return tokenRes.json();
}
