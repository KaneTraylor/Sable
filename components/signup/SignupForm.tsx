import { useState, useEffect } from "react";
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
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    ssn: "",
    dob: "",
    address: "",
    plan: "",
  });

  // Load formData from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("signupFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save formData to localStorage on change
  const handleFieldChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem("signupFormData", JSON.stringify(updatedData));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const jumpToStep = (newStep: number, userData?: any) => {
    if (userData) {
      const mergedData = {
        ...formData,
        ...userData,
        email: userData.email ?? formData.email,
        password: "", // Do not reuse password from storage
      };
      setFormData(mergedData);
      localStorage.setItem("signupFormData", JSON.stringify(mergedData));
    }
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/signup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Signup failed");
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

      localStorage.removeItem("signupFormData");
      router.push("/verify-gate");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to create account.",
        status: "error",
        duration: 4000,
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
