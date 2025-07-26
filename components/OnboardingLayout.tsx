"use client";

import React from "react";
import Image from "next/image";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-50 bg-gray-900 overflow-hidden">
      {/* Background with geometric patterns */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/bg1.png"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Geometric line patterns and decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right pointing hand - positioned on diagonal from modal center */}
        <div className="absolute top-2 right-0 z-30">
          <div className="transform rotate-[180deg]">
            <Image
              src="/img-8-1.png"
              alt="Pointing Hand"
              width={450}
              height={160}
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom left pointing hand - positioned on diagonal from modal center */}
        <div className="absolute bottom-2 left-30  z-30">
          <div className="transform rotate-[0deg]">
            <Image
              src="/img-8-1.png"
              alt="Pointing Hand"
              width={450}
              height={350}
              className="object-contain"
            />
          </div>
        </div>

        {/* Pink connecting bands/lines from hands to modal center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-25">
          <div className="absolute -top-32 -right-32 w-64 h-4 bg-gradient-to-br from-pink-400 to-transparent opacity-60 transform rotate-45"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-4 bg-gradient-to-tl from-pink-400 to-transparent opacity-60 transform rotate-45"></div>
        </div>

        {/* Red geometric lines and shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 720" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top left triangular lines */}
          <path d="M50 150 L150 50 M50 200 L200 50 M50 250 L250 50" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
          
          {/* Curved lines */}
          <path d="M0 400 Q200 300 400 400 T800 350" stroke="#DC2626" strokeWidth="1" opacity="0.4" fill="none"/>
          <path d="M200 600 Q400 500 600 600 T1000 550" stroke="#DC2626" strokeWidth="1" opacity="0.4" fill="none"/>
          
          {/* Diagonal grid lines */}
          <defs>
            <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M0,40 L40,0" stroke="#DC2626" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)"/>
          
          {/* Bottom right angular lines */}
          <path d="M900 600 L1000 500 M950 650 L1050 550 M1000 700 L1100 600" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
        </svg>

        {/* Star decorations */}
        <div className="absolute top-24 left-48">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#DC2626" opacity="0.8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="absolute top-80 right-32">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#DC2626" opacity="0.7">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-32">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC2626" opacity="0.6">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-48 right-48">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#DC2626" opacity="0.8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>

        {/* Small dots */}
        <div className="absolute top-16 left-1/3 w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full opacity-50"></div>
        <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Modal-like container */}
        <div className="bg-gray-800/100 backdrop-blur-sm rounded-3xl py-24 px-16 max-w-4xl w-full text-center shadow-2xl border border-gray-700/50">{/* Logo */}
          <div className="mb-16">
            <Image
              src="/logo.png"
              alt="Giggle Logo"
              width={180}
              height={70}
              className="mx-auto"
              priority
            />
          </div>

          {/* Content slot */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
