// components/Navbar.tsx
import {
  Box,
  Flex,
  Link as ChakraLink,
  Button,
  Image,
  IconButton,
  useDisclosure,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Box bg="rgba(248,244,240,1)" px={4}>
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
            src="mockups/logo/Sablerework.png"
            alt="Sable Logo"
            boxSize={{ base: "80px", sm: "80px", md: "100px" }}
            objectFit="contain"
            mb={0}
          />
        </ChakraLink>

        {/* Desktop Nav */}
        <Flex display={{ base: "none", md: "flex" }} align="center">
          <ChakraLink
            as={NextLink}
            href="/products"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="lg"
            color="gray.900"
            px={4}
            _hover={{ textDecoration: "none", color: "gray.600" }}
          >
            Products
          </ChakraLink>

          <ChakraLink
            as={NextLink}
            href="/why-sable"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="lg"
            color="gray.900"
            px={4}
            _hover={{ textDecoration: "none", color: "gray.600" }}
          >
            Why Sable?
          </ChakraLink>

          <Button
            ml={4}
            variant="outline"
            color="gray.900"
            borderColor="gray.300"
            fontFamily="heading"
            fontWeight="bold"
            _hover={{ bg: "gray.100" }}
            onClick={() => router.push("/signin")}
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
              <CloseIcon w={4} h={4} />
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
        <Stack bg="white" p={4} spacing={4} display={{ md: "none" }}>
          <ChakraLink
            as={NextLink}
            href="/products"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="lg"
            color="gray.900"
            _hover={{ color: "gray.600" }}
          >
            Products
          </ChakraLink>

          <ChakraLink
            as={NextLink}
            href="/why-sable"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="lg"
            color="gray.900"
            _hover={{ color: "gray.600" }}
          >
            Why Sable?
          </ChakraLink>

          <Button
            variant="outline"
            color="gray.900"
            borderColor="gray.300"
            fontFamily="heading"
            fontWeight="bold"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}
