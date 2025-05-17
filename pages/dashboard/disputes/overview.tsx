import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// ─── BEGIN SSR / AUTH ───
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session?.user?.email) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }
  return { props: {} };
};
// ─── END SSR / AUTH ───

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface UserData {
  firstName?: string;
  lastDisputeSentAt?: string;
  nextDisputeAt?: string;
  sentWithSable?: boolean;
}

export default function DisputeOverview() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.700");
  const outline = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const renderDisputeStatus = () => {
    if (!user) return null;

    if (user.sentWithSable) {
      const lastSent = user.lastDisputeSentAt
        ? new Date(user.lastDisputeSentAt).toLocaleDateString()
        : "Unknown";
      const nextDispute = user.nextDisputeAt
        ? new Date(user.nextDisputeAt).toLocaleDateString()
        : "Unknown";

      return (
        <Box
          bg={cardBg}
          boxShadow={`inset 0 0 0 1px ${outline}`}
          p={6}
          borderRadius="lg"
        >
          <Heading as="h4" size="md" mb={2}>
            Sable Delivery in Progress
          </Heading>
          <Text fontSize="sm">
            You sent your last dispute using Sable. We’re handling the certified
            delivery to the bureaus on your behalf.
          </Text>
          <Text fontSize="sm" mt={2} color="gray.500">
            Last sent: {lastSent} <br />
            Next eligible send: {nextDispute}
          </Text>
          <Button
            mt={4}
            colorScheme="green"
            onClick={() => router.push("/dashboard/disputes/premium")}
          >
            View Letters
          </Button>
        </Box>
      );
    } else {
      return (
        <Box
          bg={cardBg}
          boxShadow={`inset 0 0 0 1px ${outline}`}
          p={6}
          borderRadius="lg"
        >
          <Heading as="h4" size="md" mb={2}>
            Ready to Send Disputes
          </Heading>
          <Text fontSize="sm" mb={2}>
            Choose your delivery method to send your dispute letters.
          </Text>
          <Button
            colorScheme="green"
            onClick={() => router.push("/dashboard/disputes/premium")}
          >
            Send with Sable
          </Button>
          <Button
            mt={2}
            variant="outline"
            onClick={() => router.push("/dashboard/disputes/manual")}
          >
            Send Manually
          </Button>
        </Box>
      );
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg">
          Dispute Overview
        </Heading>
        {renderDisputeStatus()}
      </VStack>
    </Box>
  );
}
