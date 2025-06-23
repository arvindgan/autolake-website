"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu } from "./dropdown-menu"
import { ScrollToTopLink } from "./scroll-to-top-link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position to add animation when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

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
        className={`sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          scrolled ? "bg-background/95" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 md:px-6 lg:px-8 flex h-14 w-full items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <ScrollToTopLink href="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div className="relative h-8 w-8">
                  <Image
                    src="/images/autolake-logo.png"
                    alt="AutoLake Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70]"
                    priority
                  />
                </motion.div>
                <motion.span className="text-[#FF5252] font-bold">AutoLake</motion.span>
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
              <ScrollToTopLink href="/book-demo">
                <Button size="sm">Get a Demo</Button>
              </ScrollToTopLink>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  )
}
