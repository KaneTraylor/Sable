// components/dashboard/CreditReportDisplay.tsx
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Collapse,
  Divider,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CreditScoreChart from "@/components/dashboard/CreditScoreChart";

export type Tradeline = {
  creditor: string;
  issue: string;
  bureau: string;
  accountNumber: string;
};

interface CreditReportDisplayProps {
  tradelines?: Tradeline[];
}

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
  {
    creditor: "Amex",
    issue: "Charge-off",
    bureau: "Experian",
    accountNumber: "****4444",
  },
];

const mockScores = {
  Experian: {
    score: 640,
    breakdown: {
      collections: 5,
      latePayments: 1,
      chargeOffs: 3,
      inquiries: 2,
      publicRecords: 0,
    },
  },
  TransUnion: {
    score: 688,
    breakdown: {
      collections: 3,
      latePayments: 0,
      chargeOffs: 2,
      inquiries: 1,
      publicRecords: 0,
    },
  },
  Equifax: {
    score: 702,
    breakdown: {
      collections: 2,
      latePayments: 2,
      chargeOffs: 1,
      inquiries: 3,
      publicRecords: 0,
    },
  },
};

export default function CreditReportDisplay({
  tradelines,
}: CreditReportDisplayProps) {
  const [showAll, setShowAll] = useState(false);
  const dataToRender =
    tradelines && tradelines.length > 0 ? tradelines : mockNegativeItems;

  const cardBg = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderCard = (item: Tradeline, idx: number) => (
    <Box
      key={`${item.creditor}-${idx}`}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      borderColor={borderColor}
      boxShadow="sm"
    >
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="lg" fontFamily="Inter, sans-serif">
          {item.creditor}
        </Text>
        <Badge
          colorScheme="green"
          fontSize="0.8em"
          fontFamily="Inter, sans-serif"
        >
          {item.bureau}
        </Badge>
      </HStack>
      <HStack justify="space-between" mb={1}>
        <Tag
          colorScheme="red"
          size="sm"
          variant="subtle"
          fontFamily="Inter, sans-serif"
        >
          <TagLeftIcon as={InfoIcon} />
          <TagLabel>{item.issue}</TagLabel>
        </Tag>
        <Text fontSize="sm" color="gray.500" fontFamily="Inter, sans-serif">
          {item.accountNumber}
        </Text>
      </HStack>
    </Box>
  );

  const renderScoreBox = (bureau: keyof typeof mockScores) => {
    const info = mockScores[bureau];
    const logoSrc = `/logos/${bureau.toLowerCase()}.png`;

    return (
      <Box
        key={bureau}
        borderWidth="1px"
        borderRadius="xl"
        p={6}
        bg={cardBg}
        borderColor={borderColor}
        boxShadow="md"
        textAlign="center"
      >
        <Image src={logoSrc} alt={`${bureau} logo`} h={8} mb={2} mx="auto" />
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="green.500"
          fontFamily="Inter, sans-serif"
        >
          {info.score}
        </Text>
        <VStack
          align="start"
          spacing={1}
          fontSize="sm"
          mt={2}
          fontFamily="Inter, sans-serif"
        >
          <Text>{info.breakdown.collections} collections</Text>
          <Text>{info.breakdown.latePayments} late payment(s)</Text>
          <Text>{info.breakdown.chargeOffs} charge-off(s)</Text>
          <Text>{info.breakdown.inquiries} inquiries</Text>
          <Text>{info.breakdown.publicRecords} public records</Text>
        </VStack>
      </Box>
    );
  };

  return (
    <Box p={6} bg="white" boxShadow="md" borderRadius="xl">
      <Heading size="md" mb={6} fontFamily="Lato, sans-serif">
        Credit Bureaus Summary
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        {Object.keys(mockScores).map((bureau) =>
          renderScoreBox(bureau as keyof typeof mockScores)
        )}
      </SimpleGrid>

      <Divider mb={6} />

      <Heading size="md" mb={6} fontFamily="Lato, sans-serif">
        Negative Tradelines
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {dataToRender.slice(0, 3).map(renderCard)}
        <Collapse in={showAll} animateOpacity style={{ gridColumn: "1 / -1" }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
            {dataToRender.slice(3).map(renderCard)}
          </SimpleGrid>
        </Collapse>
      </SimpleGrid>

      <Flex
        justify="space-between"
        align="center"
        mt={8}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        {dataToRender.length > 3 && (
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            variant="link"
            colorScheme="green"
            fontFamily="Inter, sans-serif"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
        <Button
          colorScheme="green"
          onClick={() => alert("Generate dispute PDF")}
          fontFamily="Inter, sans-serif"
        >
          Create Dispute
        </Button>
      </Flex>
    </Box>
  );
}
