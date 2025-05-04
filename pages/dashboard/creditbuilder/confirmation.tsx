// pages/dashboard/creditbuilder/confirmation.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function CreditBuilderStepThree() {
  const router = useRouter();
  const toast = useToast();

  // once the user lands here, we record in the DB that they've opened a new loan
  useEffect(() => {
    async function recordLoan() {
      try {
        const res = await fetch("/api/creditbuilder/open", { method: "POST" });
        if (!res.ok) throw new Error(await res.text());
        toast({
          title: "Loan opened!",
          description:
            "Congratulations—you’ve opened a new Credit Builder Loan.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (err: any) {
        console.error(err);
        toast({
          title: "Error",
          description:
            err.message || "Couldn’t record your new loan. Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }

    recordLoan();
  }, []);

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="gray.50"
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 12 }}
      align="center"
      justify="center"
      textAlign="center"
    >
      <VStack spacing={6} maxW="md">
        <Spinner size="xl" color="green.500" />
        <Heading size="lg" color="green.600">
          Your Credit Builder Loan Is Live!
        </Heading>
        <Text>
          You’ve successfully opened a $120 Credit Builder Loan. Your first
          installment payment is due in 30 days.
        </Text>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => router.push("/dashboard/creditbuilder/details")}
        >
          View My Loan Details
        </Button>
      </VStack>
    </Flex>
  );
}
