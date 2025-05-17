import { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  useToast,
  Container,
} from "@chakra-ui/react";

import type { FormData } from "./SignupForm"; // adjust path if needed

export interface SignupStep5Props {
  formData: FormData;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep5({
  onNext,
  onBack,
  formData,
}: SignupStep5Props) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"enroll" | "kba">("enroll");
  const enrollRef = useRef<HTMLDivElement>(null);
  const kbaRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/array/getWidget");
        const data = await res.json();
        if (!data.userToken) throw new Error("Missing Array userToken");
        setUserToken(data.userToken);
      } catch (err) {
        toast({
          title: "Widget Error",
          description: "Could not load identity verification widget.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [toast]);

  useEffect(() => {
    if (!userToken) return;

    const loadScript = (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript(
      "https://embed.array.io/cms/array-web-component.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
    );

    if (phase === "enroll" && enrollRef.current) {
      loadScript(
        "https://embed.array.io/cms/array-account-enroll.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
      );
      enrollRef.current.innerHTML = `
        <array-account-enroll
          appKey="3F03D20E-5311-43D8-8A76-E4B5D77793BD"
          apiUrl="https://mock.array.io"
          sandbox="true"
          showQuickView="true"
          onComplete="window.arrayWidgetEnrollDone()"
        ></array-account-enroll>
      `;
      window.arrayWidgetEnrollDone = () => setPhase("kba");
    }

    if (phase === "kba" && kbaRef.current) {
      loadScript(
        "https://embed.array.io/cms/array-authentication-kba.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
      );
      kbaRef.current.innerHTML = `
        <array-authentication-kba
          appKey="3F03D20E-5311-43D8-8A76-E4B5D77793BD"
          apiUrl="https://mock.array.io"
          sandbox="true"
          userId="${formData.userId}"
          showResultPages="true"
          onComplete="window.arrayWidgetKbaDone()"
        ></array-authentication-kba>
      `;
      window.arrayWidgetKbaDone = () => onNext();
    }
  }, [phase, userToken, formData.userId, onNext]);

  return (
    <Container maxW="3xl" py={12}>
      <VStack spacing={6} textAlign="center">
        <Heading size="lg" color="green.600">
          Secure Identity Verification
        </Heading>
        <Text fontSize="md" color="gray.600">
          Complete your verification to access your credit profile and unlock
          Sable Premium.
        </Text>

        {loading ? (
          <Spinner size="lg" mt={6} />
        ) : (
          <Box
            ref={phase === "enroll" ? enrollRef : kbaRef}
            w="full"
            minH="420px"
          />
        )}
      </VStack>
    </Container>
  );
}

declare global {
  interface Window {
    arrayWidgetEnrollDone: () => void;
    arrayWidgetKbaDone: () => void;
  }
}
