"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter,usePathname } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl text-white font-bold">Dashboard</h1>
        {user && (
          <p className="text-white text-lg">
            Welcome, {user.name || user.email}!
          </p>
        )}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
