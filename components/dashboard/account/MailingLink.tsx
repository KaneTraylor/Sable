import { Box, Text, Link } from "@chakra-ui/react";

export default function MailingLink() {
  return (
    <Box textAlign="center" mt={4} mb={6}>
      <Text fontSize="sm" color="gray.600">
        If you want to send mail, go to{" "}
        <Link
          href="/dashboard/mailing"
          textDecoration="underline"
          fontWeight="medium"
        >
          Sable Mailing Service
        </Link>
        .
      </Text>
    </Box>
  );
}
