// components/TestimonialSection.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Text,
  Image,
  Avatar,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface Testimonial {
  name: string;
  quote: string;
  avatar: string;
  icon?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    quote: "Thanks to Sable, I saw my credit score jump 50 points in 3 months!",
    avatar: "/mockups/testimonials/alex.jpg",
    icon: "/mockups/sable-difference/Sable-credit-gauge.png",
  },
  {
    name: "Maria Rodriguez",
    quote:
      "The easy-to-understand dashboard makes managing finances fun and simple.",
    avatar: "/mockups/testimonials/maria.jpg",
    icon: "/mockups/sable-difference/coin-piggy-bank.png",
  },
  {
    name: "David Lee",
    quote:
      "I never thought building savings could be so effortless—Sable makes it automatic!",
    avatar: "/mockups/testimonials/david.jpg",
    icon: "/mockups/sable-difference/46points.svg",
  },
];

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setLoopWidth(el.scrollWidth / 2);
  }, []);

  useEffect(() => {
    let frameId: number;
    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      const el = containerRef.current;
      if (el && !isDragging && loopWidth) {
        const delta = (30 * dt) / 1000;
        el.scrollLeft += delta;
        if (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, loopWidth]);

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
    el.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(false);
    el.releasePointerCapture(e.pointerId);
  };

  const all = [...testimonials, ...testimonials];
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg="rgba(248,244,240,1)"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 6 }}
    >
      {/* Section Title */}
      <Box textAlign="center" mb={8}>
        <Heading
          fontFamily="Inter, sans-serif"
          fontWeight={900}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          color="gray.900"
        >
          {" "}
          What people are saying
        </Heading>
      </Box>

      {/* Carousel Container */}
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
        <HStack spacing={6} px={{ base: 2, md: 4 }}>
          {all.map((t, idx) => (
            <Box
              key={`${t.name}-${idx}`}
              flex="0 0 auto"
              minW={{ base: "80%", sm: "60%", md: "45%", lg: "30%" }}
              scrollSnapAlign="start"
            >
              {/* Single outline, alternating colors */}
              <Box
                bg={cardBg}
                border="2px solid"
                borderColor={idx % 2 === 0 ? "green.500" : "orange.400"}
                borderRadius="lg"
                p={6}
                boxShadow="lg"
              >
                <VStack spacing={4}>
                  <Box position="relative">
                    <Avatar
                      name={t.name}
                      src={t.avatar}
                      size="xl"
                      border="2px solid"
                      borderColor={idx % 2 === 0 ? "green.500" : "orange.400"}
                    />
                    {t.icon && (
                      <Image
                        src={t.icon}
                        alt=""
                        boxSize="28px"
                        position="absolute"
                        bottom={0}
                        right={0}
                        transform="translate(25%, 25%)"
                      />
                    )}
                  </Box>
                  <Text
                    fontFamily="Inter, sans-serif"
                    fontWeight={700}
                    fontSize="lg"
                    color="gray.900"
                  >
                    {t.name}
                  </Text>
                  <Text
                    fontFamily="Inter, sans-serif"
                    fontWeight={400}
                    fontSize="md"
                    color="gray.700"
                    textAlign="center"
                    px={2}
                  >
                    “{t.quote}”
                  </Text>
                </VStack>
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
