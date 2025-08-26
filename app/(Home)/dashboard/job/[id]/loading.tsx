import React from "react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Back button */}
        <div className="h-6 w-24 bg-gray-700 rounded mb-6"></div>
        
        {/* Job header */}
        <div className="bg-gray-800/90 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="rounded-full h-16 w-16 bg-gray-700 mb-4 md:mb-0 md:mr-6"></div>
            
            <div className="flex-1">
              <div className="h-8 bg-gray-700 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-700 rounded w-20"></div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-700 rounded-full w-28"></div>
                <div className="h-6 bg-gray-700 rounded-full w-36"></div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="h-10 bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        </div>
        
        {/* Job details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/90 rounded-xl p-6">
              <div className="h-7 bg-gray-700 rounded w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            </div>
            
            <div className="bg-gray-800/90 rounded-xl p-6">
              <div className="h-7 bg-gray-700 rounded w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800/90 rounded-xl p-6">
              <div className="h-7 bg-gray-700 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            </div>
            
            <div className="bg-gray-800/90 rounded-xl p-6">
              <div className="h-10 bg-gray-700 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
