// components/TestimonialSection.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Avatar,
  VStack,
  HStack,
  useColorModeValue,
  useBreakpointValue,
  chakra,
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
  const cardBg = useColorModeValue("white", "gray.800");
  const px = useBreakpointValue({ base: 2, md: 4 });

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
        el.scrollLeft += (dt * 40) / 1000;
        if (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, loopWidth]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el || !isDragging) return;
    el.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(false);
    el.releasePointerCapture(e.pointerId);
  };

  const all = [...testimonials, ...testimonials];

  return (
    <Box bg="rgba(248,244,240,1)" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl" textAlign="center" mb={{ base: 6, md: 12 }}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="900"
          lineHeight="1.1"
        >
          What{" "}
          <chakra.span color="green.500" fontFamily="heading">
            people are
          </chakra.span>{" "}
          saying
        </Heading>
      </Container>

      <Box
        ref={containerRef}
        overflowX="auto"
        whiteSpace="nowrap"
        cursor={isDragging ? "grabbing" : "grab"}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        px={px}
        css={{
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack spacing={{ base: 4, md: 6 }} align="top">
          {all.map((t, idx) => {
            const glowColor =
              idx % 2 === 0 ? "rgba(53,166,26,0.6)" : "rgba(236,201,75,0.6)";
            return (
              <Box
                key={`${t.name}-${idx}`}
                flex="0 0 auto"
                minW={{ base: "80%", sm: "60%", md: "45%", lg: "30%" }}
                scrollSnapAlign="start"
                transition="box-shadow 0.2s"
                _hover={{ boxShadow: `0 0 20px ${glowColor}` }}
              >
                <Box
                  bg={cardBg}
                  border="2px solid"
                  borderColor={idx % 2 === 0 ? "green.500" : "orange.400"}
                  borderRadius="xl"
                  p={{ base: 6, md: 8 }}
                  boxShadow="xl"
                >
                  <VStack spacing={4}>
                    <Box position="relative">
                      <Avatar
                        name={t.name}
                        src={t.avatar}
                        size="2xl"
                        border="2px solid"
                        borderColor={idx % 2 === 0 ? "green.500" : "orange.400"}
                      />
                      {t.icon && (
                        <Image
                          src={t.icon}
                          alt=""
                          boxSize={{ base: "24px", md: "32px" }}
                          position="absolute"
                          bottom={0}
                          right={0}
                          transform="translate(25%, 25%)"
                        />
                      )}
                    </Box>
                    <Text fontSize="lg" fontWeight="700" color="gray.900">
                      {t.name}
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="400"
                      color="gray.700"
                      textAlign="center"
                      px={2}
                      lineHeight="1.4"
                    >
                      “{t.quote}”
                    </Text>
                  </VStack>
                </Box>
              </Box>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}
