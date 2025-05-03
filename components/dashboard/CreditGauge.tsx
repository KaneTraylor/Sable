// components/dashboard/CreditGauge.tsx

import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import GaugeChart from "react-gauge-chart";

interface CreditGaugeProps {
  score: number;
  size?: number;
}

export default function CreditGauge({ score, size }: CreditGaugeProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  // mobile: 180px, desktop: 320px
  const gaugeWidth = size ?? (isMobile ? 180 : 320);
  const labelColor = useColorModeValue("gray.800", "whiteAlpha.900");
  // Use brand green gradient
  const scoreGradient = "linear(to-r, green.300, green.500)";

  return (
    <Box position="relative" width={gaugeWidth} mx="auto">
      <GaugeChart
        id="credit-gauge"
        nrOfLevels={60}
        arcsLength={[0.33, 0.33, 0.34]}
        colors={["#F56565", "#FFD93D", "#6BCB77"]}
        percent={score / 850}
        arcWidth={0.2}
        cornerRadius={4}
        needleColor="#FFFFFF"
        needleBaseColor="#FFFFFF"
        animateDuration={1500}
        hideText
        style={{ width: gaugeWidth }}
      />

      {/* Centered overlay */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Text
          fontSize={isMobile ? "md" : "lg"}
          fontWeight="bold"
          color={labelColor}
          mb={1}
          fontFamily="Lato, sans-serif"
        >
          Your Credit Score
        </Text>
        <Text
          fontSize={isMobile ? "3xl" : "5xl"}
          fontWeight="extrabold"
          bgGradient={scoreGradient}
          bgClip="text"
          fontFamily="Lato, sans-serif"
        >
          {score}
        </Text>
      </Box>
    </Box>
  );
}
