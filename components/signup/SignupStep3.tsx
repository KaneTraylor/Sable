// components/signup/SignupStep3.tsx
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Plan Required",
        description: "Please select a plan before continuing.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onNext();
  };

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Heading size="lg" mb={4}>
        Connect Your Credit Report
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6}>
        Select a SmartCredit option to connect your 3 bureau credit report to
        your Sable Credit account.
      </Text>

      <RadioGroup onChange={onPlanSelect} value={selectedPlan}>
        <VStack spacing={5} align="stretch">
          <Box border="1px solid #CBD5E0" p={4} borderRadius="md">
            <Radio value="protect">
              <Stack align="start" spacing={1}>
                <Text fontWeight="bold">SmartCredit Protect - $24.95/mo</Text>
                <Text fontSize="sm">
                  Monthly 3 Bureau Reports & Scores, $1M Identity Theft
                  Insurance, Credit Monitoring & Alerts, 2 Single Bureau Report
                  Updates/mo.
                </Text>
              </Stack>
            </Radio>
          </Box>
          <Box border="1px solid #CBD5E0" p={4} borderRadius="md">
            <Radio value="build">
              <Stack align="start" spacing={1}>
                <Text fontWeight="bold">SmartCredit Build - $29.95/mo</Text>
                <Text fontSize="sm">
                  Same benefits as Protect, plus unlimited Single Bureau Report
                  Updates.
                </Text>
              </Stack>
            </Radio>
          </Box>
        </VStack>
      </RadioGroup>

      <Text mt={4} fontSize="xs" color="gray.500">
        This will not create an inquiry or lower your credit score.
      </Text>

      <Box display="flex" justifyContent="space-between" mt={8}>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          colorScheme="green"
          onClick={handleContinue}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Continue"}
        </Button>
      </Box>
    </Box>
  );
}
