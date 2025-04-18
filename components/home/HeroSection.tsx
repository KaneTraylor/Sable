import { keyframes } from "@emotion/react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

// Simple float animation for the image
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

export default function HeroSection() {
  const router = useRouter();
  const bgGradient = useColorModeValue(
    "linear(to-r, white, gray.50)",
    "gray.700"
  );

  return (
    <Box bgGradient={bgGradient} py={[16, 20, 28]} px={6}>
      <Box
        maxW="7xl"
        mx="auto"
        display="flex"
        flexDir={["column", null, "row"]}
        alignItems="center"
        justifyContent="space-between"
        gap={10}
      >
        <VStack
          spacing={6}
          align="start"
          textAlign={["center", null, "left"]}
          maxW="2xl"
        >
          <Text fontSize="md" color="blue.500" fontWeight="bold">
            Your credit journey starts here
          </Text>
          <Heading as="h1" size="2xl" fontWeight="extrabold">
            Build credit the easy way.
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Start building credit instantly — no credit check, no interest, no
            hidden fees.
          </Text>
          <Button
            size="lg"
            colorScheme="blue"
            onClick={() => router.push("/auth/signup")}
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
          >
            Get Started
          </Button>
        </VStack>

        <Box flexShrink={0} animation={`${float} 6s ease-in-out infinite`}>
          <Image
            src="/mockups/credit-growth-illustration.png"
            alt="Credit Growth Illustration"
            maxW={["100%", "350px"]}
            borderRadius="lg"
          />
        </Box>
      </Box>
    </Box>
  );
}
