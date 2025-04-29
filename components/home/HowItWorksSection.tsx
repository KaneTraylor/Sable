// components/HowItWorksSection.tsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  chakra,
  Divider,
} from "@chakra-ui/react";

const steps = [
  {
    number: 1,
    img: "/mockups/sable-difference/guygirlpiggy.svg",
    title: (
      <>
        Sable adds money to your locked savings account
        <sup>1</sup> every pay period
      </>
    ),
    description:
      "This is a small interest-free loan. You select the amount we add, as little as $10.",
  },
  {
    number: 2,
    img: "/mockups/sable-difference/moneyforcredit.svg",
    title: "You repay Sable for the savings we gave you in Step 1",
    description:
      "Pay us back the next time you get paid. These payments help you build your credit!",
  },
  {
    number: 3,
    img: "/mockups/sable-difference/46points.svg",
    title: "Repeat and access your $500",
    description:
      "Every time you save $500, we give you access to it. Repeat these steps and keep your plan active to maximize impact.",
  },
];

export default function HowItWorksSection() {
  return (
    <Box bg="white" py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
      <Container maxW="screen-lg" mx="auto">
        {/* Trustpilot widget */}
        <Box
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="5419b637fa0340045cd0c936"
          data-businessunit-id="5ed186b327847a00011a0759"
          data-style-height="20px"
          data-style-width="100%"
          data-theme="light"
        />

        {/* Section heading */}
        <Box mt={8} textAlign={{ base: "left", md: "center" }}>
          <Heading
            as="h2"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="shorter"
          >
            How to build credit with a&nbsp;
            <chakra.span color="green.500">
              Sable Credit Builder Account
            </chakra.span>
          </Heading>
        </Box>

        {/* Steps */}
        <Flex
          mt={10}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 6, md: 8 }}
        >
          {steps.map((step) => (
            <Box
              key={step.number}
              w={{ base: "100%", md: "33%" }}
              textAlign="left"
            >
              <Box mb={4}>
                <Image
                  src={step.img}
                  alt={`Step ${step.number}`}
                  w="full"
                  maxW="xs"
                  mx="auto"
                />
              </Box>

              <HStack align="flex-start" spacing={4}>
                <Text
                  fontFamily="Inter, sans-serif"
                  fontWeight="900"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color="green.500"
                  flexShrink={0}
                >
                  {step.number}
                </Text>
                <VStack align="start" spacing={1}>
                  <Text
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                    fontSize={{ base: "lg", md: "xl" }}
                    color="gray.900"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontFamily="Inter, sans-serif"
                    fontWeight="400"
                    fontSize={{ base: "md", md: "lg" }}
                    color="gray.700"
                  >
                    {step.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </Flex>

        {/* thin dashed “paper” line separator */}
        <Divider
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="1px"
          my={{ base: 8, md: 12 }}
        />
      </Container>
    </Box>
  );
}
