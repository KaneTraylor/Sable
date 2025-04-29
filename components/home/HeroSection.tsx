// components/HeroSection.tsx
import React from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();

  return (
    <Box bg="#F8F4F0" py={{ base: 8, md: 12 }} px={{ base: 4, md: 10 }}>
      <Flex
        maxW="1024px"
        mx="auto"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
      >
        {/* Text */}
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h1"
            fontFamily="Inter, sans-serif"
            fontWeight={900}
            fontSize={{ base: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" }}
            lineHeight={1.1}
            color="gray.900"
            mb={4}
          >
            Build credit, grow{" "}
            <Text as="span" color="#35A61A">
              savings
            </Text>
            ,<br />
            and achieve your goals.
          </Heading>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.700" mb={6}>
            Instantly access smarter financial tools—no hidden fees, no stress.
          </Text>

          <Button
            onClick={() => router.push("/onboarding/signup")}
            fontFamily="Inter, sans-serif"
            fontWeight={700}
            fontSize={{ base: "1.125rem", md: "1.25rem" }}
            bg="#35A61A"
            color="white"
            height={{ base: "3.5rem", md: "4rem" }}
            px={{ base: 8, md: 10 }}
            _hover={{ bg: "#2E8D16" }}
          >
            Get Started
          </Button>
        </Box>

        {/* Illustration */}
        <Box flex="1" textAlign="center">
          <Image
            src="/mockups/sable-difference/savings-party.png"
            alt="Financial growth illustration"
            maxW={{ base: "70%", md: "100%" }}
            mx="auto"
            h="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
}
