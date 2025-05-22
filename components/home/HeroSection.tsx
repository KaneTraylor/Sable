// components/HeroSection.tsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
  useBreakpointValue,
  useToast,
  Image,
} from "@chakra-ui/react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";

const MotionDiv = motion.div;

export default function HeroSection() {
  const toast = useToast();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ status: "warning", title: "Enter a valid email" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      router.push({ pathname: "/onboarding/signup", query: { email } });
    } catch {
      toast({ status: "error", title: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      as="section"
      bg="#f9f5f1"
      w="100%"
      minH="80vh"
      py={{ base: 12, md: 20 }}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 12 }}
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        justify="space-between"
        gap={{ base: 10, md: 20 }}
      >
        {/* Left column */}
        <VStack
          align={{ base: "center", md: "start" }}
          textAlign={{ base: "center", md: "left" }}
          spacing={6}
          flex="1"
        >
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="900"
            fontSize={{ base: "2.5rem", md: "5rem" }}
            lineHeight="1.1"
            color="gray.800"
          >
            Boost your credit score
            <br />
            <Text as="span" color="green.500" fontWeight="700">
              on autopilot
            </Text>
          </Heading>

          <Text
            fontFamily="body"
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="600"
            color="gray.800"
            maxW="lg"
          >
            Credit-building micro loans rebuild your credit and a better
            financial future.
          </Text>

          <Button
            colorScheme="green"
            size="lg"
            borderRadius="full"
            px={{ base: 8, md: 10 }}
            minH={{ base: "40px", md: "56px" }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            onClick={() => router.push("/onboarding/signup")}
          >
            Start today!
          </Button>

          <Text
            as="a"
            href="#learn-more"
            fontFamily="body"
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="600"
            color="brand.500"
            _hover={{ textDecoration: "underline" }}
          >
            Learn more…
          </Text>

          <Text
            fontFamily="body"
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="600"
            color="#475C85"
            maxW="lg"
          >
            Members increased their credit score by an average of 37 points by
            regularly using Sable and practicing good money habits.
          </Text>

          <Box w={{ base: "100%", md: "450px" }}>
            <InputGroup size="lg">
              <Input
                placeholder="Enter your email"
                bg="white"
                borderRadius="full"
                boxShadow="sm"
                _placeholder={{ color: "gray.400", fontWeight: "600" }}
                pr="3rem"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fontWeight="600"
              />
              <InputRightElement width="3rem" height="100%">
                <Button
                  onClick={handleLeadSubmit}
                  isLoading={submitting}
                  bg="green.500"
                  borderRadius="full"
                  w="2.5rem"
                  h="2.5rem"
                  p={0}
                  _hover={{ bg: "green.600" }}
                >
                  <Image
                    src="/mockups/other/white-right-arrow-icon.png"
                    alt="Send"
                    boxSize="1rem"
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </VStack>

        {/* Right column */}
        <Box
          flex="1"
          display="flex"
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <MotionDiv
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Image
              src="mockups/Sable-people/Sable-hero-team.png"
              alt="Financial growth illustration"
              w={{ base: "90%", md: "100%" }}
              maxW={{ base: "400px", md: "700px" }}
              h="auto"
            />
          </MotionDiv>
        </Box>
      </Flex>
    </Box>
  );
}
