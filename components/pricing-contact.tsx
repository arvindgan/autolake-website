"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

export default function PricingContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Contact our team for pricing information or to schedule a personalized demo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6">
          <h3 className="text-xl font-semibold mb-6">Contact Us for Pricing</h3>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="rounded-full bg-green-500/20 p-4 mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
              <p className="text-center text-muted-foreground mb-6">
                Your message has been received. Our team will contact you shortly.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-white/10"
                />
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-background/50 border-white/10 resize-none"
                  placeholder="Tell us about your data needs and requirements..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          )}
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6">
          <h3 className="text-xl font-semibold mb-6">Other Ways to Connect</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-500/20 p-2">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email Us</h4>
                <p className="text-sm text-muted-foreground mb-2">For general inquiries and support</p>
                <a href="mailto:info@autolake.com" className="text-blue-400 hover:underline">
                  info@autolake.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-500/20 p-2">
                <Phone className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Call Us</h4>
                <p className="text-sm text-muted-foreground mb-2">Monday-Friday, 9am-5pm EST</p>
                <a href="tel:+18005551234" className="text-green-400 hover:underline">
                  +1 (800) 555-1234
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-500/20 p-2">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Schedule a Demo</h4>
                <p className="text-sm text-muted-foreground mb-2">See AutoLake in action</p>
                <Link href="/book-demo">
                  <Button variant="outline" size="sm" className="gap-1">
                    Book Now <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-sm font-medium mb-2">Limited Time Offer</div>
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/30 text-sm mb-4">
              Sign up before March 31st and get 3 months free on annual plans!
            </div>
            <Link href="/book-demo">
              <Button className="w-full">Claim Your Free Trial</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
