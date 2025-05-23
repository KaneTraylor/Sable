// theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Brand Colors - Based on your landing page
const colors = {
  brand: {
    50: "#fdf7f0",
    100: "#fbeee1",
    200: "#f6ddc4",
    300: "#f0c99c",
    400: "#e8b072",
    500: "#e39d49", // Primary brand orange
    600: "#d48935",
    700: "#b06d2e",
    800: "#8f5a2d",
    900: "#744a26",
  },
  sable: {
    // Main brand colors
    tan: "#f8f4f0", // Background tan from hero
    cream: "#faf7f3", // Lighter variant
    beige: "#f7f6f3", // Card backgrounds
    sage: "#37a169", // Primary green
    forest: "#2f855a", // Darker green for hovers
    mint: "#48bb78", // Lighter green accent
    // Neutrals with warmth
    warm: {
      50: "#fdfcfb",
      100: "#f8f6f3",
      200: "#f0ede8",
      300: "#e6e1dc",
      400: "#d4ccc3",
      500: "#b8aca0",
      600: "#9c8b7e",
      700: "#7d6b5d",
      800: "#5f4e42",
      900: "#3d2f26",
    },
  },
  // Override Chakra's green to match your brand
  green: {
    50: "#e8f5f0",
    100: "#c6e6d9",
    200: "#a3d7c2",
    300: "#7fc8ab",
    400: "#5cb994",
    500: "#37a169", // Your primary green
    600: "#2f855a",
    700: "#276749",
    800: "#1f4a37",
    900: "#172d25",
  },
  // Semantic colors
  success: "#37a169",
  warning: "#e39d49",
  error: "#e53e3e",
  info: "#3182ce",
};

// Typography - Matching your existing fonts
const fonts = {
  heading: '"Corben", "Georgia", serif',
  body: '"Merriweather", "Georgia", serif',
  mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
};

const fontSizes = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  md: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
  "8xl": "6rem", // 96px
  "9xl": "8rem", // 128px
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Spacing scale
const space = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

// Shadows
const shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
  // Custom brand shadows
  brand: "0 4px 14px 0 rgba(227, 157, 73, 0.25)",
  green: "0 4px 14px 0 rgba(55, 161, 105, 0.25)",
};

// Component overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "12px",
      transition: "all 0.2s cubic-bezier(0.08, 0.52, 0.52, 1)",
      _focus: {
        boxShadow: "0 0 0 3px rgba(55, 161, 105, 0.6)",
      },
    },
    variants: {
      solid: {
        bg: "sable.sage",
        color: "white",
        _hover: {
          bg: "sable.forest",
          transform: "translateY(-2px)",
          boxShadow: "green",
        },
        _active: {
          bg: "green.700",
          transform: "translateY(0)",
        },
      },
      outline: {
        borderColor: "sable.sage",
        color: "sable.sage",
        borderWidth: "2px",
        _hover: {
          bg: "green.50",
          borderColor: "sable.forest",
          transform: "translateY(-1px)",
        },
      },
      ghost: {
        color: "sable.sage",
        _hover: {
          bg: "green.50",
        },
      },
      brand: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
          transform: "translateY(-2px)",
          boxShadow: "brand",
        },
      },
    },
    sizes: {
      sm: {
        h: "32px",
        minW: "32px",
        fontSize: "sm",
        px: "12px",
      },
      md: {
        h: "40px",
        minW: "40px",
        fontSize: "md",
        px: "16px",
      },
      lg: {
        h: "48px",
        minW: "48px",
        fontSize: "lg",
        px: "24px",
      },
      xl: {
        h: "56px",
        minW: "56px",
        fontSize: "xl",
        px: "32px",
      },
    },
  },

  Card: {
    baseStyle: {
      container: {
        bg: "white",
        borderRadius: "16px",
        boxShadow: "md",
        overflow: "hidden",
        transition: "all 0.2s ease",
        border: "1px solid",
        borderColor: "gray.100",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
      },
      body: {
        p: "6",
      },
      header: {
        p: "6",
        pb: "0",
      },
      footer: {
        p: "6",
        pt: "0",
      },
    },
  },

  Input: {
    baseStyle: {
      field: {
        borderRadius: "12px",
        borderWidth: "2px",
        _focus: {
          borderColor: "sable.sage",
          boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
        },
      },
    },
    variants: {
      filled: {
        field: {
          bg: "sable.cream",
          _hover: {
            bg: "sable.beige",
          },
          _focus: {
            bg: "white",
            borderColor: "sable.sage",
          },
        },
      },
    },
    defaultProps: {
      focusBorderColor: "sable.sage",
    },
  },

  Heading: {
    baseStyle: {
      fontFamily: "heading",
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    sizes: {
      xs: {
        fontSize: "md",
        lineHeight: "1.4",
      },
      sm: {
        fontSize: "lg",
        lineHeight: "1.4",
      },
      md: {
        fontSize: "xl",
        lineHeight: "1.3",
      },
      lg: {
        fontSize: "2xl",
        lineHeight: "1.3",
      },
      xl: {
        fontSize: "3xl",
        lineHeight: "1.2",
      },
      "2xl": {
        fontSize: "4xl",
        lineHeight: "1.1",
      },
      "3xl": {
        fontSize: "5xl",
        lineHeight: "1.1",
      },
      "4xl": {
        fontSize: "6xl",
        lineHeight: "1",
      },
    },
  },

  Text: {
    baseStyle: {
      fontFamily: "body",
      lineHeight: "1.6",
    },
  },

  Container: {
    baseStyle: {
      maxW: "7xl",
      px: { base: "4", md: "8" },
    },
  },

  Badge: {
    baseStyle: {
      borderRadius: "full",
      px: "3",
      py: "1",
      fontSize: "xs",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "wider",
    },
    variants: {
      solid: {
        bg: "sable.sage",
        color: "white",
      },
      outline: {
        color: "sable.sage",
        borderColor: "sable.sage",
        borderWidth: "1px",
      },
      subtle: {
        bg: "green.50",
        color: "sable.sage",
      },
    },
  },

  Alert: {
    baseStyle: {
      container: {
        borderRadius: "12px",
        px: "4",
        py: "3",
      },
    },
  },

  Modal: {
    baseStyle: {
      dialog: {
        borderRadius: "16px",
        bg: "white",
      },
      overlay: {
        bg: "blackAlpha.600",
        backdropFilter: "blur(4px)",
      },
    },
  },

  Drawer: {
    baseStyle: {
      dialog: {
        bg: "white",
      },
      overlay: {
        bg: "blackAlpha.600",
        backdropFilter: "blur(4px)",
      },
    },
  },
};

// Global styles
const styles = {
  global: {
    html: {
      scrollBehavior: "smooth",
      fontFamily: "body",
    },
    body: {
      bg: "sable.tan",
      color: "sable.warm.900",
      fontFamily: "body",
      lineHeight: "1.6",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "*": {
      boxSizing: "border-box",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    // Custom scrollbar
    "*::-webkit-scrollbar": {
      width: "8px",
    },
    "*::-webkit-scrollbar-track": {
      bg: "gray.100",
    },
    "*::-webkit-scrollbar-thumb": {
      bg: "gray.300",
      borderRadius: "4px",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      bg: "gray.400",
    },
  },
};

// Breakpoints
const breakpoints = {
  base: "0px",
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  space,
  shadows,
  components,
  styles,
  breakpoints,
});

export default theme;
