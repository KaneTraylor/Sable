// components/dashboard/SableGrowIcons.tsx
import { chakra, Image, useColorModeValue, HStack } from "@chakra-ui/react";

// All the files under public/mockups/grow
const GROW_ICONS = [
  { src: "/mockups/grow/cash-in-safe.png", alt: "Cash In Safe" },
  { src: "/mockups/grow/cash-in-wallet.png", alt: "Cash In Wallet" },
  { src: "/mockups/grow/graphic-working-mom.png", alt: "Working Mom" },
  { src: "/mockups/grow/graphic-money-bag-orange.svg", alt: "Money Bag" },
  { src: "/mockups/grow/sable-piggy.png", alt: "Piggy Bank" },
];

export default function SableGrowIcons() {
  // light: white, dark: near-black
  const bg = useColorModeValue("white", "gray.700");

  return (
    <HStack spacing={4} justify="center">
      {GROW_ICONS.map(({ src, alt }) => (
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
