// components/signup/SignupStep2.tsx
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
  Spinner,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SignupStep2Props {
  onNext: () => void;
  onBack: () => void;
  formData: {
    email?: string; // ✅ optional now
    ssn?: string;
    dob?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SignupStep2({
  onNext,
  onBack,
  formData = {},
  onChange,
}: SignupStep2Props) {
  const toast = useToast();
  const [consentGiven, setConsentGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ ssn?: string; dob?: string }>({});

  useEffect(() => {
    const saved = localStorage.getItem("signup-step2");
    if (saved && typeof onChange === "function") {
      const parsed = JSON.parse(saved);
      if (parsed.ssn) onChange("ssn", parsed.ssn);
      if (parsed.dob) onChange("dob", parsed.dob);
      setConsentGiven(parsed.consentGiven || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "signup-step2",
      JSON.stringify({
        ssn: formData?.ssn || "",
        dob: formData?.dob || "",
        consentGiven,
      })
    );
  }, [formData?.ssn, formData?.dob, consentGiven]);

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    const parts = [
      digits.slice(0, 3),
      digits.slice(3, 5),
      digits.slice(5, 9),
    ].filter(Boolean);
    return parts.join("-");
  };

  const formatDOB = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const parts = [
      digits.slice(0, 2),
      digits.slice(2, 4),
      digits.slice(4, 8),
    ].filter(Boolean);
    return parts.join("/");
  };

  const validateFields = () => {
    const newErrors: typeof errors = {};
    if (!formData?.ssn || formData.ssn.replace(/\D/g, "").length !== 9) {
      newErrors.ssn = "SSN must be 9 digits.";
    }
    if (!formData?.dob || formData.dob.replace(/\D/g, "").length !== 8) {
      newErrors.dob = "Date of birth must be 8 digits (MM/DD/YYYY).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
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
    try {
      const res = await fetch("/api/signup/updateStep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 3,
          formData: {
            ssn: formData.ssn,
            dob: formData.dob,
          },
          email: formData.email, // ✅ Add this line
        }),
      });

      const result = await res.json();
      console.log("updateStep response:", result);

      if (!res.ok) {
        throw new Error(result.error || "Unknown error");
      }

      onNext();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong saving your data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" p={[4, 8]}>
      <Heading size="lg" mb={4} textAlign="left">
        Verify Your Identity
      </Heading>
      <Text fontSize="sm" mb={6} color="gray.600">
        To pull your credit report, we need to verify a few more details. This
        won’t impact your score.
      </Text>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!errors.ssn}>
          <FormLabel>Social Security Number</FormLabel>
          <Input
            type="text"
            placeholder="123-45-6789"
            value={formData?.ssn || ""}
            onChange={(e) =>
              typeof onChange === "function" &&
              onChange("ssn", formatSSN(e.target.value))
            }
          />
          {errors.ssn && <FormErrorMessage>{errors.ssn}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.dob}>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="text"
            placeholder="MM/DD/YYYY"
            value={formData?.dob || ""}
            onChange={(e) =>
              typeof onChange === "function" &&
              onChange("dob", formatDOB(e.target.value))
            }
          />
          {errors.dob && <FormErrorMessage>{errors.dob}</FormErrorMessage>}
        </FormControl>

        <Checkbox
          isChecked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
        >
          I authorize Sable Credit to access my credit report.
        </Checkbox>

        <Box display="flex" justifyContent="space-between">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button
            colorScheme="green"
            onClick={handleContinue}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Continue"}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
