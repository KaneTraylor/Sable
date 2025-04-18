import type { NextApiRequest, NextApiResponse } from "next";
import IncomingForm from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new IncomingForm({
    uploadDir: "./uploads",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "Failed to upload file." });
    }

    const uploaded = files.file;
    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    if (!file || !file.filepath) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const dataBuffer = fs.readFileSync(file.filepath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // Optional: preview in terminal
    console.log("Parsed PDF text preview:", text.slice(0, 500));

    // Simulated extracted tradelines
    const mockTradelines = [
      {
        creditor: "Capital One",
        issue: "Charge-off",
        bureau: "Experian",
        accountNumber: "****1234",
      },
      {
        creditor: "Midland Funding",
        issue: "Collections",
        bureau: "TransUnion",
        accountNumber: "****5678",
      },
      {
        creditor: "Synchrony Bank",
        issue: "Late Payment",
        bureau: "Equifax",
        accountNumber: "****9101",
      },
    ];

    res.status(200).json({ tradelines: mockTradelines });
  });
}
