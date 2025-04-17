// types/pdf-parse.d.ts
declare module "pdf-parse" {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    version: string;
  }

  interface PDFText {
    text: string;
    info: PDFInfo;
  }

  interface PDFParseOptions {
    max: number;
    pagerender: () => any;
    version: string;
  }

  function pdf(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFText>;

  export = pdf;
}
