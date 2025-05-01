// components/HeroSection.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  VStack,
  Center,
  Container,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { CheckCircleIcon, LockIcon, StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const MotionImage = motion(Image);
const MotionHeading = motion(Heading);

const ROTATING_TEXT = [
  "Auto-Dispute your errors.",
  "Credit Building loans.",
  "Monitor your FICO® score.",
];

export default function HeroSection() {
  const toast = useToast();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Parallax downwards
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  // Rotating headline
  const [step, setStep] = useState(0);
  useEffect(() => {
    const iv = setInterval(
      () => setStep((s) => (s + 1) % ROTATING_TEXT.length),
      3000
    );
    return () => clearInterval(iv);
  }, []);

  // Animated disputes counter
  const [disputes, setDisputes] = useState(0);
  useEffect(() => {
    const target = 4562129;
    const duration = 3000;
    const frames = 100;
    const inc = Math.ceil(target / frames);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setDisputes(cur);
      if (cur >= target) clearInterval(t);
    }, duration / frames);
    return () => clearInterval(t);
  }, []);

  // Lead-capture form
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleLeadSubmit = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ status: "warning", title: "Enter a valid email" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ status: "success", title: "Thanks—watch your inbox!" });
      setEmail("");
    }, 1000);
  };

  return (
    <Box
      bg="rgba(248,244,240,1)"
      py={{ base: 12, md: 16 }}
      px={{ base: 6, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="1024px" zIndex="1">
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          justify="space-between"
          gap={8}
        >
          {/* Left Column */}
          <VStack align="start" spacing={6} flex="1">
            <MotionHeading
              as="h1"
              fontFamily="Lato, sans-serif"
              fontWeight="900"
              fontSize={{ base: "2.25rem", md: "3rem", xl: "3.5rem" }}
              lineHeight="1.1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Build credit, grow savings,&nbsp;
              <Text as="span" color="green.500">
                and achieve your goals.
              </Text>
            </MotionHeading>

            {/* Rotating Benefits */}
            <Box minH="1.5em">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Text
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                    fontSize={{ base: "lg", md: "xl" }}
                    color="gray.700"
                  >
                    {ROTATING_TEXT[step]}
                  </Text>
                </motion.div>
              </AnimatePresence>
            </Box>

            <Button
              size="lg"
              bg="green.500"
              color="white"
              fontFamily="Lato, sans-serif"
              fontWeight="700"
              _hover={{ bg: "green.700" }}
              onClick={() => router.push("/onboarding/signup")}
            >
              Get Started
            </Button>

            {/* Email Capture */}
            <Box
              w={{ base: "100%", md: "400px" }}
              border="2px solid"
              borderColor="gray.200"
              rounded="xl"
              px={4}
              py={2}
              _focusWithin={{
                borderColor: "green.500",
                boxShadow: "0 0 0 1px rgba(53,166,26,0.8)",
              }}
            >
              <InputGroup>
                <Input
                  variant="unstyled"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputRightElement width="6rem">
                  <Button
                    size="sm"
                    colorScheme="green"
                    isLoading={submitting}
                    onClick={handleLeadSubmit}
                  >
                    Submit
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            {/* Social Proof */}
            <HStack spacing={4} fontSize="sm" color="gray.600">
              <StarIcon color="yellow.400" />
              <Text>Trusted by 10,000+ credit-builders</Text>
              <Center
                height="1em"
                borderLeft="1px solid"
                borderColor="gray.300"
              />
              <Text>Disputes filed: {disputes.toLocaleString()}</Text>
            </HStack>

            {/* Trust Badges */}
            <HStack spacing={6} pt={4}>
              <HStack>
                <LockIcon color="gray.500" />
                <Text fontSize="sm">Bank-level Encryption</Text>
              </HStack>
              <HStack>
                <CheckCircleIcon color="green.500" />
                <Text fontSize="sm">FICO® Authorized</Text>
              </HStack>
              <HStack>
                <StarIcon color="yellow.400" />
                <Text fontSize="sm">24/7 Support</Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Right Column: Parallax Illustration */}
          <Box flex="1">
            <MotionImage
              src="/mockups/sable-difference/savings-party.png"
              alt="Financial growth illustration"
              style={{ y }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
