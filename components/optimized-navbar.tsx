"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Throttle function for scroll events
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default function OptimizedNavbar() {
  const [scrolled, setScrolled] = useState(false)

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const isScrolled = window.scrollY > 60
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }, 16), // 60fps throttling
    [scrolled]
  )

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <motion.header
      className={`sticky top-0 z-50 flex justify-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-out ${
        scrolled 
          ? 'h-12 mx-auto w-4/5 mt-5 rounded-full shadow-lg bg-background/95' 
          : 'h-16 w-full bg-background/85'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`px-4 md:px-6 lg:px-8 flex w-full max-w-screen-2xl items-center justify-between transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        {/* Left section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center gap-2 transition-transform group-hover:scale-105">
              <div className={`relative transition-all duration-300 ${
                scrolled ? 'w-7 h-7' : 'w-10 h-10'
              }`}>
                <Image
                  src="/images/autolake-logo.png"
                  alt="AutoLake Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
                  priority
                  sizes="(max-width: 768px) 28px, 40px"
                />
              </div>
              <span className={`text-[#FF5252] font-bold transition-all duration-300 ${
                scrolled ? 'text-base' : 'text-xl'
              }`}>
                AutoLake
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link 
              href="/services/ingestion" 
              className={`transition-all duration-300 hover:text-primary hover:scale-105 ${
                scrolled ? 'text-xs' : 'text-sm'
              }`}
            >
              Solutions
            </Link>
            <Link 
              href="/industries-auth" 
              className={`transition-all duration-300 hover:text-primary hover:scale-105 ${
                scrolled ? 'text-xs' : 'text-sm'
              }`}
            >
              Industries
            </Link>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <Link href="/book-demo">
            <Button 
              size="sm"
              className={`transition-all duration-300 hover:scale-105 active:scale-95 ${
                scrolled 
                  ? 'px-3 py-1 text-xs h-8' 
                  : 'px-4 py-2 text-sm h-10'
              }`}
            >
              Get a Demo
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}