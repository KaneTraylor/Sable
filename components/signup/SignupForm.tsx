// components/signup/SignupForm.tsx
import React, { useState, useEffect } from "react";
import { Box, Container, VStack, Spinner, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";
import SignupStep5 from "./SignupStep5";
import SignupStep6 from "./SignupStep6";

export interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  ssn: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  plan: string;
  userId: string;
}

const emptyFormData: FormData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  ssn: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  plan: "",
  userId: "",
};

export default function SignupForm() {
  const router = useRouter();
  const { email: emailQuery } = router.query;

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof emailQuery === "string" && emailQuery) {
      setFormData((prev) => ({ ...prev, email: emailQuery }));
    }
  }, [emailQuery]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const jumpToStep = (newStep: number, data?: Partial<FormData>) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
    }
    setStep(newStep);
  };
  const nextStep = () => setStep((s) => Math.min(6, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/signup/complete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text());

      await signIn("credentials", {
        redirect: true,
        callbackUrl: `${window.location.origin}/dashboard`,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupStep1
            formData={formData}
            onChange={handleFieldChange}
            onNext={jumpToStep}
          />
        );
      case 2:
        return <SignupStep2 onNext={nextStep} onBack={prevStep} />;
      case 3:
        return (
          <SignupStep3
            onNext={(step: number, data?: Partial<FormData>) =>
              jumpToStep(step, data)
            }
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <SignupStep4
            onNext={(step: number) => setStep(step)}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SignupStep5
            formData={formData}
            onNext={() => setStep(6)}
            onBack={prevStep}
          />
        );
      case 6:
        return <SignupStep6 onNext={() => router.push("/dashboard")} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Full-Screen Background */}
      <Box
        minH="100vh"
        w="100vw"
        bg="linear-gradient(135deg, #f8f4f0 0%, #faf7f3 50%, #f7f6f3 100%)"
        // Subtle animated background pattern
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #37a169 0%, transparent 70%),
            radial-gradient(circle at 80% 20%, #e39d49 0%, transparent 70%),
            radial-gradient(circle at 40% 80%, #37a169 0%, transparent 70%)
          `,
          backgroundSize: "100% 100%",
          animation: "float 20s ease-in-out infinite",
        }}
      >
        {/* Floating Elements for Visual Interest */}
        <Box
          position="absolute"
          top="10%"
          right="15%"
          w="100px"
          h="100px"
          bg="rgba(55, 161, 105, 0.1)"
          borderRadius="full"
          animation="float 15s ease-in-out infinite"
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          bottom="20%"
          left="10%"
          w="80px"
          h="80px"
          bg="rgba(227, 157, 73, 0.1)"
          borderRadius="full"
          animation="float 18s ease-in-out infinite reverse"
          display={{ base: "none", md: "block" }}
        />

        {/* Main Content Container */}
        <Box
          position="relative"
          zIndex={1}
          minH="100vh"
          display="flex"
          flexDirection="column"
        >
          {isSubmitting ? (
            <Center flex="1" minH="100vh">
              <VStack spacing={6}>
                <Spinner
                  size="xl"
                  color="sable.sage"
                  thickness="4px"
                  speed="0.65s"
                />
                <VStack spacing={2} textAlign="center">
                  <Box fontSize="lg" fontWeight="600" color="sable.sage">
                    Creating your account...
                  </Box>
                  <Box fontSize="sm" color="gray.600" maxW="sm">
                    Setting up your personalized credit journey
                  </Box>
                </VStack>
              </VStack>
            </Center>
          ) : (
            // Full-width step content
            <Box w="full" flex="1">
              {renderStep()}
            </Box>
          )}
        </Box>
      </Box>

      {/* CSS Keyframes for animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-3deg);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Smooth scroll for better UX */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(248, 244, 240, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(55, 161, 105, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(55, 161, 105, 0.5);
        }
      `}</style>
    </>
  );
}
