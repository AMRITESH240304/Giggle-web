"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { authService } from "@/lib/appwrite"
import { useRouter } from "next/navigation"

import LoadingScreen from "@/components/ui/LoadingScreen"

export default function AuthPage() {
  const [userType, setUserType] = useState("gig-seeker")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Check if user is already authenticated on page load
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated()
        if (isAuth) {
          router.push("/dashboard")
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkExistingAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await authService.login(email, password)
      setSuccess("Login successful! Redirecting...")

      // Small delay to show success message, then redirect
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("signupEmail") as string
    const password = formData.get("signupPassword") as string
    const fullName = `${firstName} ${lastName}`

    try {
      // Create account
      await authService.createAccount(email, password, fullName)

      // Login the user
      await authService.login(email, password)

      setSuccess("Account created successfully! Redirecting...")

      // Small delay to show success message, then redirect based on user type
      setTimeout(() => {
        if (userType === "gig-seeker") {
          router.push("/onboarding")
        } else {
          router.push("/dashboard")
        }
      }, 1000)
    } catch (error: any) {
      setError(error.message || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <LoadingScreen message="Checking Authentication" />
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo */}
      <div className="flex-1 flex items-center justify-center bg-[#201F1F] p-8">
        <div className="text-center">
          <Image src="/logo.png" alt="Gigapp Logo" width={300} height={200} className="mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-[#F1FAEE] mb-4">Welcome to Gigapp</h1>
          <p className="text-[#9B9B9B] text-lg max-w-md">
            Connect gig seekers with gig providers in one seamless platform
          </p>
        </div>
      </div>

      {/* Right Side - Authentication */}
      <div className="flex-1 flex items-center justify-center bg-[#F1FAEE] p-8">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#201F1F]">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-[#E63946] data-[state=active]:text-white text-[#9B9B9B]"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-[#E63946] data-[state=active]:text-white text-[#9B9B9B]"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-[#201F1F] shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#201F1F]">Welcome Back</CardTitle>
                  <CardDescription className="text-[#9B9B9B]">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#201F1F]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#201F1F]">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#E63946] hover:bg-[#d12a37] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-600 text-sm">{success}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-[#201F1F] shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#201F1F]">Create Account</CardTitle>
                  <CardDescription className="text-[#9B9B9B]">
                    Join our platform and start your gig journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#201F1F]">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#201F1F]">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail" className="text-[#201F1F]">
                        Email
                      </Label>
                      <Input
                        id="signupEmail"
                        name="signupEmail"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword" className="text-[#201F1F]">
                        Password
                      </Label>
                      <Input
                        id="signupPassword"
                        name="signupPassword"
                        type="password"
                        placeholder="Create a strong password"
                        required
                        className="border-[#9B9B9B] focus:border-[#E63946] focus:ring-[#E63946]"
                      />
                    </div>

                    {/* User Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-[#201F1F] font-medium">I am a:</Label>
                      <RadioGroup value={userType} onValueChange={setUserType}>
                        <div className="flex items-center space-x-2 p-3 border border-[#9B9B9B] rounded-md hover:border-[#E63946] transition-colors">
                          <RadioGroupItem value="gig-seeker" id="gig-seeker" className="text-[#E63946]" />
                          <Label htmlFor="gig-seeker" className="flex-1 cursor-pointer text-[#201F1F]">
                            <div className="font-medium">Gig Seeker</div>
                            <div className="text-sm text-[#9B9B9B]">Looking for freelance opportunities</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-[#9B9B9B] rounded-md hover:border-[#E63946] transition-colors">
                          <RadioGroupItem value="gig-provider" id="gig-provider" className="text-[#E63946]" />
                          <Label htmlFor="gig-provider" className="flex-1 cursor-pointer text-[#201F1F]">
                            <div className="font-medium">Gig Provider</div>
                            <div className="text-sm text-[#9B9B9B]">Offering freelance projects</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#E63946] hover:bg-[#d12a37] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-600 text-sm">{success}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
