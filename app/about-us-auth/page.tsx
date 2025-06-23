"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutUsAuth() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === "blob") {
      // Set authentication in sessionStorage
      sessionStorage.setItem("aboutUsAuthenticated", "true")
      // Redirect to the actual about us page
      router.push("/about-us")
    } else {
      setError("Incorrect password. Please try again.")
      // Shake effect for wrong password
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="container py-24 flex flex-col items-center justify-center">
          <motion.div
            className="max-w-md w-full p-8 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-6">Protected Area</h1>

            <p className="text-muted-foreground text-center mb-8">
              Please enter the password to access the About Us page.
            </p>

            <form onSubmit={handleSubmit}>
              <motion.div animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4"
                  autoComplete="off"
                />
              </motion.div>

              {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
