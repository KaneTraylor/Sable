// components/dashboard/CreditGauge.tsx
import GaugeChart from "react-gauge-chart";
import {
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

interface CreditGaugeProps {
  score: number; // e.g. 723
}

export default function CreditGauge({ score }: CreditGaugeProps) {
  // Normalize score from 300–850 to 0–1
  const percentage = (score - 300) / (850 - 300);

  const chartWidth = useBreakpointValue({ base: 220, md: 400 });

  const getScoreLabel = (score: number) => {
    if (score < 580) return "Poor";
    if (score < 670) return "Fair";
    if (score < 740) return "Good";
    if (score < 800) return "Very Good";
    return "Excellent";
  };

  return (
    <VStack spacing={3} mt={10} align="center">
      <Text
        fontWeight="medium"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        Your Credit Score
      </Text>
      <Box width={chartWidth}>
        <GaugeChart
          id="credit-score-gauge"
          nrOfLevels={30}
          colors={["#E53E3E", "#ECC94B", "#38A169"]}
          arcWidth={0.3}
          percent={percentage}
          textColor="transparent"
          needleColor={useColorModeValue("#2D3748", "#CBD5E0")}
          animate={true}
          animDelay={0}
        />
      </Box>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        bgGradient="linear(to-r, green.400, green.600)"
        bgClip="text"
      >
        {score}
      </Text>
      <Text fontSize="md" color={useColorModeValue("gray.500", "gray.400")}>
        {getScoreLabel(score)}
      </Text>
    </VStack>
  );
}
