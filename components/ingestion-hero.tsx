"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import AnimatedText from "./animated-text"
import { useEffect, useState } from "react"

// Create a Star component for the animated stars
const Star = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="currentColor"
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

// Update the generateStars function to distribute stars more evenly across the screen width
const generateStars = (count: number) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    // Use a wider distribution for x coordinates to spread stars across the entire width
    stars.push({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
    })
  }
  return stars
}

export default function IngestionHero() {
  // Increase the number of stars to fill more of the screen
  // Generate 60 stars instead of 30 to ensure better coverage
  const [stars, setStars] = useState<Array<{ id: number; x: string; y: string; size: number; delay: number }>>([])

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    setStars(generateStars(60))
  }, [])

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-black py-16 px-6 mb-16 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stars container - full width */}
      <div className="absolute inset-0 w-full overflow-hidden">
        {/* Background elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
              "radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.08), transparent 70%)",
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06), transparent 70%)",
              "radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.05), transparent 70%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg className="absolute -top-1/4 -right-1/4 h-[200%] w-[200%] opacity-40" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          
          {/* Additional grid overlay for more prominent effect */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600">
            <defs>
              <pattern id="large-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#large-grid)" />
            
            {/* Subtle connecting lines between grid points */}
            <g className="opacity-40">
              <line x1="100" y1="100" x2="200" y2="150" stroke="white" strokeWidth="0.2" />
              <line x1="200" y1="150" x2="300" y2="100" stroke="white" strokeWidth="0.2" />
              <line x1="300" y1="100" x2="400" y2="200" stroke="white" strokeWidth="0.2" />
              <line x1="400" y1="200" x2="500" y2="150" stroke="white" strokeWidth="0.2" />
              <line x1="500" y1="150" x2="600" y2="250" stroke="white" strokeWidth="0.2" />
              <line x1="600" y1="250" x2="700" y2="200" stroke="white" strokeWidth="0.2" />
              <line x1="700" y1="200" x2="800" y2="300" stroke="white" strokeWidth="0.2" />
              <line x1="800" y1="300" x2="900" y2="250" stroke="white" strokeWidth="0.2" />
              
              {/* Vertical connections */}
              <line x1="150" y1="200" x2="250" y2="300" stroke="white" strokeWidth="0.2" />
              <line x1="250" y1="300" x2="350" y2="250" stroke="white" strokeWidth="0.2" />
              <line x1="350" y1="250" x2="450" y2="350" stroke="white" strokeWidth="0.2" />
              <line x1="450" y1="350" x2="550" y2="300" stroke="white" strokeWidth="0.2" />
              <line x1="550" y1="300" x2="650" y2="400" stroke="white" strokeWidth="0.2" />
              <line x1="650" y1="400" x2="750" y2="350" stroke="white" strokeWidth="0.2" />
              <line x1="750" y1="350" x2="850" y2="450" stroke="white" strokeWidth="0.2" />
            </g>
          </svg>
          <motion.div
            className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-blue-500/5 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </motion.div>

        {/* Animated stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-white">
          {stars.map((star) => (
            <Star key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </svg>
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <AnimatedText
            as="h1"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-white"
          >
            Seamless Database Ingestion
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              From Connection to Insight
            </span>
          </AnimatedText>
          <AnimatedText delay={0.1} className="mx-auto mb-8 max-w-3xl text-lg text-gray-300 md:text-xl">
            Extract, load, and analyze data from leading databases with minimal configuration. Secure, scalable, and
            built on your own infrastructure.
          </AnimatedText>

          <motion.div
            className="hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/book-demo">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Request a Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button variant="outline" size="lg" className="gap-2 border-white/20 px-8">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Play className="h-4 w-4" />
                </motion.span>
                See It in Action
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
