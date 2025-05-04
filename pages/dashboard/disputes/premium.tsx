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
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  Textarea,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { FiChevronRight, FiInfo, FiX, FiEdit } from "react-icons/fi";
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
  const [activeLetter, setActiveLetter] = useState<null | string>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedLetters");
    const savedDisputes = localStorage.getItem("savedDisputes");
    if (saved && savedDisputes) {
      setShowResumePrompt(true);
    }
  }, []);

  const handleResume = () => {
    const saved = localStorage.getItem("savedLetters");
    const savedDisputes = localStorage.getItem("savedDisputes");
    if (saved && savedDisputes) {
      setLetters(JSON.parse(saved));
      reset();
      const parsedDisputes = JSON.parse(savedDisputes);
      for (const dispute of parsedDisputes) {
        useDisputeStore.getState().addDispute(dispute);
      }
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

  useEffect(() => {
    if (!selected.length) return;
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const body = selected
      .map((d) => `Inquiry from ${d.name}\n${d.reason}\n`)
      .join("\n");
    const generate = (bureau: string) =>
      `${today}

Kane Michael Traylor 4612 New Garden Avenue
Portsmouth, OH, 45662
Date of Birth: 07/29/1998 SSN: 301028285
${bureau} Information Services

Dear ${bureau},

I received a copy of my credit report and am writing to dispute the following information that appears on my ${bureau} report.

The following inquiries are unauthorized or inaccurate, and I ask that you delete them:

${body}

By the provisions of the Fair Credit Reporting Act, I demand that these items be investigated and removed from my report. Please remove any information that the creditor cannot verify. I understand that under 15 U.S.C. Sec. 1681i(a), you must complete this reinvestigation within 30 days of receipt of this letter.

Thank you for your time and help in this matter.

Sincerely,
Kane Michael Traylor`;
    setLetters({
      Equifax: generate("Equifax"),
      TransUnion: generate("TransUnion"),
      Experian: generate("Experian"),
    });
  }, [selected]);

  return (
    <Box
      className="page_align_content__d_XFJ"
      maxW="800px"
      mx="auto"
      py={8}
      px={4}
    >
      <Button variant="ghost" mb={4} onClick={() => router.back()}>
        ← Back
      </Button>

      {showResumePrompt && (
        <Alert status="info" borderRadius="md" mb={6} alignItems="start">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Resume where you left off?</AlertTitle>
            <AlertDescription>
              You have a saved draft of your letters and selected disputes. Do
              you want to load it?
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

        <Box
          className="mt-4 bg:dugout color-base:dugout Alert_alert__hGgSN Card_card__j4UbT"
          display="flex"
          alignItems="flex-start"
          p={4}
          borderRadius="16px"
        >
          <Text fontSize="xl" mr={4}>
            
          </Text>
          <Box className="Alert_content__FY3m5">
            <Text fontSize="sm" color="gray.500">
              Keep in mind, filing a dispute doesn't guarantee that the credit
              bureaus will change your report.
            </Text>
          </Box>
        </Box>

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
        isOpen={!!activeLetter}
        onClose={() => setActiveLetter(null)}
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          borderTopRadius="16px"
          mt="auto"
          pb={4}
          className="bottom_sheet_bottom-sheet__rUeSx"
        >
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl">{activeLetter} Letter</Text>
            <IconButton
              icon={<FiX />}
              aria-label="Close"
              onClick={() => setActiveLetter(null)}
              variant="ghost"
            />
          </ModalHeader>
          <ModalBody>
            <Box
              bg={bg}
              p={4}
              borderRadius="md"
              boxShadow={`inset 0 0 0 1px ${outline}`}
            >
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
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => setActiveLetter(null)}
              variant="solid"
              colorScheme="green"
            >
              Done Editing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
