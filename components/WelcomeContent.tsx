"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface WelcomeContentProps {
  idType?: "Provider" | "Company" | "Seeker";
  idValue?: string;
  messageLines?: string[];
  buttonText?: string;
  onButtonClick: () => void;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({ 
  idType = "Provider",
  idValue = "PRV-1042",
  messageLines = ["You're now part of the Giggle community!"],
  buttonText = "Set Up Your Company",
  onButtonClick
}) => {
  return (
    <>
      {/* Welcome message */}
      <div className="mb-8">
        <p className="text-gray-300 text-lg leading-relaxed">
          Your {idType} ID has been created – <span className="text-red-400 font-semibold">{idValue}</span>
        </p>
        {messageLines.map((line, index) => (
          <p key={index} className="text-gray-300 text-lg leading-relaxed mt-2">
            {line}
          </p>
        ))}
      </div>

      {/* Action button */}
      <div className="flex justify-center w-full">
        <Button
          onClick={onButtonClick}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-4 px-12 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default WelcomeContent;
