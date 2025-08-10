"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { logout } from "@/lib/appwrite";

const VerifyEmailContent = ({email}:{email:string}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasParams, setHasParams] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const auth = useAuth();
  const verifyEmail = auth?.verifyEmail;
  const sendVerificationEmail = auth?.sendVerificationEmail;
  const {user} = useAuth()

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    if (userId && secret) {
      setHasParams(true);
      handleVerification();
    }
  }, [userId, secret]);

  const handleVerification = async () => {
    if (!userId || !secret) return;

    setIsVerifying(true);
    try {
      await verifyEmail(userId, secret);
      setIsVerified(true);
      toast({
        title: "Success",
        description: "Email verified successfully!",
      });
      // Redirect to user type selection instead of dashboard
      setTimeout(() => {
        router.push("/user-type");
      }, 1000);
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Failed",
        description: error?.message || "Failed to verify email",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // router.push("/sign-up");
      window.location.href = "/sign-up"
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      const verificationUrl = `${window.location.origin}/verify-email`;
      await sendVerificationEmail(verificationUrl);
      toast({
        title: "Success",
        description: "Verification email sent!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to send verification email",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    router.push("/user-type");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full text-center">
      {hasParams ? (
        isVerifying ? (
          <div className="text-[#F1FAEE]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E63946] mx-auto mb-4"></div>
            <p>Verifying your email...</p>
          </div>
        ) : isVerified ? (
          <div className="text-[#F1FAEE]">
            <p className="text-lg mb-6">
              Your email has been verified successfully!
            </p>
            <Button
              onClick={handleContinue}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-bold rounded-md py-3 px-8"
            >
              Continue to Dashboard
            </Button>
          </div>
        ) : (
          <div className="text-[#F1FAEE]">
            <p>Verification failed. Please try again.</p>
            <Button
              onClick={handleResendVerification}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-bold rounded-md py-3 px-8 mt-4"
            >
              Resend Verification
            </Button>
          </div>
        )
      ) : (
        <div className="text-[#F1FAEE]">
          <p className="text-lg mb-4">Check your email</p>
          <p className="bg-[#262628a4] mt-2 mb-3 py-2 font-bold text-lg shadow-md">
            {email}
          </p>
          <p className="text-sm text-gray-400 mb-6">
            We've sent you a verification link. Please check your email and
            click the link to verify your account.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleResendVerification}
              className="bg-[#E63946] hover:bg-[#d32f2f] text-white font-bold rounded-md py-3 px-8"
            >
              Resend Verification Email
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white font-bold rounded-md py-3 px-8"
            >
              Change Account (Logout)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const VerifyEmailPage = () => {
  const {user} = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (user?.emailVerification){
      router.push("/dashboard")
    }
  })
  

  if(user){
    return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-center gap-24 h-screen">
        {/* Left Side Logo */}
        <Image
          src="/logo.png"
          alt="Giggle Logo"
          width={0}
          height={0}
          className="w-[396px] h-auto"
        />

        {/* Right Side Verification Form */}
        <div className="w-[463px] h-[573px] bg-[#201F1F] rounded-3xl flex flex-col gap-6 justify-center items-center p-10">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-3xl font-bold text-[#E63946]">Verify</h1>
            <h1 className="text-3xl font-bold text-[#F1FAEE]">Email</h1>
          </div>

          <Suspense fallback={<div className="text-[#F1FAEE]">Loading...</div>}>
            <VerifyEmailContent email={user?.email}/>
          </Suspense>
        </div>
      </div>
    </div>
  )
};
};

export default VerifyEmailPage;
