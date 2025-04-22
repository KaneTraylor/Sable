// pages/api/consumerdirect/score.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { score: number } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // for now, just return a stubbed score
    return res.status(200).json({ score: 650 });
  } catch (err: any) {
    console.error("score API error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}

// real code going to leave this here until unblocked
// import type { NextApiRequest, NextApiResponse } from "next";

// async function fetchToken(): Promise<string> {
//   const res = await fetch(`${process.env.SMARTCREDIT_BASE_URL}/oauth/token`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       grant_type: "client_credentials",
//       client_id: process.env.SMARTCREDIT_CLIENT_ID,
//       client_secret: process.env.SMARTCREDIT_CLIENT_SECRET,
//     }),
//   });
//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Token fetch failed: ${res.status} ${err}`);
//   }
//   const data = await res.json();
//   return data.access_token;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const token = await fetchToken();
//     const scoreRes = await fetch(
//       `${process.env.SMARTCREDIT_BASE_URL}/v1/score`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     );
//     if (!scoreRes.ok) {
//       const err = await scoreRes.text();
//       return res.status(scoreRes.status).json({ error: err });
//     }
//     const { score } = await scoreRes.json();
//     return res.status(200).json({ score });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// }
