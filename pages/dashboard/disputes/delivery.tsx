// pages/dashboard/disputes/delivery.tsx - Modernized delivery selection
import { useState } from "react";
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
  Flex,
  Spacer,
  Badge,
  Alert,
  AlertIcon,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Send,
  Truck,
  Mail,
  CheckCircle,
  X,
  Zap,
  Shield,
  Clock,
  Download,
  AlertTriangle,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";

// Main content component
function DeliverySelectionContent() {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const [method, setMethod] = useState<"premium" | "self">("premium");

  const handleNext = () => {
    if (method === "premium") {
      router.push("/dashboard/disputes/premium");
    } else {
      router.push("/dashboard/disputes/manual");
    }
  };

  const deliveryOptions = [
    {
      id: "premium",
      title: "Sable Premium Delivery",
      subtitle: "Recommended for best results",
      price: "Included with Premium",
      icon: Zap,
      color: "green",
      features: [
        "Instant 1-click submission",
        "Certified mail with tracking",
        "Select up to 5 items per month",
        "In-app status tracking",
        "Delivery guarantee",
        "Priority dispute queue",
        "Email notifications",
      ],
      benefits: [
        "99.9% delivery success rate",
        "Faster bureau response times",
        "Professional letterhead",
        "Automatic follow-ups",
      ],
    },
    {
      id: "self",
      title: "Self-Mail Option",
      subtitle: "Print and mail yourself",
      price: "Free",
      icon: Mail,
      color: "blue",
      features: [
        "Download PDF letters",
        "Print at home",
        "Purchase your own postage",
        "Mail via certified mail",
        "Track with USPS",
      ],
      limitations: [
        "No in-app tracking",
        "Risk of mail being lost",
        "Requires time and effort",
        "No delivery guarantee",
        "No automated follow-ups",
      ],
    },
  ];

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
              onClick={() => router.push("/dashboard/disputes/review")}
            >
              Back to Review
            </Button>
            <Spacer />
            <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
              Step 3 of 4
            </Badge>
          </HStack>

          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <VStack spacing={6} align="center" textAlign="center">
                <Box p={4} bg="blue.50" borderRadius="full">
                  <Truck size={32} color="var(--chakra-colors-blue-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="xl" color="gray.900">
                    Choose Delivery Method
                  </Heading>
                  <Text color="gray.600" fontSize="lg" maxW="2xl">
                    Select how you'd like to send your dispute letters to the
                    credit bureaus. We recommend Premium Delivery for the best
                    results.
                  </Text>
                </VStack>

                {/* Quick comparison */}
                <SimpleGrid columns={2} spacing={8} w="full" maxW="md">
                  <VStack>
                    <Icon as={Zap} boxSize={6} color="green.500" />
                    <Text fontSize="sm" fontWeight="600">
                      Premium
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Automated & Guaranteed
                    </Text>
                  </VStack>
                  <VStack>
                    <Icon as={Mail} boxSize={6} color="blue.500" />
                    <Text fontSize="sm" fontWeight="600">
                      Self-Mail
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      DIY Printing & Mailing
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        {/* Delivery Options */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
          {deliveryOptions.map((option) => (
            <Card
              key={option.id}
              bg={cardBg}
              borderRadius="xl"
              boxShadow={method === option.id ? "xl" : "md"}
              border="2px solid"
              borderColor={
                method === option.id ? `${option.color}.500` : "transparent"
              }
              cursor="pointer"
              onClick={() => setMethod(option.id as "premium" | "self")}
              transition="all 0.2s ease"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
            >
              <CardHeader>
                <HStack spacing={4}>
                  <Box
                    p={3}
                    bg={`${option.color}.50`}
                    borderRadius="xl"
                    position="relative"
                  >
                    <Icon
                      as={option.icon}
                      boxSize={6}
                      color={`${option.color}.500`}
                    />
                    {method === option.id && (
                      <Box
                        position="absolute"
                        top="-1"
                        right="-1"
                        p={1}
                        bg="green.500"
                        borderRadius="full"
                      >
                        <CheckCircle size={12} color="white" />
                      </Box>
                    )}
                  </Box>
                  <VStack align="start" spacing={1} flex="1">
                    <HStack>
                      <Heading size="md">{option.title}</Heading>
                      {option.id === "premium" && (
                        <Badge colorScheme="green" variant="solid" size="sm">
                          RECOMMENDED
                        </Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {option.subtitle}
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color={`${option.color}.600`}
                    >
                      {option.price}
                    </Text>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  {/* Features */}
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.700"
                      mb={2}
                    >
                      ✅ What's Included:
                    </Text>
                    <List spacing={1}>
                      {option.features.map((feature, index) => (
                        <ListItem key={index} fontSize="sm" color="gray.600">
                          <ListIcon
                            as={CheckCircle}
                            color="green.500"
                            boxSize={3}
                          />
                          {feature}
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Benefits or Limitations */}
                  {option.id === "premium" && option.benefits && (
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="green.700"
                        mb={2}
                      >
                        🚀 Premium Benefits:
                      </Text>
                      <List spacing={1}>
                        {option.benefits.map((benefit, index) => (
                          <ListItem key={index} fontSize="sm" color="gray.600">
                            <ListIcon
                              as={Shield}
                              color="green.500"
                              boxSize={3}
                            />
                            {benefit}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {option.id === "self" && option.limitations && (
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="orange.700"
                        mb={2}
                      >
                        ⚠️ Limitations:
                      </Text>
                      <List spacing={1}>
                        {option.limitations.map((limitation, index) => (
                          <ListItem key={index} fontSize="sm" color="gray.600">
                            <ListIcon as={X} color="orange.500" boxSize={3} />
                            {limitation}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  <Divider />

                  {/* Time estimate */}
                  <HStack justify="space-between" fontSize="sm">
                    <HStack spacing={2}>
                      <Clock size={14} color="var(--chakra-colors-gray-500)" />
                      <Text color="gray.600">
                        {option.id === "premium"
                          ? "1-2 business days"
                          : "3-5 business days"}
                      </Text>
                    </HStack>
                    {option.id === "premium" && (
                      <Badge colorScheme="green" variant="subtle" size="sm">
                        Faster
                      </Badge>
                    )}
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Important Notice */}
        <Alert
          status={method === "premium" ? "success" : "warning"}
          borderRadius="xl"
          bg={method === "premium" ? "green.50" : "orange.50"}
          border="1px solid"
          borderColor={method === "premium" ? "green.200" : "orange.200"}
          mb={8}
        >
          <AlertIcon />
          <Box>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={method === "premium" ? "green.800" : "orange.800"}
            >
              {method === "premium" ? "Best Choice!" : "Self-Mail Notice"}
            </Text>
            <Text
              fontSize="sm"
              color={method === "premium" ? "green.700" : "orange.700"}
            >
              {method === "premium"
                ? "Premium delivery offers the highest success rate and saves you time. Your disputes will be professionally formatted and delivered with tracking."
                : "Self-mailing requires you to print, package, and mail the letters yourself. Make sure to use certified mail with return receipt requested."}
            </Text>
          </Box>
        </Alert>

        {/* Action Buttons */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontWeight="600">
                  {method === "premium"
                    ? "Premium Delivery Selected"
                    : "Self-Mail Selected"}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {method === "premium"
                    ? "Your disputes will be sent via certified mail with tracking"
                    : "You'll download PDFs to print and mail yourself"}
                </Text>
              </VStack>
              <HStack spacing={3}>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/disputes/review")}
                >
                  Back to Review
                </Button>
                <Button
                  colorScheme={method === "premium" ? "green" : "blue"}
                  onClick={handleNext}
                  rightIcon={
                    method === "premium" ? (
                      <Send size={16} />
                    ) : (
                      <Download size={16} />
                    )
                  }
                  size="lg"
                  px={8}
                >
                  {method === "premium"
                    ? "Continue to Payment"
                    : "Download Letters"}
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
export default function ModernDeliveryPage() {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DeliverySelectionContent />
    </SidebarProvider>
  );
}
