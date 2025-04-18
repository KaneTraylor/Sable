import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  useBreakpointValue,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

const features = [
  {
    title: "Credit Building Made Easy",
    description:
      "We report your activity to the major bureaus so you can start building credit with every payment.",
    image: "/mockups/HandCard1-01.svg",
  },
  {
    title: "No Credit Check Required",
    description:
      "Signing up won’t affect your credit score — get started without a hard inquiry.",
    image: "/mockups/HandCard2-01.svg",
  },
  {
    title: "Instant Approval",
    description:
      "Our simple sign-up process takes just minutes, with no long waits or paperwork.",
    image: "/mockups/HandCard3-01.svg",
  },
  {
    title: "Track Progress in Real-Time",
    description:
      "Your dashboard updates as your credit grows. Stay informed every step of the way.",
    image: "/mockups/HandCard3-01.svg",
  },
  {
    title: "Financial Tips That Matter",
    description:
      "We’ll guide you with personalized advice so you can make confident money moves.",
    image: "/mockups/PieChart2-01.svg",
  },
  {
    title: "Zero Hidden Fees",
    description:
      "What you see is what you get. No interest, no surprises — just transparent pricing.",
    image: "/mockups/PieChart3-01.svg",
  },
];

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function FeaturesSection() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Box
      py={20}
      mt={20}
      bg="white"
      px={{ base: 4, md: 10 }}
      maxW="7xl"
      mx="auto"
    >
      <VStack spacing={16} align="stretch">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          const { ref, inView } = useInView({ triggerOnce: true });

          return (
            <Flex
              key={index}
              ref={ref}
              direction={{
                base: "column",
                md: isEven ? "row" : "row-reverse",
              }}
              align="center"
              justify="space-between"
              gap={10}
              opacity={inView || prefersReducedMotion ? 1 : 0}
              animation={
                inView && !prefersReducedMotion
                  ? `${fadeInUp} 0.6s ease-out ${index * 0.2}s forwards`
                  : "none"
              }
              transition="transform 0.3s ease"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                w={{ base: "90%", md: "45%" }}
                p={4}
                borderRadius="lg"
                boxShadow="lg"
              />
              <Box w={{ base: "100%", md: "50%" }}>
                <Heading as="h3" size="lg" mb={4}>
                  {feature.title}
                </Heading>
                <Text fontSize="md" color="gray.600">
                  {feature.description}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
