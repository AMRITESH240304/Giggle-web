"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/OnboardingLayout";
import WelcomeContent from "@/components/WelcomeContent";

const CompanySuccessPage = () => {
  const router = useRouter();

  const handleViewCompany = () => {
    // Navigate to company dashboard
    router.push("/dashboard");
  };

  return (
    <OnboardingLayout>
      <WelcomeContent 
        idType="Company"
        idValue="CRV-1042"
        messageLines={["Your company has been successfully registered on Giggle"]}
        buttonText="View My Company"
        onButtonClick={handleViewCompany}
      />
    </OnboardingLayout>
  );
};

export default CompanySuccessPage;
