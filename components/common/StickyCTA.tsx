import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function StickyCTA() {
  const router = useRouter();

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="sticky"
      px={4}
    >
      <Button
        size="lg"
        bgGradient="linear(to-r, green.400, green.500)"
        color="white"
        px={8}
        py={6}
        borderRadius="full"
        shadow="lg"
        _hover={{ bgGradient: "linear(to-r, green.500, green.600)" }}
        onClick={() => router.push("/onboarding/signup")} // ✅ updated route
      >
        Start Building Credit
      </Button>
    </Box>
  );
}
