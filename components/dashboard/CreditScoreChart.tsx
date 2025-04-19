// components/dashboard/CreditScoreChart.tsx
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Badge,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { useState, useMemo } from "react";

// Mock monthly score data for 12 months
const fullData = [
  { month: "Jan", score: 612 },
  { month: "Feb", score: 618 },
  { month: "Mar", score: 627 },
  { month: "Apr", score: 640 },
  { month: "May", score: 655 },
  { month: "Jun", score: 662 },
  { month: "Jul", score: 670 },
  { month: "Aug", score: 684 },
  { month: "Sep", score: 690 },
  { month: "Oct", score: 700 },
  { month: "Nov", score: 710 },
  { month: "Dec", score: 720 },
];

// Define how many points each timeframe should show
const ranges = {
  "1M": 1,
  "3M": 3,
  "6M": 6,
  "1Y": 12,
} as const;
type RangeKey = keyof typeof ranges;

export default function CreditScoreChart() {
  const [range, setRange] = useState<RangeKey>("6M");
  const chartBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  // take last N months of data
  const data = fullData.slice(-ranges[range]);

  // compute growth and percent
  const { growth, percent } = useMemo(() => {
    if (data.length < 2) return { growth: 0, percent: 0 };
    const first = data[0].score;
    const last = data[data.length - 1].score;
    const g = last - first;
    const p = Math.round((g / first) * 100);
    return { growth: g, percent: p };
  }, [data]);

  return (
    <Box
      p={6}
      bg={chartBg}
      borderRadius="xl"
      boxShadow="md"
      borderWidth="1px"
      borderColor={border}
    >
      {/* Growth display */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold">
            Credit Score Growth
          </Text>
          <Text fontSize="2xl" fontWeight="extrabold" color="green.500">
            {growth > 0 ? `+${growth}` : growth}
          </Text>
          <Badge colorScheme="green" variant="subtle" fontSize="0.8em">
            {percent > 0 ? `${percent}%` : `${percent}%`}
          </Badge>
        </HStack>
        <ButtonGroup size="sm" isAttached>
          {(Object.keys(ranges) as RangeKey[]).map((key) => (
            <Button
              key={key}
              variant={range === key ? "solid" : "outline"}
              colorScheme="green"
              onClick={() => setRange(key)}
            >
              {key}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38A169" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#38A169" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 850]} ticks={[0, 300, 500, 700, 850]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#38A169"
            strokeWidth={2.5}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
