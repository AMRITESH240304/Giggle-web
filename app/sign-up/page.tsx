"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import OverlayWrapper from "@/components/OverlayWrapper.tsx";
import { loginWithApple, loginWithGoogle } from "@/lib/appwrite";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    let feedback = "";

    if (score <= 2) {
      feedback = "Weak";
    } else if (score <= 3) {
      feedback = "Fair";
    } else if (score <= 4) {
      feedback = "Good";
    } else {
      feedback = "Strong";
    }

    setPasswordStrength({ score, feedback, checks });
  };

  // Handle password change
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    checkPasswordStrength(value);
  };

  const auth = useAuth();
  const { user, loading, register } = auth;
  const sendVerificationEmail = auth?.sendVerificationEmail;

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password || !confirmPassword || !name) {
      const errorMsg = "Please fill in all fields";
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      const errorMsg = "Passwords do not match";
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    // Check password strength
    if (passwordStrength.score < 3) {
      const errorMsg = "Please create a stronger password with at least 3 of the required criteria";
      setError(errorMsg);
      toast({
        title: "Weak Password",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);

      // Send verification email
      if (sendVerificationEmail) {
        const verificationUrl = `${window.location.origin}/verify-email`;
        await sendVerificationEmail(verificationUrl);
      }

      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });
      router.push("/verify-email");
    } catch (error: any) {
      console.error("Sign up error:", error);
      const errorMessage = error?.message || "Failed to create account. Please try again.";
      
      // Log the full error for debugging
      console.log("Full error object:", error);
      console.log("Error message:", errorMessage);
      console.log("Error code:", error.code);
      console.log("Error type:", error.type);
      
      // Show different toast messages based on error type or code
      if (error.code === 409 || (errorMessage.toLowerCase().includes("user") && errorMessage.toLowerCase().includes("already"))) {
        const userExistsMsg = "User already exists. An account with this email already exists. Please try signing in instead.";
        setError(userExistsMsg);
        toast({
          title: "User Already Exists",
          description: "An account with this email already exists. Please try signing in instead.",
          variant: "destructive",
        });
      } else if (error.code === 401 || errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("credential")) {
        const invalidCredsMsg = "Invalid credentials. Please check your email and password and try again.";
        setError(invalidCredsMsg);
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
      } else if (error.code === 412 || (errorMessage.toLowerCase().includes("provider") && errorMessage.toLowerCase().includes("disabled"))) {
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
        const genericErrorMsg = `Signup failed: ${errorMessage}${error.code ? ` (Code: ${error.code})` : ''}`;
        setError(genericErrorMsg);
        toast({
          title: "Sign Up Failed",
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
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white text-[#201F1F] py-6 px-8 rounded-2xl w-full font-sf-pro-text placeholder:text-gray-500"
              autoComplete="name"
              required
            />
            
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 pr-12 rounded-2xl w-full font-sf-pro-text placeholder:text-gray-500"
                autoComplete="new-password"
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
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.score <= 2 ? 'bg-red-500' :
                        passwordStrength.score <= 3 ? 'bg-yellow-500' :
                        passwordStrength.score <= 4 ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    passwordStrength.score <= 2 ? 'text-red-500' :
                    passwordStrength.score <= 3 ? 'text-yellow-500' :
                    passwordStrength.score <= 4 ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {passwordStrength.feedback}
                  </span>
                </div>
                
                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    Uppercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    Lowercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    Number
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    Special character
                  </div>
                </div>
              </div>
            )}
            
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white text-[#201F1F] py-6 px-8 pr-12 rounded-2xl w-full font-sf-pro-text placeholder:text-gray-500"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
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
              {isLoading ? "SIGNING UP..." : "SIGN UP"}
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
          <span className="text-[#F1FAEE] text-sm font-sf-pro-text">
            Already a member?
          </span>
          <button
            onClick={() => router.push("/sign-in")}
            className="text-[#E63946] text-sm font-sf-pro-text font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </OverlayWrapper>
  );
};

export default SignUpPage;
