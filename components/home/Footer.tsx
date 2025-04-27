// components/Footer.tsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Image,
  chakra,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="#1E1E1E" /* tw-bg-black-600 */
      px={{ base: 6, sm: 8 }} /* tw-px-6 / sm:tw-px-8 */
      pt={0}
    >
      <Box py={{ base: 12, sm: 24 }} maxW="1024px" mx="auto">
        {/* Top nav columns */}
        <Flex display={{ sm: "flex" }} justify={{ sm: "center" }}>
          <Flex
            data-cy="footer"
            direction={{ base: "column", sm: "row" }}
            w="full"
          >
            {/* Our Products */}
            <Box
              borderBottomWidth={1}
              borderColor="#3D3D3D"
              pb={{ base: 8, sm: 0 }}
              borderRightWidth={{ sm: 1 }}
              pr={{ sm: 20 }}
            >
              <Text
                fontFamily="body"
                fontSize={{ base: "xs", xl: "sm" }}
                color="#6A6A6A"
              >
                Our Products
              </Text>
              <Box pt={5}>
                <Link href="/plans/credit-builder">
                  <Text
                    data-cy="credit-builder-plan"
                    fontFamily="body"
                    fontWeight="bold"
                    fontSize={{ base: "md", xl: "lg" }}
                    color="white"
                  >
                    Credit Builder Plan
                  </Text>
                </Link>
              </Box>
              <Box pt={5}>
                <Link href="/plans/borrow-and-grow">
                  <Text
                    data-cy="borrow-and-grow-plan"
                    fontFamily="body"
                    fontWeight="bold"
                    fontSize={{ base: "md", xl: "lg" }}
                    color="white"
                  >
                    Borrow &amp; Grow Plan
                  </Text>
                </Link>
              </Box>
              <Box pt={5} cursor="default">
                <Text
                  data-cy="one-bill-plan"
                  fontFamily="body"
                  fontWeight="bold"
                  fontSize={{ base: "md", xl: "lg" }}
                  color="#8A8A8A"
                  display="inline"
                >
                  One Bill Plan
                </Text>
                <Text
                  as="span"
                  fontFamily="body"
                  fontSize={{ base: "xs", xl: "sm" }}
                  color="#8A8A8A"
                  ml={2}
                >
                  (coming soon)
                </Text>
              </Box>
            </Box>

            {/* Learning */}
            <Box
              borderBottomWidth={1}
              borderColor="#3D3D3D"
              pt={{ base: 8, sm: 0 }}
              pb={{ base: 8, sm: 0 }}
              borderRightWidth={{ sm: 1 }}
              pr={{ sm: 20 }}
              pl={{ sm: 20 }}
            >
              <Text
                fontFamily="body"
                fontSize={{ base: "xs", xl: "sm" }}
                color="#6A6A6A"
              >
                Learning
              </Text>
              <Box pt={5}>
                <Link href="/faqs">
                  <Text
                    data-cy="faqs"
                    fontFamily="body"
                    fontWeight="bold"
                    fontSize={{ base: "md", xl: "lg" }}
                    color="white"
                  >
                    FAQs
                  </Text>
                </Link>
              </Box>
              <Box pt={5}>
                <Link href="/seedfi-difference">
                  <Text
                    data-cy="seedfi-difference"
                    fontFamily="body"
                    fontWeight="bold"
                    fontSize={{ base: "md", xl: "lg" }}
                    color="white"
                  >
                    The Sable Difference
                  </Text>
                </Link>
              </Box>
            </Box>

            {/* About */}
            <Box
              borderTopWidth={0}
              borderColor="#3D3D3D"
              pt={{ base: 8, sm: 0 }}
              pl={{ sm: 20 }}
            >
              <Text
                fontFamily="body"
                fontSize={{ base: "xs", xl: "sm" }}
                color="#6A6A6A"
              >
                About
              </Text>
              {[
                {
                  label: "Banking Partners",
                  href: "/bank-partners",
                  cy: "banking-partners",
                },
                {
                  label: "Rates & Terms",
                  href: "/rates-and-terms",
                  cy: "rates-and-terms",
                },
                {
                  label: "Privacy Policy",
                  href: "/privacy-policy",
                  cy: "privacy-policy",
                },
                {
                  label: "Where We Operate",
                  href: "/state-licenses",
                  cy: "state-license-information",
                },
                {
                  label: "Careers",
                  href: "https://notion.so/seedfinancial/Job-Openings-8ddfc1f4199f45aca18979d72058d3ea",
                  cy: "careers",
                },
                { label: "Contact Us", href: "/contact-us", cy: "contact-us" },
              ].map((item) => (
                <Box pt={5} key={item.cy}>
                  <Link href={item.href}>
                    <Text
                      data-cy={item.cy}
                      fontFamily="body"
                      fontWeight="bold"
                      fontSize={{ base: "md", xl: "lg" }}
                      color="white"
                    >
                      {item.label}
                    </Text>
                  </Link>
                </Box>
              ))}
            </Box>
          </Flex>
        </Flex>

        {/* Logo */}
        <Box textAlign="center" py={12}>
          <Image src="mockups/logo/SableWhite.png" alt="Sable logo" mx="auto" />
        </Box>

        {/* Copyright */}
        <Flex
          display={{ sm: "flex" }}
          justify={{ sm: "center" }}
          maxW="36rem"
          mx="auto"
        >
          <Text
            fontFamily="body"
            fontSize="xs"
            color="#6A6A6A"
            textAlign="center"
          >
            ©2019–2025, Sable. All Rights Reserved.
            <br />
            Banking services and some personal loans are provided by Sable’s{" "}
            <Link
              href="/bank-partners"
              fontWeight="bold"
              textDecoration="underline"
              color="#6A6A6A"
            >
              Banking Partners
            </Link>
            , Evolve Bank &amp; Trust, Member FDIC and Cross River Bank, Member
            FDIC.
          </Text>
        </Flex>

        {/* Disclaimers */}
        <Flex
          display={{ sm: "flex" }}
          justify={{ sm: "center" }}
          pt={6}
          maxW="36rem"
          mx="auto"
        >
          <Box textAlign="left">
            <chakra.p fontSize="xs" color="#8A8A8A" mb={4}>
              <sup>1</sup> Taking out a Sable plan does not guarantee an
              increase to your credit score, and individual results may vary.
              It’s important to make on-time payments, but other factors can
              affect your credit score, including performance on other credit
              accounts.
            </chakra.p>
            <chakra.p fontSize="xs" color="#8A8A8A" mb={4}>
              <sup>2</sup> 47% of Americans have poor or no credit –{" "}
              <Link
                href="https://files.consumerfinance.gov/f/documents/cfpb_consumer-credit-card-market-report_2019.pdf"
                color="#8A8A8A"
                _hover={{ color: "#505050" }}
              >
                cfpb_consumer-credit-card-market-report_2019.pdf
              </Link>
            </chakra.p>
            <chakra.p fontSize="xs" color="#8A8A8A">
              <sup>3</sup> 69% of Americans have less than $1,000 in a savings
              account –{" "}
              <Link
                href="https://www.gobankingrates.com/saving-money/savings-advice/americans-have-less-than-1000-in-savings/"
                color="#8A8A8A"
                _hover={{ color: "#505050" }}
              >
                gobankingrates.com article
              </Link>
            </chakra.p>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
