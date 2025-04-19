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
  Tag,
  TagLabel,
  TagLeftIcon,
  Image,
} from "@chakra-ui/react";
import GaugeChart from "react-gauge-chart";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CreditScoreChart from "@/components/dashboard/CreditScoreChart";

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
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const greenGradient = "linear(to-r, green.400, green.600)";
  const [showAll, setShowAll] = useState(false);
  const firstThree = mockNegativeItems.slice(0, 3);
  const remaining = mockNegativeItems.slice(3);

  const renderCard = (item: any, idx: number) => (
    <Box
      key={`${item.creditor}-${idx}`}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      borderColor={border}
      boxShadow="sm"
    >
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="lg">
          {item.creditor}
        </Text>
        <Badge colorScheme="blue" fontSize="0.8em">
          {item.bureau}
        </Badge>
      </HStack>
      <HStack justify="space-between" mb={1}>
        <Tag colorScheme="red" size="sm" variant="subtle">
          <TagLeftIcon as={InfoIcon} />
          <TagLabel>{item.issue}</TagLabel>
        </Tag>
        <Text fontSize="sm" color="gray.500">
          {item.accountNumber}
        </Text>
      </HStack>
    </Box>
  );

  return (
    <Box>
      <DashboardNavbar />

      <Box p={[4, 8]}>
        <Heading size="md" mb={4}>
          Welcome back, Dev User
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
          {bureaus.map((bureau) => (
            <Box
              key={bureau.name}
              p={4}
              borderWidth="1px"
              borderColor={border}
              borderRadius="md"
              bg={cardBg}
              boxShadow="sm"
            >
              <Flex direction="column" align="center">
                <Image src={bureau.logo} alt={bureau.name} h={8} mb={3} />
                <Box maxW="90px" w="100%">
                  <GaugeChart
                    id={`gauge-${bureau.name}`}
                    nrOfLevels={30}
                    colors={["#F56565", "#ECC94B", "#48BB78"]}
                    arcWidth={0.3}
                    percent={bureau.score / 850}
                    needleColor="#2D3748"
                    textColor="transparent"
                  />
                </Box>
                <Text
                  mt={2}
                  fontSize="2xl"
                  fontWeight="bold"
                  bgGradient={greenGradient}
                  bgClip="text"
                >
                  {bureau.score}
                </Text>
                <VStack mt={3} spacing={1} align="start">
                  {bureau.issues.map((issue, i) => (
                    <Text key={i} fontSize="sm" color="gray.600">
                      • {issue}
                    </Text>
                  ))}
                </VStack>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* ✅ Credit Score Growth Chart */}
        <Box mb={12}>
          <CreditScoreChart />
        </Box>

        <Box p={6} bg="white" boxShadow="md" borderRadius="xl">
          <Heading size="md" mb={6}>
            Negative Tradelines
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {firstThree.map(renderCard)}
            <Collapse
              in={showAll}
              animateOpacity
              style={{ gridColumn: "1 / -1" }}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                {remaining.map(renderCard)}
              </SimpleGrid>
            </Collapse>
          </SimpleGrid>

          {mockNegativeItems.length > 3 && (
            <Flex justify="space-between" align="center" mt={6}>
              <Button
                onClick={() => setShowAll((prev) => !prev)}
                variant="link"
                colorScheme="blue"
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
