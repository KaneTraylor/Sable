// components/dashboard/CreditGauge.tsx
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GaugeChart from "react-gauge-chart";

interface CreditGaugeProps {
  /** Credit score (0–850) */
  score: number;
  /** Optional override for the gauge width (px) */
  size?: number;
}

export default function CreditGauge({ score, size }: CreditGaugeProps) {
  // Automatically pick a smaller gauge on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gaugeWidth = size ?? (isMobile ? 120 : 140);

  return (
    <Box width={gaugeWidth} mx="auto">
      <GaugeChart
        id="credit-gauge"
        // Split the arc into three equal gradient segments
        arcsLength={[0.33, 0.33, 0.34]}
        colors={["#FF6B6B", "#FFD93D", "#6BCB77"]}
        percent={score / 850}
        arcWidth={0.15} // thinner arc
        cornerRadius={3} // rounded ends
        needleColor="#FFFFFF"
        needleBaseColor="#FFFFFF"
        animateDuration={1500}
        hideText // remove built‑in percentage label
        style={{ width: gaugeWidth }}
      />
    </Box>
  );
}
