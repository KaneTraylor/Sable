import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import CreditReportDisplay from "../components/CreditReportDisplay";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>Welcome, {session?.user?.email || "User"}!</Heading>
      <Text mb={6}>Here's a summary of your credit report:</Text>
      <CreditReportDisplay />
    </Box>
  );
}
