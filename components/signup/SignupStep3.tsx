// components/signup/SignupStep3.tsx

import {
  Box,
  Button,
  Heading,
  HStack,
  Grid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const plans = [
  {
    title: "Free Plan",
    price: "$0/mo",
    features: [
      "DIY Credit Disputing",
      "Basic Letter Templates",
      "Access to Offers Engine",
      "Credit Builder Loan (optional)",
      "Credit Monitoring (optional)",
    ],
    cta: "Get Started Free",
    variant: "outline",
  },
  {
    title: "Sable Premium",
    price: "$39/mo",
    featured: true,
    features: [
      "Guided Dispute Preparation & Mailing",
      "Enhanced Letter Templates with Insights",
      "Dispute Status Tracker",
      "Monthly Progress Reports",
      "Priority Dispute Review Queue",
      "In-App Support from Credit Growth Team",
      "Credit Monitoring (included)",
      "Access to Offers Engine",
    ],
    cta: "Start with Premium",
    variant: "solid",
  },
];

export interface SignupStep3Props {
  onNext: (step: number, data?: Partial<any>) => void;
  onBack: () => void;
}

export default function SignupStep3({ onNext, onBack }: SignupStep3Props) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="100%" py={16} px={{ base: 4, md: 16 }} bg="white">
      <VStack spacing={8} textAlign="center" mb={12} maxW="7xl" mx="auto">
        <Heading size="xl" color="green.600">
          Choose Your Plan
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="2xl">
          Get started with DIY tools or upgrade to Sable Premium to access
          guided dispute mailing, progress tracking, and full support.
        </Text>
      </VStack>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={10}
        maxW="7xl"
        mx="auto"
      >
        {plans.map((plan) => (
          <Box
            key={plan.title}
            bg={plan.featured ? "white" : "gray.50"}
            borderRadius="xl"
            boxShadow={plan.featured ? "xl" : "base"}
            border={plan.featured ? "2px solid #38A169" : "1px solid #E2E8F0"}
            p={10}
            transition="all 0.3s"
            _hover={{ transform: "scale(1.01)", boxShadow: "xl" }}
            w="100%"
          >
            <VStack spacing={5} align="start">
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                {plan.title}
              </Text>
              <Text fontSize="2xl" fontWeight="extrabold" color="green.500">
                {plan.price}
              </Text>
              <VStack align="start" spacing={3} pt={2} w="full">
                {plan.features.map((feature) => (
                  <HStack key={feature} align="start">
                    <CheckIcon color="green.400" boxSize={4} mt={1} />
                    <Text fontSize="sm" color="gray.600">
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>
              <Button
                colorScheme="green"
                variant={plan.variant}
                size="lg"
                mt={6}
                onClick={() =>
                  onNext(4, {
                    plan: plan.title === "Free Plan" ? null : "premium",
                  })
                }
                w="full"
              >
                {plan.cta}
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>

      <VStack pt={12}>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </VStack>
    </Box>
  );
}
