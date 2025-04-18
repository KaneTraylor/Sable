import {
  Box,
  Heading,
  Text,
  Checkbox,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

interface SignupStep2Props {
  onNext: () => void;
}

export default function SignupStep2({ onNext }: SignupStep2Props) {
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePullReport = async () => {
    if (!consent) return;

    setLoading(true);

    // Simulate credit pull
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Later, integrate actual API call to SmartCredit, Experian, etc.
      onNext();
    } catch (err) {
      alert("Failed to pull credit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Step 2: Credit Report Consent
      </Heading>
      <Text mb={4}>
        We need your permission to pull your credit report to begin the dispute
        process.
      </Text>
      <Checkbox
        isChecked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        mb={6}
      >
        I give consent to pull my credit report.
      </Checkbox>
      <Button
        colorScheme="blue"
        onClick={handlePullReport}
        isDisabled={!consent || loading}
      >
        {loading ? <Spinner size="sm" /> : "Pull My Credit"}
      </Button>
    </Box>
  );
}
