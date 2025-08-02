"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedButton } from "./animated-button"
import { useState, useEffect } from "react"

// Create a Star component for the animated stars
const Star = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="white"
      initial={{ opacity: 0.1 }}
      animate={{
        opacity: [0.1, 0.7, 0.1],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Create a deterministic pseudo-random number generator (Mulberry32)
const createPRNG = (seed: number) => {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Generate deterministic stars so server and client markup match
const generateStars = (count: number) => {
  const rand = createPRNG(42) // fixed seed for consistent results
  const stars = []
  const padding = 20 // percentage padding beyond viewport

  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: `${-padding + rand() * (100 + 2 * padding)}%`,
      y: `${rand() * 100}%`,
      size: rand() * 1.5 + 0.5,
      delay: rand() * 3,
    })
  }
  return stars
}

const RainbowBorderButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative">
        <Button variant="outline" size="lg" className="relative bg-background overflow-hidden">
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </Button>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  // Prevent hydration mismatch by only generating stars on client
  const [stars, setStars] = useState<Array<{id: number; x: string; y: string; size: number; delay: number}>>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setStars([])
    setIsMounted(true)
  }, [])

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
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  // Floating animation for the hero section
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  }

  return (
    <section className="relative -mt-16 pt-16 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden">
      {/* Stars and background container - full viewport width */}
      <div className="absolute inset-0 w-screen overflow-hidden">
        {/* Dynamic flowing background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 50%, transparent 100%)",
              "linear-gradient(135deg, rgba(147, 197, 253, 0.08) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 100%)",
              "linear-gradient(225deg, rgba(59, 130, 246, 0.06) 0%, rgba(147, 197, 253, 0.08) 50%, transparent 100%)",
              "linear-gradient(315deg, rgba(147, 197, 253, 0.05) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Flowing geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large flowing curves */}
          <motion.div
            className="absolute -top-20 -left-20 w-[700px] h-[700px] opacity-15"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-200/30 to-blue-400/20 rounded-full blur-xl" />
          </motion.div>

          <motion.div
            className="absolute -bottom-20 -right-40 w-[800px] h-[800px] opacity-10"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-tl from-blue-300/25 to-blue-500/15 rounded-full blur-xl" />
          </motion.div>

          {/* Flowing geometric layers inspired by the reference */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 800" fill="none" preserveAspectRatio="none">
            {/* Layer 1: Bottom flowing curves */}
            <motion.path
              d="M0,600 C200,550 400,500 600,550 C800,600 1000,650 1200,600 C1400,550 1600,500 1600,550 L1600,800 L0,800 Z"
              fill="url(#flowGradient1)"
              animate={{
                d: [
                  "M0,600 C200,550 400,500 600,550 C800,600 1000,650 1200,600 C1400,550 1600,500 1600,550 L1600,800 L0,800 Z",
                  "M0,620 C200,570 400,520 600,570 C800,620 1000,670 1200,620 C1400,570 1600,520 1600,570 L1600,800 L0,800 Z",
                  "M0,580 C200,530 400,480 600,530 C800,580 1000,630 1200,580 C1400,530 1600,480 1600,530 L1600,800 L0,800 Z",
                  "M0,600 C200,550 400,500 600,550 C800,600 1000,650 1200,600 C1400,550 1600,500 1600,550 L1600,800 L0,800 Z",
                ],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            
            {/* Layer 2: Mid-level flowing shapes */}
            <motion.path
              d="M0,400 C300,350 600,300 900,350 C1200,400 1500,450 1600,400 L1600,700 C1500,650 1200,600 900,650 C600,700 300,750 0,700 Z"
              fill="url(#flowGradient2)"
              animate={{
                d: [
                  "M0,400 C300,350 600,300 900,350 C1200,400 1500,450 1600,400 L1600,700 C1500,650 1200,600 900,650 C600,700 300,750 0,700 Z",
                  "M0,420 C300,370 600,320 900,370 C1200,420 1500,470 1600,420 L1600,720 C1500,670 1200,620 900,670 C600,720 300,770 0,720 Z",
                  "M0,380 C300,330 600,280 900,330 C1200,380 1500,430 1600,380 L1600,680 C1500,630 1200,580 900,630 C600,680 300,730 0,680 Z",
                  "M0,400 C300,350 600,300 900,350 C1200,400 1500,450 1600,400 L1600,700 C1500,650 1200,600 900,650 C600,700 300,750 0,700 Z",
                ],
              }}
              transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            
            {/* Layer 3: Top flowing elements */}
            <motion.path
              d="M0,0 L1600,0 L1600,200 C1400,250 1100,300 800,250 C500,200 200,150 0,200 Z"
              fill="url(#flowGradient3)"
              animate={{
                d: [
                  "M0,0 L1600,0 L1600,200 C1400,250 1100,300 800,250 C500,200 200,150 0,200 Z",
                  "M0,0 L1600,0 L1600,180 C1400,230 1100,280 800,230 C500,180 200,130 0,180 Z",
                  "M0,0 L1600,0 L1600,220 C1400,270 1100,320 800,270 C500,220 200,170 0,220 Z",
                  "M0,0 L1600,0 L1600,200 C1400,250 1100,300 800,250 C500,200 200,150 0,200 Z",
                ],
              }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            
            {/* Layer 4: Central flowing band */}
            <motion.path
              d="M0,300 C400,250 800,200 1200,250 C1400,275 1500,300 1600,275 L1600,350 C1500,375 1400,400 1200,375 C800,425 400,475 0,425 Z"
              fill="url(#flowGradient4)"
              animate={{
                d: [
                  "M0,300 C400,250 800,200 1200,250 C1400,275 1500,300 1600,275 L1600,350 C1500,375 1400,400 1200,375 C800,425 400,475 0,425 Z",
                  "M0,320 C400,270 800,220 1200,270 C1400,295 1500,320 1600,295 L1600,370 C1500,395 1400,420 1200,395 C800,445 400,495 0,445 Z",
                  "M0,280 C400,230 800,180 1200,230 C1400,255 1500,280 1600,255 L1600,330 C1500,355 1400,380 1200,355 C800,405 400,455 0,405 Z",
                  "M0,300 C400,250 800,200 1200,250 C1400,275 1500,300 1600,275 L1600,350 C1500,375 1400,400 1200,375 C800,425 400,475 0,425 Z",
                ],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            
            <defs>
              <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 0.08)" />
                <stop offset="100%" stopColor="rgba(219, 234, 254, 0.05)" />
              </linearGradient>
              <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 197, 253, 0.12)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.06)" />
                <stop offset="100%" stopColor="rgba(219, 234, 254, 0.03)" />
              </linearGradient>
              <linearGradient id="flowGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(219, 234, 254, 0.08)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 0.06)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.04)" />
              </linearGradient>
              <linearGradient id="flowGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.10)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 0.07)" />
                <stop offset="100%" stopColor="rgba(219, 234, 254, 0.04)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Abstract geometric elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32"
            animate={{
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-full h-full border-2 border-blue-200/20 rounded-lg transform rotate-45" />
          </motion.div>

          <motion.div
            className="absolute top-3/4 right-1/3 w-24 h-24"
            animate={{
              rotate: [360, 180, 0],
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-blue-100/20 rounded-full" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-1/4 w-20 h-20"
            animate={{
              rotate: [0, -90, -180, -270, -360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full border border-blue-300/30 transform rotate-12" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </motion.div>
        </div>

        {/* Gradient overlay for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content container - maintain max width */}
      <div className="container relative z-10 max-w-screen-2xl">
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div animate={floatingAnimation}>
            <motion.h1
              className="text-gray-900 font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              variants={itemVariants}
            >
              Autonomize Your Data Lake
              <br />
              <motion.span
                className="text-blue-600"
                variants={itemVariants}
              >
                in Minutes
              </motion.span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8"
              variants={itemVariants}
            >
              Autolake is an autonomous data lake platform that ingests, organizes, and optimizes your data instantly
              using your own native services.
            </motion.p>
            <motion.div className="flex justify-center gap-4" variants={itemVariants}>
              <Link href="/services/ingestion">
                <AnimatedButton
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                >
                  Explore Solutions
                </AnimatedButton>
              </Link>
              <Link href="/book-demo">
                <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105 flex items-center">
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
                  </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
