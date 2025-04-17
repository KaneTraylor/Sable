import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Box, Heading, Text } from "@chakra-ui/react";

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
    >
      <Heading mb={4}>Welcome to Rising Tides</Heading>
      <Text mb={8} color="gray.600">
        Rebuild your credit. Reclaim your future.
      </Text>
      <Button colorScheme="blue" onClick={() => router.push("auth/signin")}>
        Sign In to Get Started
      </Button>
    </Box>
  );
}
