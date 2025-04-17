declare module "formidable" {
  import { IncomingMessage } from "http";
  import { EventEmitter } from "events";

  interface Files {
    [key: string]: File | File[];
  }

  interface File {
    size: number;
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
    newFilename: string;
    hashAlgorithm?: string | false;
    hash?: string;
  }

  interface Fields {
    [key: string]: string | string[];
  }

  interface Options {
    multiples?: boolean;
    uploadDir?: string;
    keepExtensions?: boolean;
    maxFileSize?: number;
    maxFields?: number;
    allowEmptyFiles?: boolean;
  }

  class IncomingForm extends EventEmitter {
    constructor(options?: Options);
    parse(
      req: IncomingMessage,
      callback: (err: any, fields: Fields, files: Files) => void
    ): void;
  }

  export = IncomingForm;
}
