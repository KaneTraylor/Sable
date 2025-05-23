// components/dashboard/GamePlanPanel.tsx
import React from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const STEPS = [
  {
    id: 1,
    title: "Share your Score Goals",
    desc: "Help us personalize your plan by telling us what credit score you’re aiming for.",
  },
  {
    id: 2,
    title: "How CreditScoreIQ Works",
    desc: "Learn the steps we’ll take to get your score up, from reporting rent to disputing errors.",
  },
  {
    id: 3,
    title: "Review Your Credit Report",
    desc: "See flagged items and dispute inaccuracies.",
  },
  {
    id: 4,
    title: "Generate Dispute Letters",
    desc: "Automatically create letters to send.",
  },
  {
    id: 5,
    title: "Send Dispute Letters",
    desc: "Print, mail, and track your letters.",
  },
];

export default function GamePlanPanel() {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box bg={cardBg} borderRadius="xl" boxShadow="lg" p={6} mb={8}>
      <Heading size="md" mb={4} fontFamily="Inter, sans-serif">
        Your Personalized Game Plan
      </Heading>
      <Box
        overflowX="auto"
        whiteSpace="nowrap"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <HStack spacing={4}>
          {STEPS.map((step) => (
            <Box
              key={step.id}
              flex="0 0 auto"
              w={{ base: "240px", md: "260px" }}
              h="180px"
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              p={4}
              _hover={{ boxShadow: "xl", cursor: "pointer" }}
            >
              <VStack align="start" justify="space-between" h="full">
                <Text fontWeight="700" fontSize="lg" noOfLines={2}>
                  {step.title}
                </Text>
                <Text fontSize="sm" color="gray.500" noOfLines={3}>
                  {step.desc}
                </Text>
              </VStack>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
