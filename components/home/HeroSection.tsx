// components/HeroSection.tsx
import React, { useState, useEffect } from "react";
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
  HStack,
  useBreakpointValue,
  useToast,
  Image,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import { ArrowRight, Star, Shield, TrendingUp } from "lucide-react";
import { keyframes } from "@emotion/react";

const MotionDiv = motion.div;
const MotionBox = motion(Box);

// Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Pulse animation for CTA
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); }
  100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
`;

export default function HeroSection() {
  const toast = useToast();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleLeadSubmit = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        status: "warning",
        title: "Please enter a valid email",
        duration: 3000,
        isClosable: true,
      });
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

      // Success feedback
      toast({
        status: "success",
        title: "Welcome aboard! 🎉",
        description: "Redirecting you to signup...",
        duration: 2000,
      });

      setTimeout(() => {
        router.push({ pathname: "/onboarding/signup", query: { email } });
      }, 1000);
    } catch {
      toast({
        status: "error",
        title: "Something went wrong",
        description: "Please try again later.",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLeadSubmit();
    }
  };

  return (
    <Box
      as="section"
      bg="linear-gradient(135deg, #f9f5f1 0%, #f8f4f0 100%)"
      w="100%"
      minH={{ base: "auto", md: "80vh" }}
      py={{ base: 6, md: 8 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="400px"
        h="400px"
        bg="rgba(72, 187, 120, 0.05)"
        borderRadius="full"
        filter="blur(100px)"
        display={{ base: "none", lg: "block" }}
      />

      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 12 }}
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "center" }}
        justify="space-between"
        gap={{ base: 6, md: 12 }}
        minH={{ base: "auto", md: "60vh" }}
      >
        {/* Left column */}
        <VStack
          align={{ base: "center", md: "start" }}
          textAlign={{ base: "center", md: "left" }}
          spacing={{ base: 3, md: 4 }}
          flex="1"
          maxW={{ base: "100%", md: "600px" }}
        >
          {/* Trust badges */}
          <HStack spacing={4} mb={1} display={{ base: "none", md: "flex" }}>
            <Badge
              colorScheme="green"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              <HStack spacing={1}>
                <Shield size={12} />
                <Text>Bank-Level Security</Text>
              </HStack>
            </Badge>
            <Badge
              colorScheme="orange"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              <HStack spacing={1}>
                <Star size={12} />
                <Text>50,000+ Happy Members</Text>
              </HStack>
            </Badge>
          </HStack>

          {/* Main heading with tighter spacing */}
          <VStack
            spacing={{ base: 1, md: 2 }}
            align={{ base: "center", md: "start" }}
            w="full"
          >
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="900"
              fontSize={{
                base: "2rem",
                sm: "2.5rem",
                md: "3.5rem",
                lg: "4.5rem",
              }}
              lineHeight="1.05"
              color="gray.800"
              letterSpacing="-0.02em"
            >
              Boost your credit score
              <br />
              <Text as="span" color="green.500" fontWeight="900">
                on autopilot
              </Text>
            </Heading>

            <Text
              fontFamily="body"
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight="500"
              color="gray.700"
              maxW={{ base: "90%", md: "lg" }}
              lineHeight="1.3"
            >
              Join 50,000+ members building better credit with automated
              micro-loans and expert guidance. No credit check required.
            </Text>
          </VStack>

          {/* Social proof */}
          <HStack spacing={{ base: 6, md: 8 }} py={2}>
            <VStack spacing={0} align={{ base: "center", md: "start" }}>
              <HStack spacing={1}>
                <TrendingUp size={18} color="var(--chakra-colors-green-500)" />
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  color="green.600"
                >
                  +37
                </Text>
              </HStack>
              <Text fontSize={{ base: "xs", md: "xs" }} color="gray.600">
                Avg. score increase
              </Text>
            </VStack>
            <VStack spacing={0} align={{ base: "center", md: "start" }}>
              <HStack spacing={1}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="var(--chakra-colors-orange-400)"
                    color="var(--chakra-colors-orange-400)"
                  />
                ))}
              </HStack>
              <Text fontSize={{ base: "xs", md: "xs" }} color="gray.600">
                4.9/5 from 12,000+ reviews
              </Text>
            </VStack>
          </HStack>

          {/* Primary CTA with email capture */}
          <VStack spacing={3} w={{ base: "100%", md: "450px" }} pt={1}>
            <Box
              w="full"
              position="relative"
              transform={emailFocused ? "scale(1.02)" : "scale(1)"}
              transition="transform 0.2s ease"
            >
              <InputGroup size={{ base: "md", md: "lg" }}>
                <Input
                  placeholder="Enter your email to get started"
                  bg="white"
                  borderRadius="full"
                  boxShadow={
                    emailFocused ? "0 8px 30px rgba(0,0,0,0.12)" : "md"
                  }
                  border="2px solid"
                  borderColor={emailFocused ? "green.400" : "transparent"}
                  _placeholder={{
                    color: "gray.500",
                    fontSize: { base: "sm", md: "md" },
                  }}
                  _hover={{ boxShadow: "lg" }}
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                  pr="4rem"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onKeyPress={handleKeyPress}
                  fontSize={{ base: "sm", md: "md" }}
                  h={{ base: "45px", md: "55px" }}
                />
                <InputRightElement width="4rem" height="100%">
                  <Button
                    onClick={handleLeadSubmit}
                    isLoading={submitting}
                    bg="green.500"
                    color="white"
                    borderRadius="full"
                    w={{ base: "40px", md: "50px" }}
                    h={{ base: "40px", md: "50px" }}
                    p={0}
                    _hover={{ bg: "green.600", transform: "scale(1.05)" }}
                    _active={{ transform: "scale(0.95)" }}
                    transition="all 0.2s ease"
                    animation={`${pulse} 2s infinite`}
                  >
                    <ArrowRight size={18} />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="gray.600"
              textAlign="center"
            >
              🔒 No credit check • Free to start • Cancel anytime
            </Text>
          </VStack>

          {/* Secondary CTA */}
          <HStack spacing={3} pt={1}>
            <Button
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              color="gray.700"
              fontWeight="600"
              _hover={{ bg: "gray.100" }}
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
            </Button>
            <Text color="gray.400" display={{ base: "none", md: "block" }}>
              |
            </Text>
            <Button
              variant="link"
              size={{ base: "sm", md: "md" }}
              color="green.600"
              fontWeight="600"
              rightIcon={<ArrowRight size={14} />}
              onClick={() => router.push("/auth/signin")}
            >
              Already a member?
            </Button>
          </HStack>

          {/* Mobile trust badges */}
          <HStack spacing={3} mt={2} display={{ base: "flex", md: "none" }}>
            <Badge
              colorScheme="green"
              variant="subtle"
              px={2}
              py={1}
              fontSize="xs"
            >
              <Shield size={12} /> Secure
            </Badge>
            <Badge
              colorScheme="orange"
              variant="subtle"
              px={2}
              py={1}
              fontSize="xs"
            >
              <Star size={12} /> 50K+ Members
            </Badge>
          </HStack>
        </VStack>

        {/* Right column - Hero image */}
        <Box
          flex="1"
          display="flex"
          justifyContent={{ base: "center", md: "flex-end" }}
          alignItems="center"
          position="relative"
        >
          <MotionDiv
            style={{ y }}
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <Box position="relative">
              <Image
                src="mockups/Sable-people/Sable-hero-team.png"
                alt="Happy Sable members building credit together"
                w={{ base: "100%", md: "100%" }}
                maxW={{ base: "300px", md: "450px", lg: "550px" }}
                h="auto"
                loading="eager"
                animation={`${float} 6s ease-in-out infinite`}
              />

              {/* Floating achievement badges */}
              <MotionBox
                position="absolute"
                top={{ base: "-5px", md: "-10px" }}
                right={{ base: "-5px", md: "-10px" }}
                bg="white"
                p={{ base: 2, md: 3 }}
                borderRadius="xl"
                boxShadow="lg"
                display={{ base: "none", lg: "block" }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <HStack spacing={2}>
                  <Box bg="green.100" p={1.5} borderRadius="full">
                    <TrendingUp
                      size={16}
                      color="var(--chakra-colors-green-600)"
                    />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" fontWeight="bold" color="gray.800">
                      Score +52
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      This month
                    </Text>
                  </VStack>
                </HStack>
              </MotionBox>

              <MotionBox
                position="absolute"
                bottom={{ base: "20px", md: "30px" }}
                left={{ base: "-5px", md: "-20px" }}
                bg="white"
                p={{ base: 2, md: 3 }}
                borderRadius="xl"
                boxShadow="lg"
                display={{ base: "none", lg: "block" }}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <HStack spacing={2}>
                  <Box bg="orange.100" p={1.5} borderRadius="full">
                    <Star
                      size={16}
                      fill="var(--chakra-colors-orange-500)"
                      color="var(--chakra-colors-orange-500)"
                    />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="xs" fontWeight="bold" color="gray.800">
                      Verified
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      5-star member
                    </Text>
                  </VStack>
                </HStack>
              </MotionBox>
            </Box>
          </MotionDiv>
        </Box>
      </Flex>
    </Box>
  );
}
