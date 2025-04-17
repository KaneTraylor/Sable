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
} from "@chakra-ui/react";
import CreditReportDisplay from "../components/CreditReportDisplay";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append("file", pdfFile);

    const res = await fetch("/api/upload-report", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast({ title: "PDF uploaded & parsed!", status: "success" });
    } else {
      toast({ title: "Failed to upload PDF", status: "error" });
    }
  };

  if (status === "loading") {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

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
      <CreditReportDisplay />

      <Box mt={8}>
        <Heading size="md" mb={4}>
          Upload Your Credit Report
        </Heading>
        <input
          type="file"
          accept=".pdf"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
              const res = await fetch("/api/uploadReport", {
                method: "POST",
                body: formData,
              });

              if (!res.ok) throw new Error("Upload failed");

              const data = await res.json();
              console.log("✅ Upload success:", data);
              alert("Upload successful!");
            } catch (err) {
              console.error("❌ Upload error:", err);
              alert("Upload failed. Please try again.");
            }
          }}
        />
      </Box>

      <Box mt={10}>
        <FormLabel htmlFor="credit-report">
          Upload Credit Report (PDF)
        </FormLabel>
        <Input
          type="file"
          id="credit-report"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          mb={4}
        />
        <Button onClick={handleUpload} colorScheme="blue" isDisabled={!pdfFile}>
          Upload & Parse
        </Button>
      </Box>
    </Box>
  );
}
