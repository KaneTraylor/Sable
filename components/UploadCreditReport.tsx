import { useState } from "react";
import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";

export default function UploadCreditReport() {
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleUpload = async () => {
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
      toast({
        title: "Upload successful",
        description: `Parsed text length: ${data.text.length} characters`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log("Parsed PDF content:", data.text);
    } catch (err) {
      toast({
        title: "Upload error",
        description: "Could not parse PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={8}>
      <VStack align="start" spacing={4}>
        <Text fontWeight="semibold">Upload Credit Report (PDF)</Text>
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button colorScheme="teal" onClick={handleUpload} isDisabled={!file}>
          Upload
        </Button>
      </VStack>
    </Box>
  );
}
