// pages/dashboard/disputes/center.tsx
import {
  Box,
  Heading,
  VStack,
  Text,
  Flex,
  Icon,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";
import { useDisputeStore, DisputeSelection } from "@/stores/useDisputeStore";

const DisputeCenter = () => {
  const router = useRouter();
  const selected = useDisputeStore((state) => state.selected);

  const today = new Date().toLocaleDateString("en-US");

  return (
    <Box
      className="page_layout_page-layout__T3tqs"
      p={4}
      maxW="800px"
      mx="auto"
    >
      <Flex className="page_layout_top___HMZ_" justify="flex-end">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="ContainerButton_container-button__zSMM6 ContainerButton_fit__xru8n"
        >
          Return to Dashboard
        </Button>
      </Flex>

      <Heading as="h3" size="lg" mb={6}>
        {today}
      </Heading>

      <VStack align="stretch" spacing={6}>
        <Box className="dispute_status_timeline__UM8qN bg:dugout p-4 rounded-xl">
          <Flex justify="space-between" align="center" className="text:large+">
            <Text>Status</Text>
            <Icon as={FiChevronRight} />
          </Flex>

          <VStack
            spacing={4}
            mt={4}
            ml={1}
            className="Timeline_timeline__ndeU5"
          >
            <Flex className="Timeline_event__bBWl3 Timeline_complete__rBiSv">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
                <Box className="Timeline_line__IuWz0" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>Dispute sent</Text>
                <Text fontSize="xs" color="gray.500">
                  {today}
                </Text>
              </Box>
            </Flex>

            <Flex className="Timeline_event__bBWl3">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
                <Box className="Timeline_line__IuWz0" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>In review</Text>
              </Box>
            </Flex>

            <Flex className="Timeline_event__bBWl3 Timeline_last__XOZYk">
              <Box className="Timeline_progress__vTqEJ">
                <Box className="Timeline_mark__FcNXJ" />
              </Box>
              <Box className="Timeline_content__ZNWQv">
                <Text>Receive results</Text>
                <Text fontSize="xs" color="gray.500">
                  Estimated response time: 45–60 days
                </Text>
              </Box>
            </Flex>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h4" size="md" mb={4}>
            {selected.length} items in dispute
          </Heading>

          {selected.map((item: DisputeSelection, i: number) => (
            <Box
              key={i}
              className="Card_card__j4UbT"
              boxShadow="inset 0 0 0 1px var(--outline)"
              p={4}
              borderRadius="md"
              mb={4}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    <strong>Reason:</strong> {item.reason}
                  </Text>
                  {item.instruction && (
                    <Text fontSize="sm" color="gray.500">
                      <strong>Instruction:</strong> {item.instruction}
                    </Text>
                  )}
                </Box>
                <Icon as={FiChevronRight} />
              </Flex>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default DisputeCenter;
