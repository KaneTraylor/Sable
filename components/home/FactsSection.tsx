// components/FactsSection.tsx
import { Box, Flex, Text, Heading, Image, chakra } from "@chakra-ui/react";

export default function FactsSection() {
  return (
    <Box bg="white" pt="5rem" px="1.5rem">
      <Flex
        maxW="1024px"
        mx="auto"
        direction={{ base: "column", sm: "row" }}
        align={{ sm: "center" }}
        gap={{ sm: "4rem", lg: "7rem" }}
      >
        {/* Left half */}
        <Box w={{ sm: "50%" }}>
          {/* “The Facts” label */}
          <Text
            fontFamily="body"
            fontWeight={700}
            fontSize={{ base: "0.9375rem", xl: "1rem" }}
            lineHeight={1.4}
            letterSpacing="-0.02em"
            color="gray.400"
          >
            The Facts
          </Text>

          {/* Heading with split spans for coloring */}
          <Heading
            as="h2"
            mt="1.5rem"
            mb="1rem"
            fontFamily="heading"
            fontWeight={400}
            fontSize={{ base: "2.5rem", xl: "3.125rem" }}
            lineHeight={{ base: 1.1, xl: 0.95 }}
            letterSpacing="-0.04em"
          >
            <chakra.span color="black">
              The average person is set up to&nbsp;
            </chakra.span>
            <chakra.span color="wave.500">fail at money.</chakra.span>
          </Heading>

          {/* Subhead */}
          <Text
            fontFamily="body"
            fontWeight={700}
            fontSize={{ base: "1rem", xl: "1.125rem" }}
            lineHeight={{ base: 1.5, xl: 1.4 }}
            letterSpacing="-0.02em"
            color="black"
            display="inline"
          >
            If you struggle to save and build credit, the problem isn’t with you{" "}
          </Text>
          <Text
            fontFamily="body"
            fontWeight={400}
            fontSize={{ base: "1rem", xl: "1.125rem" }}
            lineHeight={{ base: 1.5, xl: 1.4 }}
            letterSpacing="-0.02em"
            color="black"
            display="inline"
          >
            — it’s with the system that’s been set up to profit when people
            fail.
          </Text>

          {/* Stats */}
          <Flex
            justify="space-between"
            pt="3.5rem"
            pb="2.5rem"
            textAlign="center"
          >
            <Box mr="1.5rem">
              <Text
                fontFamily="body"
                fontWeight={400}
                fontSize="3.375rem"
                lineHeight="65px"
                letterSpacing="-0.06em"
                color="wave.500"
              >
                47%
              </Text>
              <Text
                mt={2}
                fontFamily="body"
                fontWeight={300}
                fontSize={{ base: "1rem", xl: "1.125rem" }}
                lineHeight={{ base: 1.5, xl: 1.4 }}
                letterSpacing="-0.02em"
                color="#8A8A8A"
              >
                of Americans have poor or no credit.<sup>2</sup>
              </Text>
            </Box>

            <Box>
              <Text
                fontFamily="body"
                fontWeight={400}
                fontSize="3.375rem"
                lineHeight="65px"
                letterSpacing="-0.06em"
                color="wave.500"
              >
                57%
              </Text>
              <Text
                mt={2}
                fontFamily="body"
                fontWeight={300}
                fontSize={{ base: "1rem", xl: "1.125rem" }}
                lineHeight={{ base: 1.5, xl: 1.4 }}
                letterSpacing="-0.02em"
                color="#8A8A8A"
              >
                have less than $1,000 in a savings account.<sup>3</sup>
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Right half image */}
        <Box w={{ sm: "50%" }}>
          <Image
            src="https://assets.seedfi.com/assets/web/static/media/graphic-group-shot.42f7e523.svg"
            alt=""
            w="100%"
            h="auto"
            pb="5rem"
          />
        </Box>
      </Flex>
    </Box>
  );
}
