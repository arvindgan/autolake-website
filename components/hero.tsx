"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedButton } from "./animated-button"
import { useEffect } from "react"

// Create a Star component for the animated stars
const Star = ({ x, y, size, delay, twinkleDelay }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="white"
      className="star-twinkle"
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: [0.3, 1, 0.5, 1, 0.3],
        scale: [1, 1.2, 0.8, 1.1, 1],
      }}
      transition={{
        duration: Math.random() * 4 + 6, // 6-10s duration
        delay: twinkleDelay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  )
}

// Create a deterministic pseudo-random number generator
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

// Generate deterministic stars
const generateStars = (count: number) => {
  const rand = createPRNG(42)
  const stars = []
  
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: `${rand() * 100}%`,
      y: `${rand() * 100}%`,
      size: rand() * 1.5 + 0.5, // 0.5-2px
      delay: rand() * 3,
      twinkleDelay: rand() * 10, // Staggered twinkle start
    })
  }
  return stars
}

export default function Hero() {
  const stars = generateStars(150) // More stars for cosmic effect

  // Lock viewport on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  return (
    <>
      {/* Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;1,700&family=Manrope:wght@300;400;500;600&display=swap" 
        rel="stylesheet" 
      />
      
      <section className="hero-container min-h-screen w-screen relative overflow-hidden bg-[#020617]">
        {/* Background Motion Layer with Stars */}
        <div className="absolute inset-0 w-full h-full">
          {/* Radial Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,#1e293b_0%,transparent_70%)] opacity-40" />
          
          {/* Animated Stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {stars.map((star) => (
              <Star 
                key={star.id} 
                x={star.x} 
                y={star.y} 
                size={star.size} 
                delay={star.delay}
                twinkleDelay={star.twinkleDelay}
              />
            ))}
          </svg>

          {/* Lens Flare Effect */}
          <motion.div
            className="absolute top-1/2 w-32 h-32 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl opacity-30 pointer-events-none"
            animate={{
              x: ['-200px', 'calc(100vw + 200px)'],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 2,
            }}
          />
        </div>

        {/* Camera Push-in Effect */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            scale: [1, 1.01],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Navbar - appears after 0.6s */}
          <motion.nav
            className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF4DA6] to-[#8B5CF6] bg-clip-text text-transparent">
                AutoLake
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-white/80 font-manrope">Solutions</span>
              <span className="text-white/80 font-manrope">Industries</span>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                Get a Demo
              </Button>
            </div>
          </motion.nav>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
            {/* Main Headline */}
            <motion.h1
              className="headline-text font-libre-caslon text-6xl sm:text-7xl font-bold italic leading-tight mb-4"
              style={{
                background: 'linear-gradient(135deg, #FF4DA6 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(255, 77, 166, 0.3)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.2))',
                textShadow: '0 0 30px rgba(255, 77, 166, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Autonomize Your Data Lake
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="font-libre-caslon text-5xl sm:text-6xl font-light text-[#94A3B8] mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              in Minutes
            </motion.h2>

            {/* Body Text */}
            <motion.p
              className="font-manrope max-w-xl text-base sm:text-lg text-slate-400 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            >
              Autolake is an autonomous data-lake platform that ingests, organizes, and optimizes your data instantly using your own native services.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              {/* Primary CTA */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  ease: "easeInOut",
                }}
              >
                <Link href="/services/ingestion">
                  <Button
                    size="lg"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] px-8 py-3 text-lg font-manrope font-medium shadow-lg"
                  >
                    Explore Solutions
                  </Button>
                </Link>
              </motion.div>

              {/* Secondary CTA with Neon Border */}
              <Link href="/book-demo">
                <motion.div
                  className="relative group"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: 2,
                  }}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF4DA6] via-[#B455FF] to-[#8B5CF6] blur-sm opacity-75" />
                  <div className="relative flex items-center gap-2 rounded-lg bg-[#0f172a] px-8 py-3 text-white font-manrope font-medium">
                    Schedule a Demo →
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Decorative Accents */}
          {/* Right-side vertical label */}
          <motion.div
            className="fixed right-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
          >
            <span className="font-manrope text-xs tracking-widest text-white/60 uppercase">
              Field Entry — Chapter One
            </span>
          </motion.div>

          {/* Bottom-right micro-label */}
          <motion.div
            className="fixed bottom-8 right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          >
            <span className="font-manrope text-xs text-white/60">
              © AutoLake 2025
            </span>
          </motion.div>

          {/* Footer Copy */}
          <motion.div
            className="fixed bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          >
            <span className="font-manrope text-xs text-white/50">
              ✦ Founded in Data, 2025
            </span>
          </motion.div>
        </motion.div>

        <style jsx>{`
          .hero-container {
            font-family: 'Manrope', sans-serif;
          }
          
          .headline-text {
            font-family: 'Libre Caslon Text', serif;
          }
          
          .star-twinkle {
            animation: twinkle 8s infinite ease-in-out;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            25% { opacity: 1; transform: scale(1.2); }
            50% { opacity: 0.5; transform: scale(0.8); }
            75% { opacity: 1; transform: scale(1.1); }
          }
          
          @keyframes heroPush {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.01); }
          }
          
          .font-libre-caslon {
            font-family: 'Libre Caslon Text', serif;
          }
          
          .font-manrope {
            font-family: 'Manrope', sans-serif;
          }
        `}</style>
      </section>
    </>
  )
}