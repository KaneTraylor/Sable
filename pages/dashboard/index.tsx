// pages/dashboard/index.tsx - Updated with collapsible sidebar support
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Skeleton,
  Alert,
  AlertIcon,
  Flex,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

// Import your existing components
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";
import CreditScoreCard from "@/components/dashboard/CreditScoreCard";
import PopupWindowOne from "@/components/dashboard/PopupWindowOne";
import PopupWindowTwo from "@/components/dashboard/PopupWindowTwo";
import { SectionErrorBoundary } from "@/components/ErrorBoundary";
import DebugDatabase from "@/components/dashboard/DebugDatabase";

// Main Dashboard Content Component
function DashboardContent() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState<"1" | "2" | null>(null);
  const { data: session } = useSession();
  const { sidebarWidth } = useSidebar(); // Get current sidebar width

  // Fetch Array token and user data
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Fetch widget token
        const tokenRes = await fetch("/api/array/getWidget");
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          setUserToken(tokenData.userToken);
        }

        // Determine which popup to show
        const last = localStorage.getItem("lastPopup");
        const next = last === "1" ? "2" : "1";
        localStorage.setItem("lastPopup", next);
        setShowPopup(next);
      } catch (error) {
        console.error("Dashboard initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const userName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      {/* Main Dashboard - Dynamic padding based on sidebar width */}
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
        <Container maxW="7xl" py={{ base: 6, md: 8 }}>
          {/* Welcome Section */}
          <Box mb={8}>
            <Flex align="center" py={4}>
              <Box>
                <Heading size="xl" color="sable.warm.900" mb={2}>
                  {getGreeting()}, {userName}
                </Heading>
                <Text color="sable.warm.600" fontSize="lg">
                  Here's what's happening with your credit today
                </Text>
              </Box>
              <Spacer />
              <Badge
                colorScheme="green"
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                Credit Building Active
              </Badge>
            </Flex>
          </Box>

          {/* Main Dashboard Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6} mb={8}>
            {/* Credit Score Card */}
            <Box gridColumn={{ base: "1", lg: "1 / 3", xl: "1 / 2" }}>
              <SectionErrorBoundary sectionName="Credit Score">
                <CreditScoreCard />
              </SectionErrorBoundary>
            </Box>

            {/* Quick Actions */}
            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <Heading size="md" mb={4}>
                Quick Actions
              </Heading>
              <VStack spacing={3} align="stretch">
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() =>
                    (window.location.href = "/dashboard/disputes/select")
                  }
                  _hover={{ bg: "red.50" }}
                  borderRadius="lg"
                  h="auto"
                  p={4}
                >
                  <VStack align="start" spacing={1} flex="1">
                    <Text fontWeight="600" fontSize="sm">
                      Start New Dispute
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Challenge errors on your report
                    </Text>
                  </VStack>
                </Button>

                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() =>
                    (window.location.href = "/dashboard/creditbuilder")
                  }
                  _hover={{ bg: "blue.50" }}
                  borderRadius="lg"
                  h="auto"
                  p={4}
                >
                  <VStack align="start" spacing={1} flex="1">
                    <Text fontWeight="600" fontSize="sm">
                      Credit Builder Loan
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Open a new loan to build credit
                    </Text>
                  </VStack>
                </Button>

                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() =>
                    (window.location.href = "/dashboard/credit-score")
                  }
                  _hover={{ bg: "green.50" }}
                  borderRadius="lg"
                  h="auto"
                  p={4}
                >
                  <VStack align="start" spacing={1} flex="1">
                    <Text fontWeight="600" fontSize="sm">
                      View Credit Trends
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      See your score history
                    </Text>
                  </VStack>
                </Button>
              </VStack>
            </Box>

            {/* Active Disputes */}
            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">Active Disputes</Heading>
                <Badge colorScheme="blue" variant="subtle">
                  3
                </Badge>
              </HStack>
              <VStack spacing={3} align="stretch">
                <Box p={3} bg="gray.50" borderRadius="lg">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600" fontSize="sm">
                      Capital One
                    </Text>
                    <Badge colorScheme="orange" size="sm">
                      In Review
                    </Badge>
                  </HStack>
                  <Box bg="orange.200" h="4px" borderRadius="full">
                    <Box bg="orange.500" h="4px" w="60%" borderRadius="full" />
                  </Box>
                </Box>

                <Box p={3} bg="gray.50" borderRadius="lg">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600" fontSize="sm">
                      Experian
                    </Text>
                    <Badge colorScheme="green" size="sm">
                      Completed
                    </Badge>
                  </HStack>
                  <Box bg="green.200" h="4px" borderRadius="full">
                    <Box bg="green.500" h="4px" w="100%" borderRadius="full" />
                  </Box>
                </Box>

                <Box p={3} bg="gray.50" borderRadius="lg">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600" fontSize="sm">
                      Collections Co
                    </Text>
                    <Badge colorScheme="gray" size="sm">
                      Pending
                    </Badge>
                  </HStack>
                  <Box bg="gray.200" h="4px" borderRadius="full">
                    <Box bg="gray.400" h="4px" w="20%" borderRadius="full" />
                  </Box>
                </Box>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/dashboard/disputes")}
                >
                  View All Disputes
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Array Integration Widget */}
          <Box bg="white" borderRadius="lg" boxShadow="md" p={6} mb={6}>
            <HStack justify="space-between" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="md">Credit Overview</Heading>
                <Text fontSize="sm" color="gray.600">
                  Powered by Array - Live credit data
                </Text>
              </VStack>
              <Badge colorScheme="green" variant="subtle">
                Live Data
              </Badge>
            </HStack>

            <SectionErrorBoundary sectionName="Array Credit Overview">
              <SimpleArrayWidget userToken={userToken} />
            </SectionErrorBoundary>
          </Box>

          {/* Bottom Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <Heading size="sm" mb={4}>
                Account Summary
              </Heading>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm">Active Disputes</Text>
                  <Badge colorScheme="orange">3</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Credit Builder Loan</Text>
                  <Badge colorScheme="green">Active</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Last Report Update</Text>
                  <Text fontSize="sm" color="gray.600">
                    2 days ago
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Current Score Range</Text>
                  <Text fontSize="sm" color="green.600" fontWeight="600">
                    Good
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <Heading size="sm" mb={4}>
                Credit Insights
              </Heading>
              <VStack spacing={3} align="stretch">
                <Box p={3} bg="green.50" borderRadius="lg">
                  <Text fontWeight="600" fontSize="sm" color="green.700">
                    Score Improved
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Up 12 points this month
                  </Text>
                </Box>
                <Box p={3} bg="blue.50" borderRadius="lg">
                  <Text fontWeight="600" fontSize="sm" color="blue.700">
                    Utilization Low
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Keep it under 30%
                  </Text>
                </Box>
                <Box p={3} bg="purple.50" borderRadius="lg">
                  <Text fontWeight="600" fontSize="sm" color="purple.700">
                    Payment Streak
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    6 months on-time
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
              <Heading size="sm" mb={4}>
                Next Steps
              </Heading>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm">• Review disputed items</Text>
                <Text fontSize="sm">• Make next loan payment</Text>
                <Text fontSize="sm">• Check credit report updates</Text>
                <Text fontSize="sm">• Monitor utilization ratio</Text>
                <Button colorScheme="green" size="sm" mt={2}>
                  View Action Plan
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Popups */}
      {showPopup === "1" && <PopupWindowOne />}
      {showPopup === "2" && <PopupWindowTwo />}
    </>
  );
}

// Main Dashboard Component with Sidebar Provider
export default function ModernDashboard() {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DashboardContent />
      <DebugDatabase />
    </SidebarProvider>
  );
}

// Simple Array Widget Component
function SimpleArrayWidget({ userToken }: { userToken: string | null }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userToken) return;
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [userToken]);

  if (!userToken) {
    return (
      <Alert status="warning" borderRadius="lg">
        <AlertIcon />
        <Text>Authentication required to load credit data</Text>
      </Alert>
    );
  }

  if (loading) {
    return (
      <VStack spacing={4}>
        <Skeleton height="60px" borderRadius="lg" />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
          <Skeleton height="80px" borderRadius="lg" />
          <Skeleton height="80px" borderRadius="lg" />
          <Skeleton height="80px" borderRadius="lg" />
        </SimpleGrid>
        <Skeleton height="100px" borderRadius="lg" />
      </VStack>
    );
  }

  return (
    <Box p={6} bg="gray.50" borderRadius="lg" textAlign="center">
      <Text fontSize="lg" fontWeight="600" mb={2}>
        Array Widget Placeholder
      </Text>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Your Array credit overview widget will load here
      </Text>
      <HStack justify="center" spacing={4} mb={4}>
        <Badge colorScheme="blue">Connected to Array API</Badge>
        <Badge colorScheme="green">Sandbox Mode</Badge>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        <Box p={4} bg="white" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            720
          </Text>
          <Text fontSize="sm" color="gray.600">
            Equifax
          </Text>
        </Box>
        <Box p={4} bg="white" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            715
          </Text>
          <Text fontSize="sm" color="gray.600">
            TransUnion
          </Text>
        </Box>
        <Box p={4} bg="white" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            710
          </Text>
          <Text fontSize="sm" color="gray.600">
            Experian
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

// Loading skeleton
function DashboardSkeleton() {
  const { sidebarWidth } = useSidebar();

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{ base: "0", md: `${sidebarWidth + 20}px` }}
      pb={{ base: "80px", md: "20px" }}
      transition="padding-left 0.3s ease"
    >
      <Container maxW="7xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" borderRadius="lg" />
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Skeleton height="300px" borderRadius="lg" />
            <Skeleton height="300px" borderRadius="lg" />
          </SimpleGrid>
          <Skeleton height="200px" borderRadius="lg" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Skeleton height="150px" borderRadius="lg" />
            <Skeleton height="150px" borderRadius="lg" />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
