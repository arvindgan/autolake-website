"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

type RoleType = "Data Scientists" | "Data Engineers" | "Data Consumers" | "Stakeholders" | null

interface RoleInfo {
  title: string
  description: string[]
  color: string
  textColor: string
  position: { x: number; y: number }
}

const roleData: Record<Exclude<RoleType, null>, RoleInfo> = {
  "Data Scientists": {
    title: "For Data Scientists",
    description: [
      "A single place to get the entire data in the raw format",
      "Data cataloged and accessed via SQL query",
      "Allows augmenting and analyzing the data iteratively",
    ],
    color: "from-blue-400 to-blue-600",
    textColor: "text-blue-100",
    position: { x: 200, y: 200 },
  },
  "Data Engineers": {
    title: "For Data Engineers",
    description: [
      "Support for Full data extraction",
      "Support for Incremental data extraction",
      "Identify records by action (Insert / Update / Delete)",
      "Guarantee primary key for each record",
    ],
    color: "from-purple-400 to-purple-600",
    textColor: "text-purple-100",
    position: { x: -200, y: 200 },
  },
  "Data Consumers": {
    title: "For Data Consumers (End Users)",
    description: [
      "Clear visibility to the raw data",
      "Help identify single source of truth",
      "Help quickly transition from being reactive to be proactive on business outcomes",
      "Self service model",
    ],
    color: "from-green-400 to-green-600",
    textColor: "text-green-100",
    position: { x: -200, y: -200 },
  },
  Stakeholders: {
    title: "For Stakeholders",
    description: [
      "Cost effective - pay only for services utilized",
      "Data lake as a Service",
      "Promotes effective governance",
    ],
    color: "from-red-400 to-red-600",
    textColor: "text-red-100",
    position: { x: 200, y: -200 },
  },
}

export default function UserRoleDiagram() {
  const [activeRole, setActiveRole] = useState<RoleType>(null)

  const getQuadrantPath = useCallback((quadrant: number) => {
    const radius = 150
    const startAngle = (quadrant - 1) * 90
    const endAngle = quadrant * 90
    const startRadians = (startAngle * Math.PI) / 180
    const endRadians = (endAngle * Math.PI) / 180

    const x1 = radius * Math.cos(startRadians)
    const y1 = radius * Math.sin(startRadians)
    const x2 = radius * Math.cos(endRadians)
    const y2 = radius * Math.sin(endRadians)

    return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`
  }, [])

  const handleMouseEnter = useCallback((role: RoleType) => {
    setActiveRole(role)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveRole(null)
  }, [])

  const getConnectorPath = useCallback((role: RoleType) => {
    const { x, y } = roleData[role].position
    const radius = 150
    const angle = Math.atan2(y, x)
    const startX = radius * Math.cos(angle)
    const startY = radius * Math.sin(angle)

    return `M ${startX} ${startY} L ${x * 0.6} ${y * 0.6}`
  }, [])

  return (
    <div className="relative mx-auto my-12 max-w-4xl">
      <svg viewBox="-300 -300 600 600" className="w-full h-auto">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Quadrants */}
        <g filter="url(#glow)">
          <motion.path
            d={getQuadrantPath(1)}
            className="cursor-pointer fill-green-400/20 stroke-green-400/40"
            strokeWidth="1"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => handleMouseEnter("Data Consumers")}
            onMouseLeave={handleMouseLeave}
          />
          <motion.path
            d={getQuadrantPath(2)}
            className="cursor-pointer fill-red-400/20 stroke-red-400/40"
            strokeWidth="1"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => handleMouseEnter("Stakeholders")}
            onMouseLeave={handleMouseLeave}
          />
          <motion.path
            d={getQuadrantPath(3)}
            className="cursor-pointer fill-purple-400/20 stroke-purple-400/40"
            strokeWidth="1"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => handleMouseEnter("Data Engineers")}
            onMouseLeave={handleMouseLeave}
          />
          <motion.path
            d={getQuadrantPath(4)}
            className="cursor-pointer fill-blue-400/20 stroke-blue-400/40"
            strokeWidth="1"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => handleMouseEnter("Data Scientists")}
            onMouseLeave={handleMouseLeave}
          />
        </g>

        {/* Role labels */}
        <text x="-75" y="-75" className="text-xs fill-green-100 font-semibold" textAnchor="middle">
          Data
          <tspan x="-75" dy="15">
            Consumers
          </tspan>
        </text>
        <text x="75" y="-75" className="text-xs fill-red-100 font-semibold" textAnchor="middle">
          Stake-
          <tspan x="75" dy="15">
            holders
          </tspan>
        </text>
        <text x="-75" y="75" className="text-xs fill-purple-100 font-semibold" textAnchor="middle">
          Data
          <tspan x="-75" dy="15">
            Engineers
          </tspan>
        </text>
        <text x="75" y="75" className="text-xs fill-blue-100 font-semibold" textAnchor="middle">
          Data
          <tspan x="75" dy="15">
            Scientists
          </tspan>
        </text>

        {/* 3D Animation */}
        <motion.circle
          cx="0"
          cy="0"
          r="150"
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth="0.5"
          initial={{ rotateX: 0, rotateY: 0 }}
          animate={
            activeRole
              ? {
                  rotateX: [0, 15, 0, -15, 0],
                  rotateY: [0, 15, 0, -15, 0],
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }
              : { rotateX: 0, rotateY: 0 }
          }
        />

        {/* Connector Lines */}
        <AnimatePresence>
          {activeRole && (
            <motion.path
              d={getConnectorPath(activeRole)}
              stroke={`url(#gradient-${activeRole.replace(" ", "-")})`}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
          </linearGradient>
          <linearGradient id="gradient-Data-Consumers" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="gradient-Stakeholders" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="gradient-Data-Engineers" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradient-Data-Scientists" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Info boxes that appear on hover */}
      <AnimatePresence>
        {activeRole && (
          <motion.div
            className={`absolute w-64 rounded-lg border border-${
              roleData[activeRole].color.split(" ")[1]
            }/40 bg-gray-900/95 p-4 shadow-lg backdrop-blur-md`}
            style={{
              left: `calc(50% + ${roleData[activeRole].position.x * 0.7}px)`,
              top: `calc(50% + ${roleData[activeRole].position.y * 0.7}px)`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className={`mb-2 text-lg font-semibold ${roleData[activeRole].textColor}`}>
              {roleData[activeRole].title}
            </h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
              {roleData[activeRole].description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
