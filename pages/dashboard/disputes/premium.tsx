// pages/dashboard/disputes/premium.tsx
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
} from "@chakra-ui/react";
import { FiX, FiEdit } from "react-icons/fi";
import { useDisputeStore } from "../../../stores/useDisputeStore";

export default function DisputePremium() {
  const router = useRouter();
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

  const handleSend = () => {
    localStorage.removeItem("savedLetters");
    localStorage.removeItem("savedDisputes");
    router.push("/dashboard/disputes/confirmation");
  };

  const handleSaveForLater = () => {
    localStorage.setItem("savedLetters", JSON.stringify(letters));
    localStorage.setItem("savedDisputes", JSON.stringify(selected));
    alert("Your progress has been saved. You can finish later.");
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
      .map((d) => `- ${d.name}\n  Reason: ${d.reason}`)
      .join("\n\n");

    const generate = (bureau: string) =>
      `
${today}

John Q. Public  
1234 Elm Street  
Anytown, USA 12345  
DOB: 01/01/1990   SSN: 000-00-0000  

${bureau} Services  
123 Mockingbird Lane  
Suite 100  

Dear ${bureau},

I’m writing to dispute the following items on my credit file:

${body}

Please reinvestigate these items and remove any information you cannot verify within 30 days as required by the Fair Credit Reporting Act.

Sincerely,

John Q. Public
`.trim();

    setLetters({
      Equifax: generate("Equifax"),
      TransUnion: generate("TransUnion"),
      Experian: generate("Experian"),
    });
  }, [selected]);

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
        Send with Sable Premium
      </Heading>
      <Text color="gray.500" mb={8}>
        Automatically deliver your letter to the bureau
      </Text>

      <VStack spacing={4} align="stretch">
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
          >
            <Text fontWeight="600">{bureau}</Text>
            <Icon as={FiEdit} />
          </Box>
        ))}

        {/* Now wrapped in a proper Alert */}
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
            Filing with Sable Premium ensures delivery, but does not guarantee
            dispute outcomes.
          </AlertDescription>
        </Alert>

        <HStack spacing={4} mt={6} justify="space-between">
          <Button variant="outline" onClick={handleSaveForLater}>
            Finish Later
          </Button>
          <Button colorScheme="green" onClick={handleSend}>
            Finalize & Send
          </Button>
        </HStack>
      </VStack>

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
            <Textarea
              value={activeLetter ? letters[activeLetter] : ""}
              onChange={(e) =>
                setLetters((prev) => ({
                  ...prev,
                  [activeLetter!]: e.target.value,
                }))
              }
              fontFamily="monospace"
              rows={20}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setActiveLetter(null)} colorScheme="green">
              Done Editing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
