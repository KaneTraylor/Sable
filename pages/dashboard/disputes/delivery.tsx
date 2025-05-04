// pages/dashboard/disputes/delivery.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiDownload, FiTruck } from "react-icons/fi";

export default function DisputeDelivery() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const primary = useColorModeValue("green.500", "green.300");

  const [method, setMethod] = useState<"ultimate" | "self">("ultimate");

  const handleNext = () => {
    if (method === "ultimate") {
      router.push("/dashboard/disputes/premium");
    } else {
      router.push("/dashboard/disputes/manual");
    }
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack align="stretch" spacing={6}>
        <Heading as="h3" size="lg">
          Choose delivery method
        </Heading>

        {/* 1) Sable Ultimate */}
        <Box
          as="button"
          onClick={() => setMethod("ultimate")}
          textAlign="left"
          p={6}
          borderRadius="16px"
          borderWidth="1px"
          borderColor={method === "ultimate" ? primary : border}
          boxShadow={
            method === "ultimate"
              ? `0 0 0 2px var(--chakra-colors-green-500)`
              : `inset 0 0 0 1px ${border}`
          }
          bg={bg}
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="700">
              Send with Sable Ultimate
            </Text>
            <Text fontSize="md">Your mailing cost is waived</Text>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={primary}
              bg={useColorModeValue("green.50", "green.900")}
              px={2}
              py={1}
              borderRadius="md"
            >
              RECOMMENDED
            </Text>

            <Box w="full" my={2}>
              <Box borderTop={`1px solid ${border}`} />
            </Box>

            <VStack
              as="ul"
              align="start"
              spacing={1}
              listStyleType="none"
              pl={4}
              position="relative"
              sx={{
                "li::before": {
                  content: `""`,
                  position: "absolute",
                  left: 0,
                  fontFamily: "KikoffIcons",
                  fontSize: "1rem",
                  lineHeight: "1",
                },
              }}
            >
              <Text as="li">Instant 1‑click submission</Text>
              <Text as="li">Select up to 5 items per month</Text>
              <Text as="li">Track status within the app</Text>
              <Text as="li">Fast, reliable delivery guaranteed</Text>
            </VStack>

            <Box w="full" my={2}>
              <Box borderTop={`1px solid ${border}`} />
            </Box>

            <Flex align="center" fontSize="sm" color="gray.500" gap={2}>
              <Icon as={FiTruck} />
              <Text>There won't be any hidden fees.</Text>
            </Flex>
          </VStack>
        </Box>

        {/* 2) Mail Myself */}
        <Box
          as="button"
          onClick={() => setMethod("self")}
          textAlign="left"
          p={6}
          borderRadius="16px"
          borderWidth="1px"
          borderColor={method === "self" ? primary : border}
          boxShadow={
            method === "self"
              ? `0 0 0 2px var(--chakra-colors-green-500)`
              : `inset 0 0 0 1px ${border}`
          }
          bg={bg}
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="700">
              Manually mail yourself
            </Text>
            <Text fontSize="md">Free</Text>

            <Box w="full" my={2}>
              <Box borderTop={`1px solid ${border}`} />
            </Box>

            <VStack
              as="ul"
              align="start"
              spacing={1}
              listStyleType="none"
              pl={4}
              position="relative"
              sx={{
                "li::before": {
                  content: `"•"`,
                  position: "absolute",
                  left: 0,
                  fontSize: "1rem",
                  lineHeight: "1",
                },
              }}
            >
              <Text as="li">Requires printing & postage</Text>
              <Text as="li">No in-app tracking</Text>
              <Text as="li">Risk of mail being lost</Text>
            </VStack>
          </VStack>
        </Box>

        {/* Spacer for bottom padding */}
        <Box h="calc(var(--chakra-space-8) + 20px)" />
      </VStack>

      {/* Sticky Footer */}
      <Flex
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        bg={useColorModeValue("white", "gray.800")}
        py={4}
        px={4}
        boxShadow="0 -2px 6px rgba(0,0,0,0.1)"
        justify="space-between"
        maxW="800px"
        mx="auto"
      >
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          colorScheme="green"
          leftIcon={method === "self" ? <FiDownload /> : undefined}
          onClick={handleNext}
        >
          {method === "self" ? "Self Send" : "Continue"}
        </Button>
      </Flex>
    </Box>
  );
}
