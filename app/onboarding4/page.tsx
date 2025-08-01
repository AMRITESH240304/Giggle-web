"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContactFormData {
  city: string;
  state: string;
  country: string;
  pincode: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  socialMedia?: string;
}

const LocationContactInfoPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    city: "",
    state: "",
    country: "",
    pincode: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: "",
  });

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/main bg.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* 3D Hand Image */}
      <div className="absolute bottom-20 right-40 w-32 h-32 z-30">
        <img src="/hand.png" alt="Hand" className="w-full h-full object-contain" />
      </div>

      {/* Layout Container */}
      <div className="relative z-20 w-full max-w-7xl flex items-start justify-between gap-8">
        {/* Left Text Section */}
        <div className="text-white max-w-md flex-shrink-0 mt-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="block">Build a</span>
            <span className="block">profile</span>
            <span className="block">seekers</span>
            <span className="block">can</span>
            <span className="block">rely on</span>
          </h1>
        </div>

        {/* Right Form Section */}
        <div className="flex-1 max-w-xl bg-[#494949] bg-opacity-90 backdrop-blur-md py-20 px-30 mt-[-100px]  shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-8 text-red-500">Location & Contact Info</h2>
          <div className="space-y-6">
            {/* 2 Columns for City/State and Country/Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium mb-2 text-white">City</div>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.city}
                  onChange={handleChange("city")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
                />
              </div>
              <div>
                <div className="block text-sm font-medium mb-2 text-white">State</div>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.state}
                  onChange={handleChange("state")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium mb-2 text-white">Country</div>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.country}
                  onChange={handleChange("country")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
                />
              </div>
              <div>
                <div className="block text-sm font-medium mb-2 text-white">Pincode</div>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.pincode}
                  onChange={handleChange("pincode")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
                />
              </div>
            </div>

            {/* Full-width Fields */}
            <div>
              <div className="block text-sm font-medium mb-2 text-white">Full Address</div>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={formData.address}
                onChange={handleChange("address")}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
              />
            </div>

            <div>
              <div className="block text-sm font-medium mb-2 text-white">Company Email</div>
              <input
                type="email"
                placeholder="Enter Full Name"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
              />
            </div>

            <div>
              <div className="block text-sm font-medium mb-2 text-white">Company Phone Number</div>
              <input
                type="tel"
                placeholder="Enter Full Name"
                value={formData.phone}
                onChange={handleChange("phone")}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
              />
            </div>

            <div>
              <div className="block text-sm font-medium mb-2 text-white">Website (optional)</div>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={formData.website}
                onChange={handleChange("website")}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
              />
            </div>

            <div>
              <div className="block text-sm font-medium mb-2 text-white">Social Media Links (optional)</div>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={formData.socialMedia}
                onChange={handleChange("socialMedia")}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 border-0"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute bottom-6 left-6 w-12 h-12 bg-gray-600/50 hover:bg-gray-600/70 rounded-full flex items-center justify-center text-white z-40 transition duration-300 backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>

      <button className="absolute bottom-6 right-6 w-12 h-12 bg-gray-600/50 hover:bg-gray-600/70 rounded-full flex items-center justify-center text-white z-40 transition duration-300 backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default LocationContactInfoPage;