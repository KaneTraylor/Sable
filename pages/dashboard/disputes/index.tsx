import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function DisputeStep1() {
  const bg = useColorModeValue("white", "gray.700");

  const STEPS = [
    "Select up to 5 error items per month",
    "Review and send dispute letters",
    "Track your disputes",
  ];

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="#f9f5f1" // tan background matching hero section
    >
      {/* Nav */}
      <Box as="nav" p={4} bg={bg} boxShadow="sm">
        <NextLink href="/dashboard" passHref>
          <Text
            fontWeight="medium"
            fontSize="md"
            color="black"
            cursor="pointer"
          >
            ← Back to Dashboard
          </Text>
        </NextLink>
      </Box>

      {/* Main content */}
      <Center flex="1" px={{ base: 4, md: 6 }} py={8}>
        <Box maxW="800px" w="full">
          {/* Illustration */}
          <Center mb={8}>
            <Image
              src="/mockups/sable-difference/500unsecured.svg"
              alt="Dispute Instructions"
              maxW="320px"
              minW="240px"
            />
          </Center>

          {/* Heading */}
          <Heading as="h3" size="lg" textAlign="center" mb={8}>
            Submitting disputes only takes a few steps
          </Heading>

          {/* Steps */}
          <VStack spacing={6} align="stretch">
            {STEPS.map((title, i) => (
              <Flex key={i} align="center">
                <Image
                  src="/mockups/other/icon-plus-green.svg"
                  alt="Plus Icon"
                  boxSize="24px"
                  mr={4}
                />
                <Text fontSize="lg" fontWeight="medium">
                  {title}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Center>

      {/* CTA */}
      <Box as="footer" p={4} bg={bg} boxShadow="inner">
        <NextLink href="/dashboard/disputes/select" passHref>
          <Box
            as="a"
            display="block"
            textAlign="center"
            bg="green.500"
            color="white"
            py={4}
            borderRadius="md"
            fontWeight="bold"
            _hover={{ bg: "green.600" }}
          >
            Let’s get started
          </Box>
        </NextLink>
      </Box>
    </Flex>
  );
}
