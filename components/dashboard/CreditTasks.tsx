// components/dashboard/CreditTasks.tsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NextLink from "next/link";

export default function CreditTasks() {
  const cardBg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const text = useColorModeValue("gray.800", "gray.200");

  return (
    <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={2}>
          <Image
            src="https://kikoff.com/_next/static/media/meter.00410b10.svg"
            alt="meter"
            boxSize="20px"
          />
          <Text fontSize="sm" fontWeight="bold" color={text}>
            Credit-Boosting Tasks
          </Text>
        </HStack>
      </Flex>

      {/* Content */}
      <VStack align="start" spacing={2}>
        <Text fontSize="md" fontWeight="semibold" color={text}>
          Become an authorized user
        </Text>
        <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
          You can be added as an authorized user to build more credit.
        </Text>
        <Image
          src="https://kikoff.com/_next/static/media/isometric-chat-with-donators-2.bd88ae3d.svg"
          alt="Authorized user"
          boxSize="full"
          maxW="200px"
          m="auto"
          my={4}
        />
      </VStack>

      <Divider borderColor={border} my={4} />

      {/* Footer */}
      <VStack spacing={2}>
        <Button as={NextLink} href="#" w="full" colorScheme="blackAlpha">
          View Task
        </Button>
        <Button variant="link" w="full" colorScheme="gray">
          Not interested
        </Button>
      </VStack>

      {/* Pager */}
      <HStack justify="space-between" mt={4}>
        <Button variant="ghost" p={0}>
          <FiChevronLeft size={20} />
        </Button>
        <Text fontSize="sm" fontWeight="medium" color={text}>
          3/3
        </Text>
        <Button variant="ghost" p={0}>
          <FiChevronRight size={20} />
        </Button>
      </HStack>
    </Box>
  );
}
