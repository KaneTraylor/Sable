import { useState, useEffect } from "react";
import { Box, useToast, Spinner, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
    userId: "", // ✅ Added this
  });

  useEffect(() => {
    const savedData = localStorage.getItem("signupFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

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
        userId: userData.userId ?? formData.userId,
        password: userData.password ?? formData.password,
      };
      setFormData(mergedData);
      localStorage.setItem("signupFormData", JSON.stringify(mergedData));
    }
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(
      "🔍 Final formData at Step 4:",
      JSON.stringify(formData, null, 2)
    );

    if (!formData.userId) {
      console.error("❌ Missing userId in formData. Aborting.");
      toast({
        title: "Error",
        description: "User ID missing. Please restart signup.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/signup/complete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Signup completion failed: " + errorText);
      }

      await fetch("/api/sendWelcomeEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.firstName,
        }),
      });

      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginRes?.error) throw new Error("Auto login failed");

      toast({
        title: "Account created!",
        description: `Welcome, ${formData.firstName}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.removeItem("signupFormData");
      localStorage.setItem("usedDummyLogin", "true");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
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

  const fillDummyData = async () => {
    const dummy = {
      email: `user${Date.now()}@devmail.com`,
      password: "devpass123",
      firstName: "Dev",
      lastName: "User",
      ssn: "123-45-6789",
      dob: "01/01/1990",
      address: "123 Dev Lane",
      plan: "standard",
    };

    try {
      const res = await fetch("/api/signup/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: dummy.email, password: dummy.password }),
      });

      const result = await res.json();

      if (!res.ok || !result.formData?.userId) {
        throw new Error("Failed to initialize dummy account");
      }

      const merged = { ...dummy, userId: result.formData.userId };
      setFormData(merged);
      localStorage.setItem("signupFormData", JSON.stringify(merged));
      localStorage.setItem("usedDummyLogin", "true");

      setTimeout(() => setStep(2), 200);
      setTimeout(() => setStep(3), 600);
      setTimeout(() => setStep(4), 1000);
    } catch (error) {
      console.error("Dummy data error:", error);
      toast({
        title: "Error",
        description: "Could not create dummy account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <SignupStep1
              formData={formData}
              onChange={handleFieldChange}
              onNext={jumpToStep}
            />
            {typeof window !== "undefined" &&
              window.location.hostname === "localhost" && (
                <Center mt={6}>
                  <Button
                    onClick={fillDummyData}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Fill with Dummy Data
                  </Button>
                </Center>
              )}
          </>
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
