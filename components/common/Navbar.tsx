// components/common/Navbar.tsx
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      px={6}
      py={4}
      boxShadow="sm"
    >
      <Flex maxW="6xl" mx="auto" align="center">
        <Text
          fontSize="xl"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          Sable Credit
        </Text>
        <Spacer />
        <HStack spacing={4}>
          <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
            Sign In
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => router.push("/onboarding/signup")}
          >
            Get Started
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
