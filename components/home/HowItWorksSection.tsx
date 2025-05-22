// components/HowItWorksSection.tsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
  Button,
  chakra,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const steps = [
  {
    number: 1,
    img: "/mockups/Sable-people/Sable-happy-gauge.png",
    title: "Sable adds money to your locked savings account every pay period",
    description:
      "This is a small interest-free loan. You select the amount we add, as little as $10.",
  },
  {
    number: 2,
    img: "mockups/grow/Sable-step2.png",
    title: "You repay Sable for the savings we gave you in Step 1",
    description:
      "Pay us back the next time you get paid. These payments help you build your credit!",
  },
  {
    number: 3,
    img: "mockups/grow/Step-3.png",
    title: "Repeat and access your $500",
    description:
      "Every time you save $500, we give you access to it. Repeat these steps and keep your plan active to maximize impact.",
  },
];

export default function HowItWorksSection() {
  const router = useRouter();

  return (
    <Box bg="white" py={{ base: 8, md: 12, lg: 16 }} px={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        {/* Sable mark + “How it works” subheading */}
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
            How it works
          </Text>
        </Stack>

        {/* Section heading */}
        <Heading
          as="h2"
          textAlign="center"
          fontFamily="heading"
          fontWeight="900"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="shorter"
          mb={{ base: 4, md: 8 }}
        >
          How to build credit with a{" "}
          <chakra.span color="green.500" fontFamily="heading">
            Sable Credit Builder Account
          </chakra.span>
        </Heading>

        {/* Steps */}
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          justify="space-between"
          gap={{ base: 4, md: 10, lg: 14 }}
        >
          {steps.map((step) => (
            <VStack
              key={step.number}
              flex="1"
              maxW={{ base: "100%", md: "30%" }}
              spacing={{ base: 3, md: 6 }}
              textAlign="center"
            >
              <Image
                src={step.img}
                alt={`Step ${step.number}`}
                boxSize={{ base: "220px", md: "260px", lg: "300px" }}
                objectFit="contain"
              />

              <Text
                fontSize={{ base: "2.5xl", md: "4xl" }}
                fontWeight="900"
                color="green.500"
              >
                {step.number}
              </Text>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="700"
                color="gray.900"
              >
                {step.title}
              </Text>

              <Text
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight="600"
                color="gray.700"
              >
                {step.description}
              </Text>
            </VStack>
          ))}
        </Flex>

        {/* CTA button */}
        <Box textAlign="center" mt={{ base: 6, md: 12 }}>
          <Button
            size="lg"
            colorScheme="green"
            borderRadius="full"
            px={{ base: 8, md: 14 }}
            py={{ base: 3, md: 6 }}
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="600"
            onClick={() => router.push("/onboarding/signup")}
          >
            Start building credit for $1 today
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
