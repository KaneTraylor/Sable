import { useState } from "react";
import { Box, useToast, Spinner, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ssn: "",
    dob: "",
    address: "",
    plan: "",
    password: "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      await fetch("/api/sendWelcomeEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.firstName,
        }),
      });

      toast({
        title: "Account created!",
        description: `Welcome, ${formData.firstName}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast({
        title: "Error",
        description: err.message.includes("Email is already in use")
          ? "That email is already registered. Try logging in instead."
          : "Failed to create account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
            onNext={nextStep}
          />
        );
      case 2:
        return <SignupStep2 onNext={nextStep} onBack={prevStep} />;
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
    <Box p={6}>
      {isSubmitting ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        renderStep()
      )}
    </Box>
  );
}
