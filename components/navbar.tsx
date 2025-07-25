"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollToTopLink } from "./scroll-to-top-link"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function Navbar() {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  // For smooth animation, use framer-motion's motion values
  const scrollY = useMotionValue(0)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
      lastScroll.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // Animate between expanded and compact header
  // 0px scroll: large, 60px+ scroll: compact
  const minHeight = 48 // px (compact)
  const maxHeight = 64 // px (expanded)
  const minLogo = 28 // px (smaller logo when scrolled)
  const maxLogo = 40 // px (larger logo at top)
  const minFont = 16 // px (smaller font when scrolled)
  const maxFont = 24 // px (larger font at top)
  const minButtonPadding = 6 // px (much smaller button padding when scrolled)
  const maxButtonPadding = 16 // px (larger button padding at top)
  const minButtonFont = 11 // px (much smaller button text when scrolled)
  const maxButtonFont = 14 // px (larger button text at top)
  const stickyGap = 20 // px

  // Use framer-motion's useSpring for smooth transitions
  const springY = useSpring(scrollY, { stiffness: 120, damping: 20 })
  const headerHeight = useTransform(springY, [0, 60], [maxHeight, minHeight])
  const logoSize = useTransform(springY, [0, 60], [maxLogo, minLogo])
  const fontSize = useTransform(springY, [0, 60], [maxFont, minFont])
  const buttonPaddingX = useTransform(springY, [0, 60], [maxButtonPadding, minButtonPadding])
  const buttonPaddingY = useTransform(springY, [0, 60], [maxButtonPadding * 0.5, minButtonPadding * 0.5])
  const buttonFontSize = useTransform(springY, [0, 60], [maxButtonFont, minButtonFont])
  const navFontSize = useTransform(springY, [0, 60], [14, 12]) // Navigation links font size
  const boxShadow = useTransform(springY, [0, 60], ["0 0 0 rgba(0,0,0,0)", "0 2px 16px rgba(0,0,0,0.10)"])
  const gradientOpacity = useTransform(springY, [0, 60], [0.85, 0.98])
  
  // Enhanced pill transformation
  // Animate width from 100vw to 80vw (or 100% to 80% for responsiveness)
  const headerWidth = useTransform(springY, [0, 60], ["100vw", "80vw"])
  // Animate top gap: 0px at top, stickyGap (e.g. 20px) when scrolled
  const headerTop = useTransform(springY, [0, 10], [0, stickyGap])
  // Animate border radius: 0px at top, 32px when scrolled for pill effect
  const headerRadius = useTransform(springY, [0, 60], [0, 32])
  // Add horizontal margin for pill effect
  const headerMargin = useTransform(springY, [0, 60], ["0px", "auto"])
  // Add subtle scale effect
  const headerScale = useTransform(springY, [0, 60], [1, 0.98])

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

      <motion.header
        className="sticky z-50 flex justify-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{
          top: headerTop,
          height: headerHeight,
          boxShadow,
          background: `linear-gradient(90deg, rgba(15,23,42,${gradientOpacity.get()}) 0%, rgba(30,41,59,${gradientOpacity.get()}) 50%, rgba(51,65,85,${gradientOpacity.get()}) 100%)`,
          borderRadius: headerRadius,
          width: headerWidth,
          marginLeft: headerMargin,
          marginRight: headerMargin,
          scale: headerScale,
          transition: 'background 0.3s ease-out',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="px-4 md:px-6 lg:px-8 flex w-full max-w-screen-2xl items-center justify-between"
          style={{
            height: '100%',
            minWidth: '320px',
            maxWidth: '100%',
          }}
        >
          {/* Left section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <ScrollToTopLink href="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="relative"
                  style={{ width: logoSize, height: logoSize }}
                >
                  <Image
                    src="/images/autolake-logo.png"
                    alt="AutoLake Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
                    priority
                  />
                </motion.div>
                <motion.span
                  className="text-[#FF5252] font-bold"
                  style={{ fontSize, lineHeight: 1 }}
                >
                  AutoLake
                </motion.span>
              </motion.div>
            </ScrollToTopLink>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <ScrollToTopLink href="/services/ingestion" className="transition-colors hover:text-primary">
                <motion.span 
                  className="transition-colors hover:text-primary"
                  style={{ fontSize: navFontSize }}
                >
                  Solutions
                </motion.span>
              </ScrollToTopLink>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a href="/industries" className="transition-colors hover:text-primary">
                  <motion.span style={{ fontSize: navFontSize }}>
                    Industries
                  </motion.span>
                </a>
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
                <motion.div
                    style={{
                      paddingLeft: buttonPaddingX,
                      paddingRight: buttonPaddingX,
                      paddingTop: buttonPaddingY,
                      paddingBottom: buttonPaddingY,
                      fontSize: buttonFontSize,
                      minHeight: 'auto',
                    }}
                  >
                  <Button size="sm">
                    Get a Demo
                  </Button>
                </motion.div>
              </ScrollToTopLink>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}