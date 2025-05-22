// components/CTASection.tsx
import React from "react";
import {
  Box,
  Container,
  Stack,
  Heading,
  Button,
  Image,
  chakra,
} from "@chakra-ui/react";

// show breaks only on md+ so mobile text wraps naturally
const Break = chakra("br");

export default function CTASection() {
  return (
    <Box as="section" bg="#F8F4F0" py={{ base: 16, md: 24 }}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Stack
          direction={{ base: "column", md: "row-reverse" }}
          align="center"
          spacing={{ base: 10, md: 16 }}
        >
          {/* Illustration on left for desktop, top for mobile */}
          <Box flex="1" textAlign="center">
            <Image
              src="mockups/Sable-people/Sable-mountain2.png"
              alt="The financial gains climb"
              maxW={{ base: "70%", md: "80%", lg: "100%" }}
              mx="auto"
            />
          </Box>

          {/* Text & CTA */}
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Heading
              as="h2"
              fontFamily="heading"
              fontWeight="900"
              fontSize={{ base: "2rem", md: "2.5rem", lg: "3.5rem" }}
              lineHeight={{ base: 1.2, md: 1.1 }}
              letterSpacing="-0.02em"
            >
              Sable is the financial wellness app for
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="green.500"> dreamers, </chakra.span>
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="orange.400">seekers, </chakra.span>
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="purple.500">newbies, </chakra.span>
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="pink.500">chasers, </chakra.span>
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="red.500">doers, </chakra.span>
              <Break display={{ base: "none", md: "block" }} />
              <chakra.span color="blue.500">strivers </chakra.span>
              <chakra.span color="orange.500">& you.</chakra.span>
            </Heading>

            <Button
              mt={{ base: 6, md: 8 }}
              bg="green.500"
              _hover={{
                bg: "green.700",
                boxShadow: "0 8px 16px rgba(50,150,50,0.3)",
              }}
              color="white"
              fontFamily="heading"
              fontWeight="700"
              borderRadius="full"
              px={{ base: 8, md: 12 }}
              py={{ base: 4, md: 6 }}
            >
              Explore Sable Plans
            </Button>

            <Box mt={{ base: 4, md: 6 }}>
              <div
                className="trustpilot-widget"
                data-locale="en-US"
                data-template-id="5419b637fa0340045cd0c936"
                data-businessunit-id="5ed186b327847a00011a0759"
                data-style-height="20px"
                data-style-width="100%"
                data-theme="light"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
