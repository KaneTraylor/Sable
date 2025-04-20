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
  useBreakpointValue,
  Spacer,
  useColorModeValue,
  chakra,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { ViewIcon, SettingsIcon, AddIcon } from "@chakra-ui/icons";
import { FiBarChart2 } from "react-icons/fi";
import { AiOutlineRobot } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import { ReactElement } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactElement;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: <ViewIcon /> },
  {
    label: "Credit Analysis",
    href: "/dashboard/credit-analysis",
    icon: <FiBarChart2 />,
  },
  {
    label: "Growth Settings",
    href: "/dashboard/growth-settings",
    icon: <SettingsIcon />,
  },
  {
    label: "Credit Builder",
    href: "/dashboard/credit-builder",
    icon: <AddIcon />,
  },
  { label: "Sable AI", href: "/dashboard/sable-ai", icon: <AiOutlineRobot /> },
];

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bg = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const linkHover = useColorModeValue("gray.900", "white");

  return (
    <Box bg={bg} px={{ base: 4, md: 8 }} py={4} boxShadow="sm">
      <Flex align="center">
        <chakra.h1 fontSize="lg" fontWeight="bold" color={linkColor}>
          Sable Credit
        </chakra.h1>
        <Spacer />

        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Open menu"
              icon={
                <ChakraImage
                  src="/mockups/other/navbar-open-menu-icon.svg"
                  alt="Menu"
                  boxSize={6}
                />
              }
              variant="ghost"
            />
            <MenuList>
              {NAV_ITEMS.map((item) => (
                <MenuItem
                  key={item.href}
                  as="a"
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </MenuItem>
              ))}
              {session && (
                <MenuItem onClick={() => signOut()} color="red.500">
                  Sign Out
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : (
          <HStack spacing={6}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                display="flex"
                alignItems="center"
                _hover={{ color: linkHover, textDecoration: "none" }}
                color={linkColor}
                fontWeight="medium"
              >
                <Box as="span" mr={2}>
                  {item.icon}
                </Box>
                {item.label}
              </Link>
            ))}
            {session && (
              <Link
                onClick={() => signOut()}
                color="red.500"
                _hover={{ textDecoration: "underline" }}
              >
                Sign Out
              </Link>
            )}
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
