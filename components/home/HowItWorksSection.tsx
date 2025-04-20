// components/home/HowItWorksSection.tsx
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Icon,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaPiggyBank, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";

const STEPS = [
  {
    icon: FaPiggyBank,
    title: "Step 1",
    desc: "Set aside as little as $10 every paycheck for your plan.",
  },
  {
    icon: FaCalendarCheck,
    title: "Step 2",
    desc: "Build credit with every on‑time plan payment.",
  },
  {
    icon: FaCheckCircle,
    title: "Step 3",
    desc: "Access your savings once you’ve completed your plan.",
  },
];

export default function HowItWorksSection() {
  return (
    <Box as="section" bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg" textAlign="center">
        <Heading size="xl" mb={8}>
          How it works
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {STEPS.map((s) => (
            <VStack key={s.title} spacing={4}>
              <Icon as={s.icon} boxSize={12} color="green.400" />
              <Heading size="md">{s.title}</Heading>
              <Text color="gray.600">{s.desc}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
