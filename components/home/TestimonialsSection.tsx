// components/home/TestimonialsSection.tsx
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";

const TESTIMONIALS = [
  {
    quote:
      "SeedFi helped me during a rough time… I saw an opportunity to grow and have possible benefits for the future.",
    name: "Jamar",
    location: "Dallas, TX",
    avatar: "/mockups/sable-difference/graphic-group-shot.svg",
  },
  {
    quote:
      "Once I unlock my savings, I'm going to keep it saved! The knowledge that I have a safety net if I need it provides so much peace of mind!",
    name: "Linlee",
    location: "Lubbock, TX",
    avatar: "/mockups/sable-difference/coin-piggy-bank.png",
  },
];

export default function TestimonialsSection() {
  return (
    <Box as="section" bg="gray.50" py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg">
        <Heading size="xl" textAlign="center" mb={8}>
          What our customers say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: TESTIMONIALS.length }} spacing={8}>
          {TESTIMONIALS.map((t) => (
            <Box key={t.name} bg="white" p={6} boxShadow="md" borderRadius="xl">
              <Text mb={4}>"{t.quote}"</Text>
              <HStack spacing={4} align="center">
                <Image src={t.avatar} boxSize={10} borderRadius="full" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{t.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {t.location}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
