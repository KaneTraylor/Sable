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
        px={10}
        py={6}
        borderRadius="full"
        bgGradient="linear(to-r, green.400, green.600)"
        color="white"
        boxShadow="lg"
        _hover={{ bgGradient: "linear(to-r, green.500, green.700)" }}
        onClick={() => router.push("/auth/signup")}
      >
        Start Building Credit
      </Button>
    </Box>
  );
}
