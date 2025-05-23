// pages/dashboard/disputes/review.tsx - Modernized dispute review
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Select,
  Badge,
  Flex,
  Spacer,
  Alert,
  AlertIcon,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Divider,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  FileText,
  Send,
  Edit,
  Eye,
  Download,
  CheckCircle,
} from "lucide-react";
import DashboardNavbar, {
  SidebarProvider,
  useSidebar,
} from "@/components/dashboard/DashboardNavbar";
import { useDisputeStore, DisputeSelection } from "@/stores/useDisputeStore";
import { Metro2Letter } from "@/components/dashboard/disputes/Metro2Letter";
import { PaymentHistory } from "@/components/dashboard/disputes/PaymentHistory";

type FormatStyle = "standard" | "metro2";

interface ReviewProps {
  user: {
    name: string;
    address: string;
  };
}

export const getServerSideProps: GetServerSideProps<ReviewProps> = async (
  ctx
) => {
  const session = await getSession(ctx);
  if (!session?.user?.email) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }

  const userRecord = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { firstName: true, lastName: true, address: true },
  });

  if (!userRecord) {
    return { notFound: true };
  }

  const fullName = `${userRecord.firstName ?? ""} ${
    userRecord.lastName ?? ""
  }`.trim();

  return {
    props: {
      user: {
        name: fullName,
        address: userRecord.address ?? "",
      },
    },
  };
};

// Main content component
function DisputeReviewContent({ user }: ReviewProps) {
  const router = useRouter();
  const { sidebarWidth } = useSidebar();
  const cardBg = useColorModeValue("white", "gray.700");
  const { selected, reset } = useDisputeStore();
  const [style, setStyle] = useState<FormatStyle>("standard");
  const [letters, setLetters] = useState<Record<string, string>>({});

  // Bureau data
  const bureaus = [
    { name: "Equifax", color: "red.500", items: selected.length },
    { name: "TransUnion", color: "blue.500", items: selected.length },
    { name: "Experian", color: "green.500", items: selected.length },
  ] as const;

  // Generate letters when selections change
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const bodyLines = selected
      .map(
        (d: DisputeSelection) =>
          `• ${d.name}\n    Reason: ${d.reason}\n    Instruction: ${d.instruction}\n`
      )
      .join("\n");

    const makeStandardLetter = (bureau: string) =>
      `
${today}

${user.name}
${user.address}

${bureau} Consumer Dispute Department
P.O. Box 740256
Atlanta, GA 30374-0256

Subject: Credit Report Dispute

Dear ${bureau} Team,

I recently obtained a copy of my credit report and would like to dispute the following item(s):

${bodyLines}

Under the Fair Credit Reporting Act, I request that you reinvestigate these items and correct or remove any inaccurate information within 30 days.

Please send me written confirmation of the results of your investigation and a corrected copy of my credit report if changes are made.

Thank you for your prompt attention to this matter.

Sincerely,

${user.name}
    `.trim();

    setLetters({
      Equifax: makeStandardLetter("Equifax"),
      TransUnion: makeStandardLetter("TransUnion"),
      Experian: makeStandardLetter("Experian"),
    });
  }, [selected, user]);

  const handleSend = () => {
    reset();
    router.push("/dashboard/disputes/delivery");
  };

  if (selected.length === 0) {
    return (
      <Box
        minH="100vh"
        bg="sable.tan"
        pl={{ base: "0", md: `${sidebarWidth + 20}px` }}
        pb={{ base: "80px", md: "20px" }}
        transition="padding-left 0.3s ease"
      >
        <Container maxW="4xl" py={16}>
          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={12} textAlign="center">
              <VStack spacing={6}>
                <Box p={4} bg="orange.50" borderRadius="full">
                  <FileText size={32} color="var(--chakra-colors-orange-500)" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="lg">No Disputes Selected</Heading>
                  <Text color="gray.600">
                    You need to select items to dispute before reviewing
                    letters.
                  </Text>
                </VStack>
                <Button
                  colorScheme="green"
                  onClick={() => router.push("/dashboard/disputes/select")}
                  size="lg"
                >
                  Select Items to Dispute
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="sable.tan"
      pl={{ base: "0", md: `${sidebarWidth + 20}px` }}
      pb={{ base: "80px", md: "20px" }}
      transition="padding-left 0.3s ease"
    >
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <VStack spacing={6} align="stretch" mb={8}>
          <HStack spacing={4}>
            <Button
              leftIcon={<ArrowLeft size={16} />}
              variant="ghost"
              onClick={() => router.push("/dashboard/disputes/select")}
            >
              Back to Selection
            </Button>
            <Spacer />
            <HStack spacing={3}>
              <Select
                w="200px"
                value={style}
                onChange={(e) => setStyle(e.target.value as FormatStyle)}
                bg="white"
              >
                <option value="standard">Standard (FCRA)</option>
                <option value="metro2">Metro-2 Format</option>
              </Select>
              <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                {selected.length} items selected
              </Badge>
            </HStack>
          </HStack>

          <Card bg={cardBg} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <HStack spacing={8} align="center">
                <VStack align="start" spacing={2}>
                  <Heading size="xl" color="gray.900">
                    Review Your Dispute Letters
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    Review and customize your letters before sending to credit
                    bureaus
                  </Text>
                </VStack>
                <Spacer />
                <VStack spacing={4}>
                  <SimpleGrid columns={3} spacing={4}>
                    {bureaus.map((bureau) => (
                      <VStack key={bureau.name} spacing={1}>
                        <Avatar
                          name={bureau.name}
                          size="md"
                          bg={bureau.color}
                          color="white"
                          fontSize="sm"
                        />
                        <Text fontSize="xs" fontWeight="600">
                          {bureau.name}
                        </Text>
                        <Badge size="sm" colorScheme="gray">
                          {bureau.items} items
                        </Badge>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </VStack>

        {/* Dispute Items Summary */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md" mb={8}>
          <CardHeader>
            <HStack>
              <CheckCircle size={20} color="var(--chakra-colors-green-500)" />
              <Heading size="md">Items Being Disputed</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {selected.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="gray.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="600" fontSize="sm">
                      {item.name}
                    </Text>
                    <HStack spacing={4} fontSize="xs" color="gray.600">
                      <Text>
                        <strong>Reason:</strong> {item.reason}
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.600">
                      <strong>Action:</strong> {item.instruction}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Letter Review */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="lg" mb={8}>
          <CardHeader>
            <HStack>
              <Icon as={FileText} color="blue.500" />
              <Heading size="md">Dispute Letters</Heading>
              <Spacer />
              <HStack spacing={2}>
                <Button
                  leftIcon={<Eye size={16} />}
                  size="sm"
                  variant="outline"
                >
                  Preview All
                </Button>
                <Button
                  leftIcon={<Download size={16} />}
                  size="sm"
                  variant="outline"
                >
                  Download PDF
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            {style === "metro2" ? (
              <Tabs variant="enclosed" colorScheme="green">
                <TabList>
                  {bureaus.map((bureau) => (
                    <Tab key={bureau.name}>{bureau.name}</Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {bureaus.map((bureau) => (
                    <TabPanel key={bureau.name} px={0}>
                      <Box
                        bg="white"
                        p={6}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        maxH="60vh"
                        overflowY="auto"
                      >
                        <Metro2Letter
                          bureau={bureau.name}
                          items={
                            selected as Array<
                              DisputeSelection & { account: any }
                            >
                          }
                          user={user}
                        />
                        <PaymentHistory />
                      </Box>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            ) : (
              <Tabs variant="enclosed" colorScheme="green">
                <TabList>
                  {bureaus.map((bureau) => (
                    <Tab key={bureau.name}>{bureau.name}</Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {bureaus.map((bureau) => (
                    <TabPanel key={bureau.name} px={0}>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="sm" fontWeight="600" color="gray.700">
                            Letter to {bureau.name}
                          </Text>
                          <Button
                            leftIcon={<Edit size={14} />}
                            size="xs"
                            variant="outline"
                          >
                            Edit
                          </Button>
                        </HStack>
                        <Textarea
                          fontFamily="monospace"
                          fontSize="sm"
                          rows={20}
                          value={letters[bureau.name] || ""}
                          onChange={(e) =>
                            setLetters((prev) => ({
                              ...prev,
                              [bureau.name]: e.target.value,
                            }))
                          }
                          bg="white"
                          border="1px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: "green.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-green-500)",
                          }}
                        />
                      </VStack>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            )}
          </CardBody>
        </Card>

        {/* Important Notice */}
        <Alert
          status="info"
          borderRadius="xl"
          bg="blue.50"
          border="1px solid"
          borderColor="blue.200"
          mb={8}
        >
          <AlertIcon />
          <Box>
            <Text fontSize="sm" fontWeight="600" color="blue.800">
              Important Notice
            </Text>
            <Text fontSize="sm" color="blue.700">
              These letters will be sent via certified mail to ensure delivery.
              Credit bureaus have 30 days to investigate and respond to your
              disputes.
            </Text>
          </Box>
        </Alert>

        {/* Action Buttons */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontWeight="600">
                  Ready to send {selected.length} dispute
                  {selected.length !== 1 ? "s" : ""} to {bureaus.length} bureaus
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Letters will be delivered via certified mail within 1-2
                  business days
                </Text>
              </VStack>
              <HStack spacing={3}>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard/disputes/select")}
                >
                  Back to Edit
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleSend}
                  rightIcon={<Send size={16} />}
                  size="lg"
                  px={8}
                >
                  Continue to Delivery
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
export default function ModernDisputeReviewPage(props: ReviewProps) {
  return (
    <SidebarProvider>
      <DashboardNavbar />
      <DisputeReviewContent {...props} />
    </SidebarProvider>
  );
}
