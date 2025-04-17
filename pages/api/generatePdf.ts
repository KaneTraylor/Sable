import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb } from "pdf-lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tradelines } = req.body;

  if (!tradelines || !Array.isArray(tradelines)) {
    return res.status(400).json({ error: "Invalid or missing tradelines" });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const { width, height } = page.getSize();
  const fontSize = 12;

  page.drawText("Dispute Letter Summary", {
    x: 50,
    y: height - 50,
    size: 18,
    color: rgb(0, 0, 0),
  });

  tradelines.forEach((item: any, i: number) => {
    const y = height - 90 - i * 30;
    page.drawText(`• ${item.creditor} (${item.bureau}) — ${item.issue}`, {
      x: 50,
      y,
      size: fontSize,
    });
  });

  const pdfBytes = await pdfDoc.save();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=dispute-letter.pdf"
  );
  res.send(Buffer.from(pdfBytes));
}
