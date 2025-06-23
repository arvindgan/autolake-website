"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ZoomableSectionProps {
  title: string
  children: React.ReactNode
}

export function ZoomableSection({ title, children }: ZoomableSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <motion.div
      layout
      className={`relative overflow-hidden rounded-lg ${
        isZoomed ? "fixed inset-4 z-50 bg-background/95 backdrop-blur-sm" : ""
      }`}
      animate={{ scale: isZoomed ? 1 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div layout className="p-4">
        <motion.h4 layout className="font-semibold text-lg mb-4">
          {title}
        </motion.h4>
        {children}
      </motion.div>
      {isZoomed && (
        <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsZoomed(false)}>
          &times;
        </button>
      )}
    </motion.div>
  )
}

export function useZoomContext() {
  const [zoomedSection, setZoomedSection] = useState<string | null>(null)
  return { zoomedSection, setZoomedSection }
}
