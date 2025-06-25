"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu } from "./dropdown-menu"
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
  const minLogo = 32 // px
  const maxLogo = 40 // px
  const minFont = 18 // px
  const maxFont = 24 // px
  const stickyGap = 20 // px

  // Use framer-motion's useSpring for smooth transitions
  const springY = useSpring(scrollY, { stiffness: 120, damping: 20 })
  const headerHeight = useTransform(springY, [0, 60], [maxHeight, minHeight])
  const logoSize = useTransform(springY, [0, 60], [maxLogo, minLogo])
  const fontSize = useTransform(springY, [0, 60], [maxFont, minFont])
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
              <div className="relative">
                <DropdownMenu
                  trigger={<span className="transition-colors hover:text-primary">Solutions</span>}
                  items={solutionsItems}
                  onOpenChange={setIsAnyDropdownOpen}
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ScrollToTopLink href="/industries-auth" className="transition-colors hover:text-primary">
                  Industries
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
                <Button size="sm">Get a Demo</Button>
              </ScrollToTopLink>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}