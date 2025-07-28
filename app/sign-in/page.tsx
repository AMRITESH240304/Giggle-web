"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import OverlayWrapper from "@/components/OverlayWrapper.tsx";
import { Eye, EyeOff } from "lucide-react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state for clearing
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  const auth = useAuth();
  const { user, loading, login, loginWithApple, loginWithGoogle } = auth;
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/user-type");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      const errorMsg = "Please fill in all fields";
      setError(errorMsg);
      console.log("Showing validation toast"); // Debug log
      toast({
        title: "🚨 Validation Error",
        description: errorMsg,
        variant: "destructive",
        duration: 8000, // Make it stay longer for testing
        className: "bg-red-500 text-white border-red-600 shadow-2xl z-[9999]",
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
      router.push("/user-type"); // Redirect to user type selection after login
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || "Login failed. Please try again.";
      
      // Log the full error for debugging
      console.log("Full error object:", error);
      console.log("Error message:", errorMessage);
      console.log("Error code:", error.code);
      console.log("Error type:", error.type);
      
      // Show different error messages based on error type or code
      if (error.code === 401 || errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("wrong") || errorMessage.toLowerCase().includes("incorrect") || errorMessage.toLowerCase().includes("credential")) {
        const invalidCredsMsg = "Invalid credentials. Please check your email and password and try again.";
        setError(invalidCredsMsg);
        console.log("Showing invalid credentials toast"); // Debug log
        toast({
          title: "Invalid Credentials",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
      } else if (error.code === 404 || errorMessage.toLowerCase().includes("user") && errorMessage.toLowerCase().includes("not found")) {
        const userNotFoundMsg = "User not found. Please check your email or sign up for a new account.";
        setError(userNotFoundMsg);
        toast({
          title: "User Not Found",
          description: "No account found with this email. Please check your email or sign up.",
          variant: "destructive",
        });
      } else if (error.code === 429 || errorMessage.toLowerCase().includes("too many")) {
        const tooManyAttemptsMsg = "Too many login attempts. Please wait a moment before trying again.";
        setError(tooManyAttemptsMsg);
        toast({
          title: "Too Many Attempts",
          description: "Please wait a moment before trying again.",
          variant: "destructive",
        });
      } else if (error.code === 412 || errorMessage.toLowerCase().includes("provider") && errorMessage.toLowerCase().includes("disabled")) {
        const serviceUnavailableMsg = "Service unavailable. Email login is currently disabled.";
        setError(serviceUnavailableMsg);
        toast({
          title: "Service Unavailable",
          description: "Email login is currently disabled. Please contact support.",
          variant: "destructive",
        });
      } else {
        const genericErrorMsg = `Login failed: ${errorMessage}${error.code ? ` (Code: ${error.code})` : ''}`;
        setError(genericErrorMsg);
        toast({
          title: "Login Failed",
          description: `${errorMessage}${error.code ? ` (Code: ${error.code})` : ''}`,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(""); // Clear previous errors
    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMsg = "Google authentication failed. Please try again.";
      setError(errorMsg);
      toast({
        title: "Authentication Failed",
        description: error?.message || errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false)
    }
  }

  const handleAppleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(""); // Clear previous errors
    try {
      await loginWithApple();
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMsg = "Apple authentication failed. Please try again.";
      setError(errorMsg);
      toast({
        title: "Authentication Failed",
        description: error?.message || errorMsg,
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
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-sf-pro-display font-bold text-[#E63946]">Welcome</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 w-full">
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
              className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text placeholder:text-gray-500"
              autoComplete="email"
              required
            />
            
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 pr-12 rounded-2xl w-full font-sf-pro-text placeholder:text-gray-500"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-sf-pro-text font-bold rounded-2xl py-6 w-full mt-4 text-lg"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </form>
        </div>

        <div className="flex items-center w-full px-4">
          <div className="flex-1 h-[1px] bg-[#F1FAEE]"></div>
          <span className="px-6 text-[#F1FAEE] text-sm font-sf-pro-text">OR</span>
          <div className="flex-1 h-[1px] bg-[#F1FAEE]"></div>
        </div>

        <div className="w-full flex justify-center items-center gap-8">
          <button
            className="w-16 h-16 bg-[#4F4F4F] rounded-2xl flex items-center justify-center hover:bg-[#5F5F5F] transition-colors"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          <button
            className="w-16 h-16 bg-[#4F4F4F] rounded-2xl flex items-center justify-center hover:bg-[#5F5F5F] transition-colors"
            onClick={handleAppleAuth}
            disabled={isLoading}
          >
            <Image
              src="/apple.svg"
              alt="Apple"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-[#F1FAEE] text-sm font-sf-pro-text">Not a member?</span>
          <button
            onClick={() => router.push("/sign-up")}
            className="text-[#E63946] text-sm font-sf-pro-text font-medium hover:underline"
          >
            Register Now
          </button>
        </div>
      </div>
    </OverlayWrapper>
  );

};

export default SignInPage;
