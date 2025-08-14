"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="relative h-full flex">
      <div className="relative flex items-center justify-between w-full h-full ml-44">
        {/* Left Text Section */}
        <div className="w-[50%] flex flex-col gap-y-7 text-[#fff] text-6xl font-bold z-2 mr-10">
          <p>Build a</p>
          <p>profile</p>
          <p>seekers</p>
          <p>can rely on</p>
        </div>

                 {/* Form Section */}
         <div className=" w-full">
                       {/* The form card */}
            <div className="bg-[#ffffff11] w-[60%] text-[#fff] font-medium text-lg py-10 px-16 rounded-3xl z-10">
             <form onSubmit={handleSubmit} className="gap-y-2 flex flex-col">
               <p>Name</p>
               <Input
                 type="text"
                 placeholder="Enter Name"
                 value={formData.name}
                 onChange={handleInputChange("name")}
                 className="bg-[#fff] mb-3"
               />

               <p>Phone Number</p>
               <Input
                 type="text"
                 placeholder="Enter Phone Number"
                 value={formData.phoneNumber}
                 onChange={handleInputChange("phoneNumber")}
                 className="bg-[#fff] mb-3"
               />

               <p>Enter OTP</p>
               <Input
                 type="text"
                 placeholder="Enter OTP"
                 value={formData.otp}
                 onChange={handleInputChange("otp")}
                 className="bg-[#fff] mb-3"
               />

               <p>
                 Role Title{" "}
                 <span className="text-gray-400 italic">(Optional)</span>
               </p>
               <Input
                 type="text"
                 placeholder="Enter Role"
                 value={formData.roleTitle}
                 onChange={handleInputChange("roleTitle")}
                 className="bg-[#fff] mb-6"
               />

               <div className="flex w-full justify-end">
                 <Button type="submit" className="bg-red-500 w-fit">
                   Next
                 </Button>
               </div>
             </form>
           </div>

           {/* The hand image, positioned to match the original design */}
           <div className="absolute -right-16 top-0 z-0 w-[1000px] h-[1000px]">
             <Image
               src="/curl-hand.svg"
               alt="3D Hand"
               fill
               className="object-contain"
             />
           </div>
         </div>
      </div>
    </div>
  );
};

export default ProfileBuilderPage;
