// components/PaymentHistory.tsx
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
  Badge,
} from "@chakra-ui/react";

export interface PaymentHistoryProps {
  /** Map from bureau name → array of statuses (one per month) */
  history?: Record<string, string[]>;
  /** Ordered list of month labels */
  months?: string[];
}

const DEFAULT_MONTHS = [
  "Mar/25",
  "Feb/25",
  "Jan/25",
  "Dec/24",
  "Nov/24",
  "Oct/24",
  "Sep/24",
  "Aug/24",
  "Jul/24",
  "Jun/24",
  "May/24",
  "Apr/24",
  "Mar/24",
];

const DEFAULT_HISTORY: Record<string, string[]> = {
  TransUnion: DEFAULT_MONTHS.map(() => "OK"),
  Experian: DEFAULT_MONTHS.map(() => "OK"),
  Equifax: DEFAULT_MONTHS.map(() => "OK"),
};

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  history = DEFAULT_HISTORY,
  months = DEFAULT_MONTHS,
}) => {
  return (
    <Box mt={6}>
      <Text fontSize="sm" fontWeight="semibold" mb={2}>
        Payment History
      </Text>
      <Table size="sm" variant="simple" borderWidth="1px">
        <Thead bg="gray.50">
          <Tr>
            <Th>Bureau</Th>
            {months.map((m) => (
              <Th key={m} textAlign="center" px={2}>
                {m}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(history).map(([bureau, statuses]) => (
            <Tr key={bureau}>
              <Td fontWeight="medium">{bureau}</Td>
              {statuses.map((status, i) => (
                <Td key={i} textAlign="center" px={2}>
                  {status === "OK" ? (
                    <Badge colorScheme="green">OK</Badge>
                  ) : (
                    <Badge colorScheme="gray">—</Badge>
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
