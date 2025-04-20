// components/dashboard/ScoreOverview.tsx
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import CustomCreditMeter from "./CustomCreditMeter";
import CreditScoreChart from "./CreditScoreChart";

// mock dispute items
const DISPUTES = [
  {
    title: "A payment is incorrectly marked delayed.",
    type: "Payment Delay",
    date: "2024‑08‑04",
    status: "New",
  },
  {
    title: "Credit limit is displayed incorrectly.",
    type: "Credit Limit",
    date: "2024‑08‑03",
    status: "In Review",
  },
  {
    title: "Closed account still appears active.",
    type: "Account Info",
    date: "2024‑08‑03",
    status: "Resolved",
  },
];

// mock financial overview metrics
const METRICS = [
  { label: "Current Balance", value: "$5,000" },
  { label: "Open Accounts", value: "4" },
  { label: "Inquiries", value: "2" },
  { label: "Depth of Credit", value: "5 yrs" },
  { label: "Late Payments", value: "2" },
  { label: "Late Payments Amount", value: "$1,250" },
  { label: "Utilization", value: "30%" },
];

export default function ScoreOverview() {
  const router = useRouter();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const [period, setPeriod] = useState<"1M" | "3M" | "6M" | "1Y">("1M");

  return (
    <Box bg={bg} minH="100vh">
      <DashboardNavbar />

      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 12 }}
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          {/* Left Column */}
          <VStack spacing={6} align="stretch">
            {/* Credit Gauge */}
            <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
              <HStack mb={4}>
                <TimeIcon />
                <Heading size="md">Your Credit Score</Heading>
              </HStack>
              <Flex justify="center" mb={4}>
                <CustomCreditMeter score={650} size={isDesktop ? 280 : 220} />
              </Flex>
              <Button colorScheme="green" w="100%">
                Start Growth
              </Button>
            </Box>

            <Divider />

            {/* Live Dispute Feed */}
            <Box
              bg={cardBg}
              p={6}
              borderRadius="lg"
              boxShadow="xl"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <HStack justify="space-between" mb={4}>
                  <HStack spacing={2}>
                    <TimeIcon />
                    <Text fontWeight="bold">Live Dispute Feed</Text>
                  </HStack>
                  <IconButton
                    aria-label="Filter disputes"
                    icon={<FiFilter />}
                    size="sm"
                    variant="ghost"
                  />
                </HStack>
                <VStack spacing={4} align="stretch" mb={6}>
                  {DISPUTES.map((d, i) => (
                    <Box key={i} pt={2} borderTop={`1px solid ${border}`}>
                      <Text fontWeight="medium">{d.title}</Text>
                      <HStack fontSize="sm" color="gray.500" mt={1}>
                        <Text>{d.type}</Text>
                        <Text>·</Text>
                        <Text>{d.date}</Text>
                        <Text>·</Text>
                        <Badge
                          colorScheme={
                            d.status === "New"
                              ? "green"
                              : d.status === "In Review"
                              ? "orange"
                              : "gray"
                          }
                        >
                          {d.status}
                        </Badge>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              <Image
                src="/mockups/sable-difference/graphic-ladder-girl.svg"
                alt="Dispute Character"
                mt="auto"
                mx="auto"
                maxH={isDesktop ? "190px" : "270px"}
                objectFit="contain"
              />
            </Box>
          </VStack>

          {/* Right Column */}
          <VStack spacing={6} align="stretch">
            {/* Score Analysis */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Heading size="md">Score Analysis</Heading>
                <HStack spacing={2}>
                  {(["1M", "3M", "6M", "1Y"] as const).map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={period === p ? "solid" : "outline"}
                      onClick={() => setPeriod(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </HStack>
              </HStack>
              <CreditScoreChart period={period} />
            </Box>

            <Divider />

            {/* Credit Overview */}
            <Box
              bg={cardBg}
              p={6}
              borderRadius="lg"
              boxShadow="xl"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <HStack mb={4} spacing={2}>
                  <Image
                    src="/mockups/sable-difference/Sable-credit-gauge.png"
                    alt="Sable Credit Gauge"
                    boxSize="6"
                  />
                  <Heading size="md">Credit Overview</Heading>
                </HStack>

                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {METRICS.map((m) => {
                    if (m.label === "Utilization") {
                      const val = parseInt(m.value);
                      return (
                        <Box
                          key={m.label}
                          bg={cardBg}
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                          textAlign="center"
                          gridColumn={{ base: "span 2", md: "span 4" }}
                        >
                          <Text fontSize="sm" mb={2}>
                            {m.label}
                          </Text>
                          <Flex align="center">
                            <Box flex="1" mr={2}>
                              <Box
                                bg="gray.200"
                                h="6px"
                                borderRadius="md"
                                overflow="hidden"
                              >
                                <Box
                                  bg={val > 35 ? "red.400" : "green.400"}
                                  w={`${val}%`}
                                  h="6px"
                                />
                              </Box>
                            </Box>
                            <Text fontWeight="bold">{m.value}</Text>
                          </Flex>
                        </Box>
                      );
                    }

                    return (
                      <Box
                        key={m.label}
                        bg={cardBg}
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                        textAlign="center"
                      >
                        <Text fontSize="sm" color="gray.500">
                          {m.label}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold">
                          {m.value}
                        </Text>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>

              <Button
                mt={6}
                colorScheme="blue"
                onClick={() => router.push("/dashboard/metrics")}
              >
                View Detailed Metrics
              </Button>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}
