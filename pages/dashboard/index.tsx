// most of the dashboard layout is under creditscoreoverview.tsx, this index page includes the popups etc. could've made this completely wrong but here we are <3
import { useEffect, useState } from "react";
import ScoreOverview from "@/components/dashboard/ScoreOverview";
import PopupWindowOne from "@/components/dashboard/PopupWindowOne";
import PopupWindowTwo from "@/components/dashboard/PopupWindowTwo";
import CreditOverviewWidget from "@/components/dashboard/CreditOverviewWidget";
import {
  Box,
  Text,
  Button,
  useColorModeValue,
  VStack,
  Container,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";

type PopupType = "1" | "2";

function DisputeCountdownBanner() {
  const { data } = useSWR("/api/user/me", (url) =>
    axios.get(url).then((res) => res.data)
  );
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (data?.lastDisputeSentAt) {
      const last = new Date(data.lastDisputeSentAt);
      const now = new Date();
      const diff = Math.ceil(
        30 - (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff > 0) setDaysLeft(diff);
    }
  }, [data]);

  if (!daysLeft) return null;

  return (
    <Container maxW="xl" mt={8}>
      <Box
        bg="#f9f5f1"
        p={5}
        borderRadius="xl"
        boxShadow="sm"
        textAlign="center"
      >
        <VStack spacing={2}>
          <Text fontWeight="semibold" fontSize="lg">
            {daysLeft} days until your next dispute window
          </Text>
          <Text fontSize="sm" color="gray.600">
            You’ll be eligible to send another dispute in{" "}
            <strong>{daysLeft}</strong> day{daysLeft > 1 ? "s" : ""}.
          </Text>
          <Button
            size="sm"
            mt={2}
            colorScheme="green"
            variant="solid"
            fontWeight="semibold"
          >
            View Disputes
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default function DashboardPage() {
  const [which, setWhich] = useState<PopupType>("1");
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

  useEffect(() => {
    const last = window.localStorage.getItem("lastPopup");
    const next: PopupType = last === "1" ? "2" : "1";
    window.localStorage.setItem("lastPopup", next);
    setWhich(next);

    // Fetch widget token on mount
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/array/getWidget");
        const data = await res.json();
        setUserToken(data.userToken);
      } catch (err) {
        console.error("Failed to load widget token", err);
      } finally {
        setLoadingToken(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <DisputeCountdownBanner />
      <ScoreOverview />

      {which === "1" ? <PopupWindowOne /> : <PopupWindowTwo />}
    </>
  );
}
