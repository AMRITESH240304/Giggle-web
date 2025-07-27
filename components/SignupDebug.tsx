"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function SignupDebug() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Test User");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();
  const { toast } = useToast();

  const handleTestSignup = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Starting signup test...");
      await register(email, password, name);
      setSuccess("Signup successful!");
      console.log("Signup completed successfully");
      
      // Show success toast
      toast({
        title: "Success!",
        description: "Account created successfully!",
        variant: "default",
      });
      
    } catch (err: any) {
      console.error("Signup error:", err);
      const errorMessage = err.message || "Signup failed";
      setError(errorMessage);
      
      // Log the full error for debugging
      console.log("Full error object:", err);
      console.log("Error message:", errorMessage);
      console.log("Error code:", err.code);
      console.log("Error type:", err.type);
      
      // Show different toast messages based on error type or code
      if (err.code === 409 || errorMessage.toLowerCase().includes("user") && errorMessage.toLowerCase().includes("already")) {
        const userExistsMsg = "User already exists. An account with this email already exists. Please try signing in instead.";
        setError(userExistsMsg);
        toast({
          title: "User Already Exists",
          description: "An account with this email already exists. Please try signing in instead.",
          variant: "destructive",
        });
      } else if (err.code === 401 || errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("credential")) {
        const invalidCredsMsg = "Invalid credentials. Please check your email and password and try again.";
        setError(invalidCredsMsg);
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
      } else if (err.code === 412 || errorMessage.toLowerCase().includes("provider") && errorMessage.toLowerCase().includes("disabled")) {
        const serviceUnavailableMsg = "Service unavailable. Email signup is currently disabled. Please enable it in Appwrite console.";
        setError(serviceUnavailableMsg);
        toast({
          title: "Service Unavailable",
          description: "Email signup is currently disabled. Please enable it in Appwrite console.",
          variant: "destructive",
        });
      } else if (errorMessage.toLowerCase().includes("password")) {
        const passwordErrorMsg = "Password error. Password must be at least 8 characters long and meet security requirements.";
        setError(passwordErrorMsg);
        toast({
          title: "Password Error",
          description: "Password must be at least 8 characters long and meet security requirements.",
          variant: "destructive",
        });
      } else if (errorMessage.toLowerCase().includes("email")) {
        const emailErrorMsg = "Email error. Please enter a valid email address.";
        setError(emailErrorMsg);
        toast({
          title: "Email Error",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      } else {
        const genericErrorMsg = `Signup failed: ${errorMessage} (Code: ${err.code || 'Unknown'})`;
        setError(genericErrorMsg);
        toast({
          title: "Signup Failed",
          description: `${errorMessage} (Code: ${err.code || 'Unknown'})`,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white text-black rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Signup Debug Test</h2>
      
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <button
          onClick={handleTestSignup}
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? "Testing..." : "Test Signup"}
        </button>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Signup Error
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Success!
                </h3>
                <div className="mt-1 text-sm text-green-700">
                  {success}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
