"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingLayout from "@/components/OnboardingLayout";
import WelcomeContent from "@/components/WelcomeContent";


const OnboardingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type"); // "provider" or "seeker"

  const handleSetupCompany = () => {
    if (userType === "provider") {
      // Navigate to company setup or company success
      router.push("/company-success");
    } else {
      // Navigate to dashboard for seekers
      router.push("/dashboard");
    }
  };

  // Customize content based on user type
  const getContent = () => {
    if (userType === "provider") {
      return {
        idType: "Provider" as const,
        idValue: "PRV-1042",
        messageLines: ["You're now part of the Giggle community!"],
        buttonText: "Set Up Your Company"
      };
    } else if (userType === "seeker") {
      return {
        idType: "Seeker" as const,
        idValue: "SKR-1042", 
        messageLines: ["You're now part of the Giggle community!"],
        buttonText: "Start Finding Gigs"
      };
    } else {
      // Default content
      return {
        idType: "Provider" as const,
        idValue: "PRV-1042",
        messageLines: ["You're now part of the Giggle community!"],
        buttonText: "Set Up Your Company"
      };
    }
  };

  const content = getContent();

  return (
    <OnboardingLayout>
      <WelcomeContent 
        idType={content.idType}
        idValue={content.idValue}
        messageLines={content.messageLines}
        buttonText={content.buttonText}
        onButtonClick={handleSetupCompany} 
      />
    </OnboardingLayout>
  );
};

export default OnboardingPage;
