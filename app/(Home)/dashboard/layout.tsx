"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg1.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 bg-black/70 backdrop-blur-sm z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Giggle Logo" 
              width={75} 
              height={75} 
              className="mr-4"
            />
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md w-full mx-4">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-transparent border border-gray-600 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:border-white transition-colors"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Image 
                  src="/search.png" 
                  alt="Search" 
                  width={20} 
                  height={20}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center text-white">
              <div className="mr-2">
                <Image 
                  src="/user.png" 
                  alt="User" 
                  width={24} 
                  height={24}
                  className="rounded-full"
                />
              </div>
              <span className="font-bold">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 relative z-0 mt-8">
        {children}
      </main>
    </div>
  );
}
