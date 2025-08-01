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

  const handleChange =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/main bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Text Section */}
      <div className="w-1/2 flex items-center justify-center px-12 z-10">
        <div className="text-white space-y-2">
          <h1 className="text-5xl font-extrabold leading-tight">
            <div>Build a</div>
            <div>profile</div>
            <div>seekers</div>
            <div>can</div>
            <div>rely on</div>
          </h1>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex items-start justify-center   z-10">
        <div className="w-full max-w-lg bg-[#494949]/90 backdrop-blur-md text-white p-10 rounded-lg shadow-2xl">
  <h2 className="text-2xl font-bold mb-8 text-red-500">
    Location & Contact Info
  </h2>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block mb-1 text-sm font-medium">City</label>
      <input
        type="text"
        placeholder="Enter City"
        value={formData.city}
        onChange={handleChange("city")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 text-sm font-medium">State</label>
      <input
        type="text"
        placeholder="Enter State"
        value={formData.state}
        onChange={handleChange("state")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block mb-1 text-sm font-medium">Country</label>
      <input
        type="text"
        placeholder="Enter Country"
        value={formData.country}
        onChange={handleChange("country")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 text-sm font-medium">Pincode</label>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={formData.pincode}
        onChange={handleChange("pincode")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
  </div>

  <div className="space-y-4">
    <div>
      <label className="block mb-1 text-sm font-medium">Full Address</label>
      <input
        type="text"
        placeholder="Enter Full Address"
        value={formData.address}
        onChange={handleChange("address")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Company Email</label>
      <input
        type="email"
        placeholder="Enter Company Email"
        value={formData.email}
        onChange={handleChange("email")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Company Phone Number</label>
      <input
        type="tel"
        placeholder="Enter Company Phone Number"
        value={formData.phone}
        onChange={handleChange("phone")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Website (optional)</label>
      <input
        type="text"
        placeholder="Enter Website"
        value={formData.website}
        onChange={handleChange("website")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium">Social Media Links (optional)</label>
      <input
        type="text"
        placeholder="Enter Social Media Links"
        value={formData.socialMedia}
        onChange={handleChange("socialMedia")}
        className="w-full px-4 py-3 rounded bg-gray-200 text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 outline-none"
      />
    </div>
  </div>

  {/* Hand and Next Button */}
  <div className="relative mt-8 flex justify-end items-center">
    <img
      src="/img-10-2.png"
      alt="Hand Pointer"
      className="absolute left-[200px] bottom-[-80px] w-28 h-28 z-10"
    />
    <button
      onClick={handleSubmit}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded transition-all duration-300 z-20"
    >
      Next
    </button>
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
