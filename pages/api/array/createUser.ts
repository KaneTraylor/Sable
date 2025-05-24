// // pages/api/array/createUser.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { getArrayAccessToken } from "@/lib/arrayAuth";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const {
//       firstName,
//       lastName,
//       dob,
//       ssn,
//       address,
//       phone,
//       email,
//       userId, // from your DB
//     } = req.body;

//     console.log("👉 Incoming request body:", req.body);

//     if (!firstName || !lastName || !dob || !ssn || !address || !userId) {
//       console.warn("⚠️ Missing required fields");
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // ✅ Fetch access token
//     const token = await getArrayAccessToken();
//     console.log("🔑 Fetched Array access token");

//     // 🔁 Send user creation request to Array
//     const arrayRes = await fetch("https://sandbox.array.io/v4/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         firstName,
//         lastName,
//         dob,
//         ssn,
//         email,
//         phone,
//         address: {
//           street: address.street,
//           city: address.city,
//           state: address.state,
//           zip: address.zip,
//         },
//       }),
//     });

//     const data = await arrayRes.json();
//     console.log("📬 Array API response:", data);

//     if (!arrayRes.ok) {
//       console.error("❌ Array API error:", data);
//       return res
//         .status(arrayRes.status)
//         .json({ error: data.message || "Array API error" });
//     }

//     const arrayUserId = data.userId;

//     console.log("💾 Saving arrayUserId to DB:", arrayUserId);

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { arrayUserId },
//     });

//     console.log("✅ User updated in DB:", updatedUser);
//     return res.status(200).json({ success: true, arrayUserId });
//   } catch (error: any) {
//     console.error(
//       "🔥 Error creating user with Array:",
//       error?.message || error
//     );
//     return res
//       .status(500)
//       .json({ error: error?.message || "Internal server error" });
//   }
// }
