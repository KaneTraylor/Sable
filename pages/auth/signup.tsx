// pages/signup.tsx
import { Box, Container } from "@chakra-ui/react";
import SignupForm from "../../components/signup/SignupForm";

export default function SignupPage() {
  return (
    <Container maxW="container.md">
      <SignupForm />
    </Container>
  );
}
