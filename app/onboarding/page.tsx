"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { authService } from "@/lib/appwrite"

// Sample suggested skills
const suggestedSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "UI/UX Design",
  "Content Writing",
  "Digital Marketing",
  "Graphic Design",
  "Python",
  "Data Analysis",
  "Project Management",
  "SEO",
  "Social Media Management",
]

// Education levels
const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certification",
  "Vocational Training",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    // Personal Info
    phone: "",
    dateOfBirth: null as Date | null,

    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Education
    isPursuing: "yes",
    educationLevel: "",
    degree: "",
    specialization: "",
    completionYear: "",
    university: "",

    // Skills
    skills: [] as string[],

    // Resume
    resume: null as File | null,
  })

  const [selectedSkill, setSelectedSkill] = useState("")

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (!user) {
          // If no user is logged in, redirect to login page
          router.push("/")
        } else {
          // User is authenticated, allow access to onboarding
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        router.push("/")
      }
    }

    checkAuth()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date || null }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isPursuing: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }))
      setSelectedSkill("")
    }
  }

  const handleSuggestedSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your database
    console.log("Form submitted:", formData)
    router.push("/dashboard")
  }

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#201F1F] text-lg">Verifying your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#201F1F] mb-2">Complete Your Profile</h1>
          <p className="text-[#9B9B9B]">Let's get to know you better to find the perfect gigs for you</p>

          {/* Progress indicator */}
          <div className="flex justify-between items-center mt-8 px-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step === i
                      ? "bg-[#E63946] text-white"
                      : step > i
                        ? "bg-green-500 text-white"
                        : "bg-[#9B9B9B]/30 text-[#9B9B9B]",
                  )}
                >
                  {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
                <div className="text-xs mt-1 text-[#9B9B9B]">
                  {i === 1 ? "Personal" : i === 2 ? "Location" : i === 3 ? "Education" : i === 4 ? "Skills" : "Resume"}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#9B9B9B]/20 h-2 rounded-full mt-4">
            <div
              className="bg-[#E63946] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-[#201F1F]">Personal Information</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-[#201F1F]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-[#201F1F]">
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBirth ? (
                            format(formData.dateOfBirth, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Select your date of birth</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth || undefined}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={nextStep} className="bg-[#E63946] hover:bg-[#d12a37] text-white">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-[#201F1F]">Location Details</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-[#201F1F]">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your street address"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-[#201F1F]">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[#201F1F]">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State/Province"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode" className="text-[#201F1F]">
                        Zip/Postal Code
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Zip/Postal Code"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-[#201F1F]">
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#9B9B9B]/10"
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} className="bg-[#E63946] hover:bg-[#d12a37] text-white">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-[#201F1F]">Education Details</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="text-[#201F1F]">Are you currently pursuing education?</Label>
                    <RadioGroup
                      value={formData.isPursuing}
                      onValueChange={handleRadioChange}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="pursuing-yes" className="text-[#E63946]" />
                        <Label htmlFor="pursuing-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="pursuing-no" className="text-[#E63946]" />
                        <Label htmlFor="pursuing-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="educationLevel" className="text-[#201F1F]">
                      What are you currently pursuing?
                    </Label>
                    <Select
                      value={formData.educationLevel}
                      onValueChange={(value) => handleSelectChange("educationLevel", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="degree" className="text-[#201F1F]">
                      Degree
                    </Label>
                    <Input
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      placeholder="e.g., Bachelor of Science"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialization" className="text-[#201F1F]">
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="completionYear" className="text-[#201F1F]">
                        Completion Year
                      </Label>
                      <Input
                        id="completionYear"
                        name="completionYear"
                        value={formData.completionYear}
                        onChange={handleInputChange}
                        placeholder="e.g., 2025"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="university" className="text-[#201F1F]">
                        University/Institution
                      </Label>
                      <Input
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="Enter university name"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#9B9B9B]/10"
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} className="bg-[#E63946] hover:bg-[#d12a37] text-white">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-[#201F1F]">Skills</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skills" className="text-[#201F1F]">
                      What skills do you have?
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="skills"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        placeholder="Enter a skill"
                        className="rounded-r-none"
                      />
                      <Button
                        onClick={handleAddSkill}
                        className="bg-[#E63946] hover:bg-[#d12a37] text-white rounded-l-none"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Selected skills */}
                  {formData.skills.length > 0 && (
                    <div>
                      <Label className="text-[#201F1F] mb-2 block">Your Skills:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-[#201F1F] hover:bg-[#201F1F]/90 px-3 py-1"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested skills */}
                  <div>
                    <Label className="text-[#201F1F] mb-2 block">Suggested Skills:</Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((skill) => !formData.skills.includes(skill))
                        .slice(0, 8)
                        .map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="bg-transparent border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#E63946]/10 hover:text-[#E63946] hover:border-[#E63946] cursor-pointer px-3 py-1"
                            onClick={() => handleSuggestedSkill(skill)}
                          >
                            + {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#9B9B9B]/10"
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} className="bg-[#E63946] hover:bg-[#d12a37] text-white">
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-[#201F1F]">Upload Resume</h2>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#9B9B9B] rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-[#9B9B9B] mb-2" />
                      <h3 className="text-lg font-medium text-[#201F1F]">Upload your resume</h3>
                      <p className="text-sm text-[#9B9B9B] mb-4">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>

                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Label
                        htmlFor="resume"
                        className="bg-[#E63946] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#d12a37]"
                      >
                        Choose File
                      </Label>

                      {formData.resume && (
                        <div className="mt-4 text-[#201F1F]">Selected file: {formData.resume.name}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-[#9B9B9B] text-[#9B9B9B] hover:bg-[#9B9B9B]/10"
                  >
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#E63946] hover:bg-[#d12a37] text-white">
                    Complete Profile
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
