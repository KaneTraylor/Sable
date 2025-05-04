// pages/dashboard/disputes/confirmation.tsx
import { Box, Heading, Text, VStack, Image, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ConfirmationPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Store a flag so user can revisit this confirmation page
    localStorage.setItem("sable_confirmation_seen", "true");
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Box
      className="page_align_content__d_XFJ"
      maxW="800px"
      mx="auto"
      py={8}
      px={4}
    >
      <VStack spacing={6} className="sent_sent___XN9d" align="stretch">
        <Image
          src="https://kikoff.com/_next/static/media/sent.a6966800.svg"
          alt="Sent Icon"
          w="100px"
        />
        <Heading as="h3" size="lg">
          You’re all set!
        </Heading>
        <Text className="color:moderate">
          You’ll receive a confirmation email and we’ll let you know when your
          dispute is in review. Please also be on the lookout for receiving a
          physical letter from Equifax.
        </Text>

        <Box className="sent_status__S_FS6">
          <Heading as="h4" size="sm">
            Status
          </Heading>

          <Box className="Timeline_timeline__ndeU5">
            <Box className="Timeline_event__bBWl3 Timeline_complete__rBiSv">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
                <Box className="Timeline_line__IuWz0" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>Dispute submitted</Text>
                <Text className="text:mini color:moderate">{today}</Text>
              </Box>
            </Box>

            <Box className="Timeline_event__bBWl3">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
                <Box className="Timeline_line__IuWz0" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>In review by Equifax</Text>
              </Box>
            </Box>

            <Box className="Timeline_event__bBWl3 Timeline_last__XOZYk">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>Receive results</Text>
                <Text className="text:mini color:moderate">
                  Estimated response time:
                  <br />
                  45 to 60 days
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button
          mt={6}
          colorScheme="green"
          onClick={() => router.push("/dashboard/disputes/center")}
        >
          View Dispute Center
        </Button>
      </VStack>
      <Box h="calc(var(--bottom-padding, 80px) + 20px)" />
    </Box>
  );
};

export default ConfirmationPage;
