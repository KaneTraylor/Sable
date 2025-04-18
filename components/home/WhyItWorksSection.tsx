// components/home/WhyItWorksSection.tsx
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { FaBolt, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionVStack = motion(VStack);

export default function WhyItWorksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box bg="#1a1a1a" py={[12, 16]} ref={ref}>
      <Container maxW="6xl" textAlign="center">
        <Heading as="h2" size="xl" mb={4} color="white">
          Why it works
        </Heading>
        <Text fontSize="lg" color="gray.300" maxW="2xl" mx="auto" mb={10}>
          Sable Credit is designed to help you build real, lasting credit —
          fast, secure, and transparent.
        </Text>

        <SimpleGrid columns={[1, 1, 3]} spacing={8}>
          {[
            {
              icon: <FaBolt size={28} color="white" />,
              title: "Fast credit building",
              description:
                "Your credit starts improving in just a few weeks with regular updates.",
            },
            {
              icon: <FaLock size={28} color="white" />,
              title: "Safe & secure",
              description:
                "We encrypt and protect your info. No data selling, ever.",
            },
            {
              icon: <FaCheckCircle size={28} color="white" />,
              title: "Simple & transparent",
              description:
                "No hidden fees, no interest. Just easy steps to build credit.",
            },
          ].map((item, index) => (
            <MotionVStack
              key={index}
              bg="#2a2a2a"
              p={6}
              borderRadius="lg"
              boxShadow="lg"
              align="start"
              spacing={4}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {item.icon}
              <Heading as="h3" size="md" color="white">
                {item.title}
              </Heading>
              <Text fontSize="sm" color="gray.300">
                {item.description}
              </Text>
            </MotionVStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
