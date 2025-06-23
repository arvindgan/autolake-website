"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollToTopLink } from "./scroll-to-top-link"
import { Badge } from "@/components/ui/badge"

interface DropdownItem {
  label: string
  href: string
  definition: string
  badge?: string | null
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({ trigger, items, onOpenChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
    onOpenChange?.(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      onOpenChange?.(false)
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <div className="cursor-pointer">{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 mt-2 w-[600px] rounded-lg border border-border/40 bg-background/95 p-4 shadow-lg backdrop-blur-md"
            style={{ top: "100%" }} // Position directly under the trigger element
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid gap-4">
              {items.map((item, index) => (
                <ScrollToTopLink
                  key={index}
                  href={item.href}
                  className="block rounded-md p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold">{item.label}</h3>
                    {item.badge && (
                      <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.definition}</p>
                </ScrollToTopLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
