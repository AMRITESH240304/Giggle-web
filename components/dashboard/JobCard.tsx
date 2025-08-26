"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  id: string | number;
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  experience: string;
  postedTime: string;
  isEarlyApplicant?: boolean;
}

const JobCard = ({
  id,
  companyLogo,
  jobTitle,
  companyName,
  location,
  salary,
  experience,
  postedTime,
  isEarlyApplicant = false,
}: JobCardProps) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/dashboard/job/${id}`);
  };
  
  return (
    <div 
      className="bg-gray-800/90 rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-black/20"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex items-start">
          {/* Company Logo */}
          <div className="mr-4">
            <div className="rounded-full overflow-hidden h-14 w-14 bg-white flex items-center justify-center p-2">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={companyName}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <div className="text-2xl font-bold text-gray-400">
                  {companyName.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{jobTitle}</h3>
            <p className="text-gray-300 mb-3">{companyName}</p>
            
            {/* Job Metadata */}
            <div className="flex flex-wrap gap-y-2 mb-4 text-sm">
              {/* Location */}
              <div className="flex items-center mr-4 text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>

              {/* Salary */}
              <div className="flex items-center mr-4 text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{salary}</span>
              </div>

              {/* Experience */}
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{experience}</span>
              </div>
            </div>

            {/* Posted Time & Early Applicant */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center bg-red-900/40 text-red-300 text-xs rounded-full py-1 px-3">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>posted {postedTime}</span>
              </div>
              
              {isEarlyApplicant && (
                <div className="inline-flex items-center bg-yellow-900/40 text-yellow-300 text-xs rounded-full py-1 px-3">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Be an early applicant</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
