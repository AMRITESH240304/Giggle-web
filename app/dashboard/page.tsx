"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/appwrite"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  $id: string
  name: string
  email: string
}

interface UserProfile {
  userType: string
  firstName: string
  lastName: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        // You can fetch additional user profile data here if needed
        setUserProfile({
          userType: "gig-seeker", // This would come from your database
          firstName: currentUser.name.split(" ")[0] || "",
          lastName: currentUser.name.split(" ")[1] || "",
        })
        setLoading(false)
      } else {
        // If no user is logged in, redirect to login page
        router.push("/")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/")
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#201F1F] text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#201F1F]">Welcome to Gigapp Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-[#201F1F]">
            <CardHeader>
              <CardTitle className="text-[#201F1F]">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-[#9B9B9B]">
                  <span className="font-medium text-[#201F1F]">Name:</span> {user?.name}
                </p>
                <p className="text-[#9B9B9B]">
                  <span className="font-medium text-[#201F1F]">Email:</span> {user?.email}
                </p>
                <p className="text-[#9B9B9B]">
                  <span className="font-medium text-[#201F1F]">User Type:</span>{" "}
                  <span className="capitalize bg-[#E63946] text-white px-2 py-1 rounded text-sm">
                    {userProfile?.userType?.replace("-", " ")}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#201F1F]">
            <CardHeader>
              <CardTitle className="text-[#201F1F]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProfile?.userType === "gig-seeker" ? (
                  <>
                    <Button className="w-full bg-[#E63946] hover:bg-[#d12a37] text-white">Browse Available Gigs</Button>
                    <Button className="w-full bg-[#F9C74F] hover:bg-[#f7c142] text-[#201F1F]">Update Profile</Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full bg-[#E63946] hover:bg-[#d12a37] text-white">Post a New Gig</Button>
                    <Button className="w-full bg-[#F9C74F] hover:bg-[#f7c142] text-[#201F1F]">Manage My Gigs</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-[#201F1F]">
          <CardHeader>
            <CardTitle className="text-[#201F1F]">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#9B9B9B] mb-4">
              Welcome to Gigapp! You're now successfully authenticated and ready to start your gig journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#201F1F] rounded-lg">
                <h3 className="font-medium text-[#F1FAEE] mb-2">Step 1</h3>
                <p className="text-[#9B9B9B] text-sm">Complete your profile</p>
              </div>
              <div className="text-center p-4 bg-[#201F1F] rounded-lg">
                <h3 className="font-medium text-[#F1FAEE] mb-2">Step 2</h3>
                <p className="text-[#9B9B9B] text-sm">
                  {userProfile?.userType === "gig-seeker" ? "Browse gigs" : "Post your first gig"}
                </p>
              </div>
              <div className="text-center p-4 bg-[#201F1F] rounded-lg">
                <h3 className="font-medium text-[#F1FAEE] mb-2">Step 3</h3>
                <p className="text-[#9B9B9B] text-sm">Start connecting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
