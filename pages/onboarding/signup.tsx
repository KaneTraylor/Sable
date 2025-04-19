// pages/onboarding/signup.tsx
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import SignupForm from "@/components/signup/SignupForm";

export default function SignupPage() {
  return (
    <Container maxW="3xl" py={10}>
      <Box textAlign="center" mb={8}>
        <Heading>Let’s get you started</Heading>
        <Text fontSize="md" color="gray.600">
          This only takes a few minutes — and won’t affect your credit.
        </Text>
      </Box>
      <SignupForm />
    </Container>
  );
}
