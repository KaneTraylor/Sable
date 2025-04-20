// components/dashboard/ScoreOverview.tsx
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  useBreakpointValue,
  VStack,
  HStack,
  Image,
  Button,
  Collapse,
  Badge,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import CustomCreditMeter from "./CustomCreditMeter";
import CreditScoreChart from "./CreditScoreChart";

// SeedFi‑style purple gradient
const accentGradient = "linear(to-r, purple.400, purple.600)";

// Mock metric cards
const mockMetrics = [
  { title: "Payment History", value: "98%", subtitle: "On‑time payments" },
  { title: "Credit Age", value: "7 years", subtitle: "Avg. account age" },
  { title: "Utilization", value: "22%", subtitle: "Of available credit" },
];

// Three‑bureau data
const bureaus = [
  {
    name: "Experian",
    score: 650,
    logo: "/mockups/experian-logo.svg",
    issues: ["5 collections", "1 late payment", "3 charge‑offs", "2 inquiries"],
  },
  {
    name: "TransUnion",
    score: 675,
    logo: "/mockups/transunion-logo.svg",
    issues: ["3 collections", "0 late payments", "1 charge‑off", "4 inquiries"],
  },
  {
    name: "Equifax",
    score: 700,
    logo: "/mockups/equifax-logo.svg",
    issues: [
      "2 collections",
      "2 late payments",
      "2 charge‑offs",
      "3 inquiries",
    ],
  },
];

// Negative tradelines
const mockNegative = [
  {
    creditor: "Capital One",
    issue: "Charge‑off",
    bureau: "Experian",
    accountNumber: "****1234",
  },
  {
    creditor: "Midland Funding",
    issue: "Collections",
    bureau: "TransUnion",
    accountNumber: "****5678",
  },
  {
    creditor: "Synchrony Bank",
    issue: "Late Payment",
    bureau: "Equifax",
    accountNumber: "****9101",
  },
  {
    creditor: "Amex",
    issue: "Charge‑off",
    bureau: "Experian",
    accountNumber: "****4444",
  },
];

export default function ScoreOverview() {
  const [showAll, setShowAll] = useState(false);
  const bgPage = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const firstThree = mockNegative.slice(0, 3);
  const remaining = mockNegative.slice(3);

  return (
    <Box bg={bgPage} minH="100vh">
      <DashboardNavbar />

      <Box
        maxW="7xl"
        mx="auto"
        py={{ base: 6, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        {/* Hero */}
        <Heading
          size="2xl"
          bgGradient={accentGradient}
          bgClip="text"
          mb={8}
          textAlign="center"
        >
          Your Credit Snapshot
        </Heading>

        {/* Main Gauge + Metrics */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 12 }}
          align="flex-start"
          mb={12}
        >
          <Box flex="1" textAlign="center">
            <CustomCreditMeter score={650} size={isDesktop ? 360 : 260} />
          </Box>

          <SimpleGrid flex="2" columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {mockMetrics.map((m) => (
              <Box
                key={m.title}
                bg={cardBg}
                borderRadius="lg"
                p={6}
                boxShadow="lg"
                border="1px solid"
                borderColor={border}
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {m.title}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" mb={1} color="gray.800">
                  {m.value}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {m.subtitle}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>

        {/* Three‑Bureau Breakdown */}
        <Heading size="lg" mb={6}>
          Breakdown by Bureau
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
          {bureaus.map((b) => (
            <Box
              key={b.name}
              bg={cardBg}
              borderRadius="lg"
              p={6}
              boxShadow="md"
              border="1px solid"
              borderColor={border}
              textAlign="center"
            >
              <Image
                src={b.logo}
                alt={`${b.name} Logo`}
                boxSize={isDesktop ? 20 : 16}
                mx="auto"
                mb={4}
              />

              {/* mini‑gauge WITH overlay */}
              <CustomCreditMeter score={b.score} size={isDesktop ? 180 : 140} />

              <VStack mt={4} spacing={1}>
                {b.issues.map((issue, i) => (
                  <HStack key={i} spacing={2}>
                    <InfoIcon color="gray.500" />
                    <Text fontSize="sm" color="gray.600">
                      {issue}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Growth Chart */}
        <Box mb={12}>
          <CreditScoreChart />
        </Box>

        {/* Negative Tradelines */}
        <Heading size="lg" mb={6}>
          Negative Tradelines
        </Heading>
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {firstThree.map((itm, idx) => (
              <Box
                key={idx}
                p={4}
                border="1px solid"
                borderColor={border}
                borderRadius="md"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">{itm.creditor}</Text>
                  <Badge colorScheme="purple">{itm.bureau}</Badge>
                </HStack>
                <HStack justify="space-between">
                  <HStack spacing={2}>
                    <InfoIcon color="gray.500" />
                    <Text>{itm.issue}</Text>
                  </HStack>
                  <Text>{itm.accountNumber}</Text>
                </HStack>
              </Box>
            ))}

            <Collapse
              in={showAll}
              animateOpacity
              style={{ gridColumn: "1 / -1" }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
                {remaining.map((itm, idx) => (
                  <Box
                    key={idx}
                    p={4}
                    border="1px solid"
                    borderColor={border}
                    borderRadius="md"
                  >
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold">{itm.creditor}</Text>
                      <Badge colorScheme="purple">{itm.bureau}</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <HStack spacing={2}>
                        <InfoIcon color="gray.500" />
                        <Text>{itm.issue}</Text>
                      </HStack>
                      <Text>{itm.accountNumber}</Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Collapse>
          </SimpleGrid>

          <Flex justify="space-between" mt={6}>
            <Button variant="link" onClick={() => setShowAll((s) => !s)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
            <Button colorScheme="purple">Create Dispute</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
