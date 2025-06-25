"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu } from "./dropdown-menu"
import { ScrollToTopLink } from "./scroll-to-top-link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function Navbar() {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollY = useMotionValue(0)
  const lastScroll = useRef(0)

  // Throttled scroll handler for performance (60fps max)
  const throttledScrollHandler = useCallback(() => {
    const currentScroll = window.scrollY
    const scrollThreshold = 50

    // Update scroll state
    setIsScrolled(currentScroll > scrollThreshold)
    scrollY.set(currentScroll)
    lastScroll.current = currentScroll
  }, [scrollY])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          throttledScrollHandler()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [throttledScrollHandler])

  // Smooth spring animations for all properties
  const springConfig = { stiffness: 300, damping: 30 }
  const smoothScrollY = useSpring(scrollY, springConfig)

  // Header dimensions and styling
  const headerHeight = useTransform(smoothScrollY, [0, 50], [80, 60])
  const logoSize = useTransform(smoothScrollY, [0, 50], [50, 40])
  const fontSize = useTransform(smoothScrollY, [0, 50], [16, 14])
  const iconSize = useTransform(smoothScrollY, [0, 50], [24, 20])
  const padding = useTransform(smoothScrollY, [0, 50], [20, 15])
  const boxShadow = useTransform(
    smoothScrollY,
    [0, 50],
    ["0 1px 3px rgba(0,0,0,0.1)", "0 4px 6px rgba(0,0,0,0.1)"]
  )

  // Pill transformation for scrolled state
  const headerWidth = useTransform(smoothScrollY, [0, 50], ["100vw", "calc(100vw - 40px)"])
  const headerTop = useTransform(smoothScrollY, [0, 50], [0, 10])
  const headerRadius = useTransform(smoothScrollY, [0, 50], [0, 16])
  const headerMargin = useTransform(smoothScrollY, [0, 50], ["0px", "20px"])

  const solutionsItems = [
    {
      label: "AutoLake Ingestion Services",
      href: "/services/ingestion",
      definition:
        "Extract data from various sources including databases (Oracle, MS SQL Server, MySQL, Postgres), APIs, and streaming platforms. Users configure connection details securely stored in their cloud account.",
      badge: null,
    },
    {
      label: "AutoLake Curation Services",
      href: "/work-in-progress",
      definition:
        "Transform raw data into organized, analysis-ready information with our Data Vault Warehouse, Star Schema Warehouse, and Operational Data Store services.",
      badge: "Coming Soon",
    },
    {
      label: "AutoLake Distribution Services",
      href: "/work-in-progress",
      definition:
        "Efficiently share and access data across your organization with our Hierarchy Dimension, Flat Dimension, Fly-through Dimension, and Analytics services.",
      badge: "Coming Soon",
    },
  ]

  return (
    <>
      {/* Backdrop blur overlay for dropdowns */}
      {isAnyDropdownOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <motion.header
        className="sticky z-50 flex justify-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/95"
        style={{
          top: headerTop,
          height: headerHeight,
          boxShadow,
          borderRadius: headerRadius,
          width: headerWidth,
          marginLeft: headerMargin,
          marginRight: headerMargin,
          transition: 'all 0.3s ease-out',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="flex w-full max-w-screen-2xl items-center justify-between"
          style={{
            paddingLeft: padding,
            paddingRight: padding,
            paddingTop: padding,
            paddingBottom: padding,
            minHeight: '100%',
          }}
        >
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center space-x-6">
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
                  className="text-[#FF5252] font-bold whitespace-nowrap"
                  style={{ fontSize, lineHeight: 1 }}
                >
                  AutoLake
                </motion.span>
              </motion.div>
            </ScrollToTopLink>

            <nav className="hidden md:flex items-center space-x-6 font-medium">
              <div className="relative">
                <DropdownMenu
                  trigger={
                    <motion.span 
                      className="transition-colors hover:text-primary cursor-pointer"
                      style={{ fontSize }}
                    >
                      Solutions
                    </motion.span>
                  }
                  items={solutionsItems}
                  onOpenChange={setIsAnyDropdownOpen}
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ScrollToTopLink href="/industries-auth">
                  <motion.span 
                    className="transition-colors hover:text-primary"
                    style={{ fontSize }}
                  >
                    Industries
                  </motion.span>
                </ScrollToTopLink>
              </motion.div>
            </nav>
          </div>

          {/* Right section - CTA Button */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollToTopLink href="/book-demo" asChild>
                <Button 
                  className="whitespace-nowrap"
                  style={{
                    fontSize: useTransform(smoothScrollY, [0, 50], [14, 12]),
                    minHeight: '44px', // Ensure touch target size
                    minWidth: '44px',
                  }}
                >
                  Get a Demo
                </Button>
              </ScrollToTopLink>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle (for screens below 768px) */}
          <div className="md:hidden">
            <motion.button
              className="p-2 rounded-md hover:bg-accent"
              style={{
                width: iconSize,
                height: iconSize,
                minWidth: '44px',
                minHeight: '44px',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}