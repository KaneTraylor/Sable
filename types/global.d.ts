// types/array-web-components.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "array-account-enroll": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          appKey: string;
          apiUrl: string;
          sandbox?: boolean;
          showQuickView?: boolean;
          userToken?: string;
          onComplete?: () => void;
        },
        HTMLElement
      >;
      "array-authentication-kba": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          appKey: string;
          apiUrl: string;
          sandbox?: boolean;
          userId: string;
          showResultPages?: boolean;
          onComplete?: () => void;
        },
        HTMLElement
      >;
    }
  }
}
