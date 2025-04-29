import { Box, Container } from "@chakra-ui/react";
import SignupForm from "@/components/signup/SignupForm";

export default function SignupPage() {
  return (
    <Box bg="#ffffff" minH="100vh" py={10}>
      <Container maxW="md" centerContent>
        <SignupForm />
      </Container>
    </Box>
  );
}
