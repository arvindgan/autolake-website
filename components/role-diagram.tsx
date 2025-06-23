"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RoleInfo {
  title: string
  description: string
  color: string
  gradient: string
  position: { x: number; y: number }
}

const roles: Record<string, RoleInfo> = {
  "data-scientists": {
    title: "Data Scientists",
    description: "Access to raw data format with SQL querying capabilities for advanced analytics and modeling.",
    color: "rgb(59, 130, 246)", // Blue
    gradient: "from-[#3b82f6]/20 to-[#3b82f6]/20",
    position: { x: -1, y: -1 }, // Top-left quadrant
  },
  "data-engineers": {
    title: "Data Engineers",
    description: "Support for full and incremental data extraction with guaranteed primary keys and change tracking.",
    color: "rgb(168, 85, 247)", // Purple
    gradient: "from-[#a855f7]/20 to-[#a855f7]/20",
    position: { x: 1, y: -1 }, // Top-right quadrant
  },
  stakeholders: {
    title: "Stake-holders",
    description: "Cost-effective data lake as a service with effective governance and security controls.",
    color: "rgb(236, 72, 153)", // Pink
    gradient: "from-[#ec4899]/20 to-[#ec4899]/20",
    position: { x: -1, y: 1 }, // Bottom-left quadrant
  },
  "data-consumers": {
    title: "Data Consumers",
    description:
      "Clear visibility to raw data, single source of truth, and self-service capabilities for business users.",
    color: "rgb(14, 165, 233)", // Sky blue
    gradient: "from-[#0ea5e9]/20 to-[#0ea5e9]/20",
    position: { x: 1, y: 1 }, // Bottom-right quadrant
  },
}

export default function RoleDiagram() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null)

  return (
    <div className="relative mx-auto w-[600px] h-[600px]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Define clip paths for each quadrant */}
          <clipPath id="clip-tl">
            <path d="M50,50 L0,50 A50,50 0 0,1 50,0 Z" />
          </clipPath>
          <clipPath id="clip-tr">
            <path d="M50,50 L100,50 A50,50 0 0,0 50,0 Z" />
          </clipPath>
          <clipPath id="clip-bl">
            <path d="M50,50 L0,50 A50,50 0 0,0 50,100 Z" />
          </clipPath>
          <clipPath id="clip-br">
            <path d="M50,50 L100,50 A50,50 0 0,1 50,100 Z" />
          </clipPath>

          {/* Radial gradients */}
          <radialGradient id="gradient-tl" cx="25%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#60a5fa" /> {/* Lighter blue */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </radialGradient>
          <radialGradient id="gradient-tr" cx="75%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#c4b5fd" /> {/* Lighter purple */}
            <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
          </radialGradient>
          <radialGradient id="gradient-bl" cx="25%" cy="75%" r="70%">
            <stop offset="0%" stopColor="#f9a8d4" /> {/* Lighter pink */}
            <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
          </radialGradient>
          <radialGradient id="gradient-br" cx="75%" cy="75%" r="70%">
            <stop offset="0%" stopColor="#7dd3fc" /> {/* Lighter sky blue */}
            <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky blue */}
          </radialGradient>

          {/* Simple shadow filter */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3" />
          </filter>

          {/* Center gradient */}
          <radialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" /> {/* Slate 800 */}
            <stop offset="100%" stopColor="#0f172a" /> {/* Slate 900 */}
          </radialGradient>
        </defs>

        {/* Background circle */}
        <circle cx="50" cy="50" r="49" fill="#111" filter="url(#shadow)" />
        <circle cx="50" cy="50" r="48" fill="#1a1a1a" />

        {/* Quadrants */}
        <g>
          {/* Top Left - Data Scientists */}
          <motion.g
            clipPath="url(#clip-tl)"
            onMouseEnter={() => setActiveQuadrant("data-scientists")}
            onMouseLeave={() => setActiveQuadrant(null)}
            whileHover={{ scale: 1.1, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <path d="M50,50 L0,50 A50,50 0 0,1 50,0 Z" fill="url(#gradient-tl)" className="cursor-pointer" />
            <text x="25" y="35" fill="white" fontSize="4.5" textAnchor="middle" fontWeight="bold">
              Data
              <tspan x="25" dy="6">
                Scientists
              </tspan>
            </text>
          </motion.g>

          {/* Top Right - Data Engineers */}
          <motion.g
            clipPath="url(#clip-tr)"
            onMouseEnter={() => setActiveQuadrant("data-engineers")}
            onMouseLeave={() => setActiveQuadrant(null)}
            whileHover={{ scale: 1.1, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <path d="M50,50 L100,50 A50,50 0 0,0 50,0 Z" fill="url(#gradient-tr)" className="cursor-pointer" />
            <text x="75" y="35" fill="white" fontSize="4.5" textAnchor="middle" fontWeight="bold">
              Data
              <tspan x="75" dy="6">
                Engineers
              </tspan>
            </text>
          </motion.g>

          {/* Bottom Left - Stakeholders */}
          <motion.g
            clipPath="url(#clip-bl)"
            onMouseEnter={() => setActiveQuadrant("stakeholders")}
            onMouseLeave={() => setActiveQuadrant(null)}
            whileHover={{ scale: 1.1, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <path d="M50,50 L0,50 A50,50 0 0,0 50,100 Z" fill="url(#gradient-bl)" className="cursor-pointer" />
            <text x="25" y="65" fill="white" fontSize="4.5" textAnchor="middle" fontWeight="bold">
              Stake-
              <tspan x="25" dy="6">
                holders
              </tspan>
            </text>
          </motion.g>

          {/* Bottom Right - Data Consumers */}
          <motion.g
            clipPath="url(#clip-br)"
            onMouseEnter={() => setActiveQuadrant("data-consumers")}
            onMouseLeave={() => setActiveQuadrant(null)}
            whileHover={{ scale: 1.1, translateY: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <path d="M50,50 L100,50 A50,50 0 0,1 50,100 Z" fill="url(#gradient-br)" className="cursor-pointer" />
            <text x="75" y="65" fill="white" fontSize="4.5" textAnchor="middle" fontWeight="bold">
              Data
              <tspan x="75" dy="6">
                Consumers
              </tspan>
            </text>
          </motion.g>
        </g>

        {/* Central circle */}
        <circle cx="50" cy="50" r="10" fill="url(#center-gradient)" />
        <circle cx="50" cy="50" r="9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      </svg>

      {/* Popup for role description */}
      <AnimatePresence>
        {activeQuadrant && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute p-4 rounded-lg bg-gradient-to-br ${roles[activeQuadrant].gradient} 
              backdrop-blur-md border border-white/10 shadow-xl w-64`}
            style={{
              left: `${roles[activeQuadrant].position.x > 0 ? "100%" : "0"}`,
              top: `${roles[activeQuadrant].position.y > 0 ? "100%" : "0"}`,
              transform: `translate(${roles[activeQuadrant].position.x > 0 ? "-100%" : "0"}, ${
                roles[activeQuadrant].position.y > 0 ? "-100%" : "0"
              })`,
            }}
          >
            <h4 className="font-semibold text-lg mb-2">{roles[activeQuadrant].title}</h4>
            <p className="text-sm text-white/90">{roles[activeQuadrant].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
