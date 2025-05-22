// theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: `"Corben", serif`,
  body: `"Merriweather", serif`,
};

export const theme = extendTheme({
  config,
  fonts,
  styles: {
    global: {
      html: { fontFamily: fonts.body },
      "h1, h2, h3, h4, h5, h6": { fontFamily: fonts.heading },
    },
  },
  components: {
    Heading: { baseStyle: { fontFamily: fonts.heading } },
    Text: { baseStyle: { fontFamily: fonts.body } },
  },
});
