import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function BankAccountsCard() {
  // TODO: replace with real bank data
  const banks = [{ id: "1", name: "U.S. Bank", last4: "1679" }];

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <HStack justify="space-between" mb={4}>
        <Heading fontSize="md">Linked Bank Accounts</Heading>
        <Button variant="link" colorScheme="green" size="sm">
          Add new
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {banks.map((bank) => (
          <HStack key={bank.id} justify="space-between">
            <Text fontWeight="medium">
              {bank.name} – {bank.last4}
            </Text>
            <IconButton
              aria-label="Remove bank"
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
