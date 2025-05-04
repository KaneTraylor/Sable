// components/dashboard/account/LogoutCard.tsx
import { Box, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function LogoutCard() {
  return (
    <Box
      onClick={() => signOut({ callbackUrl: "/" })}
      bg="green.500"
      color="white"
      borderRadius="lg"
      px={6}
      py={4}
      fontWeight="medium"
      textAlign="center"
      cursor="pointer"
      transition="background 0.2s"
      _hover={{ bg: "green.600" }}
    >
      <Text>Log Out</Text>
    </Box>
  );
}
