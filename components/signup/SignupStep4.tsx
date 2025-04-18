import {
  Box,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface SignupStep4Props {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function SignupStep4({
  formData,
  onChange,
  onSubmit,
  onBack,
}: SignupStep4Props) {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>
        Step 4: Create Your Account
      </Heading>
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
          <Button colorScheme="green" onClick={onSubmit}>
            Create Account
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
