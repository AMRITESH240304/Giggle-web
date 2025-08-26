"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface GradeCardProps {
  grade: string;
  lastUpdate?: string;
}

export const GradeCard = ({
  grade = "G+",
  lastUpdate = "Saturday, 26 Oct",
}: GradeCardProps) => {
  return (
    <div className="p-[2px] rounded-xl bg-gradient-to-r from-yellow-400/80 via-transparent to-red-500/80">
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium">
              Your FLN Grade:
            </h2>
          </div>
          
          <div className="text-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-bold" 
                  style={{ color: "#F9D776" }}>
              {grade}
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 text-xl font-semibold rounded-md"
          >
            SCORE
          </Button>
          
          <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
            <span>Check More.</span>
            <div className="text-right">
              <p>Last Update</p>
              <p>{lastUpdate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCard;
