// pages/auth/signin.tsx - Modern Full-Width Design
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Divider,
  SimpleGrid,
  Badge,
  Image,
  Card,
  CardBody,
  useToast,
  Alert,
  AlertIcon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length >= 1; // Just check if not empty for signin
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account",
          status: "success",
          duration: 3000,
        });
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        toast({
          title: "Sign in failed",
          description: "Please check your credentials and try again",
          status: "error",
          duration: 4000,
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isFormValid && !loading) {
      handleLogin();
    }
  };

  return (
    <Box minH="100vh" w="100vw" position="relative">
      {/* Full-Screen Background */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(135deg, #f8f4f0 0%, #faf7f3 50%, #f7f6f3 100%)"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #37a169 0%, transparent 70%),
            radial-gradient(circle at 80% 20%, #e39d49 0%, transparent 70%),
            radial-gradient(circle at 40% 80%, #37a169 0%, transparent 70%)
          `,
          backgroundSize: "100% 100%",
          animation: "float 20s ease-in-out infinite",
        }}
      />

      {/* Floating Elements */}
      <Box
        position="absolute"
        top="15%"
        right="10%"
        w="120px"
        h="120px"
        bg="rgba(55, 161, 105, 0.1)"
        borderRadius="full"
        animation="float 18s ease-in-out infinite"
        display={{ base: "none", md: "block" }}
      />
      <Box
        position="absolute"
        bottom="25%"
        left="8%"
        w="90px"
        h="90px"
        bg="rgba(227, 157, 73, 0.1)"
        borderRadius="full"
        animation="float 22s ease-in-out infinite reverse"
        display={{ base: "none", md: "block" }}
      />

      {/* Desktop Layout */}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        minH="100vh"
        spacing={0}
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        position="relative"
        zIndex={1}
      >
        {/* Left Side - Branding & Welcome Back */}
        <Box
          bg="linear-gradient(135deg, #37a169 0%, #2f855a 100%)"
          color="white"
          p={{ base: 8, md: 12, lg: 16 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          position="relative"
          overflow="hidden"
        >
          {/* Background Pattern */}
          <Box
            position="absolute"
            inset={0}
            backgroundImage={`
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 70%)
            `}
          />

          {/* Logo */}
          <Box position="relative" zIndex={1} mb={8}>
            <Image
              src="/mockups/logo/sable-logo-light.svg"
              alt="Sable Credit"
              height={{ base: "60px", md: "80px" }}
              mb={6}
            />
          </Box>

          {/* Welcome Content */}
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
                Welcome back to{" "}
                <Text as="span" color="yellow.300">
                  Sable
                </Text>
              </Heading>

              {/* Welcome Back Image */}
              <Box
                maxW={{ base: "280px", md: "320px", lg: "360px" }}
                position="relative"
                alignSelf="center"
              >
                <Image
                  src="/mockups/Sable-people/Sable-signin.png"
                  alt="Welcome back to Sable"
                  width="100%"
                  height="auto"
                  borderRadius="16px"
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.02)",
                  }}
                />
              </Box>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                opacity={0.9}
                lineHeight={1.6}
              >
                Continue your credit journey and check your latest score
                improvements.
              </Text>
            </VStack>

            {/* Quick Stats */}
            <VStack align="start" spacing={4} pt={4}>
              <HStack spacing={4}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
                    50K+
                  </Text>
                  <Text fontSize="sm" opacity={0.8}>
                    Active Members
                  </Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
                    24/7
                  </Text>
                  <Text fontSize="sm" opacity={0.8}>
                    Credit Monitoring
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
                  🔒 Secure Login
                </Badge>
                <Badge
                  bg="whiteAlpha.200"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  ⚡ Instant Access
                </Badge>
              </HStack>
            </VStack>
          </VStack>
        </Box>

        {/* Right Side - Sign In Form */}
        <Box
          p={{ base: 6, md: 8, lg: 12 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bg="white"
          position="relative"
        >
          {/* Form Content */}
          <VStack spacing={8} align="stretch" maxW="md" mx="auto" w="full">
            {/* Header */}
            <VStack spacing={3} textAlign="center">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                color="gray.900"
              >
                Sign In
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                maxW="sm"
              >
                Access your credit dashboard and continue building your score
              </Text>
            </VStack>

            {/* Error Alert */}
            {error && (
              <Alert status="error" borderRadius="12px">
                <AlertIcon />
                <Text fontSize="sm">{error}</Text>
              </Alert>
            )}

            {/* Sign In Form */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  onKeyPress={handleKeyPress}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                    onKeyPress={handleKeyPress}
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
                {!isPasswordValid && touched.password && (
                  <FormErrorMessage mt={2}>
                    Password is required
                  </FormErrorMessage>
                )}
              </FormControl>
            </VStack>

            {/* Forgot Password Link */}
            <Flex justify="flex-end">
              <Link
                href="/auth/forgot-password"
                color="sable.sage"
                fontSize="sm"
                fontWeight="600"
                _hover={{ textDecoration: "underline" }}
              >
                Forgot your password?
              </Link>
            </Flex>

            {/* Sign In Button */}
            <Button
              colorScheme="green"
              size="lg"
              w="full"
              h="56px"
              borderRadius="16px"
              fontSize="lg"
              fontWeight="700"
              onClick={handleLogin}
              isDisabled={!isFormValid || loading}
              isLoading={loading}
              loadingText="Signing in..."
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
              Sign In to Dashboard →
            </Button>

            {/* Help Text */}
            <VStack spacing={3} textAlign="center">
              <Divider />

              <Text fontSize="sm" color="gray.600">
                Don't have an account?{" "}
                <Link
                  href="/onboarding/signup"
                  color="sable.sage"
                  fontWeight="600"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create one here
                </Link>
              </Text>

              <Text fontSize="xs" color="gray.500">
                Need help? Contact our{" "}
                <Link
                  href="/support"
                  color="sable.sage"
                  fontWeight="600"
                  _hover={{ textDecoration: "underline" }}
                >
                  support team
                </Link>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-3deg);
          }
        }
      `}</style>
    </Box>
  );
}
