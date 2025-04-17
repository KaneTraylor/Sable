import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Input, Button, Heading, VStack } from "@chakra-ui/react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("SIGNIN RESULT:", res);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto" mt={12}>
      <Heading mb={6}>Sign In</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleLogin}>
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}
