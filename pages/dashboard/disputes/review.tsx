// pages/dashboard/disputes/review.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Textarea,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useDisputeStore } from "@/stores/useDisputeStore";

export default function DisputeReview() {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const { selected } = useDisputeStore();
  const [letters, setLetters] = useState<{ [bureau: string]: string }>({
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

    const userDetails = selected.map((d) => `${d.name}`).join("\n");
    const letterBody = selected
      .map(
        (d) =>
          `- ${d.name}\n  Reason: ${d.reason || "N/A"}\n  Instruction: ${
            d.instruction || "N/A"
          }\n`
      )
      .join("\n");

    const buildLetter = (bureau: string) =>
      `${today}

${userDetails}

Dear ${bureau},

I received a copy of my credit report and am writing to dispute the following items:

${letterBody}

Please reinvestigate these items and let me know within 30 days.

Sincerely,
[Your Name]
`;

    setLetters({
      Equifax: buildLetter("Equifax"),
      TransUnion: buildLetter("TransUnion"),
      Experian: buildLetter("Experian"),
    });
  }, [selected]);

  const handleSend = () => {
    // TODO: POST letters to your API
    router.push("/dashboard/disputes/delivery");
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg">
          Review your dispute letter
        </Heading>

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

        <HStack justify="space-between" pt={4}>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button colorScheme="green" onClick={handleSend}>
            Send Letter
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
