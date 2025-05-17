import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Select,
  Textarea,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDisputeStore, DisputeSelection } from "@/stores/useDisputeStore";
import { Metro2Letter } from "@/components/dashboard/disputes/Metro2Letter";
import { PaymentHistory } from "@/components/dashboard/disputes/PaymentHistory";

type FormatStyle = "standard" | "metro2";

interface ReviewProps {
  user: {
    name: string;
    address: string;
  };
}

export const getServerSideProps: GetServerSideProps<ReviewProps> = async (
  ctx
) => {
  const session = await getSession(ctx);
  if (!session?.user?.email) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }

  const userRecord = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { firstName: true, lastName: true, address: true },
  });

  if (!userRecord) {
    return { notFound: true };
  }

  const fullName = `${userRecord.firstName ?? ""} ${
    userRecord.lastName ?? ""
  }`.trim();

  return {
    props: {
      user: {
        name: fullName,
        address: userRecord.address ?? "",
      },
    },
  };
};

export default function DisputeReview({ user }: ReviewProps) {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.700");
  const { selected, reset } = useDisputeStore();
  const [style, setStyle] = useState<FormatStyle>("standard");
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

    const bodyLines = selected
      .map(
        (d: DisputeSelection) =>
          `• ${d.name}\n    Reason: ${d.reason}\n    Instruction: ${d.instruction}\n`
      )
      .join("\n");

    const makeStandard = (bureau: string) => `
${today}

${user.name}
${user.address}

${bureau} Consumer Dispute Department

Subject: Credit Report Dispute

Dear ${bureau},

I recently obtained a copy of my credit report and would like to dispute the following item(s):

${bodyLines}

Please reinvestigate these items and correct or remove the inaccurate information within 30 days as required by the Fair Credit Reporting Act.

Thank you for your prompt attention.

Sincerely,

${user.name}
`;

    setLetters({
      Equifax: makeStandard("Equifax"),
      TransUnion: makeStandard("TransUnion"),
      Experian: makeStandard("Experian"),
    });
  }, [selected, user]);

  const handleSend = () => {
    reset();
    router.push("/dashboard/disputes/delivery");
  };

  const bureaus = ["Equifax", "TransUnion", "Experian"] as const;

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg">
          Review &amp; Send Your Dispute Letter
        </Heading>

        <Flex>
          <Select
            w="200px"
            value={style}
            onChange={(e) => setStyle(e.target.value as FormatStyle)}
          >
            <option value="standard">Standard (FCRA)</option>
            <option value="metro2">Metro-2 Format</option>
          </Select>
        </Flex>

        {style === "metro2" ? (
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              {bureaus.map((b) => (
                <Tab key={b}>{b}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {bureaus.map((bureau) => (
                <TabPanel key={bureau} p={0}>
                  <Box bg={bg} p={4} borderRadius="md" boxShadow="md">
                    <Metro2Letter
                      bureau={bureau}
                      items={
                        selected as Array<DisputeSelection & { account: any }>
                      }
                      user={user}
                    />
                    <PaymentHistory />
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        ) : (
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              {bureaus.map((b) => (
                <Tab key={b}>{b}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {bureaus.map((bureau) => (
                <TabPanel key={bureau} p={0}>
                  <Box
                    bg={bg}
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                    maxH="60vh"
                    overflowY="auto"
                  >
                    <Textarea
                      fontFamily="monospace"
                      rows={20}
                      value={letters[bureau]}
                      onChange={(e) =>
                        setLetters((prev) => ({
                          ...prev,
                          [bureau]: e.target.value,
                        }))
                      }
                    />
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}

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
