"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useSPARouter } from "./spa-router"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function Navbar() {
  const { navigateTo } = useSPARouter()
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  // For smooth animation, use framer-motion's motion values
  const scrollY = useMotionValue(0)
  const darkBackgroundValue = useMotionValue(0) // 0 = light, 1 = dark
  const lastScroll = useRef(0)
  const scrollDirection = useRef('up')

  // Function to detect if navbar is over dark background sections
  const detectDarkBackground = () => {
    // Get navbar position - use dynamic height
    const navbarRect = document.querySelector('header')?.getBoundingClientRect()
    if (!navbarRect) return false
    
    const navbarTop = window.scrollY + navbarRect.top
    const navbarBottom = window.scrollY + navbarRect.bottom
    
    // Check for dark background sections - expanded selector list
    const darkSections = document.querySelectorAll([
      '[class*="bg-black"]',
      '[class*="bg-gray-900"]', 
      '[class*="bg-gray-800"]',
      '[class*="bg-slate-900"]', 
      '[class*="bg-stone-900"]',
      '[class*="bg-zinc-900"]',
      '[class*="bg-neutral-900"]'
    ].join(', '))
    
    for (const section of darkSections) {
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionBottom = window.scrollY + rect.bottom
      
      // Check if navbar overlaps with this dark section
      // Add some padding to account for smooth transitions
      if (navbarBottom > sectionTop - 10 && navbarTop < sectionBottom + 10) {
        return true
      }
    }
    
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Detect scroll direction
      if (currentScrollY > lastScroll.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        scrollDirection.current = 'down'
        setIsVisible(false)
      } else if (currentScrollY < lastScroll.current || currentScrollY <= 100) {
        // Scrolling up or at the top
        scrollDirection.current = 'up'
        setIsVisible(true)
      }
      
      scrollY.set(currentScrollY)
      lastScroll.current = currentScrollY
      
      // Check if over dark background
      const isDark = detectDarkBackground()
      setIsOverDarkBackground(isDark)
      
      // Update motion value for smooth transitions
      darkBackgroundValue.set(isDark ? 1 : 0)
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY, darkBackgroundValue])

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
  const springDark = useSpring(darkBackgroundValue, { stiffness: 200, damping: 30 })
  const headerHeight = useTransform(springY, [0, 60], [maxHeight, minHeight])
  const logoSize = useTransform(springY, [0, 60], [maxLogo, minLogo])
  const fontSize = useTransform(springY, [0, 60], [maxFont, minFont])
  const buttonPaddingX = useTransform(springY, [0, 60], [maxButtonPadding, minButtonPadding])
  const buttonPaddingY = useTransform(springY, [0, 60], [maxButtonPadding * 0.5, minButtonPadding * 0.5])
  const buttonFontSize = useTransform(springY, [0, 60], [maxButtonFont, minButtonFont])
  const navFontSize = useTransform(springY, [0, 60], [14, 12]) // Navigation links font size
  const boxShadow = useTransform(springY, [0, 60], ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.15)"])
    // Background color (white) that transitions from fully transparent to opaque
  const backgroundColor = useTransform(springY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0)"])
  
  // Enhanced pill transformation
  // Animate width from 100vw to 90vw for more subtle pill effect
  const headerWidth = useTransform(springY, [0, 60], ["100vw", "90vw"])
  // Animate top gap: 0px at top, stickyGap when scrolled
  const headerTop = useTransform(springY, [0, 10], [0, stickyGap])
  // Animate border radius: 0px at top, 24px when scrolled for pill effect
  const headerRadius = useTransform(springY, [0, 60], [0, 24])
  // Add horizontal margin for pill effect
  const headerMargin = useTransform(springY, [0, 60], ["0px", "auto"])
  // Add subtle scale effect
  const headerScale = useTransform(springY, [0, 60], [1, 1])
  
  // Dynamic text colors with smooth transitions using motion values
  const textColorTransform = useTransform(springDark, [0, 1], ["rgb(0, 0, 0)", "rgb(255, 255, 255)"])
  const hoverTextColorTransform = useTransform(springDark, [0, 1], ["rgb(55, 65, 81)", "rgb(229, 231, 235)"])

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
        className="sticky z-50 flex justify-center backdrop-blur"
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut"
        }}
        style={{
          top: headerTop,
          height: headerHeight,
          boxShadow,
          background: backgroundColor,
          borderRadius: headerRadius,
          width: headerWidth,
          marginLeft: headerMargin,
          marginRight: headerMargin,
          scale: headerScale,
          border: 'none',
          transition: 'all 0.3s ease-out',
        }}
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
            <div 
              onClick={() => navigateTo('home')} 
              onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}
              tabIndex={0}
              role="button"
              className="flex items-center space-x-2 cursor-pointer"
            >
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
                    alt="Autolake Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_0.3rem_#00000020]"
                    priority
                  />
                </motion.div>
                <motion.span
                  className="font-bold tracking-wider"
                  style={{ 
                    fontSize, 
                    lineHeight: 1, 
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif', 
                    letterSpacing: '0.1em',
                    color: textColorTransform
                  }}
                >
                  AUTOLAKE
                </motion.span>
              </motion.div>
            </div>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div 
                  onClick={() => navigateTo('services-ingestion')} 
                  onKeyDown={(e) => e.key === 'Enter' && navigateTo('services-ingestion')}
                  tabIndex={0}
                  role="button"
                  className="relative block py-2 cursor-pointer"
                >
                  <motion.span 
                    className="hover:text-primary relative z-10"
                    style={{ 
                      fontSize: navFontSize,
                      color: textColorTransform
                    }}
                  >
                    Solutions
                  </motion.span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div 
                  onClick={() => navigateTo('pricing')} 
                  onKeyDown={(e) => e.key === 'Enter' && navigateTo('pricing')}
                  tabIndex={0}
                  role="button"
                  className="relative block py-2 hover:text-primary cursor-pointer"
                >
                  <motion.span 
                    className="relative z-10"
                    style={{ 
                      fontSize: navFontSize,
                      color: textColorTransform
                    }}
                  >
                    Pricing
                  </motion.span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.95, y: 1 }}
            >
              <motion.div
                onClick={() => navigateTo('book-demo')}
                onKeyDown={(e) => e.key === 'Enter' && navigateTo('book-demo')}
                tabIndex={0}
                role="button"
                className="cursor-pointer"
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
            </motion.div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}
