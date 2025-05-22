// components/Navbar.tsx
import React from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Link as ChakraLink,
  Button,
  Image,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Box as="nav" bg="#f8f4f0" w="100%" position="sticky" top="0" zIndex="1000">
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 12 }}
        py={{ base: 4, md: 6 }}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Image
            src="/mockups/logo/sable-logo.svg"
            alt="Sable Credit Logo"
            h={{ base: "50px", md: "60px", lg: "80px" }}
          />
        </ChakraLink>

        {/* Desktop links + CTAs */}
        <HStack
          spacing={{ base: 4, md: 6, lg: 8 }}
          display={{ base: "none", md: "flex" }}
        >
          <ChakraLink
            as={NextLink}
            href="/products"
            fontSize="md"
            fontWeight="700"
          >
            Products
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/why-sable"
            fontSize="md"
            fontWeight="700"
          >
            Why Sable?
          </ChakraLink>

          <Button
            colorScheme="green"
            variant="solid"
            borderRadius="full"
            px={{ base: 6, md: 10 }}
            minH={{ base: "40px", md: "56px" }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            onClick={() => router.push("/onboarding/signup")}
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            borderRadius="full"
            px={{ base: 6, md: 10 }}
            minH={{ base: "40px", md: "56px" }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            onClick={() => router.push("/auth/signin")}
          >
            Sign in
          </Button>
        </HStack>

        {/* Mobile menu toggle */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant="ghost"
          aria-label="Toggle menu"
          icon={
            isOpen ? (
              <CloseIcon w={6} h={6} />
            ) : (
              <Image
                src="/mockups/other/navbar-open-menu-icon.svg"
                alt="Menu"
                boxSize={6}
              />
            )
          }
        />
      </Flex>

      {/* Mobile Dropdown */}
      <Collapse in={isOpen} animateOpacity>
        <Box bg="#f7f6f3" px={4} py={4}>
          <VStack spacing={4} align="stretch">
            <ChakraLink
              as={NextLink}
              href="/products"
              fontSize="lg"
              fontWeight="700"
            >
              Products
            </ChakraLink>
            <ChakraLink
              as={NextLink}
              href="/why-sable"
              fontSize="lg"
              fontWeight="700"
            >
              Why Sable?
            </ChakraLink>
            <Button
              colorScheme="green"
              variant="solid"
              borderRadius="full"
              w="100%"
              py={6}
              fontSize="lg"
              fontWeight="600"
              onClick={() => router.push("/onboarding/signup")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              borderRadius="full"
              w="100%"
              py={6}
              fontSize="lg"
              fontWeight="600"
              onClick={() => router.push("/auth/signin")}
            >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}
