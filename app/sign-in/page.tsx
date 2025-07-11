"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import OverlayWrapper from "@/components/OverlayWrapper.tsx";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const auth = useAuth();
  const { user, loading, login, loginWithApple, loginWithGoogle } = auth;
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false)
    }
  }

  const handleAppleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await loginWithApple();
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OverlayWrapper>
      {/* Right Side Login Form */}
      <div className="w-full max-w-md bg-[#201F1F] rounded-3xl flex flex-col gap-8 justify-center items-center p-8 sm:p-10">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-bold text-[#E63946]">Welcome</h1>
          <h1 className="text-3xl font-bold text-[#F1FAEE]">Back!</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
          >
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-[80%] mx-auto"
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-[80%] mx-auto"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-bold rounded-md py-6 w-[65%] mt-2 mx-auto"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>

        <div className="flex items-center w-3/4">
          <div className="flex-1 h-[1px] bg-[#F1FAEE]"></div>
          <span className="px-4 text-[#F1FAEE] text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-[#F1FAEE]"></div>
        </div>

        <div className="w-full flex justify-center items-center gap-6">
          <button
            className="aspect-square w-[60px] sm:w-[75px] bg-[#4F4F4F]/50 border border-[#4F4F4F] rounded-[20px] flex items-center justify-center hover:bg-[#4F4F4F]/70"
            onClick={handleGoogleAuth}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={0}
              height={0}
              className="w-[24px] h-auto"
            />
          </button>

          <button
            className="aspect-square w-[60px] sm:w-[75px] bg-[#4F4F4F]/50 border border-[#4F4F4F] rounded-[20px] flex items-center justify-center hover:bg-[#4F4F4F]/70"
            onClick={handleAppleAuth}
          >
            <Image
              src="/apple.svg"
              alt="Apple"
              width={0}
              height={0}
              className="w-[24px] h-auto"
            />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-[#F1FAEE] text-sm">Not a member?</span>
          <button
            onClick={() => router.push("/sign-up")}
            className="text-[#E63946] text-sm font-medium hover:underline"
          >
            Register Now
          </button>
        </div>

        <div className="w-[134px] h-[5px] bg-white rounded-full"></div>
      </div>
    </OverlayWrapper>
  );

};

export default SignInPage;
