"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedButton } from "./animated-button"

// Create floating orb component for modern background elements
const FloatingOrb = ({ size, color, position, delay = 0, duration = 20 }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} blur-3xl opacity-20`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    />
  )
}

// Grid pattern component for subtle background texture
const GridPattern = () => {
  return (
    <div className="absolute inset-0 opacity-[0.02]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-slate-900" />
      </svg>
    </div>
  )
}

// Animated gradient mesh background
const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[100%] opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 80%, #6366f1 0%, transparent 50%), radial-gradient(circle at 40% 60%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 80%, #6366f1 0%, transparent 50%), radial-gradient(circle at 60% 40%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 60% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 40% 20%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 60%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 80%, #6366f1 0%, transparent 50%), radial-gradient(circle at 40% 60%, #8b5cf6 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

// Geometric shapes for modern design elements
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Large circle */}
      <motion.div
        className="absolute w-96 h-96 rounded-full border border-blue-200/20 -top-48 -right-48"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      
      {/* Medium circle */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-indigo-200/15 top-1/4 -left-32"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      
      {/* Small decorative elements */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 top-3/4 right-1/4"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      
      {/* Triangular elements */}
      <motion.div
        className="absolute w-24 h-24 top-1/3 right-1/3 opacity-10"
        animate={{
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-blue-500" />
        </svg>
      </motion.div>
    </div>
  )
}

const RainbowBorderButton = ({ children }) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">
        <Button variant="outline" size="lg" className="relative bg-white/90 backdrop-blur-sm border-white/20 text-slate-700 hover:text-slate-900 overflow-hidden">
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </Button>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden">
      {/* Modern gradient background inspired by Cluely */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
      
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-blue-50/30" />
      
      {/* Grid pattern for texture */}
      <GridPattern />
      
      {/* Animated gradient mesh */}
      <GradientMesh />
      
      {/* Floating orbs for modern aesthetic */}
      <div className="absolute inset-0">
        <FloatingOrb 
          size="400px" 
          color="bg-blue-400" 
          position={{ x: "10%", y: "20%" }} 
          delay={0}
          duration={25}
        />
        <FloatingOrb 
          size="300px" 
          color="bg-indigo-400" 
          position={{ x: "70%", y: "10%" }} 
          delay={5}
          duration={30}
        />
        <FloatingOrb 
          size="250px" 
          color="bg-purple-400" 
          position={{ x: "20%", y: "70%" }} 
          delay={10}
          duration={20}
        />
        <FloatingOrb 
          size="350px" 
          color="bg-cyan-400" 
          position={{ x: "80%", y: "60%" }} 
          delay={15}
          duration={35}
        />
      </div>
      
      {/* Geometric shapes for visual interest */}
      <GeometricShapes />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content container */}
      <div className="container relative z-10 max-w-screen-2xl">
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div>
            <motion.h1
              className="bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
              variants={itemVariants}
              style={{
                filter: "drop-shadow(0 0 20px rgba(59,130,246,0.1))",
              }}
            >
              Autonomize Your Data Lake
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                in Minutes
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="mx-auto max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8 mb-8 font-medium"
              variants={itemVariants}
              style={{
                textShadow: "0 1px 2px rgba(255,255,255,0.8)",
              }}
            >
              Autolake is an autonomous data lake platform that ingests, organizes, and optimizes your data instantly
              using your own native services.
            </motion.p>
            
            <motion.div className="flex justify-center gap-4" variants={itemVariants}>
              <Link href="/services/ingestion">
                <AnimatedButton
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl border-0"
                >
                  Explore Solutions
                </AnimatedButton>
              </Link>
              <Link href="/book-demo">
                <RainbowBorderButton>
                  <span className="flex items-center">
                    Schedule a Demo
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </motion.svg>
                  </span>
                </RainbowBorderButton>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}