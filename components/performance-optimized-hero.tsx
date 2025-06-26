"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useMemo } from "react"

// Memoized star generation for better performance
const generateOptimizedStars = (count: number) => {
  return useMemo(() => {
    const stars = []
    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 3,
      })
    }
    return stars
  }, [count])
}

// Optimized Star component with reduced animations
const OptimizedStar = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => {
  return (
    <motion.circle
      cx={`${x}%`}
      cy={`${y}%`}
      r={size}
      fill="white"
      initial={{ opacity: 0.1 }}
      animate={{
        opacity: [0.1, 0.7, 0.1],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  )
}

export default function PerformanceOptimizedHero() {
  const stars = generateOptimizedStars(50) // Reduced from 100 for better performance

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
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden bg-background">
      {/* Optimized background with reduced complexity */}
      <div className="absolute inset-0 w-full overflow-hidden">
        {/* Simplified background animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-background to-purple-950/20" />

        {/* Optimized stars with reduced count */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ willChange: 'transform' }}>
          {stars.map((star) => (
            <OptimizedStar key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </svg>

        {/* Static gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content container */}
      <div className="container relative z-10 max-w-screen-2xl">
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            className="bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            Autonomize Your Data Lake
            <br />
            <motion.span
              className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
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
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105 active:scale-95"
              >
                Explore Solutions
              </Button>
            </Link>
            <Link href="/book-demo">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg transition-all hover:scale-105 active:scale-95 border-white/20 hover:border-white/40"
              >
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}