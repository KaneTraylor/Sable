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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

interface SignupStep4Props {
  formData: {
    email: string;
    password: string;
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
  const [submitted, setSubmitted] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleFinalSubmit = async () => {
    await onSubmit();
    setSubmitted(true);

    setTimeout(() => {
      // Optional: navigate or trigger other behavior
    }, 5000);
  };

  if (submitted) {
    return (
      <Box textAlign="center" mt={10}>
        <Confetti width={width} height={height} numberOfPieces={300} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Center>
            <Box
              boxSize="120px"
              bg="green.400"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="4xl"
              fontWeight="bold"
            >
              ✓
            </Box>
          </Center>
        </motion.div>
        <Heading mt={6}>You're all set!</Heading>
        <Text fontSize="md" mt={2}>
          Redirecting you shortly...
        </Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>
        Final Step
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
          <Button colorScheme="green" onClick={handleFinalSubmit}>
            Create Account
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
