"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Beaker, Settings, Users, BarChart } from "lucide-react"

interface RoleInfo {
  title: string
  icon: React.ReactNode
  color: string
  gradient: string
  features: string[]
  examples: string[]
  description: string
}

const roles: Record<string, RoleInfo> = {
  "data-scientists": {
    title: "Data Scientists",
    icon: <Beaker className="h-6 w-6" />,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-900/50 to-blue-800/50",
    features: [
      "Single access point for raw data",
      "SQL-based data cataloging",
      "Iterative analysis without data preparation",
    ],
    examples: [
      "Run SQL queries on raw data instantly",
      "Build ML models with clean data",
      "Analyze trends without preparation delays",
    ],
    description:
      "Access and analyze raw data through SQL queries, enabling advanced analytics without complex data preparation steps.",
  },
  "data-engineers": {
    title: "Data Engineers",
    icon: <Settings className="h-6 w-6" />,
    color: "from-purple-500 to-purple-600",
    gradient: "from-purple-900/50 to-purple-800/50",
    features: [
      "Full & incremental extraction options",
      "Action-based record identification",
      "Primary key enforcement",
    ],
    examples: ["Reduce pipeline development by 60%", "Automate schema detection", "Monitor data quality in real-time"],
    description: "Build reliable data pipelines with flexible extraction options and guaranteed data integrity.",
  },
  "data-consumers": {
    title: "Data Consumers",
    icon: <Users className="h-6 w-6" />,
    color: "from-sky-500 to-sky-600",
    gradient: "from-sky-900/50 to-sky-800/50",
    features: ["Transparent access to raw data", "Single source of truth", "Self-service insights"],
    examples: [
      "Create dashboards without IT assistance",
      "Make data-driven decisions 40% faster",
      "Access trusted data from one platform",
    ],
    description:
      "Gain immediate access to trusted data sources through a self-service model, enabling faster business decisions.",
  },
  stakeholders: {
    title: "Stakeholders",
    icon: <BarChart className="h-6 w-6" />,
    color: "from-pink-500 to-pink-600",
    gradient: "from-pink-900/50 to-pink-800/50",
    features: [
      "Cost-effective, pay-per-use model",
      "Data Lake as a Service approach",
      "Enhanced governance and compliance",
    ],
    examples: ["Reduce infrastructure costs by 50%", "Achieve ROI within 3-6 months", "Meet regulatory requirements"],
    description: "Optimize costs with a pay-per-use model while ensuring proper governance and compliance.",
  },
}

export default function UserRoleGrid() {
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set())
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Detailed Benefits by User Type</h3>
        <p className="text-muted-foreground">
          Hover or click on each panel to explore specific benefits for each user group:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(roles).map(([key, role]) => (
          <motion.div
            key={key}
            className={`relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-background p-6 cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
            initial={false}
            animate={{
              height: expandedRoles.has(key) || hoveredRole === key ? "auto" : "120px",
            }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setExpandedRoles((prev) => {
                const newSet = new Set(prev)
                if (newSet.has(key)) {
                  newSet.delete(key)
                } else {
                  newSet.add(key)
                }
                return newSet
              })
            }}
            onHoverStart={() => setHoveredRole(key)}
            onHoverEnd={() => setHoveredRole(null)}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`p-2 rounded-full bg-gradient-to-br ${role.color} text-white`}>{role.icon}</div>
              <h3 className="text-lg font-medium">{role.title}</h3>
            </div>

            <div className="text-sm text-muted-foreground">
              {expandedRoles.has(key) ? "Click again to collapse" : "Hover to see benefits • Click to keep open"}
            </div>

            <AnimatePresence>
              {(expandedRoles.has(key) || hoveredRole === key) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <p className="text-muted-foreground mb-4">{role.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {role.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span
                              className={`inline-block h-5 w-5 rounded-full bg-gradient-to-br ${role.color} flex-shrink-0 mt-0.5`}
                            >
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Real-World Examples</h4>
                      <ul className="space-y-2">
                        {role.examples.map((example, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
