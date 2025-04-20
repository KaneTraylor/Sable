// components/dashboard/CustomCreditMeter.tsx
import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CustomCreditMeterProps {
  score: number; // 0–850
  size?: number; // diameter in px (optional override)
}

export default function CustomCreditMeter({
  score,
  size,
}: CustomCreditMeterProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dimension = size ?? (isMobile ? 200 : 300);
  const strokeWidth = 20;
  const radius = (dimension - strokeWidth) / 2;
  const center = dimension / 2;
  const arcLength = Math.PI * radius;

  // Animate the arc
  const [dashOffset, setDashOffset] = useState(arcLength);
  useEffect(() => {
    const pct = Math.max(0, Math.min(1, score / 850));
    const toOffset = arcLength * (1 - pct);
    requestAnimationFrame(() => setDashOffset(toOffset));
  }, [arcLength, score]);

  // Colors
  const gradientId = "meter-gradient";
  const scoreGradient = "linear(to-r, teal.300, green.500)";
  const labelColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Box position="relative" width={dimension} mx="auto">
      <svg width={dimension} height={center}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F56565" />
            <stop offset="40%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#6BCB77" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={`
            M ${center - radius},${center}
            A ${radius},${radius} 0 0 1 ${center + radius},${center}
          `}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated colored arc */}
        <path
          d={`
            M ${center - radius},${center}
            A ${radius},${radius} 0 0 1 ${center + radius},${center}
          `}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />

        {/* Needle */}
        {(() => {
          const pct = Math.max(0, Math.min(1, score / 850));
          const theta = Math.PI * (1 - pct);
          const x = center + Math.cos(theta) * radius;
          const y = center - Math.sin(theta) * radius;
          return (
            <circle
              cx={x}
              cy={y}
              r={strokeWidth / 2}
              fill="#2D3748"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
          );
        })()}
      </svg>

      {/* Only the numeric score inside the arc */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        pointerEvents="none"
      >
        <Text
          fontSize={isMobile ? "3xl" : "5xl"}
          fontWeight="extrabold"
          bgGradient={scoreGradient}
          bgClip="text"
          lineHeight="1"
        >
          {score}
        </Text>
      </Box>
    </Box>
  );
}
