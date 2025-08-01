"use client"

import type React from "react"


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
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6">
            Detailed Benefits by User Type
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how AutoLake transforms data workflows for every role in your organization
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {Object.entries(roles).map(([key, role]) => (
            <div
              key={key}
              className="group relative bg-background border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
              
              {/* Card Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{role.title}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                  {role.description}
                </p>

                {/* Features & Examples */}
                <div className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 group/item">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-200`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real-World Examples */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      
                      Real-World Examples
                    </h4>
                    <ul className="space-y-3">
                      {role.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-3 group/item">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
