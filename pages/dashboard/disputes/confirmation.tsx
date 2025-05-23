// pages/dashboard/disputes/confirmation.tsx - Modernized confirmation page
import { useEffect, useState } from "react";
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
  Badge,
  SimpleGrid,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  Icon,
  Divider,
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineTrack,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
} from "@chakra-ui/react";
import {
  CheckCircle,
  Clock,
  Mail,
  FileText,
  Calendar,
  Bell,
  ArrowRight,
  Download,
  Eye,
  Sparkles,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";

// Main content component
function ConfirmationContent() {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Store a flag so user can revisit this confirmation page
    localStorage.setItem("sable_confirmation_seen", "true");

    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const today = new Date();
  const estimatedResponse = new Date(
    today.getTime() + 45 * 24 * 60 * 60 * 1000
  );

  const disputeStats = {
    totalItems: 3,
    bureaus: ["Equifax", "TransUnion", "Experian"],
    estimatedDays: "45-60",
    trackingNumbers: ["US1234567890", "US0987654321", "US1122334455"],
  };

  const timelineSteps = [
    {
      title: "Disputes Submitted",
      description: "Your dispute letters have been sent via certified mail",
      status: "completed",
      date: today.toLocaleDateString(),
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Bureau Review",
      description: "Credit bureaus are investigating your disputes",
      status: "active",
      date: "In Progress",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Investigation Complete",
      description: "Bureaus will send results and updated credit reports",
      status: "pending",
      date: estimatedResponse.toLocaleDateString(),
      icon: Mail,
      color: "gray",
    },
  ];

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{ base: "0", md: `${sidebarWidth + 20}px` }}
      pb={{ base: "80px", md: "20px" }}
      transition="padding-left 0.3s ease"
      position="relative"
    >
      {/* Confetti effect would go here in a real implementation */}
      {showConfetti && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          pointerEvents="none"
          zIndex="tooltip"
        >
          {/* Add your confetti component here */}
        </Box>
      )}

      <Container maxW="6xl" py={8}>
        {/* Success Header */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="xl" mb={8}>
          <CardBody p={12}>
            <VStack spacing={8} align="center" textAlign="center">
              <Box position="relative">
                <Box
                  p={6}
                  bg="green.50"
                  borderRadius="full"
                  border="4px solid"
                  borderColor="green.100"
                >
                  <CheckCircle
                    size={48}
                    color="var(--chakra-colors-green-500)"
                  />
                </Box>
                <Box
                  position="absolute"
                  top="-2"
                  right="-2"
                  p={2}
                  bg="orange.400"
                  borderRadius="full"
                  animation="bounce 2s infinite"
                >
                  <Sparkles size={16} color="white" />
                </Box>
              </Box>

              <VStack spacing={3}>
                <Heading size="2xl" color="gray.900">
                  Disputes Successfully Sent! 🎉
                </Heading>
                <Text color="gray.600" fontSize="xl" maxW="2xl">
                  Your {disputeStats.totalItems} dispute letters have been sent
                  to all three credit bureaus via certified mail with tracking
                  numbers.
                </Text>
              </VStack>

              {/* Quick Stats */}
              <SimpleGrid columns={3} spacing={8} w="full" maxW="lg">
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="green.500">
                    {disputeStats.totalItems}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Items Disputed
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    {disputeStats.bureaus.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Bureaus Contacted
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                    45-60
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Days to Response
                  </Text>
                </VStack>
              </SimpleGrid>

              <Badge
                colorScheme="green"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="md"
              >
                ✅ All disputes sent successfully
              </Badge>
            </VStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Timeline */}
          <Card bg={cardBg} borderRadius="xl" boxShadow="md">
            <CardBody p={6}>
              <VStack spacing={6} align="stretch">
                <HStack>
                  <Calendar size={20} color="var(--chakra-colors-blue-500)" />
                  <Heading size="md">Dispute Timeline</Heading>
                </HStack>

                <VStack spacing={6} align="stretch">
                  {timelineSteps.map((step, index) => (
                    <HStack key={index} spacing={4} align="start">
                      <VStack spacing={0}>
                        <Box
                          p={2}
                          bg={`${step.color}.${
                            step.status === "completed"
                              ? "500"
                              : step.status === "active"
                              ? "100"
                              : "50"
                          }`}
                          borderRadius="full"
                          border={
                            step.status === "active" ? "2px solid" : "none"
                          }
                          borderColor={
                            step.status === "active"
                              ? `${step.color}.500`
                              : "transparent"
                          }
                        >
                          <Icon
                            as={step.icon}
                            boxSize={4}
                            color={
                              step.status === "completed"
                                ? "white"
                                : `${step.color}.500`
                            }
                          />
                        </Box>
                        {index < timelineSteps.length - 1 && (
                          <Box
                            w="2px"
                            h="12"
                            bg={
                              step.status === "completed"
                                ? `${step.color}.200`
                                : "gray.200"
                            }
                            mt={2}
                          />
                        )}
                      </VStack>
                      <VStack align="start" spacing={1} flex="1">
                        <HStack>
                          <Text fontWeight="600" fontSize="sm">
                            {step.title}
                          </Text>
                          {step.status === "active" && (
                            <Badge colorScheme="blue" size="sm">
                              Active
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {step.description}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {step.date}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* What Happens Next */}
          <VStack spacing={6} align="stretch">
            {/* Tracking Information */}
            <Card bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Mail size={20} color="var(--chakra-colors-purple-500)" />
                    <Heading size="md">Tracking Information</Heading>
                  </HStack>

                  <VStack spacing={3} align="stretch">
                    {disputeStats.bureaus.map((bureau, index) => (
                      <HStack
                        key={bureau}
                        justify="space-between"
                        p={3}
                        bg="gray.50"
                        borderRadius="lg"
                      >
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="600" fontSize="sm">
                            {bureau}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Tracking: {disputeStats.trackingNumbers[index]}
                          </Text>
                        </VStack>
                        <Badge colorScheme="green" variant="subtle">
                          Delivered
                        </Badge>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Next Steps */}
            <Card bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Bell size={20} color="var(--chakra-colors-orange-500)" />
                    <Heading size="md">What Happens Next</Heading>
                  </HStack>

                  <VStack spacing={3} align="stretch">
                    <Box
                      p={3}
                      bg="blue.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="blue.200"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="blue.800"
                        mb={1}
                      >
                        📧 Confirmation Email Sent
                      </Text>
                      <Text fontSize="sm" color="blue.700">
                        Check your email for detailed tracking information and
                        next steps.
                      </Text>
                    </Box>

                    <Box
                      p={3}
                      bg="orange.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="orange.200"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="orange.800"
                        mb={1}
                      >
                        📋 Bureau Investigation
                      </Text>
                      <Text fontSize="sm" color="orange.700">
                        Credit bureaus have 30 days to investigate and respond
                        to your disputes.
                      </Text>
                    </Box>

                    <Box
                      p={3}
                      bg="green.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="green.200"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="green.800"
                        mb={1}
                      >
                        📊 Results & Updated Reports
                      </Text>
                      <Text fontSize="sm" color="green.700">
                        You'll receive results by mail and see updates in your
                        Sable dashboard.
                      </Text>
                    </Box>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Progress Reminder */}
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
                  Keep Monitoring Your Credit
                </Text>
                <Text fontSize="sm" color="blue.700">
                  We'll notify you of any changes, but you can check your
                  dispute status anytime in your dashboard.
                </Text>
              </Box>
            </Alert>
          </VStack>
        </SimpleGrid>

        {/* Action Buttons */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md" mt={8}>
          <CardBody>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontWeight="600">Your disputes are being processed</Text>
                <Text fontSize="sm" color="gray.600">
                  Track progress and manage disputes from your dashboard
                </Text>
              </VStack>
              <HStack spacing={3}>
                <Button
                  leftIcon={<Download size={16} />}
                  variant="outline"
                  onClick={() => {
                    /* Download confirmation PDF */
                  }}
                >
                  Download Receipt
                </Button>
                <Button
                  leftIcon={<Eye size={16} />}
                  variant="outline"
                  onClick={() => router.push("/dashboard/disputes/center")}
                >
                  Track Status
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => router.push("/dashboard")}
                  rightIcon={<ArrowRight size={16} />}
                  size="lg"
                  px={8}
                >
                  Back to Dashboard
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
export default function ModernConfirmationPage() {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <ConfirmationContent />
    </SidebarProvider>
  );
}
