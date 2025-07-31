"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  delay?: number
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsAnimating(true)
    props.onClick?.(event)
  }

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Button
        {...props}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span animate={isHovered ? { scale: 1.05 } : { scale: 1 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.span>
      </Button>
      {isAnimating && (
        <motion.div
          className="absolute inset-0 rounded-md pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.1, 1.2],
            borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,0)", "rgba(255,255,255,0)"],
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.5, 1],
          }}
          onAnimationComplete={() => setIsAnimating(false)}
          style={{
            border: "2px solid",
          }}
        />
      )}
    </motion.div>
  )
}
