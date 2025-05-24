// components/signup/SignupStep2.tsx - Fixed imports and duplicate attributes
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Wrap,
  WrapItem,
  Icon,
  Container,
  Image,
  Progress,
  SimpleGrid,
  Flex,
  Badge,
  ScaleFade,
  Fade,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaTools,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import { MdTrendingUp, MdSecurity, MdAccountBalance } from "react-icons/md";
import { useState, useEffect } from "react";

interface SignupStep2Props {
  onNext: (step: number, data?: any) => void;
  onBack: () => void;
}

const INTERESTS = [
  {
    name: "Credit Builder Loan",
    icon: MdTrendingUp,
    image: "/mockups/sable-difference/coin-piggy-bank.png",
    description:
      "Build credit with small, manageable monthly payments that report to all bureaus.",
    benefit: "Average 37-point score increase",
    color: "green",
  },
  {
    name: "Credit Repair & Disputes",
    icon: FaTools,
    image: "/mockups/sable-difference/Sable-credit-gauge.png",
    description:
      "Challenge errors and inaccuracies on your credit reports with guided dispute tools.",
    benefit: "Remove negative items faster",
    color: "red",
  },
  {
    name: "Credit Monitoring",
    icon: FaShieldAlt,
    image: "/mockups/grow/cash-in-safe.png",
    description:
      "Real-time alerts when changes appear on your credit reports from all three bureaus.",
    benefit: "Catch fraud early",
    color: "blue",
  },
  {
    name: "Financial Education",
    icon: MdSecurity,
    image: "/mockups/grow/graphic-working-mom.png",
    description:
      "Learn proven strategies to build wealth and improve your financial health.",
    benefit: "Master money management",
    color: "purple",
  },
  {
    name: "Debt Management",
    icon: MdAccountBalance,
    image: "/mockups/grow/sable-piggy.png",
    description:
      "Tools and strategies to pay down debt faster and save money on interest.",
    benefit: "Pay off debt 40% faster",
    color: "orange",
  },
  {
    name: "Premium Support",
    icon: FaCreditCard,
    image: "/mockups/sable-difference/savings-party.png",
    description:
      "Get priority access to credit experts and personalized guidance.",
    benefit: "1-on-1 expert guidance",
    color: "teal",
  },
];

export default function SignupStep2({ onNext, onBack }: SignupStep2Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const cardBg = useColorModeValue("white", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Staggered animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < INTERESTS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 100); // Show each item 100ms after the previous

    return () => clearInterval(timer);
  }, []);

  const toggleInterest = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleContinue = () => {
    onNext(3, { interests: selected });
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="6xl" px={4}>
        {/* Progress Bar */}
        <Progress
          value={33.2} // 2/6 steps
          size="xs"
          colorScheme="green"
          borderRadius="full"
          mb={8}
          bg="gray.200"
        />

        <VStack spacing={10} align="stretch" textAlign="center">
          {/* Header */}
          <Fade in={true}>
            <VStack spacing={6}>
              <ScaleFade in={true} initialScale={0.9}>
                <Box
                  p={4}
                  bg="linear-gradient(135deg, #48BB78, #38A169)"
                  borderRadius="2xl"
                  color="white"
                  boxShadow="0 8px 25px rgba(55, 161, 105, 0.4)"
                >
                  <Icon as={MdTrendingUp} boxSize={8} />
                </Box>
              </ScaleFade>

              <VStack spacing={3}>
                <Heading
                  as="h2"
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color="green.600"
                >
                  What interests you most?
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.600"
                  maxW="2xl"
                  lineHeight="1.6"
                >
                  Select anything that catches your eye — this helps us
                  personalize your experience. You'll have access to everything
                  regardless of what you choose.
                </Text>
              </VStack>

              {/* Selection Counter */}
              {selected.length > 0 && (
                <ScaleFade in={selected.length > 0}>
                  <Badge
                    colorScheme="green"
                    variant="solid"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    {selected.length} selected
                  </Badge>
                </ScaleFade>
              )}
            </VStack>
          </Fade>

          {/* Interest Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            {INTERESTS.map((interest, index) => {
              const isActive = selected.includes(interest.name);
              const isVisible = index < visibleItems;

              return (
                <ScaleFade
                  key={interest.name}
                  in={isVisible}
                  initialScale={0.9}
                >
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="2xl"
                    boxShadow={isActive ? "xl" : "md"}
                    border="3px solid"
                    borderColor={
                      isActive ? `${interest.color}.400` : "transparent"
                    }
                    cursor="pointer"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform={isActive ? "scale(1.02)" : "scale(1)"}
                    _hover={{
                      borderColor: `${interest.color}.300`,
                      boxShadow: "xl",
                      transform: "scale(1.02)",
                    }}
                    onClick={() => toggleInterest(interest.name)}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Background Pattern */}
                    <Box
                      position="absolute"
                      top="-50%"
                      right="-50%"
                      w="200%"
                      h="200%"
                      bg={`linear-gradient(45deg, transparent 30%, var(--chakra-colors-${interest.color}-50) 70%)`}
                      opacity={isActive ? 0.3 : 0}
                      transition="opacity 0.3s ease"
                      transform="rotate(15deg)"
                    />

                    <VStack spacing={4} position="relative">
                      {/* Icon & Image */}
                      <Box position="relative">
                        <Image
                          src={interest.image}
                          alt={interest.name}
                          boxSize="80px"
                          objectFit="contain"
                          mx="auto"
                          filter={isActive ? "none" : "grayscale(20%)"}
                          transition="filter 0.3s ease"
                        />
                        <Box
                          position="absolute"
                          top="-2"
                          right="-2"
                          p={2}
                          bg={`${interest.color}.100`}
                          borderRadius="full"
                          opacity={isActive ? 1 : 0.7}
                        >
                          <Icon
                            as={interest.icon}
                            boxSize={4}
                            color={`${interest.color}.600`}
                          />
                        </Box>
                      </Box>

                      {/* Content */}
                      <VStack spacing={2}>
                        <Text
                          fontWeight="700"
                          fontSize="lg"
                          color={
                            isActive ? `${interest.color}.700` : "gray.800"
                          }
                          transition="color 0.3s ease"
                        >
                          {interest.name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          lineHeight="1.5"
                          textAlign="center"
                        >
                          {interest.description}
                        </Text>

                        {/* Benefit Badge */}
                        <Badge
                          colorScheme={interest.color}
                          variant={isActive ? "solid" : "subtle"}
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="xs"
                          fontWeight="600"
                          transition="all 0.3s ease"
                        >
                          {interest.benefit}
                        </Badge>
                      </VStack>

                      {/* Selection Indicator */}
                      {isActive && (
                        <ScaleFade in={isActive}>
                          <Box
                            position="absolute"
                            top={3}
                            left={3}
                            p={2}
                            bg="green.500"
                            borderRadius="full"
                            color="white"
                            boxShadow="md"
                          >
                            <Icon as={FaCheckCircle} boxSize={4} />
                          </Box>
                        </ScaleFade>
                      )}
                    </VStack>
                  </Box>
                </ScaleFade>
              );
            })}
          </SimpleGrid>

          {/* Action Buttons */}
          <Fade in={true}>
            <VStack spacing={4} pt={8}>
              <Button
                bg="green.500"
                color="white"
                _hover={{
                  bg: "green.600",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(55, 161, 105, 0.4)",
                }}
                _active={{ transform: "translateY(0)" }}
                rounded="xl"
                size="lg"
                w="full"
                maxW="sm"
                h="14"
                onClick={handleContinue}
                isDisabled={selected.length === 0}
                transition="all 0.2s ease"
                fontWeight="600"
                fontSize="lg"
              >
                Continue to Plans →
              </Button>

              <Button
                variant="ghost"
                size="lg"
                color="gray.600"
                onClick={onBack}
                _hover={{ bg: "gray.100" }}
              >
                Back
              </Button>

              {selected.length === 0 && (
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  Select at least one area of interest to continue
                </Text>
              )}
            </VStack>
          </Fade>
        </VStack>
      </Container>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .scale-in {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </Box>
  );
}
