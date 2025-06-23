"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const DataLakeAnimation = () => {
  const [viewBoxWidth, setViewBoxWidth] = useState(1000)
  const [numStars, setNumStars] = useState(20)

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      // Dynamically adjust viewBox width based on screen width
      setViewBoxWidth(Math.max(1000, width * 1.5))
      // Adjust number of stars based on screen width
      setNumStars(Math.max(20, Math.floor(width / 50)))
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${viewBoxWidth} 1000`} preserveAspectRatio="xMidYMid slice">
        {/* Background */}
        <rect width="100%" height="100%" fill="#0f172a" />

        {/* Data Lake */}
        <motion.path
          d={`M0 700 Q ${viewBoxWidth / 2} 600, ${viewBoxWidth} 700 Q ${viewBoxWidth / 2} 800, 0 700`}
          fill="#1e40af"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Data Streams */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${viewBoxWidth * 0.2 + i * viewBoxWidth * 0.15} 0 
               Q ${viewBoxWidth * 0.25 + i * viewBoxWidth * 0.15} 400, 
                 ${viewBoxWidth * 0.3 + i * viewBoxWidth * 0.15} 700`}
            stroke="#60a5fa"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}

        {/* Data Points (Stars) */}
        {[...Array(numStars)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * viewBoxWidth}
            cy={Math.random() * 1000}
            r="4"
            fill="#f472b6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: Math.random() * 2 }}
          />
        ))}
      </svg>
    </div>
  )
}

export default DataLakeAnimation
