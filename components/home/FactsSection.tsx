// components/FactsSection.tsx
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  chakra,
  VStack,
  Stack,
} from "@chakra-ui/react";

export default function FactsSection() {
  return (
    <Box
      bg="white"
      pt={{ base: 6, md: 20 }}
      pb={{ base: 8, md: 16 }}
      px={{ base: 4, md: 10 }}
    >
      <Flex
        maxW="1024px"
        mx="auto"
        direction="column"
        align="center"
        textAlign="center"
        gap={{ base: 8, md: 16 }}
      >
        {/* “The Facts” label */}
        <Text
          fontFamily="Inter, sans-serif"
          fontWeight={700}
          fontSize={{ base: "0.875rem", md: "1rem" }}
          letterSpacing="0.05em"
          color="gray.400"
          textTransform="uppercase"
        >
          The Facts
        </Text>

        {/* Main Heading */}
        <Heading
          as="h2"
          fontFamily="Inter, sans-serif"
          fontWeight={900}
          fontSize={{ base: "2.25rem", md: "3.5rem", lg: "4rem" }}
          lineHeight={1.1}
        >
          <chakra.span color="gray.900">
            The average person is set up to&nbsp;
          </chakra.span>
          <chakra.span color="#35A61A">fail at money.</chakra.span>
        </Heading>

        {/* Subhead */}
        <Text
          fontFamily="Inter, sans-serif"
          fontWeight={700}
          fontSize={{ base: "1rem", md: "1.125rem" }}
          color="gray.900"
          mb={2}
        >
          If you struggle to save and build credit, the problem isn’t with
          you&nbsp;
          <chakra.span fontWeight={400}>
            — it’s with the system that’s been set up to profit when people
            fail.
          </chakra.span>
        </Text>

        {/* Stats: switch to vertical stack on mobile */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 16 }}
          w="full"
          align="center"
          justify="center"
          pt={{ base: 4, md: 10 }}
          pb={{ base: 4, md: 10 }}
        >
          {[
            {
              number: "47%",
              label: "of Americans have poor or no credit.²",
            },
            {
              number: "57%",
              label: "have less than $1,000 in a savings account.³",
            },
          ].map(({ number, label }) => (
            <VStack key={number} spacing={1} flex="1">
              <Text
                fontFamily="Inter, sans-serif"
                fontWeight={900}
                fontSize={{ base: "2.5rem", md: "4rem" }}
                lineHeight={1}
                color="#35A61A"
              >
                {number}
              </Text>
              <Text
                fontFamily="Inter, sans-serif"
                fontWeight={300}
                fontSize={{ base: "0.875rem", md: "1rem" }}
                color="gray.500"
                textAlign="center"
              >
                {label}
              </Text>
            </VStack>
          ))}
        </Stack>

        {/* Illustration */}
        <Box w="full" maxW="400px">
          <Image
            src="https://assets.seedfi.com/assets/web/static/media/graphic-group-shot.42f7e523.svg"
            alt="Group illustration"
            w="100%"
            h="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
}
