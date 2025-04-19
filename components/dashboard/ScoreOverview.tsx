// components/dashboard/ScoreOverview.tsx
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Collapse,
  Button,
  HStack,
  Badge,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import CreditGauge from "./CreditGauge";
import CreditScoreChart from "./CreditScoreChart";

// Mock data
const mockNegativeItems = [
  {
    creditor: "Capital One",
    issue: "Charge-off",
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
    issue: "Charge-off",
    bureau: "Experian",
    accountNumber: "****4444",
  },
];

const bureaus = [
  {
    name: "Experian",
    score: 640,
    logo: "/mockups/experian-logo.svg",
    issues: [
      "5 collections",
      "1 late payment",
      "3 Charge Off's",
      "2 inquiries",
      "0 public records",
    ],
  },
  {
    name: "TransUnion",
    score: 655,
    logo: "/mockups/transunion-logo.svg",
    issues: [
      "3 collections",
      "0 late payments",
      "1 Charge Off",
      "4 inquiries",
      "0 public records",
    ],
  },
  {
    name: "Equifax",
    score: 667,
    logo: "/mockups/equifax-logo.svg",
    issues: [
      "2 collections",
      "2 late payments",
      "2 Charge Off's",
      "3 inquiries",
      "0 public records",
    ],
  },
];

export default function ScoreOverview() {
  const [showAll, setShowAll] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const firstThree = mockNegativeItems.slice(0, 3);
  const remaining = mockNegativeItems.slice(3);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderNegative = (item: (typeof mockNegativeItems)[0], idx: number) => (
    <Box
      key={idx}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      borderColor={border}
      boxShadow="sm"
    >
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold">{item.creditor}</Text>
        <Badge>{item.bureau}</Badge>
      </HStack>
      <HStack justify="space-between">
        <HStack>
          <InfoIcon />
          <Text>{item.issue}</Text>
        </HStack>
        <Text>{item.accountNumber}</Text>
      </HStack>
    </Box>
  );

  return (
    <Box>
      <DashboardNavbar />

      <Box p={[4, 8]}>
        <Heading size="md" mb={6}>
          Welcome back, Dev User
        </Heading>

        {/* Bureau Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
          {bureaus.map((b) => (
            <Box
              key={b.name}
              p={6}
              bgGradient="linear(to-br, teal.300, green.500)"
              color="white"
              borderRadius="lg"
              boxShadow="xl"
              _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
              transition="all 0.2s ease-in-out"
              textAlign="center"
            >
              <Image
                src={b.logo}
                alt={`${b.name} logo`}
                h={8}
                mb={3}
                mx="auto"
              />

              {/* Custom CreditGauge with overlay */}
              <CreditGauge score={b.score} size={isMobile ? 120 : 140} />

              {/* Single white score below the gauge */}
              <Text mt={2} fontSize="2xl" fontWeight="bold" color="white">
                {b.score}
              </Text>

              <VStack spacing={1} mt={3} align="start">
                {b.issues.map((issue, i) => (
                  <HStack key={i} spacing={2}>
                    <InfoIcon />
                    <Text fontSize="sm">{issue}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Credit Score Chart */}
        <Box mb={12}>
          <CreditScoreChart />
        </Box>

        {/* Negative Tradelines */}
        <Box p={6} bg={cardBg} borderRadius="xl" boxShadow="md">
          <Heading size="md" mb={6}>
            Negative Tradelines
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {firstThree.map(renderNegative)}
            <Collapse
              in={showAll}
              animateOpacity
              style={{ gridColumn: "1 / -1" }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                {remaining.map(renderNegative)}
              </SimpleGrid>
            </Collapse>
          </SimpleGrid>

          {mockNegativeItems.length > 3 && (
            <Flex justify="space-between" align="center" mt={6}>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setShowAll((s) => !s)}
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
              <Button colorScheme="blue">Create Dispute</Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}
