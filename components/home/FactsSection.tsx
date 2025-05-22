// components/FactsSection.tsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Image,
  VStack,
  Stack,
  chakra,
} from "@chakra-ui/react";

export default function FactsSection() {
  const stats = [
    { number: "47%", label: "of Americans have poor or no credit.²" },
    { number: "57%", label: "have less than $1,000 in a savings account.³" },
  ];

  return (
    <Box bg="white" py={{ base: 8, md: 12 }} px={{ base: 4, md: 10 }}>
      <Container maxW="6xl" textAlign="center">
        {/* Sable mark + “The Facts” subheading */}
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
            The Facts
          </Text>
        </Stack>

        {/* Main Heading */}
        <Heading
          as="h2"
          fontWeight="900"
          fontSize={{ base: "1.875rem", md: "3.5rem", lg: "4rem" }}
          lineHeight={{ base: "1.4", md: "1.2" }}
          mb={{ base: 4, md: 6 }}
        >
          The average person is set up to{" "}
          <chakra.span color="green.500" fontFamily="heading">
            fail at money.
          </chakra.span>
        </Heading>

        {/* Subhead */}
        <Text
          fontWeight="600"
          fontSize={{ base: "md", md: "lg" }}
          color="gray.700"
          maxW="3xl"
          mx="auto"
          mb={{ base: 6, md: 10 }}
          lineHeight="1.5"
        >
          If you struggle to save and build credit, the problem isn’t with you{" "}
          <chakra.span fontWeight="400">
            — it’s with the system that’s been set up to profit when people
            fail.
          </chakra.span>
        </Text>

        {/* Stats & Illustration */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={{ base: 6, md: 8 }}
        >
          {/* Stats */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 6, md: 12 }}
            align="center"
            justify="center"
          >
            {stats.map(({ number, label }) => (
              <VStack key={number} spacing={1}>
                <Text
                  fontWeight="900"
                  fontSize={{ base: "4rem", md: "5rem" }}
                  lineHeight="1"
                  color="green.500"
                >
                  {number}
                </Text>
                <Text
                  fontWeight="300"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  color="gray.500"
                  textAlign="center"
                  maxW="xs"
                >
                  {label}
                </Text>
              </VStack>
            ))}
          </Stack>

          {/* Illustration */}
          <Box>
            <Image
              src="mockups/Sable-people/Sable-and-friends.png"
              alt="Sable and friends illustration"
              boxSize={{ base: "300px", md: "500px", lg: "650px" }}
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
