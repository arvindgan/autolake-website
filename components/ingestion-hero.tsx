"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import AnimatedText from "./animated-text"

export default function IngestionHero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-900/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-900/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Content - Large Headline */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Your data
              <br />
              <span className="font-normal">ingestion</span>
              <br />
              <span className="font-normal">partner</span>
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/book-demo">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-medium transition-all hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Center - 3D Isometric Illustration */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <motion.div
              className="relative w-full max-w-md aspect-square"
              initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              {/* 3D Isometric Device Stack */}
              <div className="relative w-full h-full perspective-1000">
                {/* Bottom Layer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl"
                  style={{
                    transform: "rotateX(60deg) rotateY(-15deg) translateZ(-40px)",
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    rotateY: [-15, -10, -15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Middle Layer */}
                <motion.div
                  className="absolute inset-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-xl"
                  style={{
                    transform: "rotateX(60deg) rotateY(-15deg) translateZ(-20px)",
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    rotateY: [-15, -8, -15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                {/* Top Layer - Main Device */}
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg shadow-lg border border-gray-500/30"
                  style={{
                    transform: "rotateX(60deg) rotateY(-15deg) translateZ(0px)",
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    rotateY: [-15, -5, -15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  {/* Screen/Display Area */}
                  <div className="absolute inset-4 bg-black rounded-md border border-gray-400/20">
                    {/* Simulated interface elements */}
                    <div className="p-3 space-y-2">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full opacity-60" />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-60" />
                        <div className="w-2 h-2 bg-green-500 rounded-full opacity-60" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 bg-blue-400/40 rounded w-3/4" />
                        <div className="h-1 bg-gray-600 rounded w-1/2" />
                        <div className="h-1 bg-gray-600 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Keyboard area */}
                  <div className="absolute bottom-2 left-4 right-4 h-8 bg-gray-800 rounded border border-gray-500/20">
                    <div className="grid grid-cols-12 gap-0.5 p-1 h-full">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-sm opacity-60" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Data Points */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Description */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Let's make data ingestion a strength for your business. We're here to help with everything from database connections and schema mapping to pipeline monitoring and continuous optimization, ensuring your data flow is always protected.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                "Automated schema detection",
                "Real-time data synchronization", 
                "Enterprise-grade security",
                "Scalable infrastructure"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-gray-400 text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}