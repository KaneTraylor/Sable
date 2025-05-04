// pages/dashboard/creditbuilder/index.tsx
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
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ITEMS = [
  {
    icon: "💰",
    title: "Automatically save $10 /mo",
    subtitle: "Your first deposit will be drawn in 5 days.",
  },
  {
    icon: "📈",
    title: "Build credit",
    subtitle: "We report to Equifax & TransUnion every month.",
  },
  {
    icon: "📝",
    title: "Reports as an installment loan.",
    subtitle: "Shows as a new tradeline on your credit report.",
  },
  {
    icon: "✅",
    title: "Small Interest Fees",
    subtitle: "Get all your savings back at the end—minus small interest fees.",
  },
];

export default function CreditBuilderStepOne() {
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue("green.50", "green.900");
  const itemBg = useColorModeValue("white", "gray.700");
  const brandGreen = "#37a169";

  return (
    <Box minH="100vh" bg={bg}>
      {/* Full-bleed header */}
      <Flex
        w="100%"
        bg={headerBg}
        px={{ base: 4, md: 8 }}
        py={{ base: 12, md: 20 }}
        align="center"
        justify="space-between"
      >
        <VStack align="start" spacing={3} maxW="2xl">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="1.2"
            color={useColorModeValue("green.700", "green.300")}
          >
            Save $10/mo, build your credit
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} color="gray.600">
            Open another 12‑month Credit Builder Loan today—zero fees, zero
            interest.
          </Text>
        </VStack>
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="ghost"
          size="lg"
          onClick={() => router.push("/dashboard")}
        />
      </Flex>

      {/* Content */}
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
        gap={8}
      >
        {/* Left: Details */}
        <VStack spacing={6} flex="1" align="stretch">
          {ITEMS.map((item, idx) => (
            <Box
              key={idx}
              bg={itemBg}
              p={{ base: 6, md: 8 }}
              borderRadius="lg"
              boxShadow="md"
            >
              <HStack align="start" spacing={4}>
                <Text fontSize="4xl">{item.icon}</Text>
                <Box>
                  <Text fontSize="lg" fontWeight="600" mb={1}>
                    {item.title}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    {item.subtitle}
                  </Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* Right: CTA */}
        <Flex flex="0 0 300px" direction="column" justify="center">
          <Button
            size="lg"
            bg={brandGreen}
            color="white"
            _hover={{ bg: "green.600" }}
            py={8}
            onClick={() => router.push("/dashboard/creditbuilder/steptwo")}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
