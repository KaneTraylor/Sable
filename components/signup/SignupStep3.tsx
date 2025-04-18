import {
  Box,
  Heading,
  VStack,
  Radio,
  RadioGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface SignupStep3Props {
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
}

export default function SignupStep3({
  selectedPlan,
  onPlanSelect,
}: SignupStep3Props) {
  const [localPlan, setLocalPlan] = useState(selectedPlan || "");

  const handleNext = () => {
    if (localPlan) {
      onPlanSelect(localPlan);
    }
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Step 3: Choose Your Plan
      </Heading>
      <Text mb={4}>Select a plan that best fits your needs:</Text>

      <RadioGroup onChange={setLocalPlan} value={localPlan}>
        <VStack align="start" spacing={3}>
          <Radio value="basic">
            <strong>Basic</strong> – $49/mo • Includes 1 bureau disputes
          </Radio>
          <Radio value="standard">
            <strong>Standard</strong> – $89/mo • 3 bureau disputes & updates
          </Radio>
          <Radio value="premium">
            <strong>Premium</strong> – $129/mo • 3 bureau disputes + AI review
          </Radio>
        </VStack>
      </RadioGroup>

      <Button
        mt={6}
        colorScheme="blue"
        onClick={handleNext}
        isDisabled={!localPlan}
      >
        Continue
      </Button>
    </Box>
  );
}
