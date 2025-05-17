// components/dashboard/disputes/DisputeCard.tsx
import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { startCase } from "lodash";
import { PaymentHistory } from "@components/dashboard/disputes/PaymentHistory";

export interface AccountFields {
  accountNumber: string;
  accountType: string;
  accountTypeDetail: string;
  accountName: string;
  status: string;
  highCredit: string;
  balance: string;
  monthlyPayment: string;
  creditLimit: string;
  pastDue: string;
  dateOpened: string;
  dateClosed: string;
  terms: string;
  paymentStatus: string;
  lastReportedDate: string;
  comments: string;
  paymentFrequency: string;
  disputeStatus: string;
  creditorType: string;
  description: string;
  rating: string;
  originalCreditor: string;
  bureauCode: string;
  pastDue30Days: string;
  pastDue60Days: string;
  pastDue90Days: string;
  lastVerified: string;
  responsibility: string;
  lastActiveDate: string;
  lastPaymentDate: string;
}

export interface AccountData {
  id: string;
  category?: string;
  bureauData: {
    equifax: AccountFields;
    experian: AccountFields;
    transunion: AccountFields;
  };
  /** optional overrides for real data */
  paymentHistory?: Record<string, string[]>;
  paymentMonths?: string[];
}

export interface DisputeItem {
  id: string;
  name: string;
  reason: string;
  instruction: string;
}

interface Props {
  style: "fcra" | "metro2" | "ai";
  item: { id: string; name: string };
  sel?: DisputeItem;
  disabled: boolean;
  reasonList: string[];
  instructionList: string[];
  onToggle: () => void;
  onReasonChange: (value: string) => void;
  onInstructionChange: (value: string) => void;
  onRemove: () => void;
  accountData: AccountData;
}

const FIELDS: Array<keyof AccountFields> = [
  "accountNumber",
  "accountType",
  "accountTypeDetail",
  "accountName",
  "status",
  "highCredit",
  "balance",
  "monthlyPayment",
  "creditLimit",
  "pastDue",
  "dateOpened",
  "dateClosed",
  "terms",
  "paymentStatus",
  "lastReportedDate",
  "comments",
  "paymentFrequency",
  "disputeStatus",
  "creditorType",
  "description",
  "rating",
  "originalCreditor",
  "bureauCode",
  "pastDue30Days",
  "pastDue60Days",
  "pastDue90Days",
  "lastVerified",
  "responsibility",
  "lastActiveDate",
  "lastPaymentDate",
];

export default function DisputeCard({
  sel,
  disabled,
  reasonList,
  instructionList,
  onReasonChange,
  onInstructionChange,
  onRemove,
  accountData,
}: Props) {
  const eq = accountData.bureauData.equifax;

  return (
    <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="md">
      <h2>
        <AccordionButton _expanded={{ bg: "green.50" }}>
          <Flex flex="1" justify="space-between" align="center">
            <Box textAlign="left">
              <Text fontWeight="bold">{eq.accountName}</Text>
              <Text fontSize="sm" color="gray.600">
                {eq.accountType} &bull; {eq.accountNumber}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Bal: {eq.balance} &bull; Status: {eq.status}
              </Text>
            </Box>
            <AccordionIcon />
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {FIELDS.map((f) => (
            <GridItem key={f}>
              <Text fontSize="xs" fontWeight="semibold" mb={1}>
                {startCase(f)}
              </Text>
              <Input size="sm" readOnly value={eq[f]} />
            </GridItem>
          ))}
        </Grid>

        <Flex mt={4} align="center">
          <Select
            placeholder="Reason"
            size="sm"
            mr={2}
            isDisabled={disabled}
            value={sel?.reason || ""}
            onChange={(e) => onReasonChange(e.target.value)}
          >
            {reasonList.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Instruction"
            size="sm"
            mr={2}
            isDisabled={disabled}
            value={sel?.instruction || ""}
            onChange={(e) => onInstructionChange(e.target.value)}
          >
            {instructionList.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>

          <Button
            size="sm"
            colorScheme="red"
            onClick={onRemove}
            isDisabled={!sel}
          >
            Remove
          </Button>
        </Flex>

        {/* NEW: pull in payment history */}
        <PaymentHistory
          history={accountData.paymentHistory}
          months={accountData.paymentMonths}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
