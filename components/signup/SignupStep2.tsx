import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Wrap,
  WrapItem,
  Icon,
  Container,
  Image,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTools, FaShieldAlt } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { useState } from "react";

interface SignupStep3Props {
  onNext: (step: number, data?: any) => void;
  onBack: () => void;
}

const SERVICES = [
  {
    name: "Credit Builder Loan",
    icon: MdTrendingUp,
    image: "/mockups/sable-difference/coin-piggy-bank.png",
    description: "Build your credit profile by reporting on-time payments.",
  },
  {
    name: "DIY Disputing",
    icon: FaTools,
    image: "/mockups/sable-difference/Sable-credit-gauge.png",
    description:
      "Dispute negative items on your credit report with guided tools.",
  },
  {
    name: "Credit Monitoring",
    icon: FaShieldAlt,
    image: "/mockups/grow/cash-in-safe.png",
    description: "Stay informed with real-time alerts and 3-bureau tracking.",
  },
];

export default function SignupStep3({ onNext, onBack }: SignupStep3Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const cardBg = useColorModeValue("white", "gray.700");
  const cardGradient = useColorModeValue(
    "linear(to-br, white, gray.50)",
    "linear(to-br, gray.700, gray.800)"
  );

  const toggleService = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <Container maxW="5xl" px={4} py={12}>
      <VStack spacing={10} align="stretch" textAlign="center">
        <VStack spacing={4}>
          <Heading
            as="h3"
            fontFamily="Franklin Gothic, sans-serif"
            fontWeight="400"
            fontSize="2xl"
            color="green.500"
          >
            What Services Serve You Best?
          </Heading>

          <Text fontSize="md" color="gray.600">
            Select anything you're interested in — this helps us personalize
            your experience. You’ll still have access to everything.
          </Text>
        </VStack>

        <Wrap spacing={6} justify="center">
          {SERVICES.map((service) => {
            const isActive = selected.includes(service.name);
            return (
              <WrapItem key={service.name} w={{ base: "100%", md: "auto" }}>
                <Box
                  bgGradient={cardGradient}
                  p={6}
                  w="100%"
                  borderRadius="xl"
                  boxShadow={isActive ? "xl" : "lg"}
                  borderTopWidth={4}
                  borderTopColor={isActive ? "green.400" : "transparent"}
                  border="2px solid"
                  borderColor={isActive ? "green.500" : "gray.200"}
                  cursor="pointer"
                  transition="all 0.25s ease"
                  transform={isActive ? "scale(1.02)" : "scale(1)"}
                  _hover={{
                    borderColor: "green.400",
                    boxShadow: "xl",
                    transform: "scale(1.02)",
                  }}
                  onClick={() => toggleService(service.name)}
                >
                  <VStack spacing={4}>
                    <Image
                      src={service.image}
                      alt={service.name}
                      boxSize={"60px"}
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" fontSize="md">
                      {service.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500" lineHeight={1.4}>
                      {service.description}
                    </Text>
                    {isActive && (
                      <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    )}
                  </VStack>
                </Box>
              </WrapItem>
            );
          })}
        </Wrap>

        <VStack spacing={5} pt={6} w="full">
          <Button
            bg="green.500"
            color="white"
            _hover={{ bg: "green.700" }}
            rounded="lg"
            size="lg"
            w="full"
            maxW="xs"
            h="14"
            onClick={() => onNext(4, { services: selected })}
            isDisabled={selected.length === 0}
          >
            Continue
          </Button>
          <Button variant="ghost" size="lg" w="full" maxW="xs" onClick={onBack}>
            Back
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
