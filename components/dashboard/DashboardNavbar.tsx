// components/dashboard/DashboardNavbar.tsx - Updated with better collapsed logo
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Text,
  Show,
  Hide,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  CreditCard,
  TrendingUp,
  FileText,
  User,
  Settings,
  LogOut,
  Bell,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";

const NAV_ITEMS = [
  {
    key: "home",
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    shortLabel: "Home",
  },
  {
    key: "creditbuilder",
    label: "Credit Builder",
    href: "/dashboard/creditbuilder",
    icon: CreditCard,
    shortLabel: "Builder",
  },
  {
    key: "credit-score",
    label: "Credit Score",
    href: "/dashboard/credit-score",
    icon: TrendingUp,
    shortLabel: "Score",
  },
  {
    key: "disputes",
    label: "Disputes",
    href: "/dashboard/disputes/select",
    icon: FileText,
    shortLabel: "Disputes",
    badge: 3,
  },
  {
    key: "account",
    label: "Account",
    href: "/dashboard/account",
    icon: User,
    shortLabel: "Account",
  },
];

// Create a context to share sidebar state
import { createContext, useContext } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
  sidebarWidth: 280,
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const sidebarWidth = isMobile ? 0 : isCollapsed ? 80 : 280;

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, sidebarWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default function DashboardNavbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";

  return (
    <>
      {/* Mobile bottom nav */}
      <Show below="md">
        <BottomNavigation />
      </Show>

      {/* Desktop sidebar */}
      <Hide below="md">
        <Box
          as="nav"
          position="fixed"
          top="0"
          left="0"
          h="100vh"
          w={isCollapsed ? "80px" : "280px"}
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          boxShadow="lg"
          zIndex="1000"
          overflowY="auto"
          transition="width 0.3s ease"
        >
          <VStack spacing={0} align="stretch" h="full">
            {/* Header with toggle button */}
            <Box p={4} borderBottom="1px solid" borderColor="gray.100">
              <Flex justify="space-between" align="center">
                {!isCollapsed && (
                  <HStack spacing={3}>
                    <Box
                      w={10}
                      h={10}
                      bg="sable.sage"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color="white" fontWeight="bold" fontSize="lg">
                        S
                      </Text>
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg" color="gray.900">
                        Sable Credit
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Credit Builder
                      </Text>
                    </VStack>
                  </HStack>
                )}

                {isCollapsed && (
                  <Flex justify="center" w="full">
                    <Box
                      w={10}
                      h={10}
                      bg="sable.sage"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transition="all 0.2s ease"
                      _hover={{
                        bg: "sable.forest",
                        transform: "scale(1.05)",
                      }}
                    >
                      <Text color="white" fontWeight="bold" fontSize="md">
                        S
                      </Text>
                    </Box>
                  </Flex>
                )}

                <IconButton
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                  icon={
                    isCollapsed ? (
                      <ChevronRight size={16} />
                    ) : (
                      <ChevronLeft size={16} />
                    )
                  }
                  size="sm"
                  variant="ghost"
                  onClick={toggleSidebar}
                  ml={isCollapsed ? 0 : "auto"}
                />
              </Flex>
            </Box>

            {/* Navigation Items */}
            <Box flex="1" py={4}>
              <VStack spacing={1} align="stretch" px={3}>
                {NAV_ITEMS.map(
                  ({ key, label, href, icon: Icon, badge, shortLabel }) => {
                    const isActive =
                      router.pathname === href ||
                      (href !== "/dashboard" &&
                        router.pathname.startsWith(href));

                    return (
                      <Tooltip
                        key={key}
                        label={label}
                        placement="right"
                        isDisabled={!isCollapsed}
                      >
                        <ChakraLink
                          as={NextLink}
                          href={href}
                          _hover={{ textDecoration: "none" }}
                        >
                          <Flex
                            align="center"
                            px={4}
                            py={3}
                            borderRadius="lg"
                            transition="all 0.2s"
                            bg={isActive ? "sable.sage" : "transparent"}
                            color={isActive ? "white" : "gray.700"}
                            _hover={{
                              bg: isActive ? "sable.forest" : "gray.50",
                              transform: "translateX(2px)",
                            }}
                            position="relative"
                            justify={isCollapsed ? "center" : "flex-start"}
                          >
                            <Icon size={20} />
                            {!isCollapsed && (
                              <>
                                <Text
                                  ml={3}
                                  fontWeight={isActive ? "600" : "500"}
                                >
                                  {label}
                                </Text>
                                {badge && (
                                  <Badge
                                    ml="auto"
                                    colorScheme={isActive ? "white" : "red"}
                                    variant={isActive ? "solid" : "subtle"}
                                    size="sm"
                                    borderRadius="full"
                                  >
                                    {badge}
                                  </Badge>
                                )}
                              </>
                            )}
                            {isCollapsed && badge && (
                              <Badge
                                position="absolute"
                                top="-1"
                                right="-1"
                                colorScheme="red"
                                variant="solid"
                                size="sm"
                                borderRadius="full"
                                minW="18px"
                                h="18px"
                                fontSize="xs"
                              >
                                {badge}
                              </Badge>
                            )}
                          </Flex>
                        </ChakraLink>
                      </Tooltip>
                    );
                  }
                )}
              </VStack>

              {!isCollapsed && <Divider my={4} />}

              {/* Secondary Actions */}
              <VStack spacing={1} align="stretch" px={3}>
                <Tooltip
                  label="Settings"
                  placement="right"
                  isDisabled={!isCollapsed}
                >
                  <ChakraLink
                    as={NextLink}
                    href="/dashboard/settings"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex
                      align="center"
                      px={4}
                      py={3}
                      borderRadius="lg"
                      transition="all 0.2s"
                      color="gray.700"
                      _hover={{
                        bg: "gray.50",
                        transform: "translateX(2px)",
                      }}
                      justify={isCollapsed ? "center" : "flex-start"}
                    >
                      <Settings size={20} />
                      {!isCollapsed && (
                        <Text ml={3} fontWeight="500">
                          Settings
                        </Text>
                      )}
                    </Flex>
                  </ChakraLink>
                </Tooltip>
              </VStack>
            </Box>

            {/* User Profile Section */}
            <Box p={4} borderTop="1px solid" borderColor="gray.100">
              <Menu>
                <MenuButton
                  as={Box}
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  borderRadius="lg"
                  p={3}
                  transition="all 0.2s"
                >
                  {isCollapsed ? (
                    <Flex justify="center">
                      <Avatar
                        size="sm"
                        name={userName}
                        bg="sable.sage"
                        color="white"
                      />
                    </Flex>
                  ) : (
                    <HStack spacing={3}>
                      <Avatar
                        size="sm"
                        name={userName}
                        bg="sable.sage"
                        color="white"
                      />
                      <VStack align="start" spacing={0} flex="1">
                        <Text fontWeight="600" fontSize="sm" color="gray.900">
                          {userName}
                        </Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>
                          {userEmail}
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<User size={16} />}>
                    Profile Settings
                  </MenuItem>
                  <MenuItem icon={<Bell size={16} />}>Notifications</MenuItem>
                  <MenuItem
                    icon={<LogOut size={16} />}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </VStack>
        </Box>
      </Hide>
    </>
  );
}
