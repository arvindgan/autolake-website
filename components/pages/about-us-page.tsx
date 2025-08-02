"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSPARouter } from "../spa-router"

export default function AboutUsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { navigateTo } = useSPARouter()

  // Run authentication check once on mount to avoid unnecessary re-renders
  useEffect(() => {
    const authenticated = sessionStorage.getItem("aboutUsAuthenticated") === "true"
    setIsAuthenticated(authenticated)
    setIsLoading(false)

    if (!authenticated) {
      // For now, just show the content - you can implement auth flow later
      setIsAuthenticated(true)
    }
  }, [])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            AutoLake
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Pioneering the future of data infrastructure with innovative, secure, and scalable solutions.
        </motion.p>
      </div>

      {/* Company Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          className="bg-gray-800/30 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
          <div className="text-muted-foreground">Enterprise Customers</div>
        </motion.div>

        <motion.div
          className="bg-gray-800/30 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
          <div className="text-muted-foreground">Countries Served</div>
        </motion.div>

        <motion.div
          className="bg-gray-800/30 p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
          <div className="text-muted-foreground">Uptime SLA</div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-muted/50 rounded-2xl p-8 mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          To democratize data infrastructure by making enterprise-grade data lakes 
          accessible, autonomous, and affordable for organizations of all sizes. 
          We believe that every company should have the power to harness their data 
          without the complexity of traditional solutions.
        </p>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p className="text-muted-foreground">
              Continuously pushing the boundaries of what's possible in data infrastructure.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security and compliance built into every aspect of our platform.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold">Performance</h3>
            <p className="text-muted-foreground">
              Delivering lightning-fast performance and reliability at any scale.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
