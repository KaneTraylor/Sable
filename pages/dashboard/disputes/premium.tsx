// pages/dashboard/disputes/premium.tsx - Updated with database integration
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useColorModeValue,
  useToast,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { FiX, FiEdit } from "react-icons/fi";
import { CheckCircle, Send } from "lucide-react";
import { useDisputeStore } from "../../../stores/useDisputeStore";

export default function DisputePremium() {
  const router = useRouter();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.700");
  const outline = useColorModeValue("gray.200", "gray.600");
  const dugoutBg = useColorModeValue("green.50", "green.800");
  const dugoutText = useColorModeValue("green.700", "green.200");

  const { selected, reset } = useDisputeStore();
  const [letters, setLetters] = useState<{ [bureau: string]: string }>({
    Equifax: "",
    TransUnion: "",
    Experian: "",
  });
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);

  // Check for saved draft on mount
  useEffect(() => {
    const savedLetters = localStorage.getItem("savedLetters");
    const savedDisputes = localStorage.getItem("savedDisputes");
    if (savedLetters && savedDisputes) {
      setShowResumePrompt(true);
    }
  }, []);

  const handleResume = () => {
    const savedLetters = localStorage.getItem("savedLetters");
    const savedDisputes = localStorage.getItem("savedDisputes");
    if (savedLetters && savedDisputes) {
      setLetters(JSON.parse(savedLetters));
      reset();
      JSON.parse(savedDisputes).forEach((d: any) =>
        useDisputeStore.getState().addDispute(d)
      );
    }
    setShowResumePrompt(false);
  };

  const handleSend = async () => {
    if (selected.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to dispute before sending.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsSending(true);
    setSendingProgress(0);

    try {
      // Simulate progress steps
      setSendingProgress(20);

      // Prepare dispute items for API
      const disputeItems = selected.map((item) => ({
        accountId: item.id,
        accountName: item.name,
        creditorName: item.account.accountName, // Using account name as creditor for now
        bureau: "All Bureaus", // Will be split into separate items per bureau in API
        reason: item.reason,
        instruction: item.instruction,
      }));

      setSendingProgress(40);

      // Generate mock tracking numbers
      const trackingNumbers = [
        `US${Math.random().toString().substr(2, 10)}`,
        `US${Math.random().toString().substr(2, 10)}`,
        `US${Math.random().toString().substr(2, 10)}`,
      ];

      setSendingProgress(60);

      // Save to database
      const response = await fetch("/api/disputes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: disputeItems.flatMap((item) => [
            { ...item, bureau: "Equifax" },
            { ...item, bureau: "TransUnion" },
            { ...item, bureau: "Experian" },
          ]),
          deliveryMethod: "premium",
          trackingNumbers,
        }),
      });

      setSendingProgress(80);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save disputes");
      }

      const result = await response.json();
      setSendingProgress(100);

      // Clear saved data
      localStorage.removeItem("savedLetters");
      localStorage.removeItem("savedDisputes");

      // Reset dispute store
      reset();

      toast({
        title: "Disputes sent successfully!",
        description: `${result.disputeRound.itemCount} items have been disputed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Wait a moment for user to see completion
      setTimeout(() => {
        router.push("/dashboard/disputes/confirmation");
      }, 1000);
    } catch (error: any) {
      console.error("Error sending disputes:", error);

      if (error.message.includes("cooldown")) {
        toast({
          title: "Dispute cooldown active",
          description: "You must wait 35 days between dispute rounds.",
          status: "warning",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error sending disputes",
          description: error.message || "Please try again later.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }

      setIsSending(false);
      setSendingProgress(0);
    }
  };

  const handleSaveForLater = () => {
    localStorage.setItem("savedLetters", JSON.stringify(letters));
    localStorage.setItem("savedDisputes", JSON.stringify(selected));
    toast({
      title: "Progress saved",
      description:
        "Your disputes have been saved. You can finish later from your dashboard.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  // Regenerate letters whenever `selected` changes
  useEffect(() => {
    if (selected.length === 0) return;

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const body = selected
      .map(
        (d) => `- ${d.name}\n  Reason: ${d.reason}\n  Action: ${d.instruction}`
      )
      .join("\n\n");

    const generate = (bureau: string) =>
      `
${today}

[Your Name]
[Your Address]
[City, State ZIP]
DOB: [Your DOB]   SSN: [Your SSN]

${bureau} Consumer Dispute Department
P.O. Box 740256
Atlanta, GA 30374

Re: Credit Report Dispute

Dear ${bureau} Dispute Team,

I am writing to formally dispute the following items on my credit report, which I believe to be inaccurate:

${body}

Under the Fair Credit Reporting Act (15 U.S.C. § 1681), I am requesting that you conduct a reasonable investigation of these items. Please correct or remove any information that cannot be verified as accurate and complete.

I have enclosed copies of supporting documentation. Please provide me with written confirmation of the results of your investigation and send me a corrected copy of my credit report if any changes are made.

Thank you for your prompt attention to this matter. I look forward to your response within 30 days as required by law.

Sincerely,

[Your Signature]
[Your Printed Name]
`.trim();

    setLetters({
      Equifax: generate("Equifax"),
      TransUnion: generate("TransUnion"),
      Experian: generate("Experian"),
    });
  }, [selected]);

  // Redirect if no items selected
  if (selected.length === 0) {
    router.push("/dashboard/disputes/select");
    return null;
  }

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <Button variant="ghost" mb={4} onClick={() => router.back()}>
        ← Back
      </Button>

      {showResumePrompt && (
        <Alert status="info" borderRadius="md" mb={6} alignItems="start">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Resume draft?</AlertTitle>
            <AlertDescription>
              You have a saved draft—load your previous letters & selections?
            </AlertDescription>
          </Box>
          <Button ml={4} colorScheme="green" size="sm" onClick={handleResume}>
            Resume
          </Button>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setShowResumePrompt(false)}
          />
        </Alert>
      )}

      <Heading as="h3" size="lg" mb={2}>
        Sable Premium Delivery
      </Heading>
      <Text color="gray.500" mb={8}>
        Professional dispute letters sent via certified mail with tracking
      </Text>

      {/* Sending Progress */}
      {isSending && (
        <Alert status="info" borderRadius="lg" mb={6}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Sending your disputes...</AlertTitle>
            <AlertDescription>
              <VStack spacing={2} align="start" mt={2}>
                <Text fontSize="sm">
                  {sendingProgress < 40 && "Preparing dispute letters..."}
                  {sendingProgress >= 40 &&
                    sendingProgress < 80 &&
                    "Generating tracking numbers..."}
                  {sendingProgress >= 80 &&
                    sendingProgress < 100 &&
                    "Saving to database..."}
                  {sendingProgress === 100 && "Complete! Redirecting..."}
                </Text>
                <Progress
                  value={sendingProgress}
                  colorScheme="green"
                  size="sm"
                  w="full"
                />
              </VStack>
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <VStack spacing={4} align="stretch">
        {/* Selected Items Summary */}
        <Alert status="success" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Ready to Send</AlertTitle>
            <AlertDescription>
              {selected.length} items selected for dispute across all three
              credit bureaus.
            </AlertDescription>
          </Box>
        </Alert>

        {/* Letter Preview */}
        {Object.keys(letters).map((bureau) => (
          <Box
            key={bureau}
            role="button"
            tabIndex={0}
            onClick={() => setActiveLetter(bureau)}
            bg={bg}
            boxShadow={`inset 0 0 0 1px ${outline}`}
            p={4}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            transition="background 0.2s"
          >
            <VStack align="start" spacing={1}>
              <Text fontWeight="600">{bureau} Letter</Text>
              <Text fontSize="sm" color="gray.600">
                Dispute letter for {selected.length} items
              </Text>
            </VStack>
            <Icon as={FiEdit} color="gray.500" />
          </Box>
        ))}

        {/* Delivery Information */}
        <Alert
          status="info"
          variant="subtle"
          bg={dugoutBg}
          color={dugoutText}
          borderRadius="16px"
          alignItems="flex-start"
          py={4}
          px={3}
        >
          <AlertIcon boxSize="24px" mr={2} />
          <AlertDescription fontSize="sm">
            <VStack align="start" spacing={1}>
              <Text fontWeight="600">Premium Delivery Includes:</Text>
              <Text>• Certified mail with tracking numbers</Text>
              <Text>• Professional letterhead and formatting</Text>
              <Text>• Delivery confirmation within 1-2 business days</Text>
              <Text>• In-app status tracking and notifications</Text>
            </VStack>
          </AlertDescription>
        </Alert>

        <HStack spacing={4} mt={6} justify="space-between">
          <Button
            variant="outline"
            onClick={handleSaveForLater}
            isDisabled={isSending}
          >
            Save for Later
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSend}
            isLoading={isSending}
            loadingText="Sending..."
            leftIcon={isSending ? <Spinner size="sm" /> : <Send size={16} />}
            size="lg"
            px={8}
          >
            Send Disputes ({selected.length} items)
          </Button>
        </HStack>
      </VStack>

      {/* Letter Editor Modal */}
      <Modal
        isOpen={Boolean(activeLetter)}
        onClose={() => setActiveLetter(null)}
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent borderTopRadius="16px" mt="auto" pb={4}>
          <ModalHeader display="flex" justifyContent="space-between">
            <Text fontSize="xl">{activeLetter} Letter</Text>
            <IconButton
              icon={<FiX />}
              aria-label="Close"
              onClick={() => setActiveLetter(null)}
              variant="ghost"
            />
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info" size="sm">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  You can customize this letter before sending. Changes will be
                  saved automatically.
                </AlertDescription>
              </Alert>
              <Textarea
                value={activeLetter ? letters[activeLetter] : ""}
                onChange={(e) =>
                  setLetters((prev) => ({
                    ...prev,
                    [activeLetter!]: e.target.value,
                  }))
                }
                fontFamily="monospace"
                fontSize="sm"
                rows={25}
                placeholder="Loading letter content..."
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setActiveLetter(null)} colorScheme="green">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
