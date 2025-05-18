// components/signup/SignupStep5.tsx
import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  useToast,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FormData } from "./SignupForm";

export interface SignupStep5Props {
  formData: FormData;
  onNext: () => void;
  onBack: () => void;
}

export default function SignupStep5({ formData, onNext }: SignupStep5Props) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [phaseScriptReady, setPhaseScriptReady] = useState(false);
  const [phase, setPhase] = useState<"enroll" | "kba">("enroll");
  const toast = useToast();

  const textColor = useColorModeValue("gray.700", "gray.300");

  // 1) Load Array SDK
  useEffect(() => {
    const s = document.createElement("script");
    s.src =
      "https://embed.array.io/cms/array-web-component.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD";
    s.async = true;
    s.onload = () => setSdkReady(true);
    s.onerror = () =>
      toast({
        title: "SDK Error",
        description: "Failed to load Array SDK.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    document.body.appendChild(s);
  }, [toast]);

  // 2) Load widget script for the current phase
  useEffect(() => {
    if (!sdkReady) return;
    setPhaseScriptReady(false);
    const w = document.createElement("script");
    w.async = true;
    w.src =
      phase === "enroll"
        ? "https://embed.array.io/cms/array-account-enroll.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD"
        : "https://embed.array.io/cms/array-authentication-kba.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD";
    w.onload = () => setPhaseScriptReady(true);
    w.onerror = () =>
      toast({
        title: "Widget Error",
        description: `Failed to load the ${phase} widget.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    document.body.appendChild(w);
  }, [sdkReady, phase, toast]);

  // 3) Bypass token fetch for sandbox
  useEffect(() => {
    setUserToken("SANDBOX_DUMMY_TOKEN");
  }, []);

  // Spinner until everything’s ready
  if (!sdkReady || !phaseScriptReady || !userToken) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      minH="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 8 }}
      overflowX="hidden"
    >
      {/* Slimmed-down graphic */}
      <Box mb={{ base: 1, md: 2 }} w={{ base: "50%", md: "30%" }}>
        <Image
          src="/mockups/grow/graphic-working-mom.png"
          alt="Working Mom Graphic"
          objectFit="contain"
          w="100%"
          h="auto"
          mx="auto"
        />
      </Box>

      {/* Smaller heading & text */}
      <Box textAlign="center" mb={{ base: 1, md: 2 }} maxW="500px">
        <Heading fontSize={{ base: "xl", md: "2xl" }} color="#e39d49" mb={1}>
          Verify Your Identity
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
          Quick & secure—unlock full access to Sable.
        </Text>
      </Box>

      {/* Full-bleed widget on desktop, edge-to-edge */}
      <Box
        w="100vw"
        maxW="100vw"
        position="relative"
        left={{ md: "50%" }}
        ml={{ md: "-50vw" }}
        flex="1"
      >
        {phase === "enroll"
          ? React.createElement("array-account-enroll", {
              appKey: "3F03D20E-5311-43D8-8A76-E4B5D77793BD",
              apiUrl: "https://sandbox.array.io",
              sandbox: true,
              showQuickView: true,
              userToken,
              style: { width: "100%", height: "100%" },
              onComplete: () => setPhase("kba"),
            })
          : React.createElement("array-authentication-kba", {
              appKey: "3F03D20E-5311-43D8-8A76-E4B5D77793BD",
              apiUrl: "https://sandbox.array.io",
              sandbox: true,
              userId: formData.userId,
              showResultPages: true,
              style: { width: "100%", height: "100%" },
              onComplete: () => onNext(),
            })}
      </Box>
    </Flex>
  );
}
