// components/home/FAQSection.tsx
import { Box, Container, Heading, VStack, Text } from "@chakra-ui/react";

const FAQ = [
  {
    q: "Why is this a loan if I can’t access money up front?",
    a: "We give you money by locking it into your Savings Account, which you can’t access until you pay off the loan—but every on‑time payment is reported to the bureaus to build credit.",
  },
  {
    q: "How can I get money now and still save?",
    a: "Check out our Borrow & Grow plan—it lets you access cash today while still building savings and credit.",
  },
];

export default function FAQSection() {
  return (
    <Box as="section" bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="container.md">
        <Heading size="xl" mb={8} textAlign="center">
          Popular Questions
        </Heading>
        <VStack spacing={6} align="stretch">
          {FAQ.map((f) => (
            <Box key={f.q}>
              <Heading size="md" mb={2}>
                {f.q}
              </Heading>
              <Text color="gray.600">{f.a}</Text>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
