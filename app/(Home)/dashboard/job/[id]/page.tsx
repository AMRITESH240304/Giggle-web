"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define job interface
interface Job {
  id: string;
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  experience: string;
  postedTime: string;
  isEarlyApplicant: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
}

// Placeholder job data - in a real app, this would come from an API or database
const JOB_DATA: Record<string, Job> = {
  "1": {
    id: "1",
    companyLogo: "/google.svg",
    jobTitle: "UI/UX Designer",
    companyName: "Google inc",
    location: "Bangalore",
    salary: "₹3,60,000 - 7,20,000",
    experience: "0 year(s)",
    postedTime: "1 day ago",
    isEarlyApplicant: true,
    description: "We're looking for a UI/UX Designer to join our team in Bangalore. You'll be responsible for creating intuitive and engaging user experiences for our products.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "Understanding of UI/UX principles and best practices",
      "Portfolio demonstrating strong visual design skills",
      "Experience with design tools like Figma or Sketch",
      "Knowledge of user research methodologies"
    ],
    benefits: [
      "Competitive salary and benefits",
      "Flexible work schedule",
      "Opportunity to work on high-impact projects",
      "Professional development opportunities"
    ]
  },
  "2": {
    id: "2",
    companyLogo: "/google.svg",
    jobTitle: "UI/UX Designer",
    companyName: "Google inc",
    location: "California, USA",
    salary: "₹3,60,000 - 7,20,000",
    experience: "0 year(s)",
    postedTime: "1 day ago",
    isEarlyApplicant: true,
    description: "We're looking for a UI/UX Designer to join our team in California. You'll be responsible for creating intuitive and engaging user experiences for our products.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "Understanding of UI/UX principles and best practices",
      "Portfolio demonstrating strong visual design skills",
      "Experience with design tools like Figma or Sketch",
      "Knowledge of user research methodologies"
    ],
    benefits: [
      "Competitive salary and benefits",
      "Flexible work schedule",
      "Opportunity to work on high-impact projects",
      "Professional development opportunities"
    ]
  },
  "3": {
    id: "3",
    companyLogo: "/apple.svg",
    jobTitle: "Frontend Developer",
    companyName: "Apple Inc",
    location: "Remote",
    salary: "₹5,00,000 - 10,00,000",
    experience: "2 year(s)",
    postedTime: "3 days ago",
    isEarlyApplicant: false,
    description: "We're seeking a skilled Frontend Developer to join our remote team. You'll be responsible for implementing user interfaces using modern web technologies.",
    requirements: [
      "2+ years of experience with JavaScript and modern frameworks",
      "Proficiency in HTML5, CSS3, and responsive design",
      "Experience with React, Vue, or similar frameworks",
      "Understanding of REST APIs and asynchronous request handling",
      "Familiarity with version control systems (Git)"
    ],
    benefits: [
      "Competitive salary and benefits",
      "Remote work flexibility",
      "Latest hardware and software tools",
      "Professional development budget",
      "Health and wellness programs"
    ]
  }
};

const JobDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  // Get job data or handle not found case
  const job = JOB_DATA[jobId];
  
  if (!job) {
    // Job not found, redirect to not found page
    React.useEffect(() => {
      router.replace('/dashboard/job/not-found');
    }, [router]);
    return <div className="p-8 text-center text-white">Job not found. Redirecting...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-300 hover:text-white mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Jobs
      </button>
      
      {/* Job header */}
      <div className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700/50 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="rounded-full overflow-hidden h-16 w-16 bg-white flex items-center justify-center p-2 mb-4 md:mb-0 md:mr-6">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo}
                alt={job.companyName}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <div className="text-3xl font-bold text-gray-400">
                {job.companyName.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{job.jobTitle}</h1>
            <p className="text-xl text-gray-300 mb-2">{job.companyName}</p>
            
            <div className="flex flex-wrap gap-y-2 mb-4">
              {/* Location */}
              <div className="flex items-center mr-4 text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>

              {/* Salary */}
              <div className="flex items-center mr-4 text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.salary}</span>
              </div>

              {/* Experience */}
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.experience}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center bg-red-900/40 text-red-300 text-xs rounded-full py-1 px-3">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>posted {job.postedTime}</span>
              </div>
              
              {job.isEarlyApplicant && (
                <div className="inline-flex items-center bg-yellow-900/40 text-yellow-300 text-xs rounded-full py-1 px-3">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Be an early applicant</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Job details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
            <p className="text-gray-300">{job.description}</p>
          </div>
          
          {/* Requirements */}
          <div className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Benefits */}
          <div className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Benefits</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          
          {/* Apply button */}
          <div className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700/50 p-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Apply Now
            </Button>
            <p className="mt-3 text-center text-gray-400 text-sm">
              Application takes less than 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
