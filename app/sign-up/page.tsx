"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import OverlayWrapper from "@/components/OverlayWrapper.tsx";
import { loginWithApple, loginWithGoogle } from "@/lib/appwrite";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const auth = useAuth();
  const { user, loading, register } = auth;
  const sendVerificationEmail = auth?.sendVerificationEmail;
  // useEffect(()=>{
  //   if (!user?.emailVerification){
  //     router.push(`/verify-email`)
  //   }
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);

      const verificationUrl = `${window.location.origin}/verify-email`;

      await sendVerificationEmail(verificationUrl);

      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      router.push("/verify-email");
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign Up Failed",
        description: error?.message || "Failed to create account",
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
      {/* Right Side Sign Up Form */}
      <div className="w-full max-w-md bg-[#201F1F] rounded-3xl flex flex-col gap-6 justify-center items-center p-8 sm:p-10">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-sf-pro-display font-bold text-[#E63946]">Create</h1>
          <h1 className="text-3xl font-sf-pro-display font-bold text-[#F1FAEE]">Account</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
          >
            <div className="w-[80%] mx-auto">
              <label htmlFor="name" className="block text-[#F1FAEE] text-sm font-sf-pro-text font-medium mb-2 ml-2">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text"
                autoComplete="name"
                required
              />
            </div>
            
            <div className="w-[80%] mx-auto">
              <label htmlFor="email" className="block text-[#F1FAEE] text-sm font-sf-pro-text font-medium mb-2 ml-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text"
                autoComplete="email"
                required
              />
            </div>
            
            <div className="w-[80%] mx-auto">
              <label htmlFor="password" className="block text-[#F1FAEE] text-sm font-sf-pro-text font-medium mb-2 ml-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text"
                autoComplete="new-password"
                required
              />
            </div>
            
            <div className="w-[80%] mx-auto">
              <label htmlFor="confirmPassword" className="block text-[#F1FAEE] text-sm font-sf-pro-text font-medium mb-2 ml-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text"
                autoComplete="new-password"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-sf-pro-text font-bold rounded-md py-6 w-[65%] mt-2 mx-auto"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </div>

        <div className="flex items-center w-3/4">
          <div className="flex-1 h-[1px] bg-[#F1FAEE]"></div>
          <span className="px-4 text-[#F1FAEE] text-sm font-sf-pro-text">OR</span>
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
          <span className="text-[#F1FAEE] text-sm font-sf-pro-text">
            Already have an account?
          </span>
          <button
            onClick={() => router.push("/sign-in")}
            className="text-[#E63946] text-sm font-sf-pro-text font-medium hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </OverlayWrapper>
  );
};

export default SignUpPage;
