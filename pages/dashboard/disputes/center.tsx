// pages/dashboard/disputes/center.tsx - Modernized dispute center
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
  Progress,
  Badge,
  Alert,
  AlertIcon,
  SimpleGrid,
  Flex,
  Spacer,
  useColorModeValue,
  Icon,
  Divider,
  Avatar,
  AvatarGroup,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineSeparator,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Mail,
  FileText,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Plus,
  Download,
  Eye,
  MoreVertical,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";

interface DisputeRoundData {
  id: number;
  status: string;
  createdAt: string;
  sentAt: string | null;
  deliveryMethod: string | null;
  trackingNumbers: string[];
  estimatedResponseDate: string | null;
  items: {
    id: number;
    accountName: string;
    creditorName: string;
    bureau: string;
    reason: string;
    status: string;
    canDisputeAgain: string | null;
    responseReceived: boolean;
    outcome: string | null;
  }[];
}

interface DisputeCenterProps {
  disputeRounds: DisputeRoundData[];
  user: {
    plan: string | null;
    nextDisputeDate: string | null;
  };
}

export const getServerSideProps: GetServerSideProps<
  DisputeCenterProps
> = async (ctx) => {
  const session = await getSession(ctx);
  if (!session?.user?.email) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      plan: true,
      nextDisputeAt: true,
    },
  });

  if (!user) {
    return { notFound: true };
  }

  const disputeRounds = await prisma.disputeRound.findMany({
    where: { userId: user.id },
    include: {
      items: {
        select: {
          id: true,
          accountName: true,
          creditorName: true,
          bureau: true,
          reason: true,
          status: true,
          canDisputeAgain: true,
          responseReceived: true,
          outcome: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return {
    props: {
      disputeRounds: disputeRounds.map((round) => ({
        ...round,
        createdAt: round.createdAt.toISOString(),
        sentAt: round.sentAt?.toISOString() || null,
        estimatedResponseDate:
          round.estimatedResponseDate?.toISOString() || null,
        items: round.items.map((item) => ({
          ...item,
          canDisputeAgain: item.canDisputeAgain?.toISOString() || null,
        })),
      })),
      user: {
        plan: user.plan,
        nextDisputeDate: user.nextDisputeAt?.toISOString() || null,
      },
    },
  };
};

// Main content component
function DisputeCenterContent({ disputeRounds, user }: DisputeCenterProps) {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const [activeRound, setActiveRound] = useState<DisputeRoundData | null>(
    disputeRounds.find(
      (r) => r.status === "sent" || r.status === "investigating"
    ) ||
      disputeRounds[0] ||
      null
  );

  const canDisputeAgain = () => {
    if (!user.nextDisputeDate) return true;
    return new Date() >= new Date(user.nextDisputeDate);
  };

  const getDaysUntilNextDispute = () => {
    if (!user.nextDisputeDate) return 0;
    const now = new Date();
    const nextDate = new Date(user.nextDisputeDate);
    const diffTime = nextDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "resolved":
        return "green";
      case "sent":
      case "investigating":
        return "blue";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "resolved":
        return CheckCircle;
      case "sent":
      case "investigating":
        return Clock;
      case "pending":
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  const getBureauLogo = (bureau: string) => {
    // In a real app, these would be actual bureau logos
    const colors = {
      Equifax: "red.500",
      TransUnion: "blue.500",
      Experian: "green.500",
    };
    return colors[bureau as keyof typeof colors] || "gray.500";
  };

  const daysUntilNext = getDaysUntilNextDispute();

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{ base: "0", md: `${sidebarWidth + 20}px` }}
      pb={{ base: "80px", md: "20px" }}
      transition="padding-left 0.3s ease"
    >
      <Container maxW="6xl" py={8}>
        {/* Header */}
        <VStack spacing={6} align="stretch" mb={8}>
          <HStack spacing={4}>
            <Button
              leftIcon={<ArrowLeft size={16} />}
              variant="ghost"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
            <Spacer />
            <HStack spacing={3}>
              <Button
                leftIcon={<RefreshCw size={16} />}
                variant="outline"
                size="sm"
                onClick={() => router.reload()}
              >
                Refresh
              </Button>
              {canDisputeAgain() && (
                <Button
                  leftIcon={<Plus size={16} />}
                  colorScheme="green"
                  onClick={() => router.push("/dashboard/disputes/select")}
                >
                  New Dispute Round
                </Button>
              )}
            </HStack>
          </HStack>

          {/* Cooldown Banner */}
          {!canDisputeAgain() && daysUntilNext > 0 && (
            <Alert
              status="info"
              borderRadius="xl"
              bg="blue.50"
              border="1px solid"
              borderColor="blue.200"
            >
              <AlertIcon />
              <Box>
                <Text fontSize="sm" fontWeight="600" color="blue.800">
                  Dispute Cooldown Period Active
                </Text>
                <Text fontSize="sm" color="blue.700">
                  You can dispute again in {daysUntilNext} day
                  {daysUntilNext !== 1 ? "s" : ""}. Credit bureaus require a
                  35-day waiting period between dispute rounds.
                </Text>
              </Box>
            </Alert>
          )}

          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <VStack spacing={6} align="center" textAlign="center">
                <Box p={4} bg="blue.50" borderRadius="full">
                  <Shield size={32} color="var(--chakra-colors-blue-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="xl" color="gray.900">
                    Dispute Center
                  </Heading>
                  <Text color="gray.600" fontSize="lg" maxW="2xl">
                    Track the progress of your credit report disputes and
                    monitor bureau responses
                  </Text>
                </VStack>

                {/* Quick Stats */}
                <SimpleGrid columns={3} spacing={8} w="full" maxW="lg">
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                      {
                        disputeRounds.filter(
                          (r) =>
                            r.status === "sent" || r.status === "investigating"
                        ).length
                      }
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Active Disputes
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="green.500">
                      {
                        disputeRounds.filter((r) => r.status === "completed")
                          .length
                      }
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Completed
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                      {disputeRounds.reduce(
                        (acc, r) => acc + r.items.length,
                        0
                      )}
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Total Items
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        {disputeRounds.length === 0 ? (
          /* No Disputes State */
          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={12} textAlign="center">
              <VStack spacing={6}>
                <Box p={4} bg="gray.50" borderRadius="full">
                  <FileText size={32} color="var(--chakra-colors-gray-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="lg">No Disputes Yet</Heading>
                  <Text color="gray.600">
                    You haven't started any disputes. Ready to challenge errors
                    on your credit report?
                  </Text>
                </VStack>
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={() => router.push("/dashboard/disputes/select")}
                  leftIcon={<Plus size={16} />}
                >
                  Start Your First Dispute
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          /* Active Disputes */
          <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={8}>
            {/* Left Panel - Dispute Rounds List */}
            <Box gridColumn={{ base: "1", xl: "1" }}>
              <Card bg={cardBg} borderRadius="xl" boxShadow="md">
                <CardHeader>
                  <Heading size="md">Dispute History</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={3} align="stretch">
                    {disputeRounds.map((round) => (
                      <Card
                        key={round.id}
                        variant={
                          activeRound?.id === round.id ? "solid" : "outline"
                        }
                        borderColor={
                          activeRound?.id === round.id
                            ? "green.500"
                            : "gray.200"
                        }
                        cursor="pointer"
                        onClick={() => setActiveRound(round)}
                        _hover={{ borderColor: "green.300" }}
                        borderRadius="lg"
                      >
                        <CardBody p={4}>
                          <VStack align="start" spacing={2}>
                            <HStack justify="space-between" w="full">
                              <HStack spacing={2}>
                                <Icon
                                  as={getStatusIcon(round.status)}
                                  color={`${getStatusColor(round.status)}.500`}
                                  boxSize={4}
                                />
                                <Badge
                                  colorScheme={getStatusColor(round.status)}
                                  variant="subtle"
                                  size="sm"
                                >
                                  {round.status}
                                </Badge>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                {round.items.length} items
                              </Text>
                            </HStack>
                            <Text fontSize="sm" fontWeight="600">
                              Round #{round.id}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {new Date(round.createdAt).toLocaleDateString()}
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </Box>

            {/* Right Panel - Active Dispute Details */}
            <Box gridColumn={{ base: "1", xl: "2 / 4" }}>
              {activeRound && (
                <VStack spacing={6} align="stretch">
                  {/* Status Timeline */}
                  <Card bg={cardBg} borderRadius="xl" boxShadow="md">
                    <CardHeader>
                      <HStack justify="space-between">
                        <Heading size="md">Progress Timeline</Heading>
                        <Badge
                          colorScheme={getStatusColor(activeRound.status)}
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          {activeRound.status}
                        </Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack spacing={6} align="stretch">
                        {/* Timeline Steps */}
                        <VStack spacing={4} align="stretch">
                          {[
                            {
                              title: "Disputes Created",
                              date: new Date(
                                activeRound.createdAt
                              ).toLocaleDateString(),
                              status: "completed",
                              icon: FileText,
                            },
                            {
                              title: "Letters Sent",
                              date: activeRound.sentAt
                                ? new Date(
                                    activeRound.sentAt
                                  ).toLocaleDateString()
                                : null,
                              status: activeRound.sentAt
                                ? "completed"
                                : "pending",
                              icon: Mail,
                            },
                            {
                              title: "Bureau Investigation",
                              date:
                                activeRound.status === "investigating"
                                  ? "In Progress"
                                  : null,
                              status:
                                activeRound.status === "investigating"
                                  ? "active"
                                  : "pending",
                              icon: Clock,
                            },
                            {
                              title: "Results Received",
                              date: activeRound.estimatedResponseDate
                                ? new Date(
                                    activeRound.estimatedResponseDate
                                  ).toLocaleDateString()
                                : "30-45 days",
                              status:
                                activeRound.status === "completed"
                                  ? "completed"
                                  : "pending",
                              icon: CheckCircle,
                            },
                          ].map((step, index) => (
                            <HStack key={index} spacing={4} align="start">
                              <VStack spacing={0}>
                                <Box
                                  p={2}
                                  bg={`${
                                    step.status === "completed"
                                      ? "green"
                                      : step.status === "active"
                                      ? "blue"
                                      : "gray"
                                  }.${
                                    step.status === "completed" ? "500" : "100"
                                  }`}
                                  borderRadius="full"
                                  border={
                                    step.status === "active"
                                      ? "2px solid"
                                      : "none"
                                  }
                                  borderColor={
                                    step.status === "active"
                                      ? "blue.500"
                                      : "transparent"
                                  }
                                >
                                  <Icon
                                    as={step.icon}
                                    boxSize={4}
                                    color={
                                      step.status === "completed"
                                        ? "white"
                                        : step.status === "active"
                                        ? "blue.500"
                                        : "gray.500"
                                    }
                                  />
                                </Box>
                                {index < 3 && (
                                  <Box
                                    w="2px"
                                    h="12"
                                    bg={
                                      step.status === "completed"
                                        ? "green.200"
                                        : "gray.200"
                                    }
                                    mt={2}
                                  />
                                )}
                              </VStack>
                              <VStack align="start" spacing={1} flex="1">
                                <Text fontWeight="600" fontSize="sm">
                                  {step.title}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {step.date || "Pending"}
                                </Text>
                              </VStack>
                            </HStack>
                          ))}
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Disputed Items */}
                  <Card bg={cardBg} borderRadius="xl" boxShadow="md">
                    <CardHeader>
                      <HStack justify="space-between">
                        <Heading size="md">
                          Disputed Items ({activeRound.items.length})
                        </Heading>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={16} />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<Download size={16} />}>
                              Download Letters
                            </MenuItem>
                            <MenuItem icon={<Eye size={16} />}>
                              View Details
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack spacing={4} align="stretch">
                        {activeRound.items.map((item) => (
                          <Card
                            key={item.id}
                            variant="outline"
                            borderRadius="lg"
                          >
                            <CardBody p={4}>
                              <VStack align="start" spacing={3}>
                                <HStack justify="space-between" w="full">
                                  <VStack align="start" spacing={1}>
                                    <Text fontWeight="600" fontSize="sm">
                                      {item.accountName}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                      {item.creditorName}
                                    </Text>
                                  </VStack>
                                  <VStack align="end" spacing={1}>
                                    <Badge
                                      colorScheme={getStatusColor(item.status)}
                                      variant="subtle"
                                      size="sm"
                                    >
                                      {item.status}
                                    </Badge>
                                    <Avatar
                                      name={item.bureau}
                                      size="xs"
                                      bg={getBureauLogo(item.bureau)}
                                      color="white"
                                      fontSize="8px"
                                    />
                                  </VStack>
                                </HStack>
                                <HStack
                                  spacing={4}
                                  fontSize="xs"
                                  color="gray.600"
                                >
                                  <Text>
                                    <strong>Reason:</strong> {item.reason}
                                  </Text>
                                </HStack>
                                {item.outcome && (
                                  <HStack spacing={2}>
                                    <Badge colorScheme="green" size="sm">
                                      {item.outcome}
                                    </Badge>
                                    <Text fontSize="xs" color="gray.600">
                                      Response received
                                    </Text>
                                  </HStack>
                                )}
                                {item.canDisputeAgain && (
                                  <Text fontSize="xs" color="gray.500">
                                    Can dispute again:{" "}
                                    {new Date(
                                      item.canDisputeAgain
                                    ).toLocaleDateString()}
                                  </Text>
                                )}
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Tracking Information */}
                  {activeRound.trackingNumbers.length > 0 && (
                    <Card bg={cardBg} borderRadius="xl" boxShadow="md">
                      <CardHeader>
                        <HStack>
                          <Truck
                            size={20}
                            color="var(--chakra-colors-purple-500)"
                          />
                          <Heading size="md">Tracking Information</Heading>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={3} align="stretch">
                          {activeRound.trackingNumbers.map(
                            (trackingNumber, index) => (
                              <HStack
                                key={index}
                                justify="space-between"
                                p={3}
                                bg="gray.50"
                                borderRadius="lg"
                              >
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="600" fontSize="sm">
                                    Bureau #{index + 1}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    Tracking: {trackingNumber}
                                  </Text>
                                </VStack>
                                <Badge colorScheme="green" variant="subtle">
                                  Delivered
                                </Badge>
                              </HStack>
                            )
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                  )}
                </VStack>
              )}
            </Box>
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}

// Main component with SidebarProvider
export default function ModernDisputeCenterPage(props: DisputeCenterProps) {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DisputeCenterContent {...props} />
    </SidebarProvider>
  );
}
