// components/home/PlanSection.tsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PlanSection() {
  const router = useRouter();

  const benefitsCreditBuilder = [
    "Building your credit history",
    "Saving money effortlessly",
    "Improving financial health",
  ];

  const benefitsBorrowGrow = [
    "Immediate financial needs",
    "Building positive payment history",
    "Growing a safety net",
  ];

  return (
    <Box bg="white" py={{ base: 12, md: 20 }} px={{ base: 6, md: 10 }}>
      <Box maxW="1024px" mx="auto">
        {/* Section Intro */}
        <Box textAlign={{ base: "center", md: "left" }} mb={12}>
          <Text
            fontFamily="Inter, sans-serif"
            fontWeight={700}
            fontSize="sm"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Our Plans
          </Text>
          <Heading
            as="h2"
            fontFamily="Inter, sans-serif"
            fontWeight={900}
            fontSize={{
              base: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
              lg: "4rem",
            }}
            lineHeight={1.1}
            color="gray.900"
            mt={2}
          >
            Start where{" "}
            <Text as="span" color="orange.400">
              you are.
            </Text>
          </Heading>
          <Text fontSize="lg" color="gray.700" mt={4}>
            We have plans tailored to meet you exactly where you are in your
            financial journey.
          </Text>
        </Box>

        {/* Plan Cards */}
        <Flex direction={{ base: "column", md: "row" }} gap={8} align="stretch">
          {/* Credit Builder Plan */}
          <VStack
            align="start"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="lg"
            p={6}
            flex={1}
            spacing={6}
          >
            <Image
              src="mockups/sable-difference/Sable-ticker.png"
              alt="Credit Builder"
              h={20}
            />
            <Heading
              fontFamily="Inter, sans-serif"
              fontWeight={900}
              fontSize="2xl"
              color="gray.900"
            >
              Credit{" "}
              <Text as="span" color="#35A61A">
                Builder
              </Text>
            </Heading>
            <Text fontSize="md" color="gray.700">
              A simple way to boost your credit score and grow your savings at
              the same time.
            </Text>

            <Box width="100%">
              <Text
                fontWeight={700}
                fontFamily="Inter, sans-serif"
                color="gray.800"
              >
                Great for:
              </Text>
              <VStack align="start" spacing={3} mt={2}>
                {benefitsCreditBuilder.map((benefit) => (
                  <HStack key={benefit} spacing={3} align="center">
                    <Image
                      src="/mockups/other/icon-plus-green.svg"
                      alt="+"
                      boxSize={6}
                    />
                    <Text fontFamily="Inter, sans-serif">{benefit}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Button
              size="md"
              bg="#35A61A"
              color="white"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              _hover={{ bg: "#2E8D16" }}
              onClick={() => router.push("/plans/credit-builder")}
              width="100%"
            >
              Learn more
            </Button>
          </VStack>

          {/* Borrow & Grow Plan */}
          <VStack
            align="start"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="lg"
            p={6}
            flex={1}
            spacing={6}
          >
            <Image
              src="mockups/sable-difference/Sable-dispute2.png"
              alt="Dispute and Grow"
              h={20}
            />
            <Heading
              fontFamily="Inter, sans-serif"
              fontWeight={900}
              fontSize="2xl"
              color="gray.900"
            >
              Dispute{" "}
              <Text as="span" color="orange.400">
                &amp;
              </Text>{" "}
              Grow
            </Heading>
            <Text fontSize="md" color="gray.700">
              Sable finds errors on your report and will help you to send
              letters to fix them.
            </Text>

            <Box width="100%">
              <Text
                fontWeight={700}
                fontFamily="Inter, sans-serif"
                color="gray.800"
              >
                Great for:
              </Text>
              <VStack align="start" spacing={3} mt={2}>
                {benefitsBorrowGrow.map((benefit) => (
                  <HStack key={benefit} spacing={3} align="center">
                    <Image
                      src="/mockups/other/icon-plus-orange.svg"
                      alt="+"
                      boxSize={6}
                    />
                    <Text fontFamily="Inter, sans-serif">{benefit}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Button
              size="md"
              bg="orange.400"
              color="white"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
              _hover={{ bg: "orange.500" }}
              onClick={() => router.push("/plans/borrow-and-grow")}
              width="100%"
            >
              Learn more
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
