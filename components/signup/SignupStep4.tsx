// components/signup/SignupStep4.tsx
import {
  Box,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface SignupStep4Props {
  formData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    ssn: string;
    dob: string;
    address: string;
    plan: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
}

export default function SignupStep4({
  formData,
  onChange,
  onSubmit,
  onBack,
}: SignupStep4Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleCreateAccount = async () => {
    setIsSubmitting(true);
    console.log("Submitting form data:", formData);

    try {
      await onSubmit();
    } catch (err: any) {
      console.error("Error during final submission:", err);
      toast({
        title: "Submission Failed",
        description:
          err.message || "Something went wrong while creating your account.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Center mb={4}>
        <CheckCircleIcon boxSize={10} color="green.400" />
      </Center>
      <Heading size="md" mb={4} textAlign="center">
        Almost Done!
      </Heading>
      <Text fontSize="sm" textAlign="center" mb={6} color="gray.600">
        Confirm your details and create your account
      </Text>
      <VStack spacing={4} align="start">
        <Box w="100%">
          <FormLabel>Email</FormLabel>
          <Input
            ref={emailRef}
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Box>
        <Box w="100%">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </Box>
        <Box pt={4} display="flex" justifyContent="space-between" w="100%">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button
            colorScheme="green"
            onClick={handleCreateAccount}
            isLoading={isSubmitting}
          >
            Create Account
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
