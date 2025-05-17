// pages/dashboard/disputes/select.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Accordion,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import DisputeCard, {
  AccountData,
  DisputeItem,
} from "@/components/dashboard/disputes/DisputeCard";
import { useDisputeStore } from "@/stores/useDisputeStore";

// --- mock reasons & instructions ---
const reasonList = [
  "Wrong account number",
  "Balance is incorrect",
  "Account not mine",
];
const instructionList = ["Validate with creditor", "Remove from report"];

export default function DisputeSelectPage() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const isPremium = false; // TODO: replace with real user plan
  const totalLimit = 5;
  const { addDispute, reset } = useDisputeStore();

  // --- 1) Mock account data ---
  type ExtendedAccount = AccountData & { category: string };
  const mockAccounts: ExtendedAccount[] = [
    {
      id: "acct1",
      category: "Collections",
      bureauData: {
        equifax: {
          accountNumber: "1234-XXXX-XXXX-5678",
          accountType: "Collection",
          accountTypeDetail: "Medical",
          accountName: "Hospital Collection",
          status: "Open",
          highCredit: "$2,500",
          balance: "$2,250",
          monthlyPayment: "$0",
          creditLimit: "$0",
          pastDue: "$0",
          dateOpened: "Jan 10, 2020",
          dateClosed: "—",
          terms: "—",
          paymentStatus: "N/A",
          lastReportedDate: "Mar 01, 2025",
          comments: "Sent to collections",
          paymentFrequency: "N/A",
          disputeStatus: "None",
          creditorType: "Medical",
          description: "Unpaid hospital bill",
          rating: "—",
          originalCreditor: "City Hospital",
          bureauCode: "E",
          pastDue30Days: "$0",
          pastDue60Days: "$0",
          pastDue90Days: "$0",
          lastVerified: "Feb 15, 2025",
          responsibility: "Consumer",
          lastActiveDate: "Mar 01, 2025",
          lastPaymentDate: "—",
        },
        experian: { ...({} as any) },
        transunion: { ...({} as any) },
      },
    },
    {
      id: "acct2",
      category: "Inquiries",
      bureauData: {
        equifax: {
          accountNumber: "Inquiry #002",
          accountType: "Inquiry",
          accountTypeDetail: "Credit Pull",
          accountName: "SoftBank Inquiry",
          status: "Closed",
          highCredit: "$0",
          balance: "$0",
          monthlyPayment: "$0",
          creditLimit: "$0",
          pastDue: "$0",
          dateOpened: "Feb 20, 2025",
          dateClosed: "Feb 20, 2025",
          terms: "—",
          paymentStatus: "N/A",
          lastReportedDate: "Feb 20, 2025",
          comments: "Soft credit pull",
          paymentFrequency: "N/A",
          disputeStatus: "None",
          creditorType: "Inquiry",
          description: "Soft inquiry by lender",
          rating: "—",
          originalCreditor: "SoftBank",
          bureauCode: "E",
          pastDue30Days: "$0",
          pastDue60Days: "$0",
          pastDue90Days: "$0",
          lastVerified: "Feb 20, 2025",
          responsibility: "Consumer",
          lastActiveDate: "Feb 20, 2025",
          lastPaymentDate: "—",
        },
        experian: { ...({} as any) },
        transunion: { ...({} as any) },
      },
    },
    {
      id: "acct3",
      category: "Late Payments",
      bureauData: {
        equifax: {
          accountNumber: "9876-XXXX-XXXX-5432",
          accountType: "Credit Card",
          accountTypeDetail: "Visa",
          accountName: "Visa Rewards",
          status: "Open",
          highCredit: "$10,000",
          balance: "$3,200",
          monthlyPayment: "$100",
          creditLimit: "$10,000",
          pastDue: "$200",
          dateOpened: "Jun 15, 2019",
          dateClosed: "—",
          terms: "Revolving",
          paymentStatus: "30 days late",
          lastReportedDate: "Mar 01, 2025",
          comments: "30 days late once",
          paymentFrequency: "Monthly",
          disputeStatus: "None",
          creditorType: "Revolving",
          description: "Visa credit card",
          rating: "—",
          originalCreditor: "Big Bank",
          bureauCode: "E",
          pastDue30Days: "$200",
          pastDue60Days: "$0",
          pastDue90Days: "$0",
          lastVerified: "Feb 28, 2025",
          responsibility: "Consumer",
          lastActiveDate: "Mar 01, 2025",
          lastPaymentDate: "Jan 15, 2025",
        },
        experian: { ...({} as any) },
        transunion: { ...({} as any) },
      },
    },
  ];

  // --- 2) Group by category ---
  const categories = Array.from(new Set(mockAccounts.map((a) => a.category)));
  const accountsByCategory: Record<string, ExtendedAccount[]> = {};
  categories.forEach((cat) => {
    accountsByCategory[cat] = mockAccounts.filter((a) => a.category === cat);
  });

  // --- 3) Local selection state ---
  const [selections, setSelections] = useState<
    Record<string, Omit<DisputeItem, "name"> & { name: string }>
  >({});

  const handleReasonChange = (id: string, reason: string) =>
    setSelections((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {
          id,
          name: mockAccounts.find((a) => a.id === id)!.bureauData.equifax
            .accountName,
          instruction: "",
        }),
        reason,
      },
    }));

  const handleInstructionChange = (id: string, instruction: string) =>
    setSelections((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {
          id,
          name: mockAccounts.find((a) => a.id === id)!.bureauData.equifax
            .accountName,
          reason: "",
        }),
        instruction,
      },
    }));

  const handleRemove = (id: string) =>
    setSelections((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });

  const numDisputes = Object.values(selections).filter(
    (s) => s.reason && s.instruction
  ).length;

  // --- 4) Submit into store & route ---
  const handleSubmit = () => {
    reset();
    Object.values(selections).forEach((s) => {
      if (s.reason && s.instruction) {
        // find the matching account in your mock data
        const acct = mockAccounts.find((a) => a.id === s.id)!;
        const eqAccount = acct.bureauData.equifax;

        addDispute({
          id: s.id,
          name: s.name,
          reason: s.reason,
          instruction: s.instruction,
          account: eqAccount, // ← include the account fields here
        });
      }
    });
    router.push("/dashboard/disputes/review");
  };

  return (
    <Container maxW="container.lg" py={8}>
      {/* Intro */}
      <Flex direction="column" align="center" mb={10}>
        <img
          src="/mockups/3b.svg"
          alt="Dispute intro graphic"
          style={{ width: 120, height: 120 }}
        />

        <Heading as="h1" size="xl" mb={2}>
          Dispute Your Accounts
        </Heading>
        <Text color="gray.600" textAlign="center" maxW="600px">
          Select which accounts you’d like to dispute and provide a reason +
          instruction. Free members can dispute up to {totalLimit} accounts;
          premium members have no limit.
        </Text>
      </Flex>

      {/* Per‐category */}
      {categories.map((cat) => (
        <Box key={cat} mb={8}>
          <Heading size="md" mb={4}>
            {cat}
          </Heading>
          <Accordion
            allowMultiple
            bg={bg}
            borderRadius="md"
            boxShadow="sm"
            overflow="hidden"
          >
            {accountsByCategory[cat].map((acct) => {
              const sel = selections[acct.id] ?? {
                id: acct.id,
                name: acct.bureauData.equifax.accountName,
                reason: "",
                instruction: "",
              };
              const already = sel.reason && sel.instruction;
              const disabled =
                !isPremium && numDisputes >= totalLimit && !already;

              return (
                <DisputeCard
                  key={acct.id}
                  style="metro2" /* or "fcra"/"ai" default your style */
                  item={{
                    id: acct.id,
                    name: acct.bureauData.equifax.accountName,
                  }}
                  sel={sel}
                  disabled={disabled}
                  reasonList={reasonList}
                  instructionList={instructionList}
                  onToggle={() => {}}
                  onReasonChange={(v) => handleReasonChange(acct.id, v)}
                  onInstructionChange={(v) =>
                    handleInstructionChange(acct.id, v)
                  }
                  onRemove={() => handleRemove(acct.id)}
                  accountData={acct}
                />
              );
            })}
          </Accordion>
        </Box>
      ))}

      {/* Review button */}
      <Flex justify="flex-end" mt={6}>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={numDisputes === 0}
        >
          Review Disputes ({numDisputes})
        </Button>
      </Flex>
    </Container>
  );
}
