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

const features = [
  {
    icon: "/mockups/other/deal.svg",
    text: (
      <>
        Add payments for <strong>natural gas, electric, water, or phone</strong>{" "}
        with one tap
      </>
    ),
  },
  {
    icon: "/mockups/other/credit-score.svg",
    text: (
      <>
        We’ll report eligible payments to <strong>TransUnion</strong>
      </>
    ),
  },
  {
    icon: "/mockups/other/checkmark-circle.svg",
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

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  // shared content
  const content = (
    <VStack spacing={6} align="center" p={isMobile ? 4 : 6}>
      {/* Close button */}
      <Box w="100%" display="flex">
        <Spacer />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="ghost"
          onClick={onClose}
        />
      </Box>

      {/* Illustration */}
      <Image
        src="https://kikoff.com/_next/static/media/bill-calendar-1.81a7cb0d.svg"
        alt="Calendar"
        h="232px"
      />

      {/* Heading */}
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

      {/* Feature list */}
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

      {/* Action */}
      <Button
        colorScheme="green"
        size="lg"
        fontFamily="Inter, sans-serif"
        onClick={() => {
          onClose();
          // TODO: integrate your Array loan flow
        }}
      >
        Get started
      </Button>
    </VStack>
  );

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent borderTopRadius="16px" p={0} maxH="80vh">
          <DrawerBody p={0}>{content}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: centered modal
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="16px" mx="auto" maxW="600px">
        <ModalBody p={0}>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
