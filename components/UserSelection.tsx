"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface UserSelectionProps {
  onGigProvider: () => void;
  onGigSeeker: () => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ onGigProvider, onGigSeeker }) => {
  return (
    <>
      {/* Main heading */}
      <h1 className="text-white text-3xl font-medium mb-16 leading-relaxed">
        How would you like to use Giggle?
      </h1>

      {/* Action buttons */}
      <div className="flex gap-6 w-full">
        <Button
          onClick={onGigProvider}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-6 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Gig Provider
        </Button>
        
        <Button
          onClick={onGigSeeker}
          className="flex-1 bg-red-700 hover:bg-red-800 text-white font-medium py-6 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Gig Seeker
        </Button>
      </div>
    </>
  );
};

export default UserSelection;
