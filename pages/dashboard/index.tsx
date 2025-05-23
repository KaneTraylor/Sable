// pages/dashboard/disputes/index.tsx - Fixed with collapsible sidebar support
import React, { useState } from "react";
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
  SimpleGrid,
  Badge,
  Progress,
  Avatar,
  AvatarGroup,
  Flex,
  Spacer,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter,
  MoreVertical,
  ArrowRight,
  Target,
  Zap,
  Shield,
  Download,
  Eye,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";
import { SectionErrorBoundary } from "@/components/ErrorBoundary";

// Mock data - replace with real API calls
const disputeStats = {
  total: 12,
  active: 3,
  completed: 7,
  pending: 2,
  successRate: 78,
  avgDays: 42,
};

const activeDisputes = [
  {
    id: 1,
    creditor: "Capital One",
    account: "****1234",
    type: "Late Payment",
    status: "In Review",
    progress: 65,
    daysLeft: 23,
    bureau: ["Experian", "TransUnion"],
    priority: "high",
    lastUpdate: "2 days ago",
  },
  {
    id: 2,
    creditor: "Collections Inc",
    account: "****5678",
    type: "Collections",
    status: "Verification",
    progress: 30,
    daysLeft: 35,
    bureau: ["Equifax"],
    priority: "medium",
    lastUpdate: "5 days ago",
  },
  {
    id: 3,
    creditor: "Synchrony Bank",
    account: "****9012",
    type: "Account Error",
    status: "Investigation",
    progress: 80,
    daysLeft: 12,
    bureau: ["Experian", "TransUnion", "Equifax"],
    priority: "low",
    lastUpdate: "1 day ago",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Dispute Updated",
    creditor: "Capital One",
    status: "moved to Investigation phase",
    time: "2 hours ago",
    type: "update",
  },
  {
    id: 2,
    action: "Response Received",
    creditor: "Experian Bureau",
    status: "acknowledged your dispute",
    time: "1 day ago",
    type: "response",
  },
  {
    id: 3,
    action: "Dispute Resolved",
    creditor: "Old Navy Card",
    status: "removed from your report",
    time: "3 days ago",
    type: "success",
  },
];

// Main content component that uses sidebar context
function DisputesContent() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const cardBg = useColorModeValue("white", "gray.700");
  const statsBg = useColorModeValue("gray.50", "gray.600");
  const { sidebarWidth } = useSidebar(); // Get current sidebar width

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "resolved":
        return "green";
      case "in review":
      case "investigation":
        return "blue";
      case "verification":
        return "orange";
      case "pending":
        return "gray";
      default:
        return "gray";
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

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{
        base: "0", // Mobile: no left padding (bottom nav)
        md: `${sidebarWidth + 20}px`, // Desktop: sidebar width + margin
      }}
      pb={{ base: "80px", md: "20px" }} // Bottom padding for mobile nav
      transition="padding-left 0.3s ease" // Smooth transition when sidebar toggles
    >
      <Container maxW="7xl" py={8}>
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="gray.900">
              Credit Disputes
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Track and manage your credit report disputes
            </Text>
          </VStack>
          <HStack spacing={3}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Filter size={16} />}
                variant="outline"
                size="md"
              />
              <MenuList>
                <MenuItem onClick={() => setFilter("all")}>
                  All Disputes
                </MenuItem>
                <MenuItem onClick={() => setFilter("active")}>
                  Active Only
                </MenuItem>
                <MenuItem onClick={() => setFilter("completed")}>
                  Completed
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              leftIcon={<Plus size={16} />}
              colorScheme="green"
              size="lg"
              onClick={() => router.push("/dashboard/disputes/select")}
              borderRadius="xl"
              px={8}
            >
              New Dispute
            </Button>
          </HStack>
        </Flex>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6} textAlign="center">
              <VStack spacing={2}>
                <Box p={3} bg="blue.50" borderRadius="full">
                  <FileText size={24} color="var(--chakra-colors-blue-500)" />
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  {disputeStats.total}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Total Disputes
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6} textAlign="center">
              <VStack spacing={2}>
                <Box p={3} bg="orange.50" borderRadius="full">
                  <Clock size={24} color="var(--chakra-colors-orange-500)" />
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  {disputeStats.active}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Active Disputes
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6} textAlign="center">
              <VStack spacing={2}>
                <Box p={3} bg="green.50" borderRadius="full">
                  <CheckCircle
                    size={24}
                    color="var(--chakra-colors-green-500)"
                  />
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  {disputeStats.successRate}%
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Success Rate
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6} textAlign="center">
              <VStack spacing={2}>
                <Box p={3} bg="purple.50" borderRadius="full">
                  <Calendar size={24} color="var(--chakra-colors-purple-500)" />
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  {disputeStats.avgDays}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Avg Days
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Main Content Grid */}
        <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={8}>
          {/* Active Disputes - Takes up 2 columns on XL screens */}
          <Box gridColumn={{ base: "1", xl: "1 / 3" }}>
            <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Heading size="md">Active Disputes</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {disputeStats.active} disputes in progress
                    </Text>
                  </VStack>
                  <Badge
                    colorScheme="blue"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {disputeStats.active} Active
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  {activeDisputes.map((dispute) => (
                    <Card key={dispute.id} variant="outline" borderRadius="lg">
                      <CardBody p={5}>
                        <Flex justify="space-between" align="start" mb={4}>
                          <VStack align="start" spacing={2}>
                            <HStack spacing={3}>
                              <Box
                                w={3}
                                h={3}
                                bg={getPriorityColor(dispute.priority)}
                                borderRadius="full"
                              />
                              <Heading size="sm">{dispute.creditor}</Heading>
                              <Badge
                                colorScheme={getStatusColor(dispute.status)}
                                variant="subtle"
                                size="sm"
                              >
                                {dispute.status}
                              </Badge>
                            </HStack>
                            <HStack spacing={4} fontSize="sm" color="gray.600">
                              <Text>{dispute.account}</Text>
                              <Text>•</Text>
                              <Text>{dispute.type}</Text>
                              <Text>•</Text>
                              <Text>{dispute.lastUpdate}</Text>
                            </HStack>
                          </VStack>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<MoreVertical size={16} />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem icon={<Eye size={16} />}>
                                View Details
                              </MenuItem>
                              <MenuItem icon={<Download size={16} />}>
                                Download Letter
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>

                        {/* Progress Section */}
                        <VStack spacing={3} align="stretch">
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" fontWeight="600">
                              Progress
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {dispute.daysLeft} days left
                            </Text>
                          </Flex>
                          <Progress
                            value={dispute.progress}
                            colorScheme={getStatusColor(dispute.status)}
                            size="md"
                            borderRadius="full"
                          />
                          <HStack justify="space-between">
                            <HStack spacing={2}>
                              <Text fontSize="xs" color="gray.500">
                                Bureaus:
                              </Text>
                              <AvatarGroup size="xs" max={3}>
                                {dispute.bureau.map((bureau) => (
                                  <Avatar
                                    key={bureau}
                                    name={bureau}
                                    size="xs"
                                    bg="gray.100"
                                    color="gray.600"
                                    fontSize="8px"
                                  />
                                ))}
                              </AvatarGroup>
                            </HStack>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color={getStatusColor(dispute.status) + ".500"}
                            >
                              {dispute.progress}%
                            </Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}

                  <Button
                    variant="ghost"
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => router.push("/dashboard/disputes/all")}
                  >
                    View All Disputes
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </Box>

          {/* Sidebar - Recent Activity & Quick Actions */}
          <VStack spacing={6} align="stretch">
            {/* Quick Actions */}
            <Card bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardHeader>
                <Heading size="sm">Quick Actions</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <VStack spacing={3} align="stretch">
                  <Button
                    leftIcon={<Target size={16} />}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    p={4}
                    onClick={() => router.push("/dashboard/disputes/select")}
                    _hover={{ bg: "red.50" }}
                  >
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="600" fontSize="sm">
                        Start New Dispute
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Challenge credit report errors
                      </Text>
                    </VStack>
                  </Button>

                  <Button
                    leftIcon={<Zap size={16} />}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    p={4}
                    _hover={{ bg: "orange.50" }}
                  >
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="600" fontSize="sm">
                        AI Dispute Assistant
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Get personalized recommendations
                      </Text>
                    </VStack>
                  </Button>

                  <Button
                    leftIcon={<Shield size={16} />}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    p={4}
                    _hover={{ bg: "blue.50" }}
                  >
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="600" fontSize="sm">
                        Credit Monitoring
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Track report changes
                      </Text>
                    </VStack>
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardHeader>
                <Heading size="sm">Recent Activity</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  {recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <HStack spacing={3} align="start">
                        <Box
                          w={8}
                          h={8}
                          bg={
                            activity.type === "success"
                              ? "green.50"
                              : activity.type === "update"
                              ? "blue.50"
                              : "orange.50"
                          }
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {activity.type === "success" && (
                            <CheckCircle
                              size={14}
                              color="var(--chakra-colors-green-500)"
                            />
                          )}
                          {activity.type === "update" && (
                            <Clock
                              size={14}
                              color="var(--chakra-colors-blue-500)"
                            />
                          )}
                          {activity.type === "response" && (
                            <FileText
                              size={14}
                              color="var(--chakra-colors-orange-500)"
                            />
                          )}
                        </Box>
                        <VStack align="start" spacing={1} flex="1">
                          <Text fontSize="sm" fontWeight="600">
                            {activity.action}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {activity.creditor} {activity.status}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {activity.time}
                          </Text>
                        </VStack>
                      </HStack>
                      {index < recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Success Tip */}
            <Alert
              status="success"
              borderRadius="xl"
              bg="green.50"
              border="1px solid"
              borderColor="green.200"
            >
              <AlertIcon />
              <Box>
                <Text fontSize="sm" fontWeight="600" color="green.800">
                  Pro Tip
                </Text>
                <Text fontSize="xs" color="green.700">
                  Check your credit reports monthly to catch errors early and
                  dispute them quickly.
                </Text>
              </Box>
            </Alert>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

// Main component with SidebarProvider wrapper
export default function ModernDisputesPage() {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DisputesContent />
    </SidebarProvider>
  );
}
