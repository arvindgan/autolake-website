"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Create a deterministic pseudo-random number generator for consistent stars
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

// Generate deterministic stars for consistent server/client rendering
const generateStars = (count: number) => {
  const rand = createPRNG(42) // fixed seed for consistency
  const stars = []
  
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2 + 0.5,
      opacity: rand() * 0.6 + 0.4,
      twinkleDelay: rand() * 4,
      fallSpeed: rand() * 8 + 12, // 12-20 second fall duration
      initialDelay: rand() * 8,
    })
  }
  return stars
}

// Chromatic aberration text component
const ChromaticText = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Red channel offset */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#FF4DA6] to-[#8B5CF6] bg-clip-text text-transparent"
        style={{ 
          transform: 'translate(-1px, 0)',
          filter: 'hue-rotate(-10deg)',
          opacity: 0.7
        }}
      >
        {children}
      </div>
      {/* Blue channel offset */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#FF4DA6] to-[#8B5CF6] bg-clip-text text-transparent"
        style={{ 
          transform: 'translate(1px, 0)',
          filter: 'hue-rotate(10deg)',
          opacity: 0.7
        }}
      >
        {children}
      </div>
      {/* Main text */}
      <div 
        className="relative bg-gradient-to-r from-[#FF4DA6] to-[#8B5CF6] bg-clip-text text-transparent"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 77, 166, 0.4)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.3))',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function Hero() {
  const [stars] = useState(() => generateStars(120))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#FF4DA6] to-[#8B5CF6] bg-clip-text text-transparent">
            Autonomize Your Data Lake
          </h1>
          <p className="text-4xl md:text-6xl font-light text-[#94A3B8] mb-12">in Minutes</p>
        </div>
      </section>
    )
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: '#020617',
        aspectRatio: '16/9',
      }}
    >
      {/* Animated Stars Background with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ 
              y: -20, 
              opacity: star.opacity,
              top: `${star.y}%`
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [
                star.opacity, 
                Math.min(1, star.opacity + 0.4), 
                star.opacity,
                Math.min(1, star.opacity + 0.6),
                star.opacity
              ],
            }}
            transition={{
              y: {
                duration: star.fallSpeed,
                repeat: Infinity,
                delay: star.initialDelay,
                ease: "linear",
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      {/* Soft Radial Glows */}
      <motion.div 
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 166, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Main Content with Subtle Camera Push and Parallax */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        initial={{ scale: 1, z: 0 }}
        animate={{ 
          scale: [1, 1.02, 1],
          z: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Main Headline with Chromatic Aberration */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <ChromaticText>
            Autonomize Your Data Lake
          </ChromaticText>
        </motion.h1>

        {/* Secondary Line with Slide-up Animation */}
        <motion.p
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-16"
          style={{ color: '#94A3B8' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1, 
            ease: "easeOut" 
          }}
        >
          in Minutes
        </motion.p>

        {/* CTA Buttons Container */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.5, 
            ease: "easeOut" 
          }}
        >
          {/* Explore Solutions Button with Pulse */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              duration: 0.8, 
              delay: 2.2,
              ease: "easeInOut"
            }}
          >
            <Link href="/services/ingestion">
              <Button
                size="lg"
                className="px-10 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#3B82F6',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 8px 32px rgba(59, 130, 246, 0.2)',
                  border: 'none',
                }}
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          {/* Schedule Demo Button with Animated Neon Border */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            {/* Animated Neon Border */}
            <motion.div
              className="absolute inset-0 rounded-full p-[3px]"
              style={{
                background: 'linear-gradient(90deg, #FF4DA6 0%, #8B5CF6 50%, #FF4DA6 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
              }}
              transition={{
                duration: 3,
                delay: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: '#1F2937' }}
              />
            </motion.div>

            {/* Button Content */}
            <Link href="/book-demo">
              <Button
                variant="ghost"
                size="lg"
                className="relative z-10 px-10 py-6 text-lg font-medium rounded-full text-white hover:bg-transparent"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Additional Bloom Effects for Neon Elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255, 77, 166, 0.1) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
      />
    </section>
  )
}