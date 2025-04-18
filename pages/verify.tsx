import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Text, Spinner, Center } from "@chakra-ui/react";

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      fetch("/api/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus("Email verified! Taking you to the next step...");
            // Optionally store a flag or ID in localStorage
            localStorage.setItem("emailVerified", "true");
            setTimeout(() => router.push("/onboarding/signup/complete"), 2000);
          } else {
            setStatus("Verification failed. Please try again.");
          }
        })
        .catch(() =>
          setStatus("Something went wrong. Please refresh or try again later.")
        );
    }
  }, [token, router]);

  return (
    <Center minH="100vh">
      <Box textAlign="center">
        {status === "Verifying..." && <Spinner size="xl" mb={4} />}
        <Text fontSize="xl">{status}</Text>
      </Box>
    </Center>
  );
}
