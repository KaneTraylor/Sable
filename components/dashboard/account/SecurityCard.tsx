import { Box, Text, VStack, Button } from "@chakra-ui/react";

export default function SecurityCard() {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <Text fontSize="lg" fontWeight="medium" mb={4}>
        Security
      </Text>
      <VStack align="stretch" spacing={3}>
        <Button
          variant="link"
          colorScheme="green"
          size="sm"
          justifyContent="flex-start"
        >
          Change Password
        </Button>
        <Button
          variant="link"
          colorScheme="red"
          size="sm"
          justifyContent="flex-start"
        >
          Close Account
        </Button>
      </VStack>
    </Box>
  );
}
