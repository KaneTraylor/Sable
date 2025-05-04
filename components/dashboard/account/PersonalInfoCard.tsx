// components/dashboard/account/PersonalInfoCard.tsx
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  accountId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  onEditEmail?: () => void;
  onEditPhone?: () => void;
  onEditAddress?: () => void;
}

export default function PersonalInfoCard({
  accountId = "NDCQV4PB",
  fullName = "Kane Michael Traylor",
  email = "kanetraylor556@gmail.com",
  phone = "+1 (606) 585-8676",
  address = "4612 New Garden Avenue, Portsmouth, OH, 45662",
  onEditEmail,
  onEditPhone,
  onEditAddress,
}: Props) {
  const InfoRow = ({
    label,
    value,
    editable,
    onEdit,
  }: {
    label: string;
    value: string;
    editable?: boolean;
    onEdit?: () => void;
  }) => (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {label}
        </Text>
        {editable && (
          <IconButton
            aria-label={`Edit ${label}`}
            icon={<EditIcon />}
            size="xs"
            variant="ghost"
            onClick={onEdit}
          />
        )}
      </HStack>
      <Text fontSize="md" fontWeight="medium" mb={4}>
        {value}
      </Text>
    </Box>
  );

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <Heading fontSize="lg" mb={4}>
        Personal Information
      </Heading>
      <VStack align="stretch" spacing={4}>
        <InfoRow label="Account Number" value={accountId} />
        <InfoRow label="Legal Name" value={fullName} />
        <InfoRow label="Email" value={email} editable onEdit={onEditEmail} />
        <InfoRow
          label="Phone Number"
          value={phone}
          editable
          onEdit={onEditPhone}
        />
        <InfoRow
          label="Address"
          value={address}
          editable
          onEdit={onEditAddress}
        />
      </VStack>
    </Box>
  );
}
