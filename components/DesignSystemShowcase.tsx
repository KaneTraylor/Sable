// components/DesignSystemShowcase.tsx
// This component helps maintain design consistency across the app
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Card,
  CardBody,
  Input,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";

export default function DesignSystemShowcase() {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Container maxW="7xl" py={12}>
      <VStack spacing={12} align="stretch">
        {/* Typography */}
        <Box>
          <Heading size="2xl" mb={8} textAlign="center">
            Sable Credit Design System
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Card>
              <CardBody>
                <Heading size="lg" mb={4}>
                  Typography
                </Heading>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Heading size="4xl">Heading XL</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Corben, 72px, Bold
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="2xl">Heading Large</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Corben, 36px, Bold
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="lg">Heading Medium</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Corben, 24px, Bold
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">Body Large Text</Text>
                    <Text fontSize="sm" color="gray.500">
                      Merriweather, 18px, Regular
                    </Text>
                  </Box>
                  <Box>
                    <Text>Regular Body Text</Text>
                    <Text fontSize="sm" color="gray.500">
                      Merriweather, 16px, Regular
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">Small Text</Text>
                    <Text fontSize="xs" color="gray.500">
                      Merriweather, 14px, Regular
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            {/* Colors */}
            <Card>
              <CardBody>
                <Heading size="lg" mb={4}>
                  Brand Colors
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Box w={8} h={8} bg="sable.sage" borderRadius="md" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600">Sable Sage</Text>
                      <Text fontSize="sm" color="gray.500">
                        #37a169
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Box w={8} h={8} bg="sable.forest" borderRadius="md" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600">Sable Forest</Text>
                      <Text fontSize="sm" color="gray.500">
                        #2f855a
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Box w={8} h={8} bg="brand.500" borderRadius="md" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600">Brand Orange</Text>
                      <Text fontSize="sm" color="gray.500">
                        #e39d49
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Box
                      w={8}
                      h={8}
                      bg="sable.tan"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600">Sable Tan</Text>
                      <Text fontSize="sm" color="gray.500">
                        #f8f4f0
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Box
                      w={8}
                      h={8}
                      bg="sable.cream"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600">Sable Cream</Text>
                      <Text fontSize="sm" color="gray.500">
                        #faf7f3
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Buttons */}
        <Card>
          <CardBody>
            <Heading size="lg" mb={6}>
              Buttons
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <VStack align="start" spacing={4}>
                <Text fontWeight="600">Primary Actions</Text>
                <Button variant="solid" size="lg">
                  Get Started
                </Button>
                <Button variant="solid" size="md">
                  Continue
                </Button>
                <Button variant="solid" size="sm">
                  Submit
                </Button>
              </VStack>

              <VStack align="start" spacing={4}>
                <Text fontWeight="600">Secondary Actions</Text>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
                <Button variant="outline" size="md">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </VStack>

              <VStack align="start" spacing={4}>
                <Text fontWeight="600">Brand Variant</Text>
                <Button variant="brand" size="lg">
                  Special Offer
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Button
                </Button>
                <Button variant="ghost" size="sm" colorScheme="red">
                  Delete
                </Button>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardBody>
            <Heading size="lg" mb={6}>
              Form Elements
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <VStack align="start" spacing={4}>
                <Box w="full">
                  <Text mb={2} fontWeight="600">
                    Default Input
                  </Text>
                  <Input placeholder="Enter your email" />
                </Box>
                <Box w="full">
                  <Text mb={2} fontWeight="600">
                    Filled Variant
                  </Text>
                  <Input variant="filled" placeholder="Your name" />
                </Box>
              </VStack>

              <VStack align="start" spacing={4}>
                <Box w="full">
                  <Text mb={2} fontWeight="600">
                    Input with Focus
                  </Text>
                  <Input placeholder="Focus me" focusBorderColor="sable.sage" />
                </Box>
                <Box w="full">
                  <Text mb={2} fontWeight="600">
                    Error State
                  </Text>
                  <Input
                    placeholder="Invalid input"
                    isInvalid
                    errorBorderColor="red.500"
                  />
                </Box>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Badges & Alerts */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Card>
            <CardBody>
              <Heading size="lg" mb={4}>
                Badges
              </Heading>
              <HStack spacing={4} flexWrap="wrap">
                <Badge variant="solid">Active</Badge>
                <Badge variant="outline">Pending</Badge>
                <Badge variant="subtle">Completed</Badge>
                <Badge colorScheme="orange">Warning</Badge>
                <Badge colorScheme="red">Error</Badge>
              </HStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Heading size="lg" mb={4}>
                Alerts
              </Heading>
              <VStack spacing={3}>
                <Alert status="success" size="sm">
                  <AlertIcon />
                  Success message
                </Alert>
                <Alert status="warning" size="sm">
                  <AlertIcon />
                  Warning message
                </Alert>
                <Alert status="error" size="sm">
                  <AlertIcon />
                  Error message
                </Alert>
                <Alert status="info" size="sm">
                  <AlertIcon />
                  Info message
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Usage Guidelines */}
        <Card bg="sable.cream">
          <CardBody>
            <Heading size="lg" mb={4}>
              Usage Guidelines
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <VStack align="start" spacing={3}>
                <Text fontWeight="600" color="sable.sage">
                  ✓ Do's
                </Text>
                <Text fontSize="sm">
                  • Use Sable Sage (#37a169) for primary actions
                </Text>
                <Text fontSize="sm">• Use Corben font for headings only</Text>
                <Text fontSize="sm">
                  • Maintain consistent 16px border radius
                </Text>
                <Text fontSize="sm">
                  • Use warm neutral colors for backgrounds
                </Text>
                <Text fontSize="sm">
                  • Keep button text concise and action-oriented
                </Text>
              </VStack>

              <VStack align="start" spacing={3}>
                <Text fontWeight="600" color="red.500">
                  ✗ Don'ts
                </Text>
                <Text fontSize="sm">
                  • Don't use bright colors for large areas
                </Text>
                <Text fontSize="sm">
                  • Don't mix Corben with other display fonts
                </Text>
                <Text fontSize="sm">
                  • Don't use pure white/black backgrounds
                </Text>
                <Text fontSize="sm">
                  • Don't create buttons smaller than 40px height
                </Text>
                <Text fontSize="sm">• Don't use more than 2 font families</Text>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}
