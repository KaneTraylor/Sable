import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      textAlign="center"
      px={6}
    >
      <Heading mb={4}>Welcome to Sable Credit</Heading>
      <Text mb={8} color="gray.600">
        Safe, Stable, Sable.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="blue" onClick={() => router.push("/auth/signin")}>
          Sign In
        </Button>
        <Button variant="outline" onClick={() => router.push("/auth/signup")}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}
