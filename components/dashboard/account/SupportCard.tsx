import { Box, Flex, Text, Button } from "@chakra-ui/react";

export default function SupportCard() {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="lg" fontWeight="medium">
          Support and FAQs
        </Text>
        <Button variant="link" colorScheme="green" size="sm">
          Help me
        </Button>
      </Flex>
      <Text fontSize="sm" color="gray.600">
        Visit our Help Center or contact support for assistance with your
        account.
      </Text>
    </Box>
  );
}
