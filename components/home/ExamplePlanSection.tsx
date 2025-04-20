// components/home/ExamplePlanSection.tsx
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";

const PLAN = {
  savings: "$500",
  loan: "$0 now, $500 locked in savings",
  payment: "$20 every 2 weeks",
  fee: "$1/mo",
  length: "12 months",
};

export default function ExamplePlanSection() {
  return (
    <Box as="section" bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="container.md" textAlign="center">
        <Heading size="xl" mb={8}>
          Example Plan
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold">Savings for later:</Text>
            <Heading size="lg">{PLAN.savings}</Heading>
            <Text fontWeight="bold">Locked until payoff:</Text>
            <Heading size="lg">{PLAN.loan}</Heading>
          </VStack>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold">Payment:</Text>
            <Heading size="lg">{PLAN.payment}</Heading>
            <Text fontWeight="bold">Fee:</Text>
            <Heading size="lg">{PLAN.fee}</Heading>
            <Text fontWeight="bold">Plan length:</Text>
            <Heading size="lg">{PLAN.length}</Heading>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
