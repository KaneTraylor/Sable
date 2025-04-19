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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";

export default function DashboardNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: session } = useSession();

  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box px={6} py={4} boxShadow="sm" bg={bg}>
      <Flex align="center">
        <Box fontWeight="bold">Sable Credit</Box>
        <Spacer />
        {isMobile ? (
          <HStack spacing={2}>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              size="sm"
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
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/account">Account</Link>
            <Link href="/profile">Profile</Link>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
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
