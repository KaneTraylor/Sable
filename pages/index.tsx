import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Box, Text, VStack, Container } from "@chakra-ui/react";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/common/Navbar";
import WhyItWorksSection from "@/components/home/WhyItWorksSection";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <HeroSection />
      <WhyItWorksSection />

      <Container maxW="lg" mt={16} mb={20}>
        <VStack spacing={4} textAlign="center">
          <Text fontSize="lg" color="gray.600">
            Already have an account?
          </Text>
          <Button
            colorScheme="blue"
            w="full"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            w="full"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
