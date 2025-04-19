import {
  Box,
  Heading,
  VStack,
  Radio,
  RadioGroup,
  Button,
  Text,
  Flex,
  Tooltip,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  useToast,
  Spinner, // ✅ add this
} from "@chakra-ui/react";
import { InfoIcon, StarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface SignupStep3Props {
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep3({
  selectedPlan,
  onPlanSelect,
  onNext,
  onBack,
}: SignupStep3Props) {
  const bg = useColorModeValue("gray.50", "gray.700");
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    if (!selectedPlan) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/signup/updateStep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 4,
          formData: { plan: selectedPlan },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save plan.");
      }

      onNext();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box p={8} bg={bg} borderRadius="md" boxShadow="md">
      <Heading size="lg" mb={4}>
        Choose Your Plan
      </Heading>
      <Text fontSize="md" mb={6}>
        Select a plan that best fits your needs:
      </Text>

      <RadioGroup onChange={onPlanSelect} value={selectedPlan}>
        <VStack align="start" spacing={6}>
          <Radio value="basic">
            <HStack>
              <CheckCircleIcon color="blue.400" />
              <Box>
                <Text fontWeight="bold">Basic – $49/mo</Text>
                <Text fontSize="sm" color="gray.600">
                  Includes 1 bureau dispute
                </Text>
              </Box>
            </HStack>
          </Radio>

          <Radio value="standard">
            <HStack>
              <StarIcon color="orange.300" />
              <Box>
                <Text fontWeight="bold">Standard – $89/mo</Text>
                <Text fontSize="sm" color="gray.600">
                  3 bureau disputes & real-time updates
                </Text>
              </Box>
            </HStack>
          </Radio>

          <Radio value="premium">
            <HStack align="start">
              <Tooltip
                label="AI scans for errors and generates dispute logic"
                hasArrow
              >
                <InfoIcon color="purple.400" />
              </Tooltip>
              <Box>
                <Text fontWeight="bold">Premium – $129/mo</Text>
                <Text fontSize="sm" color="gray.600">
                  3 bureau disputes + AI Review
                </Text>
              </Box>
            </HStack>
          </Radio>
        </VStack>
      </RadioGroup>

      <Heading size="md" mt={10} mb={4}>
        Plan Comparison
      </Heading>

      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Feature</Th>
              <Th>Basic</Th>
              <Th>Standard</Th>
              <Th>Premium</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Monthly Disputes</Td>
              <Td>1 Bureau</Td>
              <Td>3 Bureaus</Td>
              <Td>3 Bureaus</Td>
            </Tr>
            <Tr>
              <Td>Dispute Updates</Td>
              <Td>Manual</Td>
              <Td>Automated</Td>
              <Td>Automated</Td>
            </Tr>
            <Tr>
              <Td>AI Report Review</Td>
              <Td>—</Td>
              <Td>—</Td>
              <Td>✓</Td>
            </Tr>
            <Tr>
              <Td>Customer Support</Td>
              <Td>Email Only</Td>
              <Td>Email + Chat</Td>
              <Td>Priority Support</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Flex justify="space-between" mt={8}>
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleContinue}
          isDisabled={!selectedPlan || isSaving}
        >
          {isSaving ? <Spinner size="sm" /> : "Continue"}
        </Button>
      </Flex>
    </Box>
  );
}
