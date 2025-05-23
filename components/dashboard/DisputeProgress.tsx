// components/dashboard/DisputeProgress.tsx
import {
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  Box,
  Button,
} from "@chakra-ui/react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/router";

export function DisputeProgress() {
  const router = useRouter();

  // Mock data - replace with real data
  const disputes = [
    { id: 1, creditor: "Capital One", status: "In Review", progress: 60 },
    { id: 2, creditor: "Experian", status: "Completed", progress: 100 },
    { id: 3, creditor: "Collections Co", status: "Pending", progress: 20 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} color="var(--chakra-colors-green-500)" />;
      case "In Review":
        return <Clock size={16} color="var(--chakra-colors-orange-500)" />;
      default:
        return <AlertCircle size={16} color="var(--chakra-colors-gray-500)" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Review":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <>
      <CardHeader>
        <HStack justify="space-between">
          <Heading size="md">Active Disputes</Heading>
          <Badge colorScheme="blue" variant="subtle">
            {disputes.length}
          </Badge>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          {disputes.map((dispute) => (
            <Box key={dispute.id} p={3} bg="gray.50" borderRadius="lg">
              <HStack justify="space-between" mb={2}>
                <HStack spacing={2}>
                  {getStatusIcon(dispute.status)}
                  <Text fontWeight="600" fontSize="sm">
                    {dispute.creditor}
                  </Text>
                </HStack>
                <Badge colorScheme={getStatusColor(dispute.status)} size="sm">
                  {dispute.status}
                </Badge>
              </HStack>
              <Progress
                value={dispute.progress}
                colorScheme={getStatusColor(dispute.status)}
                size="sm"
                borderRadius="full"
              />
            </Box>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/disputes")}
          >
            View All Disputes
          </Button>
        </VStack>
      </CardBody>
    </>
  );
}
