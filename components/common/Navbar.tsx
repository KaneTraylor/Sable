import React from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Button,
  Image,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const bgColor = useColorModeValue("#f9f5f1", "gray.800");
  const linkColor = useColorModeValue("gray.800", "white");
  const hoverColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgColor} borderBottom="1px solid" borderColor={borderColor} px={4}>
      <Flex
        maxW="1024px"
        mx="auto"
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Image
            src="/mockups/logo/Sablerework.png"
            alt="Sable Logo"
            boxSize={{ base: "60px", md: "80px" }}
            objectFit="contain"
          />
        </ChakraLink>

        {/* Desktop Nav */}
        <Flex display={{ base: "none", md: "flex" }} align="center">
          <ChakraLink
            as={NextLink}
            href="/products"
            fontWeight="semibold"
            fontSize="md"
            color={linkColor}
            px={4}
            _hover={{ textDecoration: "none", color: hoverColor }}
          >
            Products
          </ChakraLink>

          <ChakraLink
            as={NextLink}
            href="/why-sable"
            fontWeight="semibold"
            fontSize="md"
            color={linkColor}
            px={4}
            _hover={{ textDecoration: "none", color: hoverColor }}
          >
            Why Sable?
          </ChakraLink>

          <Button
            ml={4}
            colorScheme="green"
            variant="solid"
            fontWeight="bold"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
        </Flex>

        {/* Hamburger (Mobile) */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={
            isOpen ? (
              <CloseIcon w={5} h={5} />
            ) : (
              <Image
                src="/mockups/other/navbar-open-menu-icon.svg"
                alt="Menu"
                boxSize={6}
              />
            )
          }
          variant="ghost"
          aria-label="Toggle Navigation"
        />
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          bg={bgColor}
          p={4}
          rounded="md"
          shadow="md"
          maxW="1024px"
          mx="auto"
          mt={2}
        >
          <Stack spacing={3}>
            <ChakraLink
              as={NextLink}
              href="/products"
              fontWeight="semibold"
              fontSize="md"
              color={linkColor}
              _hover={{ color: hoverColor }}
            >
              Products
            </ChakraLink>

            <ChakraLink
              as={NextLink}
              href="/why-sable"
              fontWeight="semibold"
              fontSize="md"
              color={linkColor}
              _hover={{ color: hoverColor }}
            >
              Why Sable?
            </ChakraLink>

            <Button
              colorScheme="green"
              variant="solid"
              fontWeight="bold"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
