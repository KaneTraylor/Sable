// components/dashboard/CreditInsights.tsx
import {
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react";

export function CreditInsights() {
  const insights = [
    {
      title: "Score Improved",
      description: "Up 12 points this month",
      icon: TrendingUp,
      color: "green.500",
      bgColor: "green.50",
    },
    {
      title: "Utilization Low",
      description: "Keep it under 30%",
      icon: TrendingDown,
      color: "blue.500",
      bgColor: "blue.50",
    },
    {
      title: "Payment Streak",
      description: "6 months on-time",
      icon: TrendingUp,
      color: "purple.500",
      bgColor: "purple.50",
    },
  ];

  return (
    <>
      <CardHeader>
        <HStack spacing={2}>
          <Lightbulb size={20} color="var(--chakra-colors-brand-500)" />
          <Heading size="md">Credit Insights</Heading>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3} align="stretch">
          {insights.map((insight, index) => (
            <HStack
              key={index}
              spacing={3}
              p={3}
              bg={insight.bgColor}
              borderRadius="lg"
            >
              <Box p={2} bg="white" borderRadius="md">
                <Icon as={insight.icon} boxSize={4} color={insight.color} />
              </Box>
              <VStack align="start" spacing={0} flex="1">
                <Text fontWeight="600" fontSize="sm">
                  {insight.title}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {insight.description}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </>
  );
}
