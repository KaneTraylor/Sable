// components/dashboard/WelcomeHeader.tsx
import {
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Sunrise, TrendingUp } from "lucide-react";

export function WelcomeHeader() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Flex align="center" py={4}>
      <Box>
        <HStack spacing={2} mb={1}>
          <Sunrise size={20} color="var(--chakra-colors-brand-500)" />
          <Heading size="xl" color="sable.warm.900">
            {getGreeting()}, {userName}
          </Heading>
        </HStack>
        <Text color="sable.warm.600" fontSize="lg">
          Here's what's happening with your credit today
        </Text>
      </Box>
      <Spacer />
      <Badge
        colorScheme="green"
        variant="subtle"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="sm"
      >
        <HStack spacing={1}>
          <TrendingUp size={12} />
          <Text>Credit Building Active</Text>
        </HStack>
      </Badge>
    </Flex>
  );
}
