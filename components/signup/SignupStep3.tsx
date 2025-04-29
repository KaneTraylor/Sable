// components/signup/SignupStep3.tsx

import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface SignupStep3Props {
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const plans = [
  {
    key: "protect",
    title: "SmartCredit Protect",
    price: "$24.95/mo",
    description:
      "Monthly 3-bureau reports & scores, $1M identity theft insurance, credit monitoring & alerts, 2 single-bureau updates/mo.",
  },
  {
    key: "build",
    title: "SmartCredit Build",
    price: "$29.95/mo",
    description:
      "All Protect benefits, plus unlimited single-bureau report updates.",
  },
];

export default function SignupStep3({
  selectedPlan,
  onPlanSelect,
  onNext,
  onBack,
}: SignupStep3Props) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW={{ base: "full", md: "lg" }} mx="auto" px={4} py={0}>
      {/* Header */}
      <Box textAlign="center" mb={6} pt={4}>
        <Heading
          as="h3"
          fontFamily="Franklin Gothic, sans-serif"
          fontWeight="400"
          fontSize="2xl"
          color="green.500"
          mb={1}
        >
          Choose your plan
        </Heading>
        <Text fontFamily="Inter, sans-serif" fontSize="md" color="gray.800">
          Select a SmartCredit option to connect your 3-bureau credit report.
        </Text>
      </Box>

      {/* Plan cards */}
      <VStack spacing={6}>
        {plans.map(({ key, title, price, description }) => {
          const selected = selectedPlan === key;
          return (
            <Box
              key={key}
              w="full"
              rounded="2xl"
              border="2px solid"
              borderColor={selected ? "green.500" : "gray.200"}
              px={6}
              py={6}
              position="relative"
              cursor="pointer"
              onClick={() => onPlanSelect(key)}
              _hover={{
                borderColor: "green.500",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              transition="all 0.2s"
            >
              {selected && (
                <Box
                  position="absolute"
                  top={-2}
                  right={-2}
                  bg="green.200"
                  rounded="full"
                  p={1}
                  zIndex={1}
                >
                  <CheckIcon color="green.600" w={4} h={4} />
                </Box>
              )}

              <Heading
                as="h4"
                fontFamily="Franklin Gothic, sans-serif"
                fontWeight="bold"
                fontSize="xl"
                color="gray.800"
                mb={2}
              >
                {title} — {price}
              </Heading>
              <Text
                fontFamily="Inter, sans-serif"
                fontSize="sm"
                color="gray.600"
                lineHeight="1.5"
              >
                {description}
              </Text>
            </Box>
          );
        })}
      </VStack>

      {/* Navigation */}
      <VStack spacing={3} mt={8} w="full">
        <Button
          variant="outline"
          colorScheme="gray"
          w="full"
          size="lg"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.700" }}
          rounded="lg"
          w="full"
          size="lg"
          onClick={onNext}
          isDisabled={!selectedPlan}
        >
          Continue
        </Button>
      </VStack>
    </Container>
  );
}
