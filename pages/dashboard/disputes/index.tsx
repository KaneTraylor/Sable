// pages/dashboard/disputes/index.tsx - Updated with redirect logic
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
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

interface DisputePageProps {
  hasActiveDisputes: boolean;
  disputeStats: {
    total: number;
    active: number;
    completed: number;
    successRate: number;
  };
}

export const getServerSideProps: GetServerSideProps<DisputePageProps> = async (
  ctx
) => {
  const session = await getSession(ctx);
  if (!session?.user?.email) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return { notFound: true };
  }

  // Check for active disputes
  const activeDisputes = await prisma.disputeRound.findMany({
    where: {
      userId: user.id,
      status: { in: ["sent", "investigating"] },
    },
  });

  // If user has active disputes, redirect to center
  if (activeDisputes.length > 0) {
    return {
      redirect: {
        destination: "/dashboard/disputes/center",
        permanent: false,
      },
    };
  }

  // Get dispute statistics
  const allDisputes = await prisma.disputeRound.findMany({
    where: { userId: user.id },
    include: {
      items: {
        select: { status: true },
      },
    },
  });

  const totalItems = allDisputes.reduce(
    (acc, round) => acc + round.items.length,
    0
  );
  const completedItems = allDisputes.reduce(
    (acc, round) =>
      acc + round.items.filter((item) => item.status === "resolved").length,
    0
  );

  const disputeStats = {
    total: allDisputes.length,
    active: activeDisputes.length,
    completed: allDisputes.filter((d) => d.status === "completed").length,
    successRate:
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
  };

  return {
    props: {
      hasActiveDisputes: false,
      disputeStats,
    },
  };
};

// Main content component
function DisputesContent({ disputeStats }: DisputePageProps) {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const [filter, setFilter] = useState("all");

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
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="gray.900">
              Credit Disputes
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Challenge errors and build better credit
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
              Start New Dispute
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
                  {disputeStats.completed}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Completed
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6} textAlign="center">
              <VStack spacing={2}>
                <Box p={3} bg="purple.50" borderRadius="full">
                  <TrendingUp
                    size={24}
                    color="var(--chakra-colors-purple-500)"
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
        </SimpleGrid>

        {/* Get Started Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Start New Dispute */}
          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <VStack spacing={6} align="center" textAlign="center">
                <Box p={4} bg="green.50" borderRadius="full">
                  <Target size={32} color="var(--chakra-colors-green-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="lg">Ready to Dispute?</Heading>
                  <Text color="gray.600">
                    Challenge inaccurate information on your credit reports and
                    improve your credit score.
                  </Text>
                </VStack>
                <VStack spacing={3} w="full">
                  <Button
                    colorScheme="green"
                    size="lg"
                    w="full"
                    onClick={() => router.push("/dashboard/disputes/select")}
                    leftIcon={<Plus size={16} />}
                  >
                    Start New Dispute Round
                  </Button>
                  <Text fontSize="xs" color="gray.500">
                    Free users can dispute up to 5 items every 35 days
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* How It Works */}
          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardHeader>
              <Heading size="md">How Disputes Work</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Box
                    w={8}
                    h={8}
                    bg="blue.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="sm" color="blue.600">
                      1
                    </Text>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="600" fontSize="sm">
                      Select Items to Dispute
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Choose inaccurate accounts from your credit report
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={4}>
                  <Box
                    w={8}
                    h={8}
                    bg="orange.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="sm" color="orange.600">
                      2
                    </Text>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="600" fontSize="sm">
                      Send Dispute Letters
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      We send certified letters to all three bureaus
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={4}>
                  <Box
                    w={8}
                    h={8}
                    bg="green.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="sm" color="green.600">
                      3
                    </Text>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="600" fontSize="sm">
                      Track Progress
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Monitor responses and see improvements
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Additional Resources */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md" mt={8}>
          <CardHeader>
            <Heading size="md">Dispute Resources</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
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
                    Track changes to your reports
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
                    AI Assistant
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Get personalized dispute advice
                  </Text>
                </VStack>
              </Button>

              <Button
                leftIcon={<FileText size={16} />}
                variant="ghost"
                justifyContent="flex-start"
                h="auto"
                p={4}
                _hover={{ bg: "green.50" }}
              >
                <VStack align="start" spacing={1} flex="1">
                  <Text fontWeight="600" fontSize="sm">
                    Dispute Templates
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Pre-written dispute letters
                  </Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Success Tips */}
        <Alert
          status="success"
          borderRadius="xl"
          bg="green.50"
          border="1px solid"
          borderColor="green.200"
          mt={8}
        >
          <AlertIcon />
          <Box>
            <Text fontSize="sm" fontWeight="600" color="green.800">
              💡 Pro Tips for Successful Disputes
            </Text>
            <Text fontSize="sm" color="green.700">
              Be specific about errors, keep records of all correspondence, and
              follow up if you don't hear back within 30 days.
            </Text>
          </Box>
        </Alert>
      </Container>
    </Box>
  );
}

// Main component with SidebarProvider
export default function ModernDisputesPage(props: DisputePageProps) {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DisputesContent {...props} />
    </SidebarProvider>
  );
}
