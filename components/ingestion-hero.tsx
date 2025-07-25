"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import AnimatedText from "./animated-text"

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

// Update the generateStars function to distribute stars more evenly across the screen width
const generateStars = (count) => {
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
  const stars = generateStars(60)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 py-16 px-6 mb-16 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stars container - full width */}
      <div className="absolute inset-0 w-full overflow-hidden">
        {/* Background elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.3), transparent 70%)",
              "radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3), transparent 70%)",
              "radial-gradient(circle at 20% 80%, rgba(29, 78, 216, 0.3), transparent 70%)",
              "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.3), transparent 70%)",
              "radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.3), transparent 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg className="absolute -top-1/4 -right-1/4 h-[200%] w-[200%] opacity-30" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          <motion.div
            className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-blue-500/20 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </motion.div>

        {/* Animated stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
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
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Seamless Database Ingestion
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              From Connection to Insight
            </span>
          </AnimatedText>
          <AnimatedText delay={0.1} className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Extract, load, and analyze data from leading databases with minimal configuration. Secure, scalable, and
            built on your own infrastructure.
          </AnimatedText>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
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
