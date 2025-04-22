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
        <Box textAlign={{ base: "center", md: "left" }} mb={12}>
          <Text
            fontFamily="heading"
            fontWeight="bold"
            fontSize="sm"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Our Plans
          </Text>
          <Heading
            fontFamily="heading"
            fontSize={{ base: "3xl", md: "5xl" }}
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

        <Flex direction={{ base: "column", md: "row" }} gap={8} align="stretch">
          {/* Credit Builder Plan */}
          <VStack
            align="start"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="lg"
            p={6}
            flex={1}
          >
            <Image
              src="/mockups/sable-difference/Sable-credit-gauge.png"
              alt="Credit Builder"
              h={20}
              mb={4}
            />
            <Heading
              fontFamily="heading"
              fontSize="2xl"
              color="gray.900"
              mb={2}
            >
              Credit{" "}
              <Text as="span" color="green.500">
                Builder
              </Text>
            </Heading>
            <Text fontSize="md" color="gray.700">
              A simple way to boost your credit score and grow your savings at
              the same time.
            </Text>

            <Box my={4}>
              <Text fontWeight="bold" fontFamily="heading" color="gray.800">
                Great for:
              </Text>
              <VStack align="start" spacing={2} mt={2}>
                {benefitsCreditBuilder.map((benefit) => (
                  <HStack key={benefit}>
                    <Image
                      src="/mockups/other/green-plus-icon.png"
                      alt="+"
                      boxSize={5}
                    />
                    <Text>{benefit}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Button
              size="md"
              bg="green.500"
              color="white"
              _hover={{ bg: "green.600" }}
              onClick={() => router.push("/plans/credit-builder")}
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
          >
            <Image
              src="/mockups/grow/graphic-money-bag-orange.svg"
              alt="Borrow and Grow"
              h={20}
              mb={4}
            />
            <Heading
              fontFamily="heading"
              fontSize="2xl"
              color="gray.900"
              mb={2}
            >
              Borrow{" "}
              <Text as="span" color="orange.400">
                &amp;
              </Text>{" "}
              Grow
            </Heading>
            <Text fontSize="md" color="gray.700">
              Borrow the funds you need now, while building a savings cushion
              for later.
            </Text>

            <Box my={4}>
              <Text fontWeight="bold" fontFamily="heading" color="gray.800">
                Great for:
              </Text>
              <VStack align="start" spacing={2} mt={2}>
                {benefitsBorrowGrow.map((benefit) => (
                  <HStack key={benefit}>
                    <Image
                      src="/mockups/other/green-plus-icon.png"
                      alt="+"
                      boxSize={5}
                    />
                    <Text>{benefit}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Button
              size="md"
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.500" }}
              onClick={() => router.push("/plans/borrow-and-grow")}
            >
              Learn more
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
