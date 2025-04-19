import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Flex,
  Button,
  Input,
  FormLabel,
  useToast,
  VStack,
} from "@chakra-ui/react";
import CreditReportDisplay from "../components/CreditReportDisplay";

// Optional: define the Tradeline type if it's not already imported
type Tradeline = {
  creditor: string;
  bureau: string;
  issue: string;
  accountNumber: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const toast = useToast();

  // 🚫 Temporarily disable auth protection for development
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   }
  // }, [status, router]);

  // Optional: skip loading guard as well
  // if (status === "loading") {
  //   return (
  //     <Center minH="100vh">
  //       <Spinner size="xl" />
  //     </Center>
  //   );
  // }

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await fetch("/api/uploadReport", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setTradelines(data.tradelines || []);
      toast({ title: "PDF uploaded & parsed!", status: "success" });
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast({ title: "Failed to upload PDF", status: "error" });
    }
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg">
            Welcome, {session?.user?.name || session?.user?.email || "User"}!
          </Heading>
          {session?.user?.email && (
            <Text fontSize="sm" color="gray.500">
              Email: {session.user.email}
            </Text>
          )}
        </Box>
        <Button colorScheme="red" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Flex>

      <Text mb={6}>Here's a summary of your credit report:</Text>
      <CreditReportDisplay tradelines={tradelines} />

      <Box mt={10}>
        <Heading size="md" mb={2}>
          Upload Credit Report (PDF)
        </Heading>
        <VStack align="start" spacing={4}>
          <FormLabel htmlFor="credit-report">Choose a PDF file:</FormLabel>
          <Input
            type="file"
            id="credit-report"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
          <Button
            onClick={handleUpload}
            colorScheme="blue"
            isDisabled={!pdfFile}
          >
            Upload
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
