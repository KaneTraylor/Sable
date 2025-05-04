// components/dashboard/ActionItems.tsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiChevronRight } from "react-icons/fi";

const ACTIONS = [
  {
    href: "/dashboard/disputes/new",
    imgSrc: "https://kikoff.com/_next/static/media/dispute.7ecebeb7.svg",
    title: "Dispute errors",
    subtitle: "Dispute errors in your report that are hurting your score.",
  },
  {
    href: "/dashboard/offer/credit-builder-savings",
    imgSrc: "https://kikoff.com/_next/static/media/rocket.4441a7a4.svg",
    title: "Double your positive payment progress",
    subtitle: "Sign up for Credit Builder Loan",
  },
];

export default function ActionItems() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box
      boxShadow={`inset 0 0 0 1px ${borderColor}`}
      borderRadius="16px"
      p={4}
      mt={6}
    >
      <Text fontSize="lg" fontWeight="600" color={textColor} mb={4}>
        Actions
      </Text>
      <VStack spacing={0} align="stretch">
        {ACTIONS.map((action, idx) => (
          <ChakraLink
            key={action.href}
            as={NextLink}
            href={action.href}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.50", "gray.700"),
            }}
          >
            <Flex
              align="center"
              py={3}
              px={2}
              borderBottom={
                idx < ACTIONS.length - 1
                  ? `1px solid ${borderColor}`
                  : undefined
              }
            >
              <Image
                src={action.imgSrc}
                alt={action.title}
                boxSize="48px"
                flexShrink={0}
                mr={4}
              />
              <Box flex="1">
                <Text fontSize="md" fontWeight="600" color={textColor}>
                  {action.title}
                </Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.500", "gray.400")}
                >
                  {action.subtitle}
                </Text>
              </Box>
              <FiChevronRight color={textColor} size={20} />
            </Flex>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
}
