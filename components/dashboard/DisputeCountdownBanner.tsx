// components/dashboard/DisputeCountdownBanner.tsx

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  SlideFade,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

interface UserData {
  nextDisputeAt: string | null;
}

export default function DisputeCountdownBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user/me");
      const data: UserData = await res.json();

      if (data?.nextDisputeAt) {
        const today = new Date();
        const nextDate = new Date(data.nextDisputeAt);
        const diffTime = nextDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) setDaysLeft(diffDays);
      }
    };

    fetchData();
  }, []);

  if (!daysLeft || !visible) return null;

  return (
    <SlideFade in={visible} offsetY={-4}>
      <Flex
        background="var(--dugout)"
        color="var(--strong-on-dugout)"
        px={6}
        py={4}
        borderRadius="16px"
        align="center"
        justify="space-between"
        boxShadow="md"
        fontWeight={500}
      >
        <Text fontSize="16px">
          ⚠️ {daysLeft} day{daysLeft !== 1 ? "s" : ""} until your next dispute
          round.
        </Text>
        <IconButton
          icon={<FiX />}
          aria-label="Dismiss banner"
          size="sm"
          variant="ghost"
          color="var(--moderate-on-dugout)"
          onClick={() => setVisible(false)}
        />
      </Flex>
    </SlideFade>
  );
}
