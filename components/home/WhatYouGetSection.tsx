// components/home/WhatYouGetSection.tsx
import { Box, Container, SimpleGrid, Heading, Text } from "@chakra-ui/react";

const FEATURES = [
  {
    label: "$500",
    sub: "in your Savings Account ready to access once you make your final payment",
  },
  {
    label: "+45 pts",
    sub: "average credit‑score increase with on‑time payments",
  },
];

export default function WhatYouGetSection() {
  return (
    <Box as="section" bg="gray.50" py={{ base: 12, md: 20 }}>
      <Container maxW="container.md" textAlign="center">
        <Heading size="xl" mb={8}>
          What you get
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {FEATURES.map((f) => (
            <Box
              key={f.label}
              p={6}
              bg="white"
              boxShadow="md"
              borderRadius="xl"
              textAlign="center"
            >
              <Heading size="2xl" color="green.500" mb={2}>
                {f.label}
              </Heading>
              <Text color="gray.600">{f.sub}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
