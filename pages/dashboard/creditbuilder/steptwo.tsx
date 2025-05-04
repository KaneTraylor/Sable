// pages/dashboard/creditbuilder/steptwo.tsx
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";

export default function CreditBuilderStepTwo() {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="gray.50"
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 12 }}
    >
      {/* Top bar */}
      <HStack justify="space-between" mb={8}>
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="ghost"
          onClick={() => router.back()}
        />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="ghost"
          onClick={() => router.push("/dashboard")}
        />
      </HStack>

      {/* Content */}
      <VStack spacing={6} flex="1" align="stretch">
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          color="green.600"
        >
          Review Your Loan Details
        </Heading>

        <Box bg="white" borderRadius="lg" boxShadow="lg" p={{ base: 6, md: 8 }}>
          <VStack spacing={4}>
            <Flex justify="space-between" w="full">
              <Text fontWeight="semibold">Total Loan Amount</Text>
              <Text fontWeight="bold">$120</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text fontWeight="semibold">First Deposit</Text>
              <Text fontWeight="bold">May 4, 2025</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text fontWeight="semibold">APR</Text>
              <Text fontWeight="bold">0%</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text fontWeight="semibold">Monthly Payment</Text>
              <Text fontWeight="bold">$10/mo</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text fontWeight="semibold">Term</Text>
              <Text fontWeight="bold">12 months</Text>
            </Flex>
          </VStack>
        </Box>
      </VStack>

      {/* Sticky footer */}
      <Box
        as="footer"
        py={4}
        bg="white"
        boxShadow="0 -2px 8px rgba(0, 0, 0, 0.05)"
      >
        <Button
          colorScheme="green"
          size={isMobile ? "lg" : "md"}
          w="full"
          onClick={() => router.push("/dashboard/creditbuilder/confirmation")}
        >
          Confirm & Open Account
        </Button>
      </Box>
    </Flex>
  );
}
