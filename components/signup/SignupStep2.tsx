// components/signup/SignupStep2.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormLabel,
  Input,
  Button,
  Checkbox,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

interface SignupStep2Props {
  formData: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep2({
  formData = {},
  onChange,
  onNext,
  onBack,
}: SignupStep2Props) {
  const toast = useToast();
  const [consentGiven, setConsentGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("signup-step2");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.entries(parsed).forEach(([key, val]) => {
        if (val) onChange(key, val as string);
      });
      setConsentGiven(parsed.consentGiven || false);
    }
  }, [onChange]);

  useEffect(() => {
    localStorage.setItem(
      "signup-step2",
      JSON.stringify({ ...formData, consentGiven })
    );
  }, [formData, consentGiven]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zip || formData.zip.length < 5)
      newErrors.zip = "ZIP code is invalid.";
    if (!formData.phone || formData.phone.replace(/\D/g, "").length !== 10)
      newErrors.phone = "Phone number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!consentGiven || !validateFields()) {
      toast({
        title: "Missing or invalid fields",
        description: "Please complete all fields and provide consent.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    onNext();
  };

  return (
    <Box maxW="md" mx="auto" px={4} py={0}>
      <Heading
        as="h3"
        fontFamily="Franklin Gothic, sans-serif"
        fontWeight="400"
        fontSize="2xl"
        color="green.500"
        mb={2}
        pt={4}
        textAlign="center"
      >
        Your Contact Details
      </Heading>
      <Text
        fontFamily="Inter, sans-serif"
        fontSize="md"
        color="gray.600"
        mb={6}
        textAlign="center"
      >
        We use this to verify and secure your profile.
      </Text>

      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="123 Main St"
            value={formData.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
          />
          {errors.address && (
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.city}>
          <FormLabel>City</FormLabel>
          <Input
            placeholder="City"
            value={formData.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
          />
          {errors.city && <FormErrorMessage>{errors.city}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.state}>
          <FormLabel>State</FormLabel>
          <Input
            placeholder="State"
            value={formData.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
          />
          {errors.state && <FormErrorMessage>{errors.state}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.zip}>
          <FormLabel>ZIP Code</FormLabel>
          <Input
            placeholder="ZIP"
            value={formData.zip || ""}
            onChange={(e) => onChange("zip", e.target.value)}
          />
          {errors.zip && <FormErrorMessage>{errors.zip}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="(123) 456-7890"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
        </FormControl>

        <VStack spacing={3} mt={6} w="full">
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
            onClick={handleContinue}
            isLoading={isLoading}
          >
            Continue
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
