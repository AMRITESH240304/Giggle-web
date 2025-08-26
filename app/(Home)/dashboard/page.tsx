"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import GradeCard from "@/components/dashboard/GradeCard";
import JobListings from "@/components/dashboard/JobListings";

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* FLN Grade Card */}
      <div className="mb-8 max-w-4xl mx-auto">
        <GradeCard 
          grade="G+" 
          lastUpdate="Saturday, 26 Oct" 
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Listings Section - Takes 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <JobListings />
        </div>
        
        {/* Sidebar content - Takes 1/3 of the space on large screens */}
        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-3">Recent Activity</h2>
            <p className="text-gray-400">No recent activity to show.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-3">Quick Stats</h2>
            <p className="text-gray-400">Your statistics will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
