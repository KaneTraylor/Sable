// components/dashboard/DisputeProgress.tsx - Enhanced version
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
  Avatar,
  AvatarGroup,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/router";

export function DisputeProgress() {
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.700");

  // Mock data - replace with real data
  const disputes = [
    {
      id: 1,
      creditor: "Capital One",
      status: "In Review",
      progress: 60,
      daysLeft: 23,
      priority: "high",
      bureaus: ["EXP", "TU"],
    },
    {
      id: 2,
      creditor: "Collections Inc",
      status: "Investigation",
      progress: 85,
      daysLeft: 12,
      priority: "medium",
      bureaus: ["EQ"],
    },
    {
      id: 3,
      creditor: "Synchrony Bank",
      status: "Pending",
      progress: 25,
      daysLeft: 35,
      priority: "low",
      bureaus: ["EXP", "TU", "EQ"],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} color="var(--chakra-colors-green-500)" />;
      case "In Review":
      case "Investigation":
        return <Clock size={16} color="var(--chakra-colors-blue-500)" />;
      default:
        return (
          <AlertTriangle size={16} color="var(--chakra-colors-orange-500)" />
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Review":
      case "Investigation":
        return "blue";
      default:
        return "orange";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red.500";
      case "medium":
        return "orange.500";
      case "low":
        return "gray.500";
      default:
        return "gray.500";
    }
  };

  const totalDisputes = disputes.length;
  const averageProgress = Math.round(
    disputes.reduce((acc, d) => acc + d.progress, 0) / disputes.length
  );

  return (
    <>
      <CardHeader>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Heading size="md">Active Disputes</Heading>
            <Badge
              colorScheme="blue"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
            >
              {totalDisputes} Active
            </Badge>
          </HStack>

          {/* Overall Progress Summary */}
          <Box p={3} bg="gray.50" borderRadius="lg">
            <HStack justify="space-between" mb={2}>
              <HStack spacing={2}>
                <TrendingUp size={16} color="var(--chakra-colors-green-500)" />
                <Text fontSize="sm" fontWeight="600">
                  Overall Progress
                </Text>
              </HStack>
              <Text fontSize="sm" fontWeight="700" color="green.600">
                {averageProgress}%
              </Text>
            </HStack>
            <Progress
              value={averageProgress}
              colorScheme="green"
              size="sm"
              borderRadius="full"
            />
          </Box>
        </VStack>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          {disputes.map((dispute) => (
            <Box
              key={dispute.id}
              p={4}
              bg="white"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.100"
              _hover={{ borderColor: "gray.200", shadow: "sm" }}
              transition="all 0.2s"
            >
              {/* Header */}
              <Flex justify="space-between" align="start" mb={3}>
                <VStack align="start" spacing={1}>
                  <HStack spacing={2}>
                    <Box
                      w={3}
                      h={3}
                      bg={getPriorityColor(dispute.priority)}
                      borderRadius="full"
                    />
                    <Text fontWeight="600" fontSize="sm">
                      {dispute.creditor}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    {getStatusIcon(dispute.status)}
                    <Badge
                      colorScheme={getStatusColor(dispute.status)}
                      size="sm"
                      variant="subtle"
                    >
                      {dispute.status}
                    </Badge>
                  </HStack>
                </VStack>

                <VStack align="end" spacing={1}>
                  <HStack spacing={1}>
                    <Calendar size={12} color="var(--chakra-colors-gray-500)" />
                    <Text fontSize="xs" color="gray.500">
                      {dispute.daysLeft} days left
                    </Text>
                  </HStack>
                  <AvatarGroup size="xs" max={3}>
                    {dispute.bureaus.map((bureau) => (
                      <Avatar
                        key={bureau}
                        name={bureau}
                        size="xs"
                        bg="gray.200"
                        color="gray.600"
                        fontSize="8px"
                      />
                    ))}
                  </AvatarGroup>
                </VStack>
              </Flex>

              {/* Progress Bar */}
              <VStack spacing={2} align="stretch">
                <Flex justify="space-between" align="center">
                  <Text fontSize="xs" color="gray.500">
                    Progress
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color={getStatusColor(dispute.status) + ".600"}
                  >
                    {dispute.progress}%
                  </Text>
                </Flex>
                <Progress
                  value={dispute.progress}
                  colorScheme={getStatusColor(dispute.status)}
                  size="sm"
                  borderRadius="full"
                />
              </VStack>
            </Box>
          ))}

          {/* Action Buttons */}
          <VStack spacing={2} pt={2}>
            <Button
              variant="outline"
              size="sm"
              w="full"
              onClick={() => router.push("/dashboard/disputes")}
            >
              View All Disputes
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              w="full"
              onClick={() => router.push("/dashboard/disputes/select")}
            >
              Start New Dispute
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </>
  );
}
