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
  Link,
  Progress,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
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
        setTimeout(() => router.push("/auth/signin"), 5000);
        return;
      }

      if (!res.ok || !data.formData?.userId) {
        throw new Error(data.error || "Signup failed");
      }

      onNext(data.currentStep, {
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
    <Container maxW="md" mx="auto" px={4} py={0}>
      <Progress
        value={17}
        size="xs"
        colorScheme="green"
        borderRadius="full"
        mb={4}
      />

      <Center mb={1}>
        <Image
          src="/mockups/logo/Sablerework.png"
          alt="Sable Logo"
          width={{ base: "120px", md: "160px" }}
          height="auto"
        />
      </Center>

      <Box textAlign="center" mb={1}>
        <Heading fontSize="3xl" fontWeight="400" color="green.500" mb={1}>
          Let’s go!
        </Heading>
        <Heading fontSize="3xl" fontWeight="400" color="gray.800">
          Start building credit in less than 5 minutes.
        </Heading>
      </Box>

      <VStack spacing={4} mt={4}>
        <FormControl isInvalid={touched.email && !isEmailValid}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />
          {!isEmailValid && touched.email && (
            <FormErrorMessage>Enter a valid email address.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={touched.password && !isPasswordValid}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="8+ characters, 1 number"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          />
          {touched.password && !isPasswordValid && (
            <FormErrorMessage>
              Password must be at least 8 characters with a number and letter.
            </FormErrorMessage>
          )}

          {formData.password && (
            <Box pt={2}>
              <Box
                h="8px"
                borderRadius="full"
                bg="gray.200"
                overflow="hidden"
                w="full"
                mb={1}
              >
                <Box
                  h="8px"
                  borderRadius="full"
                  bg={strengthColor}
                  width={`${strengthPercent * 100}%`}
                  transition="width 0.4s ease"
                />
              </Box>
              <Text
                key={strengthEmoji}
                fontSize="sm"
                fontWeight="medium"
                color={strengthColor}
                transition="all 0.2s ease"
              >
                {strengthEmoji} {strengthLabel}
              </Text>
            </Box>
          )}
        </FormControl>

        <Checkbox
          isChecked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          size="md"
          colorScheme="green"
        >
          <Text fontSize="sm" ml={2}>
            I agree to Sable’s{" "}
            <Link
              href="/privacy-policy"
              color="green.500"
              textDecoration="underline"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link href="/terms" color="green.500" textDecoration="underline">
              Terms of Use
            </Link>
            , and{" "}
            <Link href="/e-sign" color="green.500" textDecoration="underline">
              E-Sign Consent
            </Link>
            .
          </Text>
        </Checkbox>

        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          rounded="lg"
          size="lg"
          w="full"
          maxW="xs"
          h="14"
          onClick={handleContinue}
          isDisabled={!isFormValid || loading}
          isLoading={loading}
        >
          Create account & continue →
        </Button>

        <Text fontSize="xs" color="gray.500" pt={2}>
          Next: Choose your plan and verify your credit securely.
        </Text>

        <VStack spacing={2} pt={4}>
          <Text fontSize="sm">
            Already have an account?{" "}
            <Link href="/login" color="green.500" textDecoration="underline">
              Log in
            </Link>
            .
          </Text>
          <Text fontSize="sm">
            Need help?{" "}
            <Link color="green.500" textDecoration="underline">
              Get in touch
            </Link>
            .
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
}
