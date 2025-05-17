import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

interface SignupStep6Props {
  onNext: () => void;
}

export default function SignupStep6({ onNext }: SignupStep6Props) {
  return (
    <Container maxW="lg" py={16} textAlign="center">
      <VStack spacing={8}>
        <Image
          src="/mockups/sable-difference/savings-party.png"
          alt="Welcome Celebration"
          maxH="200px"
          mx="auto"
        />

        <Heading size="xl" color="green.600">
          Welcome to Sable 🎉
        </Heading>

        <Text fontSize="md" color="gray.600">
          You're all set. Your account is ready and your credit journey starts
          now. Head to your dashboard to start exploring disputes, tracking
          progress, and building your credit smarter.
        </Text>

        <Button colorScheme="green" size="lg" onClick={onNext}>
          Go to Dashboard
        </Button>
      </VStack>
    </Container>
  );
}
