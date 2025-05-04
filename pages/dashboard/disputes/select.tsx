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
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { useDisputeStore } from "@/stores/useDisputeStore";

const MOCK_GROUP = {
  label: "Inquiries",
  count: 6,
  items: [
    { id: "1", name: "Ems Usbank" },
    { id: "3", name: "Factual Data" },
    { id: "5", name: "Factual Data" },
    { id: "7", name: "Usbank" },
    { id: "9", name: "Usbank" },
    { id: "11", name: "Xactus" },
  ],
};

export default function DisputeSelect() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  const { selected, addDispute, removeDispute, updateDispute } =
    useDisputeStore();

  const [selectedModal, setSelectedModal] = useState<null | {
    id: string;
    name: string;
  }>(null);
  const onClose = () => setSelectedModal(null);

  const handleToggle = (item: { id: string; name: string }) => {
    const isSelected = selected.some((i) => i.id === item.id);
    if (isSelected) {
      removeDispute(item.id);
    } else {
      if (selected.length >= 5) return;
      addDispute({ ...item, reason: "", instruction: "" });
    }
  };

  const handleNext = () => router.push("/dashboard/disputes/review");

  return (
    <Box minH="100vh" px={{ base: 4, md: 8 }} py={8}>
      <VStack spacing={8} align="stretch" w="full" maxW="800px" mx="auto">
        <Heading as="h3" size="lg">
          Start dispute
        </Heading>
        <Text>
          Select up to 5 items per month and send the dispute letter for free
          with Premium.
        </Text>

        <Box w="full">
          <VStack spacing={6} w="full">
            <Flex justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="600">
                {MOCK_GROUP.label}
              </Text>
              <Box
                bg={useColorModeValue("gray.200", "gray.600")}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
              >
                {selected.length} / 5
              </Box>
            </Flex>

            {MOCK_GROUP.items.map((item) => {
              const selectedItem = selected.find((i) => i.id === item.id);
              return (
                <Box
                  key={item.id}
                  w="full"
                  bg={bg}
                  p={6}
                  borderRadius="20px"
                  border={`1px solid ${border}`}
                  boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                >
                  <Flex align="flex-start">
                    <Checkbox
                      id={`appId-${item.id}`}
                      mr={4}
                      isChecked={!!selectedItem}
                      onChange={() => handleToggle(item)}
                    />
                    <Box flex="1">
                      <Text fontSize="xl" fontWeight="600">
                        {item.name}
                      </Text>

                      {selectedItem && (
                        <>
                          <ChakraSelect
                            mt={2}
                            value={selectedItem.reason || ""}
                            placeholder="Select a reason or type your own"
                            onChange={(e) =>
                              updateDispute(item.id, { reason: e.target.value })
                            }
                          >
                            <option>I don't recognize this inquiry</option>
                            <option>Incorrect date</option>
                            <option>Wrong amount</option>
                          </ChakraSelect>

                          <Input
                            mt={2}
                            placeholder="Or type a custom reason"
                            value={selectedItem.reason}
                            onChange={(e) =>
                              updateDispute(item.id, { reason: e.target.value })
                            }
                          />

                          <ChakraSelect
                            mt={2}
                            value={selectedItem.instruction || ""}
                            placeholder="Select an instruction or type your own"
                            onChange={(e) =>
                              updateDispute(item.id, {
                                instruction: e.target.value,
                              })
                            }
                          >
                            <option>Remove this account</option>
                            <option>Update to paid</option>
                            <option>Validate with original creditor</option>
                          </ChakraSelect>

                          <Input
                            mt={2}
                            placeholder="Or type custom instruction"
                            value={selectedItem.instruction}
                            onChange={(e) =>
                              updateDispute(item.id, {
                                instruction: e.target.value,
                              })
                            }
                          />
                        </>
                      )}

                      <Text
                        mt={2}
                        color="blue.500"
                        cursor="pointer"
                        onClick={() => setSelectedModal(item)}
                      >
                        See details
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </VStack>
        </Box>

        <Button
          colorScheme="green"
          onClick={handleNext}
          isDisabled={selected.length === 0}
        >
          Next: Review & Send
        </Button>
      </VStack>

      <Modal
        isOpen={!!selectedModal}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent borderTopRadius="16px" mt="auto" pb={4}>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="2xl">{selectedModal?.name}</Text>
            <IconButton
              aria-label="Close"
              icon={<FiX />}
              onClick={onClose}
              variant="ghost"
            />
          </ModalHeader>

          <ModalBody>
            <Text fontSize="sm" color="gray.500">
              Inquiry details
            </Text>

            <Box
              mt={4}
              p={4}
              bg={useColorModeValue("gray.50", "gray.600")}
              borderRadius="md"
            >
              <Heading as="h5" size="sm">
                Account details
              </Heading>
              <VStack align="stretch" mt={2} spacing={3}>
                <Flex justify="space-between">
                  <Text>Name</Text>
                  <Text fontWeight="bold">{selectedModal?.name}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Date of inquiry</Text>
                  <Text fontWeight="bold">Aug 24, 2023</Text>
                </Flex>
              </VStack>
            </Box>

            <Box mt={6}>
              <Heading as="h5" size="sm">
                Sample Reason
              </Heading>
              <Text mt={2} fontWeight="600">
                I don't recognize this inquiry
              </Text>
              <Text mt={1} fontSize="sm" color="gray.500">
                I don’t recognize this lender and I don’t remember authorizing
                them to perform a hard inquiry on my credit report.
              </Text>
            </Box>
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
