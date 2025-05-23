// components/dashboard/CreditScoreCard.tsx - Collapsible version
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Heading,
  Text,
  IconButton,
  Badge,
  Progress,
  SimpleGrid,
  Skeleton,
  Tooltip,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Info,
  RefreshCw,
  Eye,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock data - replace with API call or DB sync
const bureauData = {
  Experian: {
    score: 739,
    delta: 54,
    updated: "May 3",
    next: "May 10",
    trend: "up",
    factors: ["Payment History", "Credit Mix", "Length of History"],
  },
  TransUnion: {
    score: 688,
    delta: -5,
    updated: "May 2",
    next: "May 9",
    trend: "down",
    factors: ["Credit Utilization", "Recent Inquiries"],
  },
  Equifax: {
    score: 702,
    delta: 12,
    updated: "May 1",
    next: "May 8",
    trend: "up",
    factors: ["Payment History", "Account Age"],
  },
} as const;

type Bureau = keyof typeof bureauData;

export default function CreditScoreCard() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selected, setSelected] = useState<Bureau>("TransUnion");
  const [isExpanded, setIsExpanded] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  const { score, delta, updated, next, trend, factors } = bureauData[selected];

  // Calculate score percentage and rating
  const { pct, rating, ratingColor } = useMemo(() => {
    const pct = Math.max(0, Math.min(1, score / 850));
    let rating = "Poor";
    let ratingColor = "red.500";

    if (score >= 740) {
      rating = "Excellent";
      ratingColor = "green.500";
    } else if (score >= 670) {
      rating = "Good";
      ratingColor = "blue.500";
    } else if (score >= 580) {
      rating = "Fair";
      ratingColor = "orange.500";
    }

    return { pct, rating, ratingColor };
  }, [score]);

  // Fetch Array token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/array/getWidget");
        const data = await res.json();
        setUserToken(data.userToken);
      } catch (err) {
        console.error("Failed to fetch Array userToken", err);
      } finally {
        setLoadingToken(false);
      }
    };
    fetchToken();
  }, []);

  // Initialize Array widget
  useEffect(() => {
    if (!userToken || !widgetRef.current) return;

    const loadScript = (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    loadScript(
      "https://embed.array.io/cms/array-web-component.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
    );
    loadScript(
      "https://embed.array.io/cms/array-credit-score.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
    );

    widgetRef.current.innerHTML = `
      <array-credit-score
        appKey="3F03D20E-5311-43D8-8A76-E4B5D77793BD"
        userToken="${userToken}"
        apiUrl="https://sandbox.array.io"
        sandbox="true"
      ></array-credit-score>
    `;
  }, [userToken]);

  return (
    <Card boxShadow="xl" borderRadius="2xl" overflow="hidden" bg="white">
      {/* Header */}
      <CardHeader
        bg="gradient-to-r from-sable.sage to-sable.mint"
        color="white"
        pb={2}
      >
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="md" fontWeight="700">
              Credit Score
            </Heading>
            <Text fontSize="sm" opacity={0.9}>
              Updated {updated} • Next check {next}
            </Text>
          </VStack>
          <HStack spacing={2}>
            <Tooltip label="Refresh Score">
              <IconButton
                aria-label="Refresh"
                icon={<RefreshCw size={16} />}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </Tooltip>
            <Tooltip label="View Details">
              <IconButton
                aria-label="View Details"
                icon={<Eye size={16} />}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody p={6}>
        {/* Bureau Toggle */}
        <HStack spacing={1} mb={6} justify="center">
          {(Object.keys(bureauData) as Bureau[]).map((bureau) => (
            <Button
              key={bureau}
              size="sm"
              variant={selected === bureau ? "solid" : "ghost"}
              colorScheme={selected === bureau ? "green" : "gray"}
              onClick={() => setSelected(bureau)}
              borderRadius="full"
              px={4}
            >
              {bureau}
            </Button>
          ))}
        </HStack>

        {/* Main Score Display - Always Visible */}
        <VStack spacing={4} mb={6}>
          {/* Score and Delta */}
          <HStack spacing={4} align="center">
            <Heading
              fontSize="4xl"
              fontWeight="800"
              color={ratingColor}
              fontFamily="mono"
            >
              {score}
            </Heading>
            <VStack spacing={1}>
              <HStack spacing={1}>
                {trend === "up" ? (
                  <TrendingUp
                    size={16}
                    color="var(--chakra-colors-green-500)"
                  />
                ) : (
                  <TrendingDown
                    size={16}
                    color="var(--chakra-colors-red-500)"
                  />
                )}
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color={delta > 0 ? "green.500" : "red.500"}
                >
                  {delta > 0 ? `+${delta}` : delta} pts
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                This month
              </Text>
            </VStack>
          </HStack>

          {/* Rating Badge */}
          <Badge
            colorScheme={ratingColor.split(".")[0]}
            variant="subtle"
            px={4}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
          >
            {rating}
          </Badge>
        </VStack>

        {/* Score Progress Bar - Always Visible */}
        <Box mb={6}>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="xs" color="gray.500">
              300
            </Text>
            <Text fontSize="xs" color="gray.500">
              850
            </Text>
          </Flex>
          <Box position="relative">
            <Progress
              value={pct * 100}
              size="lg"
              colorScheme="green"
              borderRadius="full"
              bg="gray.100"
            />
            {/* Score indicator */}
            <Box
              position="absolute"
              top="-2px"
              left={`${pct * 100}%`}
              transform="translateX(-50%)"
              w="16px"
              h="16px"
              bg="white"
              border="3px solid"
              borderColor="sable.sage"
              borderRadius="full"
              boxShadow="md"
            />
          </Box>
          <Flex justify="space-between" mt={2}>
            <Text fontSize="xs" color="gray.500">
              Poor
            </Text>
            <Text fontSize="xs" color="gray.500">
              Fair
            </Text>
            <Text fontSize="xs" color="gray.500">
              Good
            </Text>
            <Text fontSize="xs" color="gray.500">
              Excellent
            </Text>
          </Flex>
        </Box>

        {/* Expand/Collapse Toggle Button */}
        <Button
          variant="ghost"
          w="full"
          justifyContent="center"
          onClick={() => setIsExpanded(!isExpanded)}
          rightIcon={
            isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
          }
          mb={4}
          _hover={{ bg: "gray.50" }}
          borderRadius="lg"
        >
          {isExpanded ? "Show Less Details" : "Show More Details"}
        </Button>

        {/* Collapsible Content */}
        <Collapse in={isExpanded} animateOpacity>
          <VStack spacing={6} align="stretch">
            <Divider />

            {/* Key Factors */}
            <VStack align="stretch" spacing={3}>
              <HStack>
                <Info size={16} color="var(--chakra-colors-blue-500)" />
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Key Factors for {selected}
                </Text>
              </HStack>
              {factors.map((factor, index) => (
                <HStack key={index} spacing={3}>
                  <Box w={2} h={2} bg="sable.sage" borderRadius="full" />
                  <Text fontSize="sm" color="gray.600">
                    {factor}
                  </Text>
                </HStack>
              ))}
            </VStack>

            {/* Quick Stats Grid */}
            <SimpleGrid columns={2} spacing={4}>
              <Box p={3} bg="gray.50" borderRadius="lg" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {(Object.values(bureauData).reduce(
                    (acc, b) => acc + b.score,
                    0
                  ) /
                    3) |
                    0}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Average Score
                </Text>
              </Box>
              <Box p={3} bg="green.50" borderRadius="lg" textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  {Object.values(bureauData).filter((b) => b.delta > 0).length}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Improving Bureaus
                </Text>
              </Box>
            </SimpleGrid>

            {/* Action Button */}
            <Button
              w="full"
              colorScheme="green"
              size="lg"
              borderRadius="xl"
              rightIcon={<ArrowRight size={16} />}
              _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Improve My Score
            </Button>

            {/* Array Widget Section */}
            <Box p={4} bg="gray.50" borderRadius="xl">
              <HStack justify="space-between" mb={4}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    Live Credit Data
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Powered by Array
                  </Text>
                </VStack>
                <Badge colorScheme="blue" variant="subtle" size="sm">
                  Real-time
                </Badge>
              </HStack>

              {loadingToken ? (
                <VStack spacing={3}>
                  <Skeleton height="40px" borderRadius="lg" />
                  <SimpleGrid columns={3} spacing={2} w="full">
                    <Skeleton height="60px" borderRadius="lg" />
                    <Skeleton height="60px" borderRadius="lg" />
                    <Skeleton height="60px" borderRadius="lg" />
                  </SimpleGrid>
                </VStack>
              ) : (
                <Box ref={widgetRef} minH="200px" />
              )}
            </Box>
          </VStack>
        </Collapse>
      </CardBody>
    </Card>
  );
}
