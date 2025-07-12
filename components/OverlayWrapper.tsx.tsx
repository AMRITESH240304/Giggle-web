import Image from "next/image";
import { ReactNode } from "react";

interface OverlayWrapperProps {
  children: ReactNode;
}

const OverlayWrapper = ({ children }: OverlayWrapperProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 md:gap-12 lg:gap-20">
        {/* Left Side Logo */}
        <div className="flex justify-center w-full md:w-1/2">
          <div className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-[396px]">
            <Image
              src="/logo.svg"
              alt="Giggle Logo"
              width={0}
              height={0}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default OverlayWrapper;