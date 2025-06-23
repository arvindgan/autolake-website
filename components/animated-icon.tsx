"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedIconProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedIcon({ children, delay = 0, className = "" }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      whileHover={{
        rotate: [0, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
