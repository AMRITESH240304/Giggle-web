"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";

export default function LandingPage() {
  const auth = useAuth();
  const router = useRouter();
  //done 

  if (!auth) {
    return <LoadingScreen message="Initializing..." />;
  }

  const { user, loading } = auth;

  useEffect(() => {
    console.log("loading", loading);
    console.log("user", user);

    if (!loading && user) {
      console.log("redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  if (loading || user) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to Giggle
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => router.push("/sign-in")}
            className="bg-white text-[#201F1F] px-8 py-3 text-lg font-semibold hover:text-white "
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-white text-[#201F1F] px-8 py-3 text-lg font-semibold hover:text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
