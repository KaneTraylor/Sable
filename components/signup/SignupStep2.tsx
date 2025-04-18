import {
  Box,
  Heading,
  Text,
  Checkbox,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface SignupStep2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep2({ onNext, onBack }: SignupStep2Props) {
  const [consentGiven, setConsentGiven] = useState(false);
  const toast = useToast();

  const handleNext = () => {
    if (!consentGiven) {
      toast({
        title: "Consent required",
        description: "You must agree to the credit pull before continuing.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onNext();
  };

  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Step 2: Consent & Credit Pull
      </Heading>
      <Text mb={4}>
        In order to begin the dispute process, we need to pull your credit
        report. This will not affect your score.
      </Text>
      <VStack align="start" spacing={4}>
        <Checkbox
          isChecked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
        >
          I authorize Rising Tides to access my credit report.
        </Checkbox>

        <Box display="flex" gap={4}>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button colorScheme="blue" onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
