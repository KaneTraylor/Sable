// components/dashboard/QuickActions.tsx
import {
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FileText,
  CreditCard,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    icon: FileText,
    title: "Start New Dispute",
    description: "Challenge errors on your report",
    href: "/dashboard/disputes/select",
    color: "red.500",
    bgColor: "red.50",
  },
  {
    icon: CreditCard,
    title: "Credit Builder Loan",
    description: "Open a new loan to build credit",
    href: "/dashboard/creditbuilder",
    color: "blue.500",
    bgColor: "blue.50",
  },
  {
    icon: TrendingUp,
    title: "View Credit Trends",
    description: "See your score history",
    href: "/dashboard/credit-score",
    color: "green.500",
    bgColor: "green.50",
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <>
      <CardHeader>
        <Heading size="md">Quick Actions</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3} align="stretch">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              h="auto"
              p={4}
              justifyContent="flex-start"
              onClick={() => router.push(action.href)}
              _hover={{ bg: action.bgColor }}
              borderRadius="lg"
            >
              <HStack spacing={3} w="full">
                <Box
                  p={2}
                  bg={action.bgColor}
                  borderRadius="md"
                  color={action.color}
                >
                  <Icon as={action.icon} boxSize={4} />
                </Box>
                <VStack align="start" spacing={0} flex="1">
                  <Text fontWeight="600" fontSize="sm">
                    {action.title}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {action.description}
                  </Text>
                </VStack>
                <ArrowRight size={16} color="var(--chakra-colors-gray-400)" />
              </HStack>
            </Button>
          ))}
        </VStack>
      </CardBody>
    </>
  );
}
