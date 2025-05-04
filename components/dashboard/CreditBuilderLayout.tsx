// components/dashboard/CreditBuilderLayout.tsx
import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import DashboardNavbar from "./DashboardNavbar";

export default function CreditBuilderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box minH="100vh" pl={{ md: "80px" }} bg="gray.50">
      <DashboardNavbar />
      {children}
    </Box>
  );
}
