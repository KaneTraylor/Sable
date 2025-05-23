// pages/_app.tsx
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/theme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Corben:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          as="style"
        />

        {/* Meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#37a169" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Default meta for all pages */}
        <title>Sable Credit - Build Your Credit Score on Autopilot</title>
        <meta
          name="description"
          content="Credit-building micro loans rebuild your credit and a better financial future. Members increased their credit score by an average of 37 points."
        />
      </Head>

      {/* Color mode script should be rendered before the app */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
