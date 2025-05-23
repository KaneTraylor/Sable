// pages/dashboard/disputes/select.tsx - Modernized dispute selection
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Badge,
  Progress,
  Alert,
  AlertIcon,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";
import DisputeCard, {
  AccountData,
  DisputeItem,
} from "@/components/dashboard/disputes/DisputeCard";
import { useDisputeStore } from "@/stores/useDisputeStore";

// Mock reasons & instructions
const reasonList = [
  "Wrong account number",
  "Balance is incorrect",
  "Account not mine",
  "Payment history error",
  "Account status incorrect",
];

const instructionList = [
  "Validate with creditor",
  "Remove from report",
  "Update payment history",
  "Correct account status",
];

// Mock account data with categories
type ExtendedAccount = AccountData & {
  category: string;
  impact: "high" | "medium" | "low";
};

const mockAccounts: ExtendedAccount[] = [
  {
    id: "acct1",
    category: "Collections",
    impact: "high",
    bureauData: {
      equifax: {
        accountNumber: "1234-XXXX-XXXX-5678",
        accountType: "Collection",
        accountTypeDetail: "Medical",
        accountName: "Hospital Collection Services",
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
    category: "Late Payments",
    impact: "medium",
    bureauData: {
      equifax: {
        accountNumber: "9876-XXXX-XXXX-5432",
        accountType: "Credit Card",
        accountTypeDetail: "Visa",
        accountName: "Chase Sapphire Card",
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
        comments: "30 days late in Feb 2025",
        paymentFrequency: "Monthly",
        disputeStatus: "None",
        creditorType: "Revolving",
        description: "Visa credit card",
        rating: "—",
        originalCreditor: "Chase Bank",
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
  {
    id: "acct3",
    category: "Inquiries",
    impact: "low",
    bureauData: {
      equifax: {
        accountNumber: "Inquiry #002",
        accountType: "Inquiry",
        accountTypeDetail: "Credit Pull",
        accountName: "Auto Loan Inquiry",
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
        comments: "Hard inquiry for auto loan",
        paymentFrequency: "N/A",
        disputeStatus: "None",
        creditorType: "Inquiry",
        description: "Hard inquiry by lender",
        rating: "—",
        originalCreditor: "Auto Finance Co",
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
];

// Main content component
function DisputeSelectContent() {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const isPremium = false; // TODO: replace with real user plan
  const totalLimit = 5;
  const { addDispute, reset } = useDisputeStore();

  // Group accounts by category
  const categories = Array.from(new Set(mockAccounts.map((a) => a.category)));
  const accountsByCategory: Record<string, ExtendedAccount[]> = {};
  categories.forEach((cat) => {
    accountsByCategory[cat] = mockAccounts.filter((a) => a.category === cat);
  });

  // Local selection state
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

  const handleSubmit = () => {
    reset();
    Object.values(selections).forEach((s) => {
      if (s.reason && s.instruction) {
        const acct = mockAccounts.find((a) => a.id === s.id)!;
        const eqAccount = acct.bureauData.equifax;

        addDispute({
          id: s.id,
          name: s.name,
          reason: s.reason,
          instruction: s.instruction,
          account: eqAccount,
        });
      }
    });
    router.push("/dashboard/disputes/review");
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "blue";
      default:
        return "gray";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "collections":
        return AlertTriangle;
      case "late payments":
        return FileText;
      case "inquiries":
        return Target;
      default:
        return FileText;
    }
  };

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{
        base: "0",
        md: `${sidebarWidth + 20}px`,
      }}
      pb={{ base: "80px", md: "20px" }}
      transition="padding-left 0.3s ease"
    >
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <VStack spacing={6} align="stretch" mb={8}>
          <HStack spacing={4}>
            <Button
              leftIcon={<ArrowLeft size={16} />}
              variant="ghost"
              onClick={() => router.push("/dashboard/disputes")}
            >
              Back to Disputes
            </Button>
            <Spacer />
            <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
              {numDisputes} of {totalLimit} selected
            </Badge>
          </HStack>

          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <VStack spacing={6} align="center" textAlign="center">
                <Box p={4} bg="blue.50" borderRadius="full">
                  <Zap size={32} color="var(--chakra-colors-blue-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="xl" color="gray.900">
                    Select Items to Dispute
                  </Heading>
                  <Text color="gray.600" fontSize="lg" maxW="2xl">
                    Choose accounts with errors or inaccuracies you'd like to
                    challenge. Free members can dispute up to {totalLimit} items
                    per month.
                  </Text>
                </VStack>

                {/* Quick stats */}
                <SimpleGrid columns={3} spacing={6} w="full" maxW="md">
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500">
                      {accountsByCategory["Collections"]?.length || 0}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Collections
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                      {accountsByCategory["Late Payments"]?.length || 0}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Late Payments
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                      {accountsByCategory["Inquiries"]?.length || 0}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Inquiries
                    </Text>
                  </VStack>
                </SimpleGrid>

                <Progress
                  value={(numDisputes / totalLimit) * 100}
                  colorScheme="green"
                  size="lg"
                  borderRadius="full"
                  w="full"
                  maxW="md"
                />
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        {/* Category sections */}
        <VStack spacing={8} align="stretch">
          {categories.map((category) => (
            <Card key={category} bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardHeader>
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg={`${getImpactColor(
                      accountsByCategory[category][0]?.impact || "gray"
                    )}.50`}
                    borderRadius="lg"
                  >
                    <Icon
                      as={getCategoryIcon(category)}
                      size={20}
                      color={`var(--chakra-colors-${getImpactColor(
                        accountsByCategory[category][0]?.impact || "gray"
                      )}-500)`}
                    />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Heading size="md">{category}</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {accountsByCategory[category]?.length} items found
                    </Text>
                  </VStack>
                  <Spacer />
                  <Badge
                    colorScheme={getImpactColor(
                      accountsByCategory[category][0]?.impact || "gray"
                    )}
                    variant="subtle"
                  >
                    {accountsByCategory[category][0]?.impact} impact
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <Accordion allowMultiple>
                  {accountsByCategory[category]?.map((acct) => {
                    const sel = selections[acct.id] ?? {
                      id: acct.id,
                      name: acct.bureauData.equifax.accountName,
                      reason: "",
                      instruction: "",
                    };
                    const isSelected = sel.reason && sel.instruction;
                    const disabled =
                      !isPremium && numDisputes >= totalLimit && !isSelected;

                    return (
                      <DisputeCard
                        key={acct.id}
                        style="metro2"
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
              </CardBody>
            </Card>
          ))}
        </VStack>

        {/* Limit warning */}
        {!isPremium && numDisputes >= totalLimit && (
          <Alert status="warning" borderRadius="xl" mt={6}>
            <AlertIcon />
            <Box>
              <Text fontSize="sm" fontWeight="600">
                Free Plan Limit Reached
              </Text>
              <Text fontSize="xs">
                Upgrade to Premium to dispute unlimited items per month.
              </Text>
            </Box>
          </Alert>
        )}

        {/* Action buttons */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md" mt={8}>
          <CardBody>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontWeight="600">
                  {numDisputes} item{numDisputes !== 1 ? "s" : ""} selected for
                  dispute
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Review your selections before proceeding
                </Text>
              </VStack>
              <HStack spacing={3}>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/disputes")}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleSubmit}
                  isDisabled={numDisputes === 0}
                  rightIcon={<CheckCircle size={16} />}
                  size="lg"
                  px={8}
                >
                  Review Disputes ({numDisputes})
                </Button>
              </HStack>
            </HStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}

// Main component with SidebarProvider
export default function ModernDisputeSelectPage() {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DisputeSelectContent />
    </SidebarProvider>
  );
}
