// theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795", // primary
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
    tan: "#f9f5f1", // added hero tan
  },
  accent: {
    greenLight: "#48BB78",
    greenDark: "#2F855A",
    yellow: "#ECC94B",
    red: "#F56565",
  },
  wave: {
    500: "#7898EA",
  },
};

const fonts = {
  heading: `"Lato", sans-serif`,
  body: `"Inter", sans-serif`,
};

const space = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  space,
  styles: {
    global: {
      "html, body": {
        bg: "brand.tan",
        color: "gray.800",
        lineHeight: "tall",
        fontFamily: fonts.body,
      },
      a: {
        color: "brand.500",
        _hover: { textDecoration: "underline" },
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: fonts.heading,
      },
    },
    Text: {
      baseStyle: {
        fontFamily: fonts.body,
      },
    },
  },
});
