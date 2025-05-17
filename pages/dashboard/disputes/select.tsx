// pages/dashboard/disputes/select.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Checkbox,
  Select as ChakraSelect,
  Input,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  UnorderedList,
  ListItem,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { useDisputeStore } from "@/stores/useDisputeStore";

// Mock groups for disputes
const MOCK_GROUPS = [
  {
    label: "Inquiries",
    type: "inquiry",
    items: [
      { id: "1", name: "Ems Usbank" },
      { id: "2", name: "Factual Data" },
      { id: "3", name: "Citibank NA" },
    ],
  },
  {
    label: "Credit Accounts",
    type: "account",
    items: [
      { id: "4", name: "SALLIE MAE - Installment" },
      { id: "5", name: "Visa Platinum - Revolving" },
      { id: "6", name: "Capital One - Revolving" },
    ],
  },
  {
    label: "Collections",
    type: "collection",
    items: [
      { id: "7", name: "Portfolio Recov Assoc" },
      { id: "8", name: "Midland Funding" },
    ],
  },
  {
    label: "Public Records",
    type: "public_record",
    items: [
      { id: "9", name: "Bankruptcy" },
      { id: "10", name: "Tax Lien" },
    ],
  },
];

// Reason & instruction options per group type
const reasonOptions: Record<string, string[]> = {
  inquiry: ["I don't recognize this inquiry", "Incorrect date", "Wrong amount"],
  account: [
    "Balance incorrect",
    "Payment history inaccuracy",
    "Date opened incorrect",
  ],
  collection: [
    "Debt not mine",
    "Balance should be $0",
    "Account already resolved",
  ],
  public_record: ["Record not mine", "Record outdated", "Documentation error"],
};
const instructionOptions: Record<string, string[]> = {
  inquiry: ["Remove this inquiry", "Validate with original creditor"],
  account: ["Update to paid", "Validate balance", "Provide verification"],
  collection: ["Remove from report", "Validate with debt collector"],
  public_record: ["Remove record", "Provide certified documentation"],
};

export default function DisputeSelect() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  const { selected, addDispute, removeDispute, updateDispute } =
    useDisputeStore();
  const [disputeStyle, setDisputeStyle] = useState("fcra");
  const [selectedModal, setSelectedModal] = useState<null | {
    id: string;
    name: string;
  }>(null);
  const onClose = () => setSelectedModal(null);

  // Toggle selection
  const handleToggle = (item: { id: string; name: string }) => {
    const isSelected = selected.some((i) => i.id === item.id);
    if (isSelected) removeDispute(item.id);
    else if (selected.length < 5)
      addDispute({ ...item, reason: "", instruction: "" });
  };

  const handleNext = () => router.push("/dashboard/disputes/review");

  return (
    <Box minH="100vh" px={{ base: 4, md: 8 }} py={8}>
      <VStack spacing={6} align="center" w="full" maxW="800px" mx="auto">
        {/* Illustration */}
        <ChakraImage
          src="/mockups/3b.svg"
          alt="Dispute illustration"
          maxW={{ base: "180px", md: "280px" }}
          objectFit="contain"
          mb={4}
        />

        {/* Header */}
        <Heading as="h2" size="2xl" textAlign="center" color="teal.500">
          Kickoff Your Dispute
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Choose your style, select items, and craft powerful dispute letters.
        </Text>
      </VStack>

      {/* Style Selector */}
      <Box mt={8} mb={6} px={{ base: 4, md: 0 }}>
        <Flex align="center" justify="space-between">
          <Text fontSize="md" fontWeight="bold">
            Dispute Style
          </Text>
          <ChakraSelect
            width="250px"
            value={disputeStyle}
            onChange={(e) => setDisputeStyle(e.target.value)}
          >
            <option value="fcra">FCRA Standard</option>
            <option value="metro2">Metro 2 Format</option>
            <option value="ai">AI Enhanced (ChatGPT)</option>
          </ChakraSelect>
        </Flex>
        <Box
          bg={useColorModeValue("gray.50", "gray.600")}
          p={4}
          borderRadius="md"
          mt={4}
        >
          {disputeStyle === "fcra" && (
            <Text>
              <strong>FCRA Standard</strong>: Plain FCRA-compliant letter.
            </Text>
          )}
          {disputeStyle === "metro2" && (
            <>
              <Text mb={2}>
                <strong>Metro 2 Format</strong>: Includes compliance codes.
              </Text>
              <UnorderedList spacing={1} ml={4}>
                <ListItem>
                  <Text as="code">BS-13</Text> - Months payment history
                </ListItem>
                <ListItem>
                  <Text as="code">BS-40</Text> - Current address
                </ListItem>
                <ListItem>
                  <Text as="code">BS-42</Text> - Previous address
                </ListItem>
                <ListItem>
                  <Text as="code">BS-17</Text> - Account status
                </ListItem>
              </UnorderedList>
            </>
          )}
          {disputeStyle === "ai" && (
            <Text>
              <strong>AI Enhanced</strong>: Auto-generated reasons &
              instructions via ChatGPT.
            </Text>
          )}
        </Box>
      </Box>

      {/* Item Selection Sections */}
      <VStack spacing={8} align="stretch" px={{ base: 4, md: 0 }}>
        {MOCK_GROUPS.map((group) => (
          <Box key={group.label}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="2xl" fontWeight="600">
                {group.label}
              </Text>
              <Box
                bg={useColorModeValue("gray.200", "gray.600")}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
              >
                {
                  selected.filter((i) => group.items.some((g) => g.id === i.id))
                    .length
                }{" "}
                / 5
              </Box>
            </Flex>
            {group.items.map((item) => {
              const selectedItem = selected.find((i) => i.id === item.id);
              return (
                <Box
                  key={item.id}
                  bg={bg}
                  p={4}
                  borderRadius="md"
                  border={`1px solid ${border}`}
                  mb={4}
                >
                  <Flex align="flex-start">
                    <Checkbox
                      isChecked={!!selectedItem}
                      mr={4}
                      onChange={() => handleToggle(item)}
                    />
                    <Box flex="1">
                      <Text fontSize="lg" fontWeight="600">
                        {item.name}
                      </Text>
                      {selectedItem && (
                        <VStack spacing={2} align="stretch" mt={2}>
                          {/* Reason selector */}
                          <ChakraSelect
                            placeholder={
                              disputeStyle === "ai"
                                ? "AI generating reason..."
                                : "Select a reason"
                            }
                            isDisabled={disputeStyle === "ai"}
                            value={selectedItem.reason}
                            onChange={(e) =>
                              updateDispute(item.id, { reason: e.target.value })
                            }
                          >
                            {reasonOptions[group.type].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </ChakraSelect>
                          {/* Instruction selector */}
                          <ChakraSelect
                            placeholder={
                              disputeStyle === "ai"
                                ? "AI generating instruction..."
                                : "Select an instruction"
                            }
                            isDisabled={disputeStyle === "ai"}
                            value={selectedItem.instruction}
                            onChange={(e) =>
                              updateDispute(item.id, {
                                instruction: e.target.value,
                              })
                            }
                          >
                            {instructionOptions[group.type].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </ChakraSelect>
                        </VStack>
                      )}
                    </Box>
                    {selectedItem && (
                      <IconButton
                        aria-label="See details"
                        icon={<FiX />}
                        variant="ghost"
                        onClick={() => setSelectedModal(item)}
                      />
                    )}
                  </Flex>
                </Box>
              );
            })}
          </Box>
        ))}
        <Button
          colorScheme="green"
          onClick={handleNext}
          isDisabled={selected.length === 0}
        >
          Next: Review & Send
        </Button>
      </VStack>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedModal}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl">{selectedModal?.name}</Text>
            <IconButton
              aria-label="Close"
              icon={<FiX />}
              variant="ghost"
              onClick={onClose}
            />
          </ModalHeader>
          <ModalBody>
            <Text fontSize="sm" color="gray.500">
              Item Details (coming soon)
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
