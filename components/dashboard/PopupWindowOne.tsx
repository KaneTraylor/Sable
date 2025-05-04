import React, { useEffect } from "react";
import {
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import axios from "axios";

const features = [
  {
    icon: "/mockups/other/green-plus-icon.png",
    text: (
      <>
        Add payments for <strong>natural gas, electric, water, or phone</strong>{" "}
        with one tap
      </>
    ),
  },
  {
    icon: "/mockups/other/green-plus-icon.png",
    text: (
      <>
        We’ll report eligible payments to <strong>TransUnion</strong>
      </>
    ),
  },
  {
    icon: "/mockups/other/green-plus-icon.png",
    text: (
      <>
        Get up to four new sources of <strong>positive payment</strong>{" "}
        reporting
      </>
    ),
  },
];

export default function PopupWindowOne() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAndOpen = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        const popupName = "popup1";
        const res = await axios.get(`/api/popups/${popupName}`);
        const lastShown = new Date(res.data.lastShown);
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now.getTime() - lastShown.getTime() > oneDay) {
          onOpen();
          await axios.post(`/api/popups/${popupName}`);
        }
      } catch (err) {
        console.error("Popup tracking failed:", err);
      }
    };

    checkAndOpen();
  }, [session, status, onOpen]);

  const content = (
    <VStack spacing={6} align="center" p={isMobile ? 4 : 6}>
      <Box w="100%" display="flex">
        <Spacer />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="ghost"
          onClick={onClose}
        />
      </Box>

      <Image
        src="/mockups/sable-difference/46points.svg"
        alt="Credit Boost Illustration"
        h="232px"
      />

      <Text
        as="h3"
        fontSize="2xl"
        fontWeight="600"
        textAlign="center"
        fontFamily="Lato, sans-serif"
      >
        <Text as="span" color="green.500">
          Build
        </Text>{" "}
        positive credit with your utilities
      </Text>

      <VStack spacing={4} w="100%" px={6}>
        {features.map(({ icon, text }, i) => (
          <HStack key={i} spacing={4} align="center" w="100%">
            <Image src={icon} boxSize="24px" />
            <Text fontFamily="Inter, sans-serif" flex="1">
              {text}
            </Text>
          </HStack>
        ))}
      </VStack>

      <Button
        colorScheme="green"
        size="lg"
        fontFamily="Inter, sans-serif"
        onClick={() => {
          onClose();
          // TODO: integrate Array loan flow
        }}
      >
        Get started
      </Button>
    </VStack>
  );

  return isMobile ? (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="16px" p={0} maxH="80vh">
        <DrawerBody p={0}>{content}</DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="16px" mx="auto" maxW="600px">
        <ModalBody p={0}>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
