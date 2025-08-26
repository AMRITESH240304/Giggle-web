"use client";

import React from "react";
import JobCard from "./JobCard";

const DUMMY_JOBS = [
  {
    id: "1",
    companyLogo: "/google.svg", // Using Google's logo as a placeholder
    jobTitle: "UI/UX Designer",
    companyName: "Google inc",
    location: "Bangalore",
    salary: "₹3,60,000 - 7,20,000",
    experience: "0 year(s)",
    postedTime: "1 day ago",
    isEarlyApplicant: true,
  },
  {
    id: "2",
    companyLogo: "/google.svg", // Using Google's logo as a placeholder
    jobTitle: "UI/UX Designer",
    companyName: "Google inc",
    location: "California, USA",
    salary: "₹3,60,000 - 7,20,000",
    experience: "0 year(s)",
    postedTime: "1 day ago",
    isEarlyApplicant: true,
  },
  {
    id: "3",
    companyLogo: "/apple.svg",
    jobTitle: "Frontend Developer",
    companyName: "Apple Inc",
    location: "Remote",
    salary: "₹5,00,000 - 10,00,000",
    experience: "2 year(s)",
    postedTime: "3 days ago",
    isEarlyApplicant: false,
  }
];

const JobListings = () => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white">Recent Job Openings</h2>
        <button className="text-blue-400 hover:underline text-sm">View All</button>
      </div>
      
      <div className="space-y-4">
        {DUMMY_JOBS.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            companyLogo={job.companyLogo}
            jobTitle={job.jobTitle}
            companyName={job.companyName}
            location={job.location}
            salary={job.salary}
            experience={job.experience}
            postedTime={job.postedTime}
            isEarlyApplicant={job.isEarlyApplicant}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
