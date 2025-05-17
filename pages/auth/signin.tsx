import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, #f9f5f1, white)",
    "gray.800"
  );
  const cardBg = useColorModeValue("white", "gray.700");
  const focusBorder = useColorModeValue("green.400", "green.300");

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgGradient={bgGradient}
      p={4}
    >
      <Box
        bg={cardBg}
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
        maxW="md"
        w="full"
      >
        <VStack spacing={6} w="full">
          <Heading size="lg" textAlign="center">
            Welcome to Sable
          </Heading>

          <VStack spacing={4} w="full">
            <Input
              placeholder="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor={focusBorder}
            />
            <InputGroup>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor={focusBorder}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Button colorScheme="green" w="full" size="md" onClick={handleLogin}>
            Sign In
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
