// components/dashboard/BottomNavigation.tsx
import React from "react";
import {
  Flex,
  Box,
  Text,
  Link as ChakraLink,
  useBreakpointValue,
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

const navItems = [
  { key: "home", label: "Home", href: "/dashboard", icon: FiHome },
  {
    key: "cash",
    label: "Credit Builder",
    href: "/dashboard/creditbuilder",
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

export default function BottomNavigation() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (!isMobile) return null;

  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const defaultColor = useColorModeValue("gray.600", "gray.400");
  const activeColor = "#37a169";

  return (
    <Flex
      as="nav"
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      bg={bg}
      boxShadow="0 -1px 4px rgba(0,0,0,0.1)"
      zIndex="1000"
      py={2}
      justify="center"
    >
      <Flex maxW="800px" w="full" justify="space-evenly">
        {navItems.map(({ key, label, href, icon: Icon }) => {
          const isActive = router.pathname === href;
          const color = isActive ? activeColor : defaultColor;
          return (
            <ChakraLink
              key={key}
              as={NextLink}
              href={href}
              flex="1"
              textAlign="center"
              _hover={{ textDecoration: "none", color: activeColor }}
            >
              <Flex
                direction="column"
                align="center"
                justify="space-evenly"
                h="60px"
                color={color}
              >
                <Box as={Icon} boxSize="20px" />
                <Text fontSize="12px" lineHeight="1" mt={1}>
                  {label}
                </Text>
              </Flex>
            </ChakraLink>
          );
        })}
      </Flex>
    </Flex>
  );
}
