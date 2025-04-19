import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  VStack,
  Button,
} from "@chakra-ui/react";

export default function VerifyRequiredPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      const res = await fetch("/api/checkVerification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setIsVerified(data.verified);
      setChecking(false);

      if (data.verified) {
        router.push("/dashboard"); // or next onboarding step
      }
    };

    const interval = setInterval(() => {
      checkVerification();
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [router]);

  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <Box
        maxW="lg"
        textAlign="center"
        p={8}
        bg="white"
        borderRadius="md"
        shadow="md"
      >
        <VStack spacing={6}>
          <Heading size="lg">Please verify your email</Heading>
          <Text color="gray.600">
            We sent a verification link to your email. Once verified, you'll
            automatically continue to your dashboard.
          </Text>
          {checking ? (
            <Spinner size="lg" color="green.500" />
          ) : (
            <Text fontSize="sm" color={isVerified ? "green.500" : "red.500"}>
              {isVerified ? "Verified!" : "Not verified yet..."}
            </Text>
          )}
          <Button
            onClick={() => router.push("/")}
            variant="link"
            size="sm"
            colorScheme="blue"
          >
            Go back to homepage
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
