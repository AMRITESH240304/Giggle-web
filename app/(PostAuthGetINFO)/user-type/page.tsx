"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/OnboardingLayout";
import UserSelection from "@/components/UserSelection";

const UserTypePage = () => {
  const router = useRouter();

  const handleGigProvider = () => {
    // Navigate to provider onboarding
    router.push("/onboarding?type=provider");
  };

  const handleGigSeeker = () => {
    // Navigate to seeker onboarding  
    router.push("/onboarding?type=seeker");
  };

  return (
    <OnboardingLayout >
      <UserSelection onGigProvider={handleGigProvider} onGigSeeker={handleGigSeeker} />
    </OnboardingLayout>
  );
};

export default UserTypePage;
