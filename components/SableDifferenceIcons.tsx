// components/dashboard/SableDifferenceIcons.tsx
import { chakra, Image, useColorModeValue, HStack } from "@chakra-ui/react";

// All the files under public/mockups/sable-difference
const DIFF_ICONS = [
  {
    src: "/mockups/sable-difference/graphic-ladder-girl.svg",
    alt: "Ladder Girl",
  },
  {
    src: "/mockups/sable-difference/graphic-group-shot.svg",
    alt: "Group Shot",
  },
  {
    src: "/mockups/sable-difference/coin-piggy-bank.png",
    alt: "Coin Piggy Bank",
  },
  { src: "/mockups/sable-difference/savings-party.png", alt: "Savings Party" },
  {
    src: "/mockups/sable-difference/Sable-credit-gauge.png",
    alt: "Credit Gauge Img",
  },
];

export function SableDifferenceIcons() {
  // light: white, dark: near-black
  const bg = useColorModeValue("white", "gray.700");

  return (
    <HStack spacing={4} justify="center">
      {DIFF_ICONS.map(({ src, alt }) => (
        <chakra.div
          key={src}
          w={16}
          h={16}
          p={3}
          bg={bg}
          borderRadius="full"
          boxShadow="md"
        >
          <Image src={src} alt={alt} boxSize="100%" objectFit="contain" />
        </chakra.div>
      ))}
    </HStack>
  );
}
