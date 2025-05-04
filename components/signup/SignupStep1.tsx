// components/signup/SignupStep1.tsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Center,
  Image,
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Text,
  Link,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SignupStep1Props {
  formData: {
    firstName: string;
    lastName: string;
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
  const [isClient, setIsClient] = useState(false);
  const [agree, setAgree] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContinue = async () => {
    if (!agree) {
      toast({
        title: "Consent required",
        description: "Please agree to the policies to continue.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
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

      // read raw text and guard against empty or invalid JSON
      const text = await res.text();
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          // invalid JSON; data remains {}
        }
      }

      // handle full-account exists case
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

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }
      if (!data.formData?.userId) {
        throw new Error("Missing userId");
      }

      onNext(data.currentStep, {
        ...formData,
        userId: data.formData.userId,
        password: formData.password,
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

  const handleDummy = async () => {
    const dummy = {
      email: `user${Date.now()}@devmail.com`,
      password: "TestPass123!",
      firstName: "Dev",
      lastName: "User",
    };
    try {
      const res = await fetch("/api/signup/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: dummy.email, password: dummy.password }),
      });

      const text = await res.text();
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {}
      }

      if (!res.ok || !data.formData?.userId) throw new Error();

      onNext(data.currentStep, {
        ...dummy,
        userId: data.formData.userId,
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not create dummy account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" mx="auto" px={4} py={0}>
      <Center mb={1}>
        <Image
          src="/mockups/logo/Sablerework.png"
          alt="Sable Logo"
          width={{ base: "120px", md: "160px" }}
          height="auto"
        />
      </Center>

      <Box textAlign="center" mb={1}>
        <Heading
          as="h3"
          fontFamily="Franklin Gothic, sans-serif"
          fontWeight="400"
          fontSize="3xl"
          color="green.500"
          mb={1}
        >
          Let's go!
        </Heading>
        <Heading
          as="h3"
          fontFamily="Franklin Gothic, sans-serif"
          fontWeight="400"
          fontSize="3xl"
          color="gray.800"
        >
          Start building credit in less than 5 minutes.
        </Heading>
      </Box>

      <VStack spacing={4} mt={4}>
        {[
          { label: "First Name", field: "firstName", type: "text" },
          { label: "Last Name", field: "lastName", type: "text" },
          { label: "Email", field: "email", type: "email" },
          { label: "Password", field: "password", type: "password" },
        ].map(({ label, field, type }) => (
          <Box
            key={field}
            w="full"
            rounded="xl"
            border="2px solid"
            borderColor="gray.200"
            px={5}
            py={3}
            cursor="text"
            _focusWithin={{
              borderColor: "green.500",
              boxShadow: "0 0 0 1px rgba(53,166,26,0.8)",
            }}
          >
            <FormControl>
              <FormLabel mb={1}>{label}</FormLabel>
              <Input
                type={type}
                value={(formData as any)[field]}
                onChange={(e) => onChange(field, e.target.value)}
                variant="unstyled"
                placeholder={label}
              />
            </FormControl>
          </Box>
        ))}

        <FormControl display="flex" alignItems="center" pt={2}>
          <Checkbox
            isChecked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            size="md"
            colorScheme="green"
            transition="all 0.15s"
          >
            <Text fontSize="sm" ml={2}>
              Agree to Sable’s{" "}
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
        </FormControl>

        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.700" }}
          rounded="lg"
          size="lg"
          w="full"
          maxW="xs"
          h="14"
          onClick={handleContinue}
          isLoading={loading}
        >
          Continue
        </Button>

        {isClient && window.location.hostname === "localhost" && (
          <Button
            variant="outline"
            colorScheme="green"
            rounded="lg"
            size="lg"
            w={isMobile ? "full" : "auto"}
            onClick={handleDummy}
          >
            Fill with Dummy Data
          </Button>
        )}

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
