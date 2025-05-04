// pages/dashboard/disputes/manual.tsx
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Link,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";

export default function DisputeManual() {
  const router = useRouter();
  const fg = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  // PDF download endpoint
  const pdfUrl = "/api/dispute/manual?format=pdf";

  return (
    <Box>
      {/* Sticky Top Bar */}
      <Flex
        as="header"
        position="sticky"
        top={0}
        zIndex={10}
        bg={bg}
        px={{ base: 4, md: 8 }}
        py={2}
        boxShadow="sm"
        align="center"
        justify="space-between"
      >
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </Flex>

      {/* Main Content */}
      <Box mx="auto" px={{ base: 4, md: 8 }} maxW="800px" pt={4} pb={24}>
        <VStack spacing={8} align="stretch">
          <Heading as="h3" size="lg" color={fg}>
            Manually mail yourself
          </Heading>

          <VStack spacing={6} align="stretch">
            {/* Step 1 */}
            <HStack align="start" spacing={4}>
              <Box
                w="24px"
                h="24px"
                flexShrink={0}
                mr={2}
                bg={border}
                color={fg}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
              >
                1
              </Box>
              <VStack align="start" spacing={2}>
                <Heading as="h5" size="md">
                  Download
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Access your dispute letter here
                </Text>
                <Link href={pdfUrl} isExternal>
                  <Button leftIcon={<FiDownload />} variant="outline" size="sm">
                    Download letter
                  </Button>
                </Link>
              </VStack>
            </HStack>

            {/* Step 2 */}
            <HStack align="start" spacing={4}>
              <Box
                w="24px"
                h="24px"
                flexShrink={0}
                mr={2}
                bg={border}
                color={fg}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
              >
                2
              </Box>
              <VStack align="start" spacing={2}>
                <Heading as="h5" size="md">
                  Print
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Print the letter and include a photocopy of your ID and proof
                  of address.
                </Text>
              </VStack>
            </HStack>

            {/* Step 3 */}
            <HStack align="start" spacing={4}>
              <Box
                w="24px"
                h="24px"
                flexShrink={0}
                mr={2}
                bg={border}
                color={fg}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
              >
                3
              </Box>
              <VStack align="start" spacing={2}>
                <Heading as="h5" size="md">
                  Mail
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Send your letter via certified mail to:
                </Text>
                <Text as="address" fontSize="sm" lineHeight="tall">
                  Equifax Information Services, LLC
                  <br />
                  P.O. Box 740256
                  <br />
                  Atlanta, GA 30374‑0256
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Sticky Footer */}
      <Flex
        as="footer"
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        bg={bg}
        py={4}
        px={{ base: 4, md: 8 }}
        boxShadow="0 -2px 6px rgba(0,0,0,0.1)"
        justify="flex-end"
      >
        <Button
          colorScheme="green"
          onClick={() => router.push("/dashboard/disputes/overview")}
        >
          Continue
        </Button>
      </Flex>
    </Box>
  );
}
