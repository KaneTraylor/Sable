// pages/dashboard/creditbuilder/details.tsx
import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Spinner, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Loan {
  amount: number;
  termMonths: number;
  openedAt: string;
  nextPaymentDue: string;
  paymentsMade: number;
}

export default function CreditBuilderDetails() {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/creditbuilder/details")
      .then((r) => r.json())
      .then((data) => setLoan(data.loan))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="xl" />;

  if (!loan)
    return <Text color="red.500">Couldn’t load your loan details.</Text>;

  return (
    <VStack spacing={6} p={8}>
      <Heading>Your Credit Builder Loan</Heading>
      <VStack spacing={4}>
        <Text>
          <strong>Amount:</strong> ${loan.amount}
        </Text>
        <Text>
          <strong>Term:</strong> {loan.termMonths} months
        </Text>
        <Text>
          <strong>Opened:</strong>{" "}
          {new Date(loan.openedAt).toLocaleDateString()}
        </Text>
        <Text>
          <strong>Next Payment Due:</strong>{" "}
          {new Date(loan.nextPaymentDue).toLocaleDateString()}
        </Text>
        <Text>
          <strong>Payments Made:</strong> {loan.paymentsMade}
        </Text>
      </VStack>
      <Button colorScheme="green" onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </Button>
    </VStack>
  );
}
