import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
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
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    <Box bg="sable.tan" minH="100vh" py={8}>
      <Container maxW="lg" mx="auto" px={4}>
        {/* Progress bar */}
        <Progress
          value={17}
          size="sm"
          colorScheme="green"
          borderRadius="full"
          mb={8}
          bg="white"
        />

        <VStack spacing={8} align="stretch">
          {/* Header with logo */}
          <VStack spacing={6} textAlign="center">
            <Image
              src="/mockups/logo/sable-logo.svg"
              alt="Sable Logo"
              width={{ base: "140px", md: "180px" }}
              height="auto"
            />

            <VStack spacing={3}>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color="sable.sage"
                fontFamily="heading"
              >
                Welcome to Sable! 👋
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.700"
                maxW="md"
                lineHeight="1.4"
              >
                Start building credit in less than 5 minutes. Join thousands
                improving their financial future.
              </Text>
            </VStack>
          </VStack>

          {/* Main form card */}
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 6, md: 8 }}
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack spacing={6}>
              {/* Localhost dummy data button */}
              {typeof window !== "undefined" &&
                window.location.hostname === "localhost" && (
                  <Box w="full">
                    <Button
                      onClick={fillDummyData}
                      variant="outline"
                      colorScheme="orange"
                      size="sm"
                      w="full"
                      borderStyle="dashed"
                    >
                      🚀 Fill with Dummy Data (Dev Only)
                    </Button>
                    <Divider my={4} />
                  </Box>
                )}

              <VStack spacing={5} w="full">
                <FormControl isInvalid={touched.email && !isEmailValid}>
                  <FormLabel color="gray.700" fontWeight="600">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, email: true }))
                    }
                    size="lg"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{
                      borderColor: "sable.sage",
                      boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
                    }}
                    bg="gray.50"
                  />
                  {!isEmailValid && touched.email && (
                    <FormErrorMessage>
                      Enter a valid email address.
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.password && !isPasswordValid}>
                  <FormLabel color="gray.700" fontWeight="600">
                    Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="8+ characters, 1 number"
                      value={formData.password}
                      onChange={(e) => onChange("password", e.target.value)}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, password: true }))
                      }
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{
                        borderColor: "sable.sage",
                        boxShadow: "0 0 0 1px var(--chakra-colors-green-500)",
                      }}
                      bg="gray.50"
                      pr="3rem"
                    />
                    <InputRightElement width="3rem" height="100%">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        color="gray.500"
                        _hover={{ color: "gray.700" }}
                      />
                    </InputRightElement>
                  </InputGroup>

                  {touched.password && !isPasswordValid && (
                    <FormErrorMessage>
                      Password must be at least 8 characters with a number and
                      letter.
                    </FormErrorMessage>
                  )}

                  {/* Password strength indicator */}
                  {formData.password && (
                    <VStack spacing={2} mt={3} align="stretch">
                      <Box>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="xs" color="gray.600">
                            Password strength
                          </Text>
                          <Text
                            fontSize="xs"
                            color={strengthColor}
                            fontWeight="600"
                          >
                            {strengthLabel}
                          </Text>
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
                      </Box>
                    </VStack>
                  )}
                </FormControl>

                {/* Terms agreement */}
                <FormControl>
                  <Checkbox
                    isChecked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    size="md"
                    colorScheme="green"
                    borderRadius="md"
                  >
                    <Text fontSize="sm" ml={2} color="gray.700">
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
                        Terms of Use
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
                      .
                    </Text>
                  </Checkbox>
                </FormControl>

                {/* Submit button */}
                <Button
                  colorScheme="green"
                  size="lg"
                  w="full"
                  h="56px"
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="700"
                  onClick={handleContinue}
                  isDisabled={!isFormValid || loading}
                  isLoading={loading}
                  loadingText="Creating account..."
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s ease"
                >
                  Create Account & Continue →
                </Button>

                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Next: Choose your plan and set up credit monitoring
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Footer links */}
          <VStack spacing={4} textAlign="center">
            <Text fontSize="sm" color="gray.600">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                color="sable.sage"
                textDecoration="underline"
                fontWeight="600"
              >
                Sign in here
              </Link>
            </Text>
            <Text fontSize="sm" color="gray.600">
              Need help?{" "}
              <Link
                color="sable.sage"
                textDecoration="underline"
                fontWeight="600"
              >
                Contact support
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
