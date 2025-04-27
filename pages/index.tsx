// pages/index.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import StickyCTA from "@/components/common/StickyCTA";
import PlansSection from "@/components/home/PlanSection";
import FactsSection from "@/components/home/FactsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  // if already signed in, send straight to the dashboard
  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />

      <HeroSection />

      <PlansSection />

      <FactsSection />

      <FeaturesSection />

      <StickyCTA />

      <CTASection />

      <Footer />
    </Box>
  );
}
