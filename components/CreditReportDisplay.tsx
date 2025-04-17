import React from "react";
import { Box, Heading, VStack, HStack, Text, Divider } from "@chakra-ui/react";

type Tradeline = {
  creditor: string;
  issue: string;
  bureau: string;
  accountNumber: string;
};

const mockNegativeItems: Tradeline[] = [
  {
    creditor: "Capital One",
    issue: "Charge-off",
    bureau: "Experian",
    accountNumber: "****1234",
  },
  {
    creditor: "Midland Funding",
    issue: "Collections",
    bureau: "TransUnion",
    accountNumber: "****5678",
  },
  {
    creditor: "Synchrony Bank",
    issue: "Late Payment",
    bureau: "Equifax",
    accountNumber: "****9101",
  },
];

export default function CreditReportDisplay() {
  return (
    <Box p={6} bg="white" boxShadow="sm" borderRadius="xl">
      <Heading size="md" mb={4}>
        Negative Tradelines
      </Heading>
      <VStack spacing={4} align="stretch">
        {mockNegativeItems.map((item, idx) => (
          <Box key={idx}>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold">{item.creditor}</Text>
                <Text fontSize="sm" color="gray.600">
                  {item.issue} • {item.bureau}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.500">
                {item.accountNumber}
              </Text>
            </HStack>
            {idx < mockNegativeItems.length - 1 && <Divider mt={3} />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
