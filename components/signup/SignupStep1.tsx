// components/signup/SignupStep1.tsx - Modern Full-Width Design
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Progress,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  useToast,
  IconButton,
  Divider,
  SimpleGrid,
  Badge,
  Flex,
  Spacer,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { usePasswordStrength } from "@/lib/hooks/usePasswordStrength";

interface SignupStep1Props {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: (step: number, data?: any) => void;
}

export default function SignupStep1({
  formData,
  onChange,
  onNext,
}: SignupStep1Props) {
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const { strengthColor, strengthEmoji, strengthLabel, strengthPercent } =
    usePasswordStrength(formData.password);

  const isEmailValid =
    formData.email.includes("@") && formData.email.includes(".");
  const isPasswordValid =
    formData.password.length >= 8 &&
    /\d/.test(formData.password) &&
    /[A-Za-z]/.test(formData.password);

  const isFormValid = isEmailValid && isPasswordValid && agree;

  // Dummy data function for localhost
  const fillDummyData = () => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      onChange("email", "demo@sable.com");
      onChange("password", "password123");
      setAgree(true);
      setTouched({ email: true, password: true });
      toast({
        title: "Dummy data filled!",
        description: "Ready to continue with demo account",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/signup/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const text = await res.text();
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {}
      }

      if (res.status === 409 && data.error === "FULL_ACCOUNT_EXISTS") {
        toast({
          status: "info",
          title: "Account already exists",
          description: "Redirecting to sign in…",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => router.push("/auth/signin"), 2000);
        return;
      }

      if (!res.ok || !data.formData?.userId) {
        throw new Error(data.error || "Signup failed");
      }

      onNext(2, {
        email: formData.email,
        password: formData.password,
        userId: data.formData.userId,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Signup failed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" w="100vw" position="relative">
      {/* Desktop Layout */}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        minH="100vh"
        spacing={0}
        templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }}
      >
        {/* Left Side - Branding & Information */}
        <Box
          bg="linear-gradient(135deg, #37a169 0%, #2f855a 100%)"
          color="white"
          p={{ base: 8, md: 12, lg: 16 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 70%)
            `,
          }}
        >
          {/* Logo */}
          <Box position="relative" zIndex={1} mb={8}>
            <Image
              src="/mockups/logo/sable-logo-light.svg"
              alt="Sable Credit"
              height={{ base: "60px", md: "80px" }}
              mb={6}
            />
          </Box>

          {/* Hero Left sleepy boy style */}
          <VStack
            align="start"
            spacing={6}
            position="relative"
            zIndex={1}
            maxW="lg"
          >
            <VStack align="start" spacing={6}>
              <Heading
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="900"
                lineHeight={1.1}
                letterSpacing="-0.02em"
              >
                Build credit while you{" "}
                <Text as="span" color="yellow.300">
                  sleep
                </Text>
              </Heading>

              {/* Credit Sleep Image */}
              <Box
                maxW={{ base: "200px", md: "220px", lg: "260px" }}
                position="relative"
                alignSelf="center"
              >
                <Image
                  src="/mockups/Sable-people/Credit-sleep.png"
                  alt="Build credit while you sleep"
                  width="100%"
                  height="auto"
                  borderRadius="16px"
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.02)",
                  }}
                />
                {/* Subtle glow effect */}
                <Box
                  position="absolute"
                  inset="-2px"
                  bg="linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))"
                  borderRadius="18px"
                  zIndex={-1}
                  opacity={0.5}
                />
              </Box>
              {/* END OF IMAGE SECTION */}

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                opacity={0.9}
                lineHeight={1.6}
              >
                Join thousands who've improved their credit scores by an average
                of 37 points with our automated credit-building system.
              </Text>
            </VStack>

            {/* Social Proof */}
            <VStack align="start" spacing={4} pt={4}>
              <HStack spacing={4}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
                    37+
                  </Text>
                  <Text fontSize="sm" opacity={0.8}>
                    Avg. Score Increase
                  </Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
                    50K+
                  </Text>
                  <Text fontSize="sm" opacity={0.8}>
                    Happy Members
                  </Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
                    98%
                  </Text>
                  <Text fontSize="sm" opacity={0.8}>
                    Success Rate
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={2}>
                <Badge
                  bg="whiteAlpha.200"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  ⭐ 4.9/5 Rating
                </Badge>
                <Badge
                  bg="whiteAlpha.200"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  🔒 Bank-Level Security
                </Badge>
              </HStack>
            </VStack>
          </VStack>

          {/* Background Decoration */}
          <Box
            position="absolute"
            bottom="-50px"
            right="-50px"
            w="200px"
            h="200px"
            bg="whiteAlpha.100"
            borderRadius="full"
            display={{ base: "none", lg: "block" }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          p={{ base: 6, md: 8, lg: 12 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bg="white"
          position="relative"
        >
          {/* Progress Indicator */}
          <Box mb={8}>
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Step 1 of 6
              </Text>
              <Text fontSize="sm" color="gray.500">
                Account Setup
              </Text>
            </Flex>
            <Progress
              value={16.67}
              size="sm"
              colorScheme="green"
              borderRadius="full"
              bg="gray.100"
            />
          </Box>

          {/* Form Content */}
          <VStack spacing={8} align="stretch" maxW="md" mx="auto" w="full">
            {/* Header */}
            <VStack spacing={3} textAlign="center">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                color="gray.900"
              >
                Create Your Account
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="sm"
              >
                Start your credit journey in less than 5 minutes
              </Text>
            </VStack>

            {/* Dev Tools */}
            {typeof window !== "undefined" &&
              window.location.hostname === "localhost" && (
                <Card bg="orange.50" borderColor="orange.200" borderWidth="1px">
                  <CardBody p={4}>
                    <Button
                      onClick={fillDummyData}
                      variant="outline"
                      colorScheme="orange"
                      size="sm"
                      w="full"
                      borderStyle="dashed"
                    >
                      🚀 Fill Demo Data (Dev Only)
                    </Button>
                  </CardBody>
                </Card>
              )}

            {/* Form Fields */}
            <VStack spacing={6}>
              <FormControl isInvalid={touched.email && !isEmailValid}>
                <FormLabel
                  color="gray.700"
                  fontWeight="600"
                  fontSize="sm"
                  mb={3}
                >
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  size="lg"
                  borderRadius="16px"
                  border="2px solid"
                  borderColor="gray.200"
                  bg="gray.50"
                  _hover={{
                    borderColor: "gray.300",
                    bg: "white",
                  }}
                  _focus={{
                    borderColor: "sable.sage",
                    boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
                    bg: "white",
                  }}
                  fontSize="md"
                />
                {!isEmailValid && touched.email && (
                  <FormErrorMessage mt={2}>
                    Please enter a valid email address
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={touched.password && !isPasswordValid}>
                <FormLabel
                  color="gray.700"
                  fontWeight="600"
                  fontSize="sm"
                  mb={3}
                >
                  Password
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters with 1 number"
                    value={formData.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                    borderRadius="16px"
                    border="2px solid"
                    borderColor="gray.200"
                    bg="gray.50"
                    _hover={{
                      borderColor: "gray.300",
                      bg: "white",
                    }}
                    _focus={{
                      borderColor: "sable.sage",
                      boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
                      bg: "white",
                    }}
                    pr="4rem"
                    fontSize="md"
                  />
                  <InputRightElement width="4rem" height="100%">
                    <IconButton
                      h="2rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      color="gray.500"
                      _hover={{ color: "gray.700", bg: "gray.100" }}
                      borderRadius="12px"
                    />
                  </InputRightElement>
                </InputGroup>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <VStack spacing={3} mt={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xs" color="gray.600">
                        Password strength
                      </Text>
                      <HStack spacing={2}>
                        <Text fontSize="xs">{strengthEmoji}</Text>
                        <Text
                          fontSize="xs"
                          color={strengthColor}
                          fontWeight="600"
                        >
                          {strengthLabel}
                        </Text>
                      </HStack>
                    </HStack>
                    <Box
                      h="6px"
                      borderRadius="full"
                      bg="gray.200"
                      overflow="hidden"
                    >
                      <Box
                        h="6px"
                        borderRadius="full"
                        bg={strengthColor}
                        width={`${strengthPercent * 100}%`}
                        transition="all 0.3s ease"
                      />
                    </Box>
                  </VStack>
                )}

                {touched.password && !isPasswordValid && (
                  <FormErrorMessage mt={2}>
                    Password must be at least 8 characters with a number and
                    letter
                  </FormErrorMessage>
                )}
              </FormControl>
            </VStack>

            {/* Terms Agreement */}
            <FormControl>
              <Checkbox
                isChecked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                size="md"
                colorScheme="green"
                borderRadius="8px"
              >
                <Text fontSize="sm" ml={2} color="gray.700" lineHeight={1.5}>
                  I agree to Sable's{" "}
                  <Link
                    href="/privacy-policy"
                    color="sable.sage"
                    textDecoration="underline"
                    fontWeight="600"
                  >
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link
                    href="/terms"
                    color="sable.sage"
                    textDecoration="underline"
                    fontWeight="600"
                  >
                    Terms of Service
                  </Link>
                  , and{" "}
                  <Link
                    href="/e-sign"
                    color="sable.sage"
                    textDecoration="underline"
                    fontWeight="600"
                  >
                    E-Sign Consent
                  </Link>
                </Text>
              </Checkbox>
            </FormControl>

            {/* Submit Button */}
            <Button
              colorScheme="green"
              size="lg"
              w="full"
              h="56px"
              borderRadius="16px"
              fontSize="lg"
              fontWeight="700"
              onClick={handleContinue}
              isDisabled={!isFormValid || loading}
              isLoading={loading}
              loadingText="Creating account..."
              bg="sable.sage"
              _hover={{
                bg: "sable.forest",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(55, 161, 105, 0.4)",
              }}
              _active={{
                transform: "translateY(0)",
                bg: "green.700",
              }}
              transition="all 0.2s cubic-bezier(0.08, 0.52, 0.52, 1)"
            >
              Create Account & Continue →
            </Button>

            {/* Help Text */}
            <VStack spacing={3} textAlign="center">
              <Text fontSize="xs" color="gray.500">
                Next: Choose your plan and personalize your experience
              </Text>

              <Divider />

              <Text fontSize="sm" color="gray.600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  color="sable.sage"
                  fontWeight="600"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign in here
                </Link>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
