import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/common/Navbar";
import WhyItWorksSection from "@/components/home/WhyItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StickyCTA from "@/components/common/StickyCTA";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <HeroSection />
      <WhyItWorksSection />
      <FeaturesSection />
      <StickyCTA />
    </Box>
  );
}
