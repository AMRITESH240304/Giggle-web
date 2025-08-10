"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingLayout from "@/components/OnboardingLayout";
import WelcomeContent from "@/components/WelcomeContent";

interface FormData {
  name: string;
  phoneNumber: string;
  otp: string;
  roleTitle: string;
}

const ProfileBuilderPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    otp: "",
    roleTitle: "",
  });

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden px-6">
      {/* Background Curves */}
      <Image src="/main bg.png" alt="Background" fill className="object-cover z-0" priority />

      {/* 3D Hand Element */}
      <div className="absolute right-0 top-[10px] z-0 w-[700px] h-[850px]">
        <Image src="/Group158.png" alt="3D Hand" fill className="object-contain" />
      </div>

      {/* Main Layout */}
      <div className="relative z-20 flex w-full max-w-5xl items-center justify-between">
        {/* Left Text Section */}
        <div className="flex text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight whitespace-pre-line">
            Build a{'\n'}profile{'\n'}seekers{'\n'}can rely on
          </h1>
        </div>

        {/* Form Section */}
        <div className="flex-1 max-w-md bg-[#414141] bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg ml-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {[{ id: "name", label: "Name", value: formData.name, field: "name" },
              { id: "phone", label: "Phone Number", value: formData.phoneNumber, field: "phoneNumber" },
              { id: "otp", label: "Enter OTP", value: formData.otp, field: "otp" }].map(({ id, label, value, field }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-white text-sm font-medium mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  id={id}
                  placeholder={`Enter ${label}`}
                  value={value}
                  onChange={handleInputChange(field as keyof FormData)}
                  className="w-full px-3 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            ))}

            {/* Role Title */}
            <div>
              <label htmlFor="role" className="block text-white text-sm font-medium mb-2">
                Role Title <span className="text-gray-400 italic">(Optional)</span>
              </label>
              <input
                type="text"
                id="role"
                placeholder="Enter Role"
                value={formData.roleTitle}
                onChange={handleInputChange("roleTitle")}
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-7 rounded-xl font-semibold transition ml-auto block"
            >
              Next
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute bottom-6 left-6 w-[67px] h-[67px] bg-[#D9D9D966] bg-opacity-60 hover:bg-opacity-80 rounded-full flex items-center justify-center text-white z-40 transition duration-300">
        <ChevronLeft size={28} />
      </button>

      <button className="absolute bottom-6 right-6 w-[67px] h-[67px] bg-[#D9D9D966] bg-opacity-60 hover:bg-opacity-80 rounded-full flex items-center justify-center text-white z-40 transition duration-300">
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default ProfileBuilderPage;
