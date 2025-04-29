// pages/_app.tsx
import "@/styles/globals.css"; // loads reset & @font-face rules
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme"; // ← point at your theme/index.ts
import "@fontsource/inter/400.css"; // regular
import "@fontsource/inter/700.css"; // bold
import "@fontsource/inter/900.css"; // **black**

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
