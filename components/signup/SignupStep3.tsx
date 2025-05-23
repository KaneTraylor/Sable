import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Container,
  Progress,
  Image,
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Icon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Shield, Zap, Users, TrendingUp, FileText, Clock } from "lucide-react";

export interface SignupStep3Props {
  onNext: (step: number, data?: Partial<any>) => void;
  onBack: () => void;
}

const plans = [
  {
    id: "free",
    name: "Sable Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started with credit building",
    popular: false,
    features: [
      "DIY Credit Dispute Tools",
      "Basic Letter Templates",
      "Credit Score Monitoring",
      "Educational Resources",
      "Community Access",
      "Mobile App Access",
    ],
    limitations: [
      "5 disputes per month",
      "Self-mail required",
      "Basic support",
    ],
    cta: "Start Free",
    color: "blue",
    icon: Shield,
    gradient: "linear(to-br, blue.400, blue.600)",
  },
  {
    id: "premium",
    name: "Sable Premium",
    price: "$39",
    period: "/month",
    description: "Comprehensive credit repair with white-glove service",
    popular: true,
    features: [
      "Everything in Free, plus:",
      "Unlimited Dispute Rounds",
      "Professional Letter Mailing",
      "Certified Mail with Tracking",
      "Priority Dispute Queue",
      "1-on-1 Credit Coaching",
      "Advanced Analytics",
      "24/7 Priority Support",
      "Credit Report Monitoring",
      "Score Improvement Guarantee*",
    ],
    cta: "Start Premium Trial",
    color: "green",
    icon: Zap,
    gradient: "linear(to-br, green.400, green.600)",
    savings: "Most popular - 78% choose Premium",
  },
];

const stats = [
  { number: "720+", label: "Average Score Increase", icon: TrendingUp },
  { number: "45 days", label: "Average Response Time", icon: Clock },
  { number: "94%", label: "Success Rate", icon: FileText },
  { number: "50K+", label: "Happy Customers", icon: Users },
];

export default function SignupStep3({ onNext, onBack }: SignupStep3Props) {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const cardBg = useColorModeValue("white", "gray.700");

  const handleContinue = () => {
    onNext(4, {
      plan: selectedPlan === "free" ? null : "premium",
    });
  };

  return (
    <Box bg="sable.tan" minH="100vh" py={8}>
      <Container maxW="6xl" mx="auto" px={4}>
        {/* Progress */}
        <Progress
          value={50}
          size="sm"
          colorScheme="green"
          borderRadius="full"
          mb={8}
          bg="white"
        />

        <VStack spacing={12} align="stretch">
          {/* Header */}
          <VStack spacing={6} textAlign="center">
            <Image
              src="/mockups/sable-difference/46points.svg"
              alt="Credit Score Improvement"
              maxH="200px"
              mx="auto"
            />

            <VStack spacing={3}>
              <Heading
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="900"
                color="gray.900"
                fontFamily="heading"
              >
                Choose Your{" "}
                <Text as="span" color="sable.sage">
                  Credit Journey
                </Text>
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.600"
                maxW="2xl"
                lineHeight="1.5"
              >
                Select the plan that fits your credit goals. Start free or get
                premium service with guaranteed results.
              </Text>
            </VStack>
          </VStack>

          {/* Stats */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {stats.map((stat, index) => (
                <VStack key={index} spacing={2}>
                  <Box
                    p={3}
                    bg="green.50"
                    borderRadius="full"
                    color="sable.sage"
                  >
                    <Icon as={stat.icon} boxSize={6} />
                  </Box>
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="900"
                    color="gray.900"
                  >
                    {stat.number}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    textAlign="center"
                    fontWeight="600"
                  >
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Box>

          {/* Plan Cards */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {plans.map((plan) => (
              <Box
                key={plan.id}
                position="relative"
                cursor="pointer"
                onClick={() => setSelectedPlan(plan.id)}
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-4px)" }}
              >
                {plan.popular && (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                  >
                    <Badge
                      bg="orange.400"
                      color="white"
                      px={4}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="700"
                      boxShadow="lg"
                    >
                      <HStack spacing={1}>
                        <StarIcon boxSize={3} />
                        <Text>Most Popular</Text>
                      </HStack>
                    </Badge>
                  </Box>
                )}

                <Box
                  bg={cardBg}
                  borderRadius="2xl"
                  p={{ base: 6, md: 8 }}
                  boxShadow={selectedPlan === plan.id ? "2xl" : "lg"}
                  border="3px solid"
                  borderColor={
                    selectedPlan === plan.id
                      ? `${plan.color}.500`
                      : "transparent"
                  }
                  position="relative"
                  overflow="hidden"
                >
                  {/* Background gradient effect */}
                  {selectedPlan === plan.id && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      h="4px"
                      bgGradient={plan.gradient}
                    />
                  )}

                  <VStack spacing={6} align="stretch">
                    {/* Plan header */}
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        bg={`${plan.color}.50`}
                        borderRadius="xl"
                        color={`${plan.color}.500`}
                      >
                        <Icon as={plan.icon} boxSize={8} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Heading size="lg" color="gray.900">
                          {plan.name}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          {plan.description}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Pricing */}
                    <HStack align="baseline">
                      <Text fontSize="4xl" fontWeight="900" color="gray.900">
                        {plan.price}
                      </Text>
                      <Text fontSize="lg" color="gray.500">
                        {plan.period}
                      </Text>
                      <Spacer />
                      {selectedPlan === plan.id && (
                        <Badge colorScheme="green" variant="solid">
                          Selected
                        </Badge>
                      )}
                    </HStack>

                    {plan.savings && (
                      <Box
                        bg="orange.50"
                        border="1px solid"
                        borderColor="orange.200"
                        borderRadius="lg"
                        p={3}
                      >
                        <Text
                          fontSize="sm"
                          color="orange.700"
                          fontWeight="600"
                          textAlign="center"
                        >
                          🔥 {plan.savings}
                        </Text>
                      </Box>
                    )}

                    {/* Features */}
                    <VStack align="stretch" spacing={3}>
                      <List spacing={3}>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index} fontSize="sm">
                            <HStack align="start" spacing={3}>
                              <ListIcon
                                as={CheckIcon}
                                color={`${plan.color}.500`}
                                mt={1}
                              />
                              <Text
                                color="gray.700"
                                fontWeight={
                                  feature.includes("Everything") ? "700" : "500"
                                }
                              >
                                {feature}
                              </Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>

                      {plan.limitations && (
                        <Box
                          mt={4}
                          p={3}
                          bg="gray.50"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.200"
                        >
                          <Text
                            fontSize="xs"
                            color="gray.600"
                            mb={2}
                            fontWeight="600"
                          >
                            Limitations:
                          </Text>
                          {plan.limitations.map((limitation, index) => (
                            <Text key={index} fontSize="xs" color="gray.600">
                              • {limitation}
                            </Text>
                          ))}
                        </Box>
                      )}
                    </VStack>

                    {/* CTA Button */}
                    <Button
                      colorScheme={plan.color}
                      size="lg"
                      h="56px"
                      borderRadius="xl"
                      fontSize="lg"
                      fontWeight="700"
                      variant={selectedPlan === plan.id ? "solid" : "outline"}
                      onClick={() => setSelectedPlan(plan.id)}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s ease"
                    >
                      {plan.cta}
                    </Button>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* Bottom disclaimer and actions */}
          <VStack spacing={6}>
            <Box
              bg="blue.50"
              border="1px solid"
              borderColor="blue.200"
              borderRadius="xl"
              p={6}
              textAlign="center"
            >
              <Text fontSize="sm" color="blue.800" fontWeight="600" mb={2}>
                💡 Pro Tip: Start with Premium for fastest results
              </Text>
              <Text fontSize="sm" color="blue.700">
                94% of our Premium members see score improvements within 45
                days. Free plan users can upgrade anytime.
              </Text>
            </Box>

            {/* Action buttons */}
            <HStack spacing={4} w="full" justify="center">
              <Button variant="outline" onClick={onBack} size="lg" px={8}>
                Back
              </Button>
              <Button
                colorScheme="green"
                onClick={handleContinue}
                size="lg"
                px={12}
                h="56px"
                fontSize="lg"
                fontWeight="700"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Continue with {plans.find((p) => p.id === selectedPlan)?.name} →
              </Button>
            </HStack>

            <Text fontSize="xs" color="gray.500" textAlign="center" maxW="md">
              * Score improvement guarantee applies to Premium plans. Individual
              results may vary. You can change or cancel your plan anytime.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
