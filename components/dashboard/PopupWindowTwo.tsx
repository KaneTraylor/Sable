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
  Box,
  Heading,
  Text,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function PopupWindowTwo() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAndOpen = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        const popupName = "popup2";
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
    <VStack spacing={6} align="stretch" p={isMobile ? 4 : 6}>
      <Box w="100%" display="flex">
        <Spacer />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="ghost"
          onClick={onClose}
        />
      </Box>

      {isMobile && (
        <Box
          width="40px"
          height="4px"
          bg="gray.300"
          borderRadius="full"
          alignSelf="center"
          mb={2}
        />
      )}

      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight="600"
        textAlign="center"
        fontFamily="Lato, sans-serif"
        pt={1}
        pb={3}
      >
        We’ll reimburse you for out-of-pocket expenses up to $1,000,000
      </Heading>

      <Text fontSize="md" fontFamily="Inter, sans-serif" pb={2}>
        Our Identity Theft Reimbursement, with zero deductible, reimburses you
        for expenses related to identity theft restoration, including
        replacement of documents, traveling expenses, loss of income,
        child/elderly care (incurred as a result of identity restoration), and
        legal costs.
      </Text>

      <Button
        colorScheme="green"
        size="lg"
        w="full"
        fontFamily="Inter, sans-serif"
        onClick={() => {
          onClose();
          // TODO: integrate your coverage activation flow
        }}
      >
        Activate coverage
      </Button>
    </VStack>
  );

  return isMobile ? (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="16px" p={0} maxH="60vh">
        <DrawerBody p={0}>{content}</DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent borderRadius="16px" mx="auto" maxW="500px">
        <ModalBody p={0}>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
