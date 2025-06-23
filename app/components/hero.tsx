"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedButton } from "./animated-button"

// Create a floating element component for the organic shapes
const FloatingElement = ({ delay = 0, duration = 10, className = "" }) => {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-screen filter blur-xl ${className}`}
      animate={{
        y: [20, -20],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

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

// Generate random stars
const generateStars = (count) => {
  const stars = []
  const padding = 20
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: `${-padding + Math.random() * (100 + 2 * padding)}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
    })
  }
  return stars
}

export default function Hero() {
  const stars = generateStars(100)

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Organic floating shapes */}
        <FloatingElement className="w-[500px] h-[500px] left-[10%] top-[20%] bg-blue-500/10" delay={0} duration={15} />
        <FloatingElement
          className="w-[600px] h-[600px] right-[5%] top-[10%] bg-purple-500/10"
          delay={2}
          duration={18}
        />
        <FloatingElement
          className="w-[400px] h-[400px] left-[20%] bottom-[10%] bg-indigo-500/10"
          delay={1}
          duration={12}
        />

        {/* Animated stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.map((star) => (
            <Star key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </svg>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Deploy Data Lake
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl text-gray-400">
              on your own Infrastructure in Minutes
            </span>
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AutoLake empowers you to effortlessly deploy a secure, scalable, and fully-integrated data lake on your own
            cloud, freeing you from third-party dependencies.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/services/ingestion">
              <AnimatedButton
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105"
              >
                Explore Solutions
              </AnimatedButton>
            </Link>
            <Link href="/book-demo">
              <Button
                variant="outline"
                size="lg"
                className="group border-white/20 hover:border-white/40 px-8 py-6 text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Schedule a Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Element */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative w-full max-w-3xl mx-auto aspect-[16/9]">
            <div className="absolute inset-0 rounded-lg overflow-hidden border border-white/10 bg-gradient-to-b from-blue-950/50 to-indigo-950/50">
              {/* Animated water effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Data flow lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-1 rounded-full bg-white"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
