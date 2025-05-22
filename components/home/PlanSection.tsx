// components/home/PlanSection.tsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  chakra,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const plans = [
  {
    key: "credit-builder",
    img: "/mockups/sable-difference/Sable-ticker.png",
    name: "Credit Builder",
    highlightColor: "green.500",
    description:
      "A simple way to boost your credit score and grow your savings at the same time.",
    benefits: [
      "Building your credit history",
      "Saving money effortlessly",
      "Improving financial health",
    ],
    cta: { label: "Learn more", href: "/plans/credit-builder" },
  },
  {
    key: "borrow-and-grow",
    img: "/mockups/sable-difference/Sable-dispute2.png",
    name: "Dispute & Grow",
    highlightColor: "orange.400",
    description:
      "Sable finds errors on your report and will help you to send letters to fix them.",
    benefits: [
      "Immediate financial needs",
      "Building positive payment history",
      "Growing a safety net",
    ],
    cta: { label: "Learn more", href: "/plans/borrow-and-grow" },
  },
];

export default function PlanSection() {
  const router = useRouter();

  return (
    <Box bg="white" py={{ base: 12, md: 20 }} px={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        {/* Sable mark + subheading */}
        <Stack
          align="center"
          spacing={{ base: 1, md: 2 }}
          mb={{ base: 4, md: 6 }}
        >
          <Image
            src="/mockups/logo/sable-mark.svg"
            alt="Sable Mark"
            boxSize={{ base: "80px", md: "100px", lg: "120px" }}
          />
          <Text
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="700"
            color="gray.500"
            fontSize="sm"
          >
            Our Plans
          </Text>
        </Stack>

        {/* Section Intro */}
        <Box textAlign="center" mb={{ base: 8, md: 12 }}>
          <Heading
            as="h2"
            fontFamily="heading"
            fontWeight="900"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            lineHeight="shorter"
          >
            Start where{" "}
            <chakra.span color="orange.400" fontFamily="heading">
              you are.
            </chakra.span>
          </Heading>
          <Text
            mt={4}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            color="gray.700"
            maxW="2xl"
            mx="auto"
          >
            We have plans tailored to meet you exactly where you are in your
            financial journey.
          </Text>
        </Box>

        {/* Plan Cards */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 6, lg: 8 }}
        >
          {plans.map((plan) => {
            const scheme = plan.highlightColor.split(".")[0];
            return (
              <Box
                key={plan.key}
                role="group"
                borderWidth="2px"
                borderColor={plan.highlightColor}
                borderRadius="xl"
                p={{ base: 6, md: 8 }}
                flex="1"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
              >
                <VStack spacing={4} textAlign="center">
                  <Image
                    src={plan.img}
                    alt={plan.name}
                    boxSize={{ base: "100px", md: "140px", lg: "180px" }}
                    objectFit="contain"
                  />

                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="900"
                    transition="transform 0.2s, color 0.2s"
                    _groupHover={{
                      transform: "scale(1.05)",
                      color: plan.highlightColor,
                    }}
                  >
                    {plan.name.split(" ")[0]}{" "}
                    <chakra.span color={plan.highlightColor}>
                      {plan.name.split(" ").slice(1).join(" ")}
                    </chakra.span>
                  </Heading>

                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    color="gray.700"
                  >
                    {plan.description}
                  </Text>

                  <VStack spacing={3} align="start" w="full" pt={2}>
                    {plan.benefits.map((b) => (
                      <HStack key={b} spacing={3}>
                        <Image
                          src={`/mockups/other/icon-plus-${scheme}.svg`}
                          alt="+"
                          boxSize={{ base: 5, md: 6 }}
                        />
                        <Text
                          fontWeight="600"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          {b}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Button
                    mt={6}
                    w="full"
                    colorScheme={scheme}
                    variant="solid"
                    borderRadius="full"
                    py={{ base: 4, md: 6 }}
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    onClick={() => router.push(plan.cta.href)}
                  >
                    {plan.cta.label}
                  </Button>
                </VStack>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
