// components/dashboard/ScoreOverview.tsx
import React, { useState } from "react";
import {
  Box,
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

import CreditScoreCard from "./CreditScoreCard";
import CreditScoreChart from "./CreditScoreChart";
import ActionItems from "./ActionItems";
import CreditTasks from "./CreditTasks";
import { DashboardButton as Button } from "./DashboardButton";

const DISPUTES = [
  {
    title: "A payment is incorrectly marked delayed.",
    type: "Payment Delay",
    date: "2024-08-04",
    status: "New",
  },
  {
    title: "Credit limit is displayed incorrectly.",
    type: "Credit Limit",
    date: "2024-08-03",
    status: "In Review",
  },
  {
    title: "Closed account still appears active.",
    type: "Account Info",
    date: "2024-08-03",
    status: "Resolved",
  },
];

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
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const [period, setPeriod] = useState<"1M" | "3M" | "6M" | "1Y">("1M");

  return (
    <Box bg={bg} minH="100vh">
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
        {/* Left Column */}
        <VStack spacing={6} align="stretch">
          <CreditScoreCard />

          <Divider />

          {/* Dispute Feed */}
          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
            <HStack justify="space-between" mb={4}>
              <HStack spacing={2}>
                <TimeIcon />
                <Text fontWeight="bold" fontFamily="Lato, sans-serif">
                  Live Dispute Feed
                </Text>
              </HStack>
              <IconButton
                aria-label="Filter disputes"
                icon={<FiFilter />}
                size="sm"
                variant="ghost"
                colorScheme="green"
              />
            </HStack>

            <VStack spacing={4} align="stretch" mb={6}>
              {DISPUTES.map((d, i) => (
                <Box key={i} pt={2} borderTop={`1px solid ${border}`}>
                  <Text fontWeight="medium" fontFamily="Inter, sans-serif">
                    {d.title}
                  </Text>
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

            <Image
              src="/mockups/sable-difference/graphic-ladder-girl.svg"
              alt="Dispute Character"
              mt="auto"
              mx="auto"
              maxH={isDesktop ? "190px" : "270px"}
              objectFit="contain"
            />
          </Box>

          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
            <ActionItems />
          </Box>
        </VStack>

        {/* Right Column */}
        <VStack spacing={6} align="stretch">
          {/* Score Analysis */}
          <Box>
            <HStack justify="space-between" mb={2}>
              <Heading size="md" fontFamily="Lato, sans-serif">
                Score Analysis
              </Heading>
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

          {/* Account Metrics */}
          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
            <HStack mb={4} spacing={2}>
              <Image
                src="/mockups/sable-difference/Sable-credit-gauge.png"
                alt="Sable Credit Gauge"
                boxSize={6}
              />
              <Heading size="md" fontFamily="Lato, sans-serif">
                Credit Overview
              </Heading>
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
                      <Text fontSize="sm" mb={2} fontFamily="Inter, sans-serif">
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
                              bg={val > 35 ? "red.400" : "green.500"}
                              w={`${val}%`}
                              h="6px"
                            />
                          </Box>
                        </Box>
                        <Text fontWeight="bold" fontFamily="Inter, sans-serif">
                          {m.value}
                        </Text>
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
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      fontFamily="Inter, sans-serif"
                    >
                      {m.label}
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      fontFamily="Inter, sans-serif"
                    >
                      {m.value}
                    </Text>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Credit Tasks */}
          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="xl">
            <CreditTasks />
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
