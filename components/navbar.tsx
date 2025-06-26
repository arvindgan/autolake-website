"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollToTopLink } from "./scroll-to-top-link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    // Throttle scroll events to improve performance
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY
          setIsScrolled(currentScroll > 60)
          lastScroll.current = currentScroll
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Backdrop blur overlay */}
      <AnimatePresence>
        {isAnyDropdownOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <header
        className={`sticky z-50 flex justify-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'top-5 mx-auto w-4/5 rounded-full shadow-lg bg-background/95' 
            : 'top-0 w-full'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(90deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 50%, rgba(51,65,85,0.98) 100%)'
            : 'linear-gradient(90deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 50%, rgba(51,65,85,0.85) 100%)',
        }}
      >
        <div
          className={`px-4 md:px-6 lg:px-8 flex w-full max-w-screen-2xl items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-12 py-2' : 'h-16 py-4'
          }`}
        >
          {/* Left section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <ScrollToTopLink href="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className={`relative transition-all duration-300 ${
                    isScrolled ? 'w-7 h-7' : 'w-10 h-10'
                  }`}
                >
                  <Image
                    src="/images/autolake-logo.png"
                    alt="AutoLake Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
                    priority
                  />
                </div>
                <span
                  className={`text-[#FF5252] font-bold transition-all duration-300 ${
                    isScrolled ? 'text-base' : 'text-xl'
                  }`}
                >
                  AutoLake
                </span>
              </motion.div>
            </ScrollToTopLink>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ScrollToTopLink href="/services/ingestion" className="transition-colors hover:text-primary">
                  <span 
                    className={`transition-all duration-300 hover:text-primary ${
                      isScrolled ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    Solutions
                  </span>
                </ScrollToTopLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ScrollToTopLink href="/industries-auth" className="transition-colors hover:text-primary">
                  <span 
                    className={`transition-all duration-300 ${
                      isScrolled ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    Industries
                  </span>
                </ScrollToTopLink>
              </motion.div>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollToTopLink href="/book-demo" asChild>
                <Button 
                  size="sm"
                  className={`transition-all duration-300 ${
                    isScrolled 
                      ? 'px-2 py-1 text-xs h-7' 
                      : 'px-4 py-2 text-sm h-9'
                  }`}
                >
                  Get a Demo
                </Button>
              </ScrollToTopLink>
            </motion.div>
          </div>
        </div>
      </header>
    </>
  )
}