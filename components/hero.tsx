"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedButton } from "./animated-button"

// Create a Star component for the animated stars
const Star = ({ x, y, size, delay }) => {
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

const RainbowBorderButton = ({ children }) => {
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
  // Increase the number of stars to fill more of the screen
  // Generate 100 stars instead of 55 to ensure better coverage
  const stars = generateStars(100)

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

  // Floating animation for the hero section
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      {/* Stars and background container - full viewport width */}
      <div className="absolute inset-0 w-screen overflow-hidden">
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.12), transparent 70%)",
              "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.12), transparent 70%)",
              "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.12), transparent 70%)",
              "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12), transparent 70%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.12), transparent 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-400/25 to-cyan-400/25 rounded-lg rotate-45 blur-lg"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
              rotate: [45, 75, 45],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Animated stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.map((star) => (
            <Star key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </svg>

        {/* Gradient overlay for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Content container - maintain max width */}
      <div className="container relative z-10 max-w-screen-2xl">
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div animate={floatingAnimation}>
            <motion.h1
              className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              variants={itemVariants}
            >
              Autonomize Your Data Lake
              <br />
              <motion.span
                className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                in Minutes
              </motion.span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[42rem] leading-normal text-slate-600 sm:text-xl sm:leading-8 mb-8"
              variants={itemVariants}
            >
              Autolake is an autonomous data lake platform that ingests, organizes, and optimizes your data instantly
              using your own native services.
            </motion.p>
            <motion.div className="flex justify-center gap-4" variants={itemVariants}>
              <Link href="/services/ingestion">
                <AnimatedButton
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl"
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
    </section>
  )
}
