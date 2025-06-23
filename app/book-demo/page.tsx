"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import { sendDemoRequest } from "@/app/actions/send-demo-request"
import { useRouter } from "next/navigation"
import { CalendarIcon, Building2, User, ArrowRight, Check } from "lucide-react"

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function BookDemo() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [formData, setFormData] = useState({
    type: "company",
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!date) newErrors.date = "Please select a date"
      if (!selectedTime) newErrors.time = "Please select a time slot"
    } else if (currentStep === 2) {
      if (!formData.name) newErrors.name = "Name is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.phone) newErrors.phone = "Phone is required"
      if (!formData.company) newErrors.company = "Company is required"
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
        router.push("/book-demo/success")
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
    <div className="min-h-screen bg-background">
      <Navbar />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Select Date</h3>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      />
                      {errors.date && <p className="mt-2 text-sm text-red-500">{errors.date}</p>}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Select Time</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="w-full"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      {errors.time && <p className="mt-2 text-sm text-red-500">{errors.time}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNext} className="w-full md:w-auto">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium">
                        Which Describes You Best?
                      </label>
                      <Select defaultValue={formData.type} onValueChange={(value) => handleChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">Company needing custom software</SelectItem>
                          <SelectItem value="enterprise">Enterprise organization</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Work Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="Company Inc."
                      />
                      {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Review <ArrowRight className="ml-2 h-4 w-4" />
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
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Confirm Your Details</h3>

                      <div className="grid gap-4">
                        <div className="flex items-center gap-4">
                          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Scheduled Time</p>
                            <p className="text-muted-foreground">
                              {date ? format(date, "MMMM d, yyyy") : "No date selected"} at {selectedTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Contact Information</p>
                            <p className="text-muted-foreground">{formData.name}</p>
                            <p className="text-muted-foreground">{formData.email}</p>
                            <p className="text-muted-foreground">{formData.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Company Details</p>
                            <p className="text-muted-foreground">{formData.company}</p>
                            <Badge variant="secondary" className="mt-1">
                              {formData.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {errors.form && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 text-red-500">
                        {errors.form}
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Scheduling...
                          </>
                        ) : (
                          <>
                            Schedule Demo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
