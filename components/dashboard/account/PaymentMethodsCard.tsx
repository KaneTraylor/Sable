// components/dashboard/account/PaymentMethodsCard.tsx
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

type CardType = {
  id: string;
  brand: string;
  last4: string;
  label?: "Preferred" | "Backup";
};

type BankType = {
  id: string;
  bankName: string;
  last4: string;
};

type Props = {
  cards?: CardType[];
  banks?: BankType[];
  onAddCard?: () => void;
  onAddBank?: () => void;
  onRemoveCard?: (id: string) => void;
  onRemoveBank?: (id: string) => void;
};

export default function PaymentMethodsCard({
  cards = [
    { id: "1", brand: "Mastercard", last4: "0432", label: "Backup" },
    { id: "2", brand: "Visa", last4: "2319", label: "Preferred" },
  ],
  banks = [{ id: "1", bankName: "U.S. Bank", last4: "1239" }],
  onAddCard,
  onAddBank,
  onRemoveCard,
  onRemoveBank,
}: Props) {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <HStack justify="space-between" mb={4}>
        <Heading fontSize="md">Cards</Heading>
        <Button
          size="sm"
          variant="link"
          colorScheme="green"
          onClick={onAddCard}
        >
          Add new
        </Button>
      </HStack>
      <VStack spacing={4} align="stretch" mb={6}>
        {cards.map((card) => (
          <HStack key={card.id} justify="space-between">
            <Box>
              <Text fontWeight="medium">
                {card.brand} ****{card.last4}
              </Text>
              {card.label && (
                <Text fontSize="sm" color="gray.500">
                  {card.label}
                </Text>
              )}
            </Box>
            {onRemoveCard && (
              <IconButton
                aria-label="Remove card"
                icon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                onClick={() => onRemoveCard(card.id)}
              />
            )}
          </HStack>
        ))}
      </VStack>

      <HStack justify="space-between" mb={4}>
        <Heading fontSize="md">Linked Bank Accounts</Heading>
        <Button
          size="sm"
          variant="link"
          colorScheme="green"
          onClick={onAddBank}
        >
          Add new
        </Button>
      </HStack>
      <VStack spacing={4} align="stretch">
        {banks.map((bank) => (
          <HStack key={bank.id} justify="space-between">
            <Text fontWeight="medium">
              {bank.bankName} – {bank.last4}
            </Text>
            {onRemoveBank && (
              <IconButton
                aria-label="Remove bank"
                icon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                onClick={() => onRemoveBank(bank.id)}
              />
            )}
          </HStack>
        ))}
      </VStack>

      <Text fontSize="sm" color="gray.500" mt={6}>
        To help you build payment history, when AutoPay is enabled and your
        default payment method can’t be processed, you authorize Sable to
        attempt to charge your other payment methods on file.
      </Text>
    </Box>
  );
}
