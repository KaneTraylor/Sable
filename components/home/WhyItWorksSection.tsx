import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

const features = [
  {
    icon: FaRocket,
    title: "Fast Credit Building",
    description: "See improvements in weeks, not years.",
    delay: "0s",
  },
  {
    icon: FaShieldAlt,
    title: "No Hidden Fees",
    description: "Transparent pricing, always.",
    delay: "0.1s",
  },
  {
    icon: FaChartLine,
    title: "Track Your Progress",
    description: "Stay on top of your credit journey.",
    delay: "0.2s",
  },
];

export default function WhyItWorksSection() {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box as="section" py={16} px={6} bg={bg} textAlign="center">
      <VStack spacing={4} mb={10}>
        <Text
          fontSize="sm"
          color="blue.500"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Why It Works
        </Text>
        <Heading size="xl" fontWeight="extrabold">
          Simple, Transparent, Effective
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="2xl">
          We focus on what matters: rebuilding your credit with the tools that
          actually work.
        </Text>
      </VStack>

      <SimpleGrid columns={[1, null, 3]} spacing={10} maxW="6xl" mx="auto">
        {features.map((feature, index) => (
          <VStack
            key={feature.title}
            spacing={3}
            px={6}
            py={8}
            borderRadius="md"
            boxShadow="md"
            bg={useColorModeValue("gray.50", "gray.700")}
            animation={`${fadeInUp} 0.6s ease ${feature.delay} both`}
          >
            <Icon as={feature.icon} w={8} h={8} color="blue.500" />
            <Heading size="md">{feature.title}</Heading>
            <Text fontSize="sm" color="gray.600">
              {feature.description}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
