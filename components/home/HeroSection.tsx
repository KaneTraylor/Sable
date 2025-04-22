// components/HeroSection.tsx
import React from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box
      bg="rgba(248,244,240,1)"
      pb={{ base: 12, md: 16 }}
      px={{ base: 6, md: 10 }}
    >
      <Flex
        maxW="1024px"
        mx="auto"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
      >
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "3rem", xl: "4rem" }}
            lineHeight="1.1"
            mb={4}
          >
            Build credit, grow savings,{" "}
            <Text as="span" color="green.500">
              and achieve your goals.
            </Text>
          </Heading>

          <Text fontFamily="body" fontSize={{ base: "md", xl: "lg" }} mb={6}>
            Instantly access smarter financial tools—no hidden fees, no stress.
          </Text>

          <Button
            size="lg"
            bg="green.500"
            color="white"
            fontFamily="heading"
            letterSpacing="0.5px"
            _hover={{ bg: "green.700" }}
            onClick={() => router.push("/onboarding/signup")}
          >
            Get Started
          </Button>
        </Box>

        <Box flex="1">
          <Image
            src="/mockups/sable-difference/savings-party.png"
            alt="Financial growth illustration"
            w="100%"
            h="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
}
