// components/signup/SignupStep4.tsx
import { Box, Heading, VStack, Text, Center, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";
import { useRouter } from "next/router";

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
  const [submitted, setSubmitted] = useState(false);
  const [width, height] = useWindowSize();
  const router = useRouter();

  const handleFinalSubmit = async () => {
    await onSubmit();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 4000); // 4-second delay before redirect

      return () => clearTimeout(timer); // Cleanup
    }
  }, [submitted, router]);

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
          Redirecting you to your dashboard...
        </Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="500px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Heading size="lg" mb={4}>
        Final Step
      </Heading>
      <Text fontSize="md" color="gray.600" mb={6}>
        Click the button below to create your account.
      </Text>

      <VStack spacing={4} align="stretch">
        <Button colorScheme="green" size="lg" onClick={handleFinalSubmit}>
          Create My Account
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </VStack>
    </Box>
  );
}
