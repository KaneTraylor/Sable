// pages/index.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhatYouGetSection from "@/components/home/WhatYouGetSection";
import ExamplePlanSection from "@/components/home/ExamplePlanSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import StickyCTA from "@/components/common/StickyCTA";

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

      <HowItWorksSection />

      <WhatYouGetSection />

      <ExamplePlanSection />

      <TestimonialsSection />

      <FAQSection />

      <StickyCTA />
    </Box>
  );
}
