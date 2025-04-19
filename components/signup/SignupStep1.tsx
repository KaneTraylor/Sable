// components/signup/SignupStep1.tsx
import {
  Box,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
  Text,
  Container,
  Flex,
  Icon,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { FaBolt, FaDollarSign, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";

interface SignupStep1Props {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: (initialStep: number, initialData?: any) => void;
}

const benefits = [
  {
    icon: FaBolt,
    title: "Fast",
    description: "No credit check, no credit pull.",
  },
  {
    icon: FaDollarSign,
    title: "Affordable",
    description: "Plans start at $5/month.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure",
    description: "Bank-level security keeps your data safe.",
  },
];

export default function SignupStep1({
  formData,
  onChange,
  onNext,
}: SignupStep1Props) {
  const [loading, setLoading] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const handleContinue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/signup/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      if (!data.formData?.userId) {
        throw new Error("Missing userId from response");
      }

      onNext(data.currentStep, {
        ...formData,
        userId: data.formData.userId,
        password: formData.password, // retain original password
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Signup failed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDummyData = () => {
    const suffix = Math.floor(Math.random() * 100000);
    onChange("firstName", "Dev");
    onChange("lastName", "User");
    onChange("email", `test${suffix}@example.com`);
    onChange("password", "TestPass123!");
    setTimeout(() => handleContinue(), 300);
  };

  return (
    <Container maxW="7xl" minH="100vh" display="flex" alignItems="center">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        gap={12}
        w="full"
      >
        <Box
          bg="white"
          p={[6, 10]}
          borderRadius="xl"
          flex="1"
          maxW={{ base: "100%", md: "560px" }}
          w="100%"
        >
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="left">
              Create your account
            </Heading>

            <Box>
              <FormLabel>First Name</FormLabel>
              <Input
                value={formData.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="First Name"
                size="lg"
              />
            </Box>

            <Box>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={formData.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Last Name"
                size="lg"
              />
            </Box>

            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="you@example.com"
                size="lg"
                type="email"
              />
            </Box>

            <Box>
              <FormLabel>Password</FormLabel>
              <Input
                value={formData.password}
                onChange={(e) => onChange("password", e.target.value)}
                placeholder="Password"
                size="lg"
                type="password"
              />
            </Box>

            <Flex justify="center" flexDirection="column" gap={3}>
              <Button
                colorScheme="green"
                size="lg"
                onClick={handleContinue}
                isLoading={loading}
                w={isMobile ? "100%" : "auto"}
              >
                Continue
              </Button>
              <Button
                onClick={generateDummyData}
                variant="link"
                fontSize="sm"
                colorScheme="blue"
              >
                Fill with Dummy Data
              </Button>
            </Flex>
          </VStack>
        </Box>

        <VStack
          spacing={6}
          align="start"
          pt={[10, 4]}
          borderTop={{ base: "1px solid", md: "none" }}
          borderLeft={{ base: "none", md: "1px solid" }}
          borderColor="gray.200"
          pl={{ base: 0, md: 10 }}
          flex="1"
          maxW={{ base: "100%", md: "420px" }}
        >
          {benefits.map((benefit, idx) => (
            <Flex key={idx} align="center" gap={4}>
              <Icon as={benefit.icon} w={6} h={6} color="green.500" />
              <Box>
                <Text fontWeight="bold">{benefit.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {benefit.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Container>
  );
}
