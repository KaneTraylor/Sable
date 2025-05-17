// components/dashboard/account/AccountNameCard.tsx
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function AccountNameCard() {
  // You can replace this with a prop or fetched user data
  const userName = "Soren Sable";

  return (
    <Box
      bg="white"
      borderRadius="lg"
      px={6}
      py={5}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="semibold" fontFamily="Lato, sans-serif">
        {userName}
      </Text>
    </Box>
  );
}
