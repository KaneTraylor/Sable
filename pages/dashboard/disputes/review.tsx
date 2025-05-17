// pages/dashboard/disputes/review.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Textarea,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  VStack,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useDisputeStore } from "@/stores/useDisputeStore";

type StyleKey = "fcra" | "metro2" | "ai";

export default function DisputeReview() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const { selected } = useDisputeStore();

  // 1) add local state for style
  const [style, setStyle] = useState<StyleKey>("fcra");

  // 2) letters per‐bureau
  const [letters, setLetters] = useState<Record<string, string>>({
    Equifax: "",
    TransUnion: "",
    Experian: "",
  });

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    // one‐line for each account
    const userDetails = selected.map((d) => `- ${d.name}`).join("\n");
    // the body with reasons/instructions
    const letterBody = selected
      .map(
        (d) =>
          `  • ${d.name}\n    Reason: ${d.reason || "N/A"}\n    Instruction: ${
            d.instruction || "N/A"
          }\n`
      )
      .join("\n");

    // choose a different header based on style
    const styleHeader = {
      fcra: `Pursuant to the Fair Credit Reporting Act (15 U.S.C. § 1681 et seq.), I am writing to dispute the following item(s) on my credit report:`,
      metro2: `Per Metro‐2 dispute specifications, please reinvestigate the following item(s) on my credit report:`,
      ai: `With assistance from my AI credit advocate, I request a reinvestigation of the following item(s):`,
    }[style];

    const buildLetter = (bureau: string) => `
${today}

To: ${bureau} Credit Bureau

${styleHeader}

${letterBody}
Please complete your reinvestigation within the timeframes required by law.

Sincerely,
[Your Name]
`;

    setLetters({
      Equifax: buildLetter("Equifax"),
      TransUnion: buildLetter("TransUnion"),
      Experian: buildLetter("Experian"),
    });
  }, [selected, style]);

  const handleSend = () => {
    // TODO: POST letters + style to your API
    router.push("/dashboard/disputes/delivery");
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg">
          Review your dispute letters
        </Heading>

        {/* style selector */}
        <Box>
          <Text mb={2}>Choose dispute style:</Text>
          <RadioGroup onChange={(v) => setStyle(v as StyleKey)} value={style}>
            <Stack direction="row" spacing={6}>
              <Radio value="fcra">FCRA (factual)</Radio>
              <Radio value="metro2">Metro-2</Radio>
              <Radio value="ai">AI-assisted</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {/* per‐bureau tabs */}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            {Object.keys(letters).map((bureau) => (
              <Tab key={bureau}>{bureau}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {Object.entries(letters).map(([bureau, content]) => (
              <TabPanel p={0} key={bureau}>
                <Box
                  bg={bg}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                  maxH="60vh"
                  overflowY="auto"
                >
                  <Textarea
                    value={content}
                    onChange={(e) =>
                      setLetters((prev) => ({
                        ...prev,
                        [bureau]: e.target.value,
                      }))
                    }
                    fontFamily="monospace"
                    rows={20}
                  />
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        {/* actions */}
        <HStack justify="space-between" pt={4}>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button colorScheme="green" onClick={handleSend}>
            Send Letters
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
