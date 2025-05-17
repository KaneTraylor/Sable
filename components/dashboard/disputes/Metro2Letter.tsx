// components/dashboard/disputes/Metro2Letter.tsx
import React from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
} from "@chakra-ui/react";
import { DisputeSelection } from "@/stores/useDisputeStore";
import { AccountFields } from "./DisputeCard";

// map your reasons to Metro 2 error codes and a highlight color
const ERROR_CODE_MAP: Record<string, { code: string; color: string }> = {
  "Wrong account number": { code: "36", color: "red.100" },
  "Balance is incorrect": { code: "05", color: "yellow.100" },
  "Account not mine": { code: "30", color: "blue.100" },
  // …add your other mappings here…
};

interface Metro2LetterProps {
  bureau: "Equifax" | "TransUnion" | "Experian";
  items: Array<DisputeSelection & { account: AccountFields }>;
  user: { name: string; address: string };
}

export function Metro2Letter({ bureau, items, user }: Metro2LetterProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <Box>
      {/* Header */}
      <Text>{user.name}</Text>
      <Text whiteSpace="pre-wrap" mb={4}>
        {user.address}
      </Text>
      <Text mb={4}>{today}</Text>
      <Text mb={6}>To: {bureau} Dispute Department</Text>

      <Text mb={4}>
        Dear {bureau},
        <br />
        Please investigate the following Metro 2‐formatted items:
      </Text>

      {/* Metro 2 Table */}
      <Table variant="simple" size="sm">
        <Thead bg="gray.200">
          <Tr>
            <Th>Account Name</Th>
            <Th>Acct #</Th>
            <Th>Error Code</Th>
            <Th>Instruction</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((it) => {
            const { code, color } = ERROR_CODE_MAP[it.reason] || {
              code: "99",
              color: "gray.100",
            };
            return (
              <Tr key={it.id}>
                <Td>{it.account.accountName}</Td>
                <Td>{it.account.accountNumber}</Td>
                <Td bg={color} fontWeight="bold">
                  {code}
                </Td>
                <Td>{it.instruction}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Divider my={6} />

      <Text>
        Sincerely,
        <br />
        {user.name}
      </Text>
    </Box>
  );
}
