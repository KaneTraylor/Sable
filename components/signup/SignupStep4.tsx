// components/signup/SignupStep4.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";

interface SignupStep4Props {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    plan: string;
  };
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onEdit: (step: number) => void;
}

const planLabels: Record<string, string> = {
  protect: "SmartCredit Protect",
  build: "SmartCredit Build",
};

export default function SignupStep4({
  formData,
  onSubmit,
  onBack,
  onEdit,
}: SignupStep4Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // 1) Complete the signup (PATCH to your API)
      await onSubmit();

      // 2) Sign in and get back the URL to redirect to
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password!,
        callbackUrl: "/dashboard",
      });

      // 3) Navigate to the dashboard (or fallback)
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("SignupStep4 error:", err);
    } finally {
      setLoading(false);
    }
  };

  const summaryItems = [
    {
      label: "Name",
      value: `${formData.firstName} ${formData.lastName}`,
      editStep: 1,
    },
    { label: "Email", value: formData.email, editStep: 1 },
    {
      label: "Address",
      value: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      editStep: 2,
    },
    { label: "Phone", value: formData.phone, editStep: 2 },
    {
      label: "Plan",
      value: planLabels[formData.plan] ?? formData.plan,
      editStep: 3,
    },
  ];

  return (
    <Container maxW="md" mx="auto" px={4} py={0}>
      {/* Header */}
      <Box textAlign="center" mb={6} pt={4}>
        <Heading
          as="h3"
          fontFamily="Franklin Gothic, sans-serif"
          fontWeight="400"
          fontSize="2xl"
          color="green.500"
          mb={1}
        >
          Review & Confirm
        </Heading>
        <Text fontFamily="Inter, sans-serif" fontSize="md" color="gray.800">
          Click any line to edit, or confirm to finish.
        </Text>
      </Box>

      {/* Summary */}
      <VStack spacing={4} align="stretch">
        {summaryItems.map(({ label, value, editStep }) => (
          <Box
            key={label}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            px={4}
            py={3}
            cursor="pointer"
            _hover={{ borderColor: "green.500", bg: "gray.50" }}
            onClick={() => onEdit(editStep)}
          >
            <Text fontWeight="bold">{label}</Text>
            <Text>{value}</Text>
          </Box>
        ))}
      </VStack>

      {/* Actions */}
      <VStack spacing={3} mt={8} w="full">
        <Button
          variant="outline"
          colorScheme="gray"
          w="full"
          size="lg"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.700" }}
          rounded="lg"
          w="full"
          size="lg"
          onClick={handleConfirm}
          isLoading={loading}
        >
          Create Account
        </Button>
      </VStack>
    </Container>
  );
}
