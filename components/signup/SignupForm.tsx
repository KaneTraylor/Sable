import { useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import SignupStep1 from "./SignupStep1";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";

// Placeholder for Step 2
const SignupStep2 = () => (
  <Box p={6}>Step 2: Consent & Credit Pull (coming soon)</Box>
);

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const toast = useToast();

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

  const handleSubmit = () => {
    console.log("🚀 Final Signup Payload:", formData);
    toast({
      title: "Signup complete!",
      description: "Your account has been created.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    // Future: POST to your backend or redirect
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
        return <SignupStep2 />;
      case 3:
        return (
          <SignupStep3
            selectedPlan={formData.plan}
            onPlanSelect={(plan) => {
              handleFieldChange("plan", plan);
              nextStep();
            }}
          />
        );
      case 4:
        return (
          <SignupStep4
            formData={{
              email: formData.email,
              password: formData.password,
            }}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return <Box>{renderStep()}</Box>;
}
