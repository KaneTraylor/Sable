import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  Flex,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function HeroSection() {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="gray.50" pt={[12, 20]} pb={[16, 24]} overflow="hidden">
      <Container maxW="7xl" px={[4, 6, 10]}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={12}
        >
          <VStack
            spacing={6}
            align="start"
            flex="1"
            animation={`${fadeInUp} 0.8s ease-out`}
          >
            <Text fontSize="md" color="green.500" fontWeight="semibold">
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
              bgGradient="linear(to-r, green.400, green.500)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, green.500, green.600)" }}
              onClick={() => router.push("/onboarding/signup")} // ✅ updated route
            >
              Get Started
            </Button>
          </VStack>

          <Image
            src="/mockups/credit-growth-illustration.png"
            alt="Credit growth illustration"
            maxW={{ base: "90%", md: "500px" }}
            animation={`${fadeInUp} 1s ease-out`}
          />
        </Flex>
      </Container>
    </Box>
  );
}
