// components/dashboard/DashboardNavbar.tsx
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useBreakpointValue,
  Spacer,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";

export default function DashboardNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: session } = useSession();

  const linkStyles = {
    px: 2,
    py: 1,
    rounded: "md",
    fontWeight: "medium",
    _hover: { bg: "whiteAlpha.200", transform: "scale(1.05)" },
    _focus: { boxShadow: "outline" },
    transition: "all 0.2s ease-in-out",
  };

  return (
    <Box
      px={6}
      py={4}
      boxShadow="sm"
      bgGradient="linear(to-r, green.400, green.600)"
      color="white"
    >
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg">
          Sable Credit
        </Text>
        <Spacer />
        {isMobile ? (
          <HStack spacing={2}>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
              color="white"
            />
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon />} size="sm" />
              <MenuList>
                <MenuItem as="a" href="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem as="a" href="/account">
                  Account
                </MenuItem>
                <MenuItem as="a" href="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <HStack spacing={6}>
            <Link href="/dashboard" {...linkStyles}>
              Dashboard
            </Link>
            <Link href="/account" {...linkStyles}>
              Account
            </Link>
            <Link href="/profile" {...linkStyles}>
              Profile
            </Link>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
              color="white"
            />
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon />} size="sm" />
              <MenuList>
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
