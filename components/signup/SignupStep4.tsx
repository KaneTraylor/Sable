import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";

interface SignupStep4Props {
  onNext: (step: number) => void;
  onBack: () => void;
}

export default function SignupStep4({ onNext, onBack }: SignupStep4Props) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box maxW="xl" mx="auto" px={4} py={12}>
      <VStack spacing={8} align="stretch" textAlign="center">
        <Image
          src="/mockups/sable-difference/46points.svg"
          alt="Credit Score Boost Illustration"
          maxH={isMobile ? "180px" : "240px"}
          mx="auto"
        />

        <Heading size="lg" fontWeight="500" color="green.600">
          What Happens Next
        </Heading>
        <Text fontSize="md" color="gray.600">
          We’ll securely pull your 3-bureau credit report and ask a few quick
          questions to verify your identity. This helps us personalize your
          credit journey and deliver the tools that fit you best.
        </Text>

        <VStack spacing={4} pt={4}>
          <Button colorScheme="green" size="lg" onClick={() => onNext(5)}>
            Start Verification
          </Button>

          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
