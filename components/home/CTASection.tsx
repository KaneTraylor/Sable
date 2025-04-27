// components/CTASection.tsx
import {
  Box,
  Container,
  Stack,
  Heading,
  Button,
  Image,
  chakra,
} from "@chakra-ui/react";

// simple break element that only shows on mobile
const Break = chakra("br");

export default function CTASection() {
  return (
    <Box
      as="section"
      bg="#F8F4F0" // paper-500
      py={{ base: 20, md: 32 }}
    >
      <Container maxW="1024px">
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          spacing={{ base: 12, md: 16 }}
        >
          {/* text + button */}
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Heading
              as="h2"
              fontFamily="heading" // Franklin Gothic
              fontWeight="400"
              fontSize={{ base: "2.5rem", md: "3rem", lg: "4rem" }}
              lineHeight="0.95"
              letterSpacing="-0.04em"
            >
              Sable is the financial wellness app for
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="green.500"> dreamers, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="sunshine.500">seekers, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="purpleBlue.500">newbies, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="mauve.500">chasers, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="deepOrange.500">doers, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="wave.500">strivers, </chakra.span>
              <Break display={{ base: "block", md: "none" }} />
              <chakra.span color="orange.500">& you.</chakra.span>
            </Heading>

            <Button
              mt={8}
              size="lg"
              bg="green.500"
              _hover={{ bg: "green.600" }}
              color="white"
              fontFamily="body"
              fontWeight="600"
              borderRadius="0.5rem"
              px="2rem"
              py="1.5rem"
            >
              Explore Sable Plans
            </Button>

            <Box mt={4}>
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

          {/* illustration */}
          <Box flex="1" textAlign="center">
            <Image
              src="https://web.archive.org/web/20210603190307im_/https://seedfi.com/static/media/graphic-ladder-girl.f5dee621.png"
              alt="Person climbing a ladder"
              maxW={{ base: "60%", md: "80%", lg: "100%" }}
              mx="auto"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
