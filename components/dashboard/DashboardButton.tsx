import React from "react";
import {
  forwardRef,
  Button,
  ButtonProps,
  useColorModeValue,
} from "@chakra-ui/react";

export const DashboardButton = forwardRef<ButtonProps, "button">(
  ({ colorScheme, borderRadius, ...props }, ref) => {
    // you could also pull in your orange as needed via colorScheme="accentOrange"
    return (
      <Button
        ref={ref}
        // always green unless explicitly overridden
        colorScheme={colorScheme ?? "green"}
        // pill shape
        borderRadius={borderRadius ?? "16px"}
        {...props}
      />
    );
  }
);
