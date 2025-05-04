// pages/dashboard/disputes/step1.tsx
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
  const numberBg = useColorModeValue("gray.200", "gray.600");

  const STEPS = [
    "Select up to 5 error items per month",
    "Review and send dispute letters",
    "Track your disputes",
  ];

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {/* You could swap this for your DashboardNavbar if desired */}
      <Box as="nav" p={4} bg={bg} boxShadow="sm">
        <NextLink href="/dashboard">
          <Text fontWeight="bold" cursor="pointer">
            ← Back to Dashboard
          </Text>
        </NextLink>
      </Box>

      <Center flex="1" px={{ base: 4, md: 6 }} py={8}>
        <Box maxW="800px" w="full">
          {/* Illustration */}
          <Center mb={8}>
            <Image
              src="/mockups/disputes_center_explorations_basic.svg"
              alt="Dispute Instructions Illustration"
              maxW="60%"
              minW="240px"
            />
          </Center>

          {/* Heading */}
          <Heading as="h3" size="lg" textAlign="center" mb={8}>
            Submitting disputes only takes a few steps
          </Heading>

          {/* Steps list */}
          <VStack spacing={6} align="stretch">
            {STEPS.map((title, i) => (
              <Flex key={i} align="center">
                <Center
                  w="24px"
                  h="24px"
                  bg={numberBg}
                  borderRadius="full"
                  color={useColorModeValue("gray.800", "white")}
                  fontWeight="bold"
                  mr={4}
                >
                  {i + 1}
                </Center>
                <Text fontSize="lg" fontWeight="medium">
                  {title}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Center>

      {/* Next button */}
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
