// components/Footer.tsx
import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Link,
  Text,
  Image,
  chakra,
  Flex,
} from "@chakra-ui/react";

const sections = [
  {
    title: "Our Products",
    links: [
      { label: "Credit Builder Plan", href: "/plans/credit-builder" },
      { label: "Borrow & Grow Plan", href: "/plans/borrow-and-grow" },
      {
        label: "One Bill Plan",
        href: "#",
        disabled: true,
        note: "(coming soon)",
      },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "The Sable Difference", href: "/seedfi-difference" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Banking Partners", href: "/bank-partners" },
      { label: "Rates & Terms", href: "/rates-and-terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Where We Operate", href: "/state-licenses" },
      {
        label: "Careers",
        href: "https://notion.so/seedfinancial/Job-Openings-8ddfc1f4199f45aca18979d72058d3ea",
      },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export default function Footer() {
  return (
    <Box as="footer" bg="#1E1E1E" color="white" pt={{ base: 12, md: 16 }}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Top: full Sable Credit logo */}
        <Flex
          justify={{ base: "center", md: "flex-start" }}
          mb={{ base: 8, md: 12 }}
        >
          <Image
            src="mockups/logo/sable-logo-light.svg"
            alt="Sable Credit"
            h={{ base: "60px", md: "80px" }}
          />
        </Flex>

        {/* Link sections */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 8, md: 16 }}
          mb={{ base: 12, md: 16 }}
        >
          {sections.map((sec) => (
            <VStack key={sec.title} align="start" spacing={4}>
              <Heading
                as="h4"
                fontFamily="heading"
                fontSize="sm"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wide"
                color="yellow.400"
              >
                {sec.title}
              </Heading>
              <VStack align="start" spacing={3} mt={2}>
                {sec.links.map((link) =>
                  link.disabled ? (
                    <Text key={link.label} fontWeight="600" color="#8A8A8A">
                      {link.label}{" "}
                      <chakra.span fontWeight="400" color="#8A8A8A">
                        {link.note}
                      </chakra.span>
                    </Text>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      _hover={{ textDecoration: "underline" }}
                    >
                      <Text fontWeight="600" color="white">
                        {link.label}
                      </Text>
                    </Link>
                  )
                )}
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>

        {/* Bottom text */}
        <Box borderTop="1px solid" borderColor="gray.700" pt={8}>
          <VStack spacing={4} fontSize="xs" color="#8A8A8A" textAlign="center">
            <Text>©2019–2025, Sable. All Rights Reserved.</Text>
            <Text maxW="3xl">
              Banking services and some personal loans are provided by Sable’s{" "}
              <Link
                href="/bank-partners"
                fontWeight="600"
                textDecoration="underline"
                color="#8A8A8A"
              >
                Banking Partners
              </Link>
              , Evolve Bank & Trust, Member FDIC and Cross River Bank, Member
              FDIC.
            </Text>
            <Box textAlign="left" maxW="3xl">
              <chakra.p mb={2}>
                <sup>1</sup> Taking out a Sable plan does not guarantee an
                increase to your credit score, and individual results may vary.
                It’s important to make on-time payments, but other factors can
                affect your credit score, including performance on other credit
                accounts.
              </chakra.p>
              <chakra.p mb={2}>
                <sup>2</sup> 47% of Americans have poor or no credit –{" "}
                <Link
                  href="https://files.consumerfinance.gov/f/documents/cfpb_consumer-credit-card-market-report_2019.pdf"
                  color="#8A8A8A"
                  _hover={{ color: "gray.300" }}
                >
                  cfpb_consumer-credit-card-market-report_2019.pdf
                </Link>
              </chakra.p>
              <chakra.p>
                <sup>3</sup> 69% of Americans have less than $1,000 in a savings
                account –{" "}
                <Link
                  href="https://www.gobankingrates.com/saving-money/savings-advice/americans-have-less-than-1000-in-savings/"
                  color="#8A8A8A"
                  _hover={{ color: "gray.300" }}
                >
                  gobankingrates.com article
                </Link>
              </chakra.p>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
