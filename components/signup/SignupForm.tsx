import { useState } from "react";
import { Box, useToast } from "@chakra-ui/react";

import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import SignupStep4 from "./SignupStep4";

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
    console.log("📝 Submitting form data:", formData);
    toast({
      title: "Account created!",
      description: "Welcome to Sable Credit!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    // Reset form or redirect here
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

  return <Box p={6}>{renderStep()}</Box>;
}
