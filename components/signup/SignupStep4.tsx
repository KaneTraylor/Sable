import {
  Box,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

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
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValid =
    formData.email.includes("@") &&
    formData.password.length >= 6 &&
    formData.password === confirmPassword;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Step 4: Create Your Account
      </Heading>

      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Box>

        <Box>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder="••••••••"
          />
        </Box>

        <Box>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Box>

        <VStack spacing={4} pt={2}>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button colorScheme="blue" onClick={onSubmit} isDisabled={!isValid}>
            Submit
          </Button>
        </VStack>

        {!isValid && (
          <Text fontSize="sm" color="red.500" pt={2}>
            Please fill out all fields correctly.
          </Text>
        )}
      </VStack>
    </Box>
  );
}
