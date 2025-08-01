"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Check, Clock, CalendarIcon, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { sendDemoRequest } from "@/app/actions/send-demo-request"
import { useSPARouter } from "../spa-router"

export default function BookDemoPage() {
  const { navigateTo } = useSPARouter()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState({
    type: "demo",
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!date) newErrors.date = "Please select a date"
      if (!selectedTime) newErrors.time = "Please select a time"
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone is required"
      if (!formData.company.trim()) newErrors.company = "Company is required"
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      submitData.append("date", date?.toISOString() || "")
      submitData.append("time", selectedTime || "")

      const result = await sendDemoRequest(submitData)

      if (result.success) {
        // Navigate to success page using SPA router
        navigateTo('home') // or create a success route
        alert('Demo scheduled successfully!') // Replace with proper success UI
      } else {
        setErrors({ form: result.error || "There was an error submitting your request. Please try again." })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ form: "There was an error submitting your request. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container max-w-4xl py-24">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Schedule Your Demo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          See how AutoLake can transform your data infrastructure
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-6 md:p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 
                  ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
                >
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">Schedule</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted-foreground/30"}`} />
              <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2
                  ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
                >
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">Details</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 3 ? "bg-primary" : "bg-muted-foreground/30"}`} />
              <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2
                  ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
                >
                  <Check className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">Confirm</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>
                  
                  {/* Simple date picker - you might want to use a proper date picker library */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        className={errors.date ? "border-red-500" : ""}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <Label>Preferred Time</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 text-sm border rounded-md transition-colors ${
                              selectedTime === time
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext}>
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? "border-red-500" : ""}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={errors.company ? "border-red-500" : ""}
                        placeholder="Acme Corp"
                      />
                      {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Review & Confirm
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Confirm Your Demo</h3>
                  
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {date?.toLocaleDateString()} at {selectedTime}
                      </span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Contact Information:</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium">Name:</span> {formData.name}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                        <p><span className="font-medium">Company:</span> {formData.company}</p>
                      </div>
                    </div>
                  </div>

                  {errors.form && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {errors.form}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Scheduling..." : "Confirm Demo"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </main>
  )
}