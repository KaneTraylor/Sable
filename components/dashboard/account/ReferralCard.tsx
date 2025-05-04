import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  HStack,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function ReferralCard() {
  // TODO: replace with actual referral URL
  const referralUrl = "https://sable.com/refer/NDCQV4PB";
  const { hasCopied, onCopy } = useClipboard(referralUrl);

  return (
    <Box bg="white" borderRadius="lg" p={6} boxShadow="inset 0 0 0 1px #E2E8F0">
      <VStack align="stretch" spacing={4}>
        <Text fontSize="sm" color="green.600" fontWeight="semibold">
          Special offer
        </Text>
        <Text fontSize="md" fontWeight="normal">
          Give $10, get $10 when you share Sable
        </Text>

        <InputGroup size="md">
          <Input value={referralUrl} isReadOnly fontFamily="mono" pr="3rem" />
          <InputRightElement width="3rem">
            <IconButton
              aria-label="Copy referral link"
              icon={<CopyIcon />}
              size="sm"
              onClick={onCopy}
            />
          </InputRightElement>
        </InputGroup>

        {hasCopied && (
          <HStack pt={2}>
            <Text fontSize="sm" color="green.500">
              Copied!
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
