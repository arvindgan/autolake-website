"use client"

import { motion } from "framer-motion"

// Create a Star component for the animated stars
const Star = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="currentColor"
      initial={{ opacity: 0.1 }}
      animate={{
        opacity: [0.1, 0.7, 0.1],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Generate stars function
const generateStars = (count: number) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    })
  }
  return stars
}

interface GridBackgroundProps {
  starCount?: number
  className?: string
  id?: string
}

export default function GridBackground({ starCount = 60, className = "", id = "" }: GridBackgroundProps) {
  const stars = generateStars(starCount)
  const uniqueId = id || Math.random().toString(36).substr(2, 9)
  
  // Custom grid sizes based on className
  const isDataflow = className.includes('dataflow-grid')
  const primaryGridSize = isDataflow ? 10 : 20
  const secondaryGridSize = isDataflow ? 20 : 40
  const primaryStrokeWidth = isDataflow ? 0.5 : 1
  const secondaryStrokeWidth = isDataflow ? 0.3 : 0.5

  return (
    <div className={`absolute inset-0 w-full overflow-hidden ${className}`}>
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.08), transparent 70%)",
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.06), transparent 70%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.05), transparent 70%)",
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg className="absolute -top-1/4 -right-1/4 h-[200%] w-[200%] opacity-40" viewBox="0 0 400 400">
          <defs>
            <pattern id={`grid-pattern-${uniqueId}`} width={primaryGridSize} height={primaryGridSize} patternUnits="userSpaceOnUse">
              <path d={`M ${primaryGridSize} 0 L 0 0 0 ${primaryGridSize}`} fill="none" stroke="white" strokeWidth={primaryStrokeWidth} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-pattern-${uniqueId})`} />
        </svg>
        
        {/* Additional grid overlay for more prominent effect */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600">
          <defs>
            <pattern id={`large-grid-${uniqueId}`} width={secondaryGridSize} height={secondaryGridSize} patternUnits="userSpaceOnUse">
              <path d={`M ${secondaryGridSize} 0 L 0 0 0 ${secondaryGridSize}`} fill="none" stroke="white" strokeWidth={secondaryStrokeWidth} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#large-grid-${uniqueId})`} />
          
          {/* Subtle connecting lines between grid points */}
          <g className="opacity-40">
            <line x1="100" y1="100" x2="200" y2="150" stroke="white" strokeWidth="0.2" />
            <line x1="200" y1="150" x2="300" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="300" y1="100" x2="400" y2="200" stroke="white" strokeWidth="0.2" />
            <line x1="400" y1="200" x2="500" y2="150" stroke="white" strokeWidth="0.2" />
            <line x1="500" y1="150" x2="600" y2="250" stroke="white" strokeWidth="0.2" />
            <line x1="600" y1="250" x2="700" y2="200" stroke="white" strokeWidth="0.2" />
            <line x1="700" y1="200" x2="800" y2="300" stroke="white" strokeWidth="0.2" />
            <line x1="800" y1="300" x2="900" y2="250" stroke="white" strokeWidth="0.2" />
            
            {/* Vertical connections */}
            <line x1="150" y1="200" x2="250" y2="300" stroke="white" strokeWidth="0.2" />
            <line x1="250" y1="300" x2="350" y2="250" stroke="white" strokeWidth="0.2" />
            <line x1="350" y1="250" x2="450" y2="350" stroke="white" strokeWidth="0.2" />
            <line x1="450" y1="350" x2="550" y2="300" stroke="white" strokeWidth="0.2" />
            <line x1="550" y1="300" x2="650" y2="400" stroke="white" strokeWidth="0.2" />
            <line x1="650" y1="400" x2="750" y2="350" stroke="white" strokeWidth="0.2" />
            <line x1="750" y1="350" x2="850" y2="450" stroke="white" strokeWidth="0.2" />
          </g>
        </svg>
        <motion.div
          className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-blue-500/5 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Animated stars */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-white">
        {stars.map((star) => (
          <Star key={star.id} x={star.x} y={star.y} size={star.size} delay={star.delay} />
        ))}
      </svg>
    </div>
  )
}