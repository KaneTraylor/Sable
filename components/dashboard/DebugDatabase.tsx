// components/dashboard/DebugDatabase.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  Code,
  Alert,
  AlertIcon,
  useToast,
  Spinner,
} from "@chakra-ui/react";

export default function DebugDatabase() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const toast = useToast();

  const checkDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/check-db-schema");
      const data = await response.json();
      setResult(data);

      if (!response.ok) {
        toast({
          title: "Error checking database",
          description: data.error || "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
    } catch (error: any) {
      toast({
        title: "Network error",
        description: error.message,
        status: "error",
        duration: 5000,
      });
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card bg="white" borderRadius="lg" boxShadow="md">
      <CardHeader>
        <Heading size="md">🔧 Database Debug Info</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Alert status="warning">
            <AlertIcon />
            <Text fontSize="sm">
              This is a temporary debug tool. Remove after fixing the issue.
            </Text>
          </Alert>

          <Button
            colorScheme="blue"
            onClick={checkDatabase}
            isLoading={loading}
            loadingText="Checking..."
          >
            Check Database Schema
          </Button>

          {result && (
            <Box>
              <Text fontWeight="bold" mb={2}>
                Results:
              </Text>
              <Code
                p={4}
                borderRadius="md"
                bg="gray.100"
                display="block"
                whiteSpace="pre-wrap"
                fontSize="sm"
              >
                {JSON.stringify(result, null, 2)}
              </Code>

              {result.tables && (
                <VStack align="stretch" mt={4} spacing={2}>
                  <Text fontWeight="bold">Table Status:</Text>
                  {Object.entries(result.tables).map(([table, exists]) => (
                    <HStack key={table}>
                      <Text fontSize="sm">{table}:</Text>
                      <Badge colorScheme={exists ? "green" : "red"}>
                        {exists ? "✓ Exists" : "✗ Missing"}
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              )}
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

// Add this import to your dashboard
import { HStack, Badge } from "@chakra-ui/react";
