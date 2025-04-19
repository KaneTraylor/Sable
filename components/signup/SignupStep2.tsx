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
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("signup-step2");
    if (saved) {
      const parsed = JSON.parse(saved);
      for (const key in parsed) {
        if (parsed[key]) onChange(key, parsed[key]);
      }
      setConsentGiven(parsed.consentGiven || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "signup-step2",
      JSON.stringify({ ...formData, consentGiven })
    );
  }, [formData, consentGiven]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!formData?.address) newErrors.address = "Address is required.";
    if (!formData?.city) newErrors.city = "City is required.";
    if (!formData?.state) newErrors.state = "State is required.";
    if (!formData?.zip || formData.zip.length < 5)
      newErrors.zip = "Zip code is invalid.";
    if (!formData?.phone || formData.phone.replace(/\D/g, "").length !== 10)
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

    onNext();
  };

  return (
    <Box maxW="500px" mx="auto" p={[4, 8]}>
      <Heading size="lg" mb={4}>
        Your Contact Details
      </Heading>
      <Text fontSize="sm" mb={6} color="gray.600">
        We use this to verify and secure your profile.
      </Text>
      <VStack spacing={5} align="stretch">
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

        <Checkbox
          isChecked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
        >
          By clicking “Continue,” I consent to be contacted about this service
          by autodialer or prerecorded voice. Consent not required to enroll.
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
