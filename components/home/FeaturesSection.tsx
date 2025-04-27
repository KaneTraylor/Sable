// components/FeaturesCarousel.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const features = [
  {
    title: "Credit Building Loans",
    icon: "/mockups/grow/cash-in-safe.png",
    desc: "Build credit with secure, low-rate loans.",
  },
  {
    title: "Credit Monitoring",
    icon: "/mockups/sable-difference/Sable-credit-gauge.png",
    desc: "Track your FICO® Score—the one most lenders use.",
  },
  {
    title: "Subscription Cancellation",
    icon: "/mockups/grow/graphic-money-bag-orange.svg",
    desc: "Cancel unwanted services in one tap.",
  },
  {
    title: "Budget Tracking",
    icon: "/mockups/grow/cash-in-wallet.png",
    desc: "Visualize spending and stay on top of your goals.",
  },
  {
    title: "Credit Score Insights",
    icon: "/mockups/credit-growth-illustration.png",
    desc: "Get tips on boosting your score—see what moves the needle.",
  },
  {
    title: "Auto-Disputing Accounts",
    icon: "/mockups/3b.svg",
    desc: "We automatically challenge errors on your report.",
  },
  {
    title: "Rent Reporting",
    icon: "/mockups/sable-difference/house.avif",
    desc: "Turn on-time rent into credit-building power.",
  },
  {
    title: "… & More!",
    icon: "/mockups/other/icon-plus-green.svg",
    desc: "All the tools you need in one app.",
  },
];

export default function FeaturesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [loopWidth, setLoopWidth] = useState(0);

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const containerBg = useColorModeValue("white", "gray.800");

  // Measure half the scrollWidth (one copy of features)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // duplicated content => true scrollWidth is double
    const full = el.scrollWidth;
    setLoopWidth(full / 2);
  }, []);

  // Continuous scroll at ~30px/sec, infinite loop
  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      const el = containerRef.current;
      if (el && !isDragging && loopWidth > 0) {
        const delta = (30 * dt) / 1000;
        el.scrollLeft += delta;
        // When we've scrolled past one copy, subtract loopWidth
        if (el.scrollLeft >= loopWidth) {
          el.scrollLeft -= loopWidth;
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, loopWidth]);

  // Pointer (mouse & touch) drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - startX.current;
    el.scrollLeft = scrollStart.current - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(false);
    el.releasePointerCapture(e.pointerId);
  };

  // Combine two copies for seamless loop
  const all = [...features, ...features];

  return (
    <Box bg={containerBg} py={{ base: 12, md: 16 }} overflow="hidden">
      <Box textAlign="center" mb={8} px={{ base: 4, md: 6 }}>
        <Heading
          fontFamily="heading"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Everything Our App Does
        </Heading>
      </Box>

      <Box
        ref={containerRef}
        overflowX="auto"
        whiteSpace="nowrap"
        cursor={isDragging ? "grabbing" : "grab"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        css={{
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack spacing={6} px={{ base: 4, md: 6 }}>
          {all.map((feat, idx) => (
            <Box
              key={`${feat.title}-${idx}`}
              flex="0 0 auto"
              minW={{ base: "85%", sm: "60%", md: "45%", lg: "30%" }}
              bg={cardBg}
              p={6}
              borderRadius="lg"
              boxShadow="md"
              scrollSnapAlign="start"
              textAlign="center"
            >
              <Image
                src={feat.icon}
                alt={feat.title}
                boxSize="80px"
                mx="auto"
                mb={4}
              />
              <Text fontFamily="heading" fontWeight="700" fontSize="xl" mb={2}>
                {feat.title}
              </Text>
              <Text color="gray.500" fontSize="md">
                {feat.desc}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
