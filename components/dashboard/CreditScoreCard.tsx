import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { FaRegCalendarAlt } from "react-icons/fa";

// Mock data — replace with API call or DB sync
const bureauData = {
  Experian: { score: 739, delta: 54, updated: "May 3", next: "May 10" },
  TransUnion: { score: 688, delta: -5, updated: "May 2", next: "May 9" },
  Equifax: { score: 702, delta: 12, updated: "May 1", next: "May 8" },
} as const;
type Bureau = keyof typeof bureauData;

export default function CreditScoreCard() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selected, setSelected] = useState<Bureau>("TransUnion");

  const { score, delta, updated, next } = bureauData[selected];
  const pct = useMemo(() => Math.max(0, Math.min(1, score / 850)), [score]);
  const rating = useMemo(() => {
    if (score >= 740) return "Excellent";
    if (score >= 670) return "Good";
    if (score >= 580) return "Fair";
    return "Poor";
  }, [score]);

  const outline = useColorModeValue("gray.200", "gray.600");
  const divider = useColorModeValue("white", "gray.800");
  const brandGreen = "#37a169";

  // Array widget logic
  const widgetRef = useRef<HTMLDivElement>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

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
    <Box
      w="full"
      p={4}
      mb={5}
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="16px"
      boxShadow={`inset 0 0 0 1px ${outline}, 0 0 8px 0 rgba(0,0,0,0.125)`}
    >
      {/* 1) Bureau Toggle Buttons */}
      <HStack spacing={2} mb={4}>
        {(Object.keys(bureauData) as Bureau[]).map((b) => (
          <Button
            key={b}
            size="sm"
            variant={selected === b ? "solid" : "outline"}
            bg={selected === b ? brandGreen : "transparent"}
            color={
              selected === b
                ? "white"
                : useColorModeValue("gray.700", "gray.200")
            }
            borderColor={brandGreen}
            _hover={{
              bg: selected === b ? "#2f855a" : `${brandGreen}1A`,
            }}
            fontFamily="Inter, sans-serif"
            onClick={() => setSelected(b)}
          >
            {b}
          </Button>
        ))}
      </HStack>

      {/* 2) Score + Delta + History Icon */}
      <Flex align="center" mb={1}>
        <Heading
          as="h2"
          fontSize={isMobile ? "3xl" : "4xl"}
          fontWeight="600"
          fontFamily="Lato, sans-serif"
        >
          {score}
        </Heading>
        <Box
          ml={2}
          bg={brandGreen}
          color="white"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="sm"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          {delta > 0 ? `+${delta}` : delta} pts
        </Box>
        <IconButton
          aria-label="History"
          icon={<FaRegCalendarAlt />}
          variant="ghost"
          size="sm"
          color={brandGreen}
          ml="auto"
        />
      </Flex>

      {/* 3) Updated / Next Check */}
      <Text
        fontSize="xs"
        color="gray.500"
        mb={4}
        fontFamily="Inter, sans-serif"
      >
        Updated {updated} | Next check {next}
      </Text>

      {/* 4) Score Progress Bar */}
      <Box
        position="relative"
        w="full"
        h="8px"
        bg={outline}
        borderRadius="8px"
        mb={4}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          height="100%"
          width={`${pct * 100}%`}
          bg={brandGreen}
          borderRadius="8px 0 0 8px"
          transition="width 0.8s ease-in-out"
        />
        <Flex h="100%" justify="space-between">
          {[...Array(4)].map((_, i) => (
            <Box key={i} w="2px" h="100%" bg={divider} />
          ))}
        </Flex>
        <Box
          position="absolute"
          top="50%"
          left={`calc(${pct * 100}% - 12px)`}
          transform="translateY(-50%)"
          w="24px"
          h="24px"
          bg={brandGreen}
          borderRadius="full"
          boxShadow="0 0 0 4px white"
          transition="left 0.8s ease-in-out"
        />
      </Box>

      {/* 5) Rating Label */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text
          fontSize="xs"
          fontWeight="700"
          textTransform="uppercase"
          fontFamily="Inter, sans-serif"
          color={brandGreen}
        >
          {rating}
        </Text>
        <Flex
          align="center"
          fontFamily="Inter, sans-serif"
          fontSize="xs"
          color="gray.500"
        >
          VantageScore 3.0
          <IconButton
            aria-label="More info"
            icon={<InfoIcon />}
            variant="ghost"
            size="sm"
            color={brandGreen}
            ml={1}
          />
        </Flex>
      </Flex>

      {/* 6) Growth Button */}
      <Button
        w="full"
        size="lg"
        bg={brandGreen}
        color="white"
        _hover={{ bg: "#2f855a" }}
        fontFamily="Inter, sans-serif"
      >
        Start Growth
      </Button>

      {/* 7) Array Score Widget */}
      <Box mt={6}>
        <Heading
          fontSize="sm"
          mb={2}
          color="gray.600"
          fontFamily="Inter, sans-serif"
        >
          From Array (Live Score after implementation.)
        </Heading>
        {loadingToken ? (
          <Spinner size="md" />
        ) : (
          <Box ref={widgetRef} minH="300px" />
        )}
      </Box>
    </Box>
  );
}
