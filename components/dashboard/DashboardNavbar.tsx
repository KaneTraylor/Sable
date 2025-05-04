// components/dashboard/DashboardNavbar.tsx
import React from "react";
import {
  Box,
  VStack,
  Link as ChakraLink,
  Text,
  Show,
  Hide,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  FiHome,
  FiCreditCard,
  FiBarChart2,
  FiAlertTriangle,
  FiUser,
} from "react-icons/fi";
import BottomNavigation from "./BottomNavigation";

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/dashboard", icon: FiHome },
  {
    key: "cash",
    label: "Credit Building Loan",
    href: "/dashboard/cash-card",
    icon: FiCreditCard,
  },
  {
    key: "credit-score",
    label: "Credit Score",
    href: "/dashboard/credit-score",
    icon: FiBarChart2,
  },
  {
    key: "disputes",
    label: "Disputes",
    href: "/dashboard/disputes",
    icon: FiAlertTriangle,
  },
  {
    key: "account",
    label: "Account",
    href: "/dashboard/account",
    icon: FiUser,
  },
];

export default function DashboardNavbar() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const defaultColor = useColorModeValue("gray.600", "gray.400");
  const activeColor = "#37a169";

  return (
    <>
      {/* Mobile bottom nav */}
      <Show below="md">
        <BottomNavigation />
      </Show>

      {/* Desktop left‐side nav */}
      <Hide below="md">
        <Box
          as="nav"
          position="fixed"
          top="0"
          left="0"
          h="100vh"
          w="80px"
          bg={bg}
          boxShadow="0 0 8px rgba(0,0,0,0.1)"
          zIndex="100"
          px={2}
          py={4}
        >
          <VStack spacing={6}>
            {NAV_ITEMS.map(({ key, label, href, icon: Icon }) => {
              const isActive = router.pathname === href;
              return (
                <ChakraLink
                  key={key}
                  as={NextLink}
                  href={href}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  borderRadius="16px"
                  color={isActive ? activeColor : defaultColor}
                  _hover={{ color: activeColor, bg: `${activeColor}1A` }}
                >
                  <Icon size="24px" />
                  <Text fontSize="10px" mt={1} fontFamily="Inter, sans-serif">
                    {label}
                  </Text>
                </ChakraLink>
              );
            })}
          </VStack>
        </Box>
      </Hide>
    </>
  );
}
