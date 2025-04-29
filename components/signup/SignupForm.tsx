// components/signup/SignupForm.tsx

import React, { useState, useEffect } from "react";
import { Box, Flex, Center, Spinner, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";

interface FormData {
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
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("signupFormData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.error("Failed to parse saved signup data");
      }
    }
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("signupFormData", JSON.stringify(updated));
  };

  const jumpToStep = (newStep: number, data?: Partial<FormData>) => {
    if (data) {
      const merged = { ...formData, ...data };
      setFormData(merged as FormData);
      localStorage.setItem("signupFormData", JSON.stringify(merged));
    }
    setStep(newStep);
  };

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
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
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      localStorage.removeItem("signupFormData");
      router.push("/dashboard");
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
        return (
          <SignupStep2
            formData={formData}
            onChange={handleFieldChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <SignupStep3
            selectedPlan={formData.plan}
            onPlanSelect={(plan) => handleFieldChange("plan", plan)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <SignupStep4
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box bg="white" px={{ base: 4, md: 0 }} py={{ base: 6, md: 8 }}>
      <Flex
        direction="column"
        align="center"
        w="full"
        maxW={{ base: "full", md: "3xl" }}
        mx="auto"
      >
        <VStack spacing={8} w="full">
          {isSubmitting ? (
            <Center py={10}>
              <Spinner size="xl" />
            </Center>
          ) : (
            renderStep()
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
