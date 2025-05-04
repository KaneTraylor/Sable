// components/dashboard/account/LanguageToggleCard.tsx
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function LanguageToggleCard() {
  const [activeLang, setActiveLang] = useState<"English" | "Español">(
    "English"
  );
  const handleChange = (lang: "English" | "Español") => setActiveLang(lang);

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="inset 0 0 0 1px #E2E8F0"
      mb={6}
    >
      <Text fontWeight="semibold" fontSize="md" mb={4}>
        Language
      </Text>
      <Flex gap={4}>
        {(["English", "Español"] as const).map((lang) => (
          <Button
            key={lang}
            variant="outline"
            borderColor={activeLang === lang ? "green.500" : "gray.200"}
            fontWeight={activeLang === lang ? "bold" : "normal"}
            color={activeLang === lang ? "green.600" : "gray.700"}
            size="sm"
            onClick={() => handleChange(lang)}
          >
            {lang}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
