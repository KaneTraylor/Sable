import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";

type Props = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
};

export default function SignupStep1({ formData, onChange, onNext }: Props) {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading size="md" mb={6}>
        Step 1: Tell Us About You
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={onNext}>
          Continue
        </Button>
      </VStack>
    </Box>
  );
}
