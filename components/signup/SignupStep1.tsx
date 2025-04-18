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
} from "@chakra-ui/react";
import { FaBolt, FaDollarSign, FaShieldAlt } from "react-icons/fa";

interface SignupStep1Props {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
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
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container
      maxW="7xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      pt={8}
    >
      <Heading size="xl" textAlign="center" mb={10}>
        Create your account
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        gap={12}
        w="full"
      >
        {/* Signup Form */}
        <Box
          bg="white"
          p={[6, 10]}
          borderRadius="xl"
          flex="1"
          maxW={{ base: "100%", md: "560px" }}
          w="100%"
        >
          <VStack spacing={6} align="stretch">
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
                placeholder="Create a password"
                size="lg"
                type="password"
              />
            </Box>

            <Box>
              <Flex align="start" mb={4}>
                <input
                  type="checkbox"
                  id="consent"
                  required
                  style={{ marginTop: "6px", marginRight: "8px" }}
                />
                <label
                  htmlFor="consent"
                  style={{ fontSize: "0.875rem", color: "#4A5568" }}
                >
                  I agree to the Terms of Service and Privacy Policy.
                </label>
              </Flex>

              <Flex justify="center">
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={onNext}
                  w={isMobile ? "100%" : "auto"}
                >
                  Continue
                </Button>
              </Flex>
            </Box>
          </VStack>
        </Box>

        {/* Benefits Sidebar */}
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
