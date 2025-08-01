"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Database,
  Server,
  BarChart,
  Users,
  Cog,
  Info,
  ArrowRight,
  RefreshCw,
  FileText,
  AlertTriangle,
  Lock,
  Layers,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StageInfo {
  title: string
  description: string
  details: string[]
  icon: React.ReactNode
  color: string
}

const stages: Record<string, StageInfo> = {
  source: {
    title: "Source Systems",
    description: "Databases, APIs, Files",
    details: [
      "Connect to any database or API with secure credential management",
      "Support for structured and semi-structured data formats",
      "Automated schema detection and validation",
    ],
    icon: <Database className="h-8 w-8" />,
    color: "blue",
  },
  ingestion: {
    title: "Ingestion",
    description: "Extract & Load",
    details: [
      "Full and incremental data extraction options",
      "Change data capture (CDC) for efficient updates",
      "Parallel processing for high-volume sources",
    ],
    icon: <Server className="h-8 w-8" />,
    color: "purple",
  },
  processing: {
    title: "Processing",
    description: "Transform & Enrich",
    details: [
      "Data cleansing and standardization",
      "Advanced transformations with SQL or Python",
      "Automated data lineage tracking",
    ],
    icon: <Cog className="h-8 w-8" />,
    color: "indigo",
  },
  analytics: {
    title: "Analytics",
    description: "Insights & Reporting",
    details: [
      "Interactive dashboards and visualizations",
      "Self-service analytics for business users",
      "Integration with popular BI tools",
    ],
    icon: <BarChart className="h-8 w-8" />,
    color: "pink",
  },
  consumption: {
    title: "Consumption",
    description: "Business Users & Applications",
    details: [
      "Role-based access control for secure data sharing",
      "API access for application integration",
      "Customizable views for different user needs",
    ],
    icon: <Users className="h-8 w-8" />,
    color: "green",
  },
}

// Traditional approach has more complex stages
const traditionalStages: Record<string, StageInfo> = {
  source: {
    title: "Multiple Source Systems",
    description: "Siloed Data Sources",
    details: [
      "Manual connection setup for each source system",
      "Complex credential management across platforms",
      "Inconsistent data formats requiring custom handling",
    ],
    icon: <Database className="h-8 w-8" />,
    color: "blue",
  },
  extraction: {
    title: "Data Extraction",
    description: "Custom ETL Scripts",
    details: [
      "Custom code for each data source",
      "Brittle extraction processes that break with schema changes",
      "Limited error handling and recovery options",
    ],
    icon: <FileText className="h-8 w-8" />,
    color: "orange",
  },
  staging: {
    title: "Staging Area",
    description: "Temporary Storage",
    details: [
      "Intermediate storage requiring additional infrastructure",
      "Data duplication increasing storage costs",
      "Complex data reconciliation processes",
    ],
    icon: <Layers className="h-8 w-8" />,
    color: "yellow",
  },
  transformation: {
    title: "Transformation",
    description: "Multiple Processing Steps",
    details: [
      "Complex transformation logic spread across systems",
      "Difficult to maintain and update transformation rules",
      "Performance bottlenecks during processing",
    ],
    icon: <Cog className="h-8 w-8" />,
    color: "indigo",
  },
  validation: {
    title: "Data Validation",
    description: "Quality Checks",
    details: [
      "Manual data quality checks",
      "Separate validation processes requiring additional resources",
      "Delayed detection of data issues",
    ],
    icon: <AlertTriangle className="h-8 w-8" />,
    color: "red",
  },
  loading: {
    title: "Data Loading",
    description: "Warehouse Loading",
    details: [
      "Complex loading procedures with frequent failures",
      "Slow batch processing causing data delays",
      "Limited visibility into loading progress",
    ],
    icon: <RefreshCw className="h-8 w-8" />,
    color: "purple",
  },
  security: {
    title: "Security & Governance",
    description: "Manual Controls",
    details: [
      "Complex security configurations across multiple systems",
      "Inconsistent access controls leading to security risks",
      "Manual compliance reporting processes",
    ],
    icon: <Lock className="h-8 w-8" />,
    color: "gray",
  },
  analytics: {
    title: "Analytics",
    description: "Fragmented Tools",
    details: [
      "Multiple analytics tools with different interfaces",
      "Steep learning curve for business users",
      "Inconsistent results across platforms",
    ],
    icon: <BarChart className="h-8 w-8" />,
    color: "pink",
  },
  consumption: {
    title: "Consumption",
    description: "Limited Access",
    details: [
      "IT-dependent data access processes",
      "Long wait times for new data requests",
      "Limited self-service capabilities",
    ],
    icon: <Users className="h-8 w-8" />,
    color: "green",
  },
}

export default function DataFlowDiagram() {
  const [animate, setAnimate] = useState(false)
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [activeTraditionalStage, setActiveTraditionalStage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("autolake")

  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Optional manual restart for AutoLake, but Traditional stays complete
  useEffect(() => {
    if (animate && activeTab === "autolake") {
      const interval = setInterval(() => {
        setAnimate(false)
        setTimeout(() => setAnimate(true), 100)
      }, 10000) // Restart every 10 seconds only for AutoLake
      return () => clearInterval(interval)
    }
  }, [animate, activeTab])

  const closeZoomedSection = useCallback(() => {
    setActiveStage(null)
    setActiveTraditionalStage(null)
  }, [])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeZoomedSection()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [closeZoomedSection])

  const getColorClass = (color: string) => {
    const colorMap = {
      blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
      pink: "bg-pink-500/10 border-pink-500/30 text-pink-400",
      green: "bg-green-500/10 border-green-500/30 text-green-400",
      orange: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      red: "bg-red-500/10 border-red-500/30 text-red-400",
      gray: "bg-gray-500/10 border-gray-500/30 text-gray-400",
    }
    return colorMap[color] || colorMap.blue
  }

  // Reset and restart animation when changing tabs
  useEffect(() => {
    setAnimate(false)
    setTimeout(() => setAnimate(true), 100)
  }, [activeTab])

  return (
    <div className="w-full py-0 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-4 text-white">Data Lake Process Flow</h3>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Compare AutoLake's streamlined approach with traditional complex data integration processes.
        </p>

        <Tabs defaultValue="autolake" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger
                value="autolake"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                AutoLake Approach
              </TabsTrigger>
              <TabsTrigger
                value="traditional"
                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
              >
                Traditional Approach
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="autolake" className="relative">
            {/* AutoLake Flow Diagram */}
            <div className="relative">
              {/* Main flow path */}
              <svg className="w-full h-[280px]" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background path */}
                <path
                  d="M100,100 L250,100 C275,100 275,150 300,150 L700,150 C725,150 725,100 750,100 L900,100"
                  stroke="#334155"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  fill="none"
                />

                {/* Animated data flow */}
                <motion.path
                  d="M100,100 L250,100 C275,100 275,150 300,150 L700,150 C725,150 725,100 750,100 L900,100"
                  stroke="url(#flowGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    animate && activeTab === "autolake" ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Data particles */}
                {[0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => (
                  <motion.circle
                    key={i}
                    r="6"
                    fill="#60a5fa"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={
                      animate && activeTab === "autolake"
                        ? {
                            opacity: [0, 1, 1, 0],
                            offsetDistance: [`${offset * 100}%`, "100%"],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 5,
                      times: [0, 0.1, 0.9, 1],
                      delay: i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.2,
                    }}
                    style={{
                      offsetPath:
                        "path('M100,100 L250,100 C275,100 275,150 300,150 L700,150 C725,150 725,100 750,100 L900,100')",
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

                {/* Gradient and filter definitions */}
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y1="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
              </svg>

              {/* Stages with icons */}
              <div className="absolute top-0 left-0 w-full flex justify-between px-4">
                {/* Source Systems */}
                <div
                  className="flex flex-col items-center w-40 -ml-4"
                  onMouseEnter={() => setActiveStage("source")}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    className={`relative h-16 w-16 rounded-full ${getColorClass("blue")} flex items-center justify-center mb-4 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Database className="h-8 w-8 text-blue-400" />
                    <motion.div
                      className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Info className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-medium text-center">Source Systems</h4>
                  <p className="text-xs text-center text-muted-foreground mt-1">Databases, APIs, Files</p>
                </div>

                {/* Ingestion */}
                <div
                  className="flex flex-col items-center w-40 mt-12"
                  onMouseEnter={() => setActiveStage("ingestion")}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    className={`relative h-16 w-16 rounded-full ${getColorClass("purple")} flex items-center justify-center mb-4 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Server className="h-8 w-8 text-purple-400" />
                    <motion.div
                      className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Info className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-medium text-center">Ingestion</h4>
                  <p className="text-xs text-center text-muted-foreground mt-1">Extract & Load</p>
                </div>

                {/* Processing */}
                <div
                  className="flex flex-col items-center w-40 mt-12"
                  onMouseEnter={() => setActiveStage("processing")}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    className={`relative h-16 w-16 rounded-full ${getColorClass("indigo")} flex items-center justify-center mb-4 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Cog className="h-8 w-8 text-indigo-400" />
                    <motion.div
                      className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Info className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-medium text-center">Processing</h4>
                  <p className="text-xs text-center text-muted-foreground mt-1">Transform & Enrich</p>
                </div>

                {/* Analytics */}
                <div
                  className="flex flex-col items-center w-40 -mr-4"
                  onMouseEnter={() => setActiveStage("analytics")}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    className={`relative h-16 w-16 rounded-full ${getColorClass("pink")} flex items-center justify-center mb-4 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <BarChart className="h-8 w-8 text-pink-400" />
                    <motion.div
                      className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Info className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-medium text-center">Analytics</h4>
                  <p className="text-xs text-center text-muted-foreground mt-1">Insights & Reporting</p>
                </div>
              </div>

              {/* Consumption layer */}
              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                <div
                  className="flex flex-col items-center"
                  onMouseEnter={() => setActiveStage("consumption")}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <motion.div
                    className={`relative h-16 w-16 rounded-full ${getColorClass("green")} flex items-center justify-center mb-4 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Users className="h-8 w-8 text-green-400" />
                    <motion.div
                      className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Info className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-medium text-center">Consumption</h4>
                  <p className="text-xs text-center text-muted-foreground mt-1">Business Users & Applications</p>
                </div>
              </div>
            </div>

            {/* AutoLake Benefits */}
            <div className="mt-8 p-4 rounded-lg bg-blue-900/20 border border-blue-900/30">
              <h4 className="font-semibold text-blue-400 mb-4">AutoLake Advantages</h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Streamlined 5-step process vs. 9+ traditional steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>95% faster implementation time</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automated schema detection and mapping</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data catalog generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data profiling</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data obfuscation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data migration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data replication</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic data deduplication</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic anomaly detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatic pipeline generation</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="traditional" className="relative">
            {/* Traditional Flow Diagram - More complex with many interconnections */}
            <div className="relative">
              <svg className="w-full h-[400px]" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Complex background paths */}
                <path
                  d="M50,50 L150,50 L150,100 L250,100"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M50,100 L150,100 L150,150 L250,150"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M50,150 L150,150 L150,200 L250,200"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path d="M250,100 L350,100" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M250,150 L350,150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M250,200 L350,200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M350,100 L450,100" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M350,150 L450,150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M350,200 L450,200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path
                  d="M450,100 L550,100 L550,125 L650,125"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M450,150 L550,150 L550,175 L650,175"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M450,200 L550,200 L550,225 L650,225"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M650,125 L750,125 L750,150 L850,150"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M650,175 L750,175 L750,150 L850,150"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M650,225 L750,225 L750,150 L850,150"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M350,100 L350,50 L550,50 L550,100"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M450,200 L450,250 L650,250 L650,225"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M550,100 L650,50 L750,50 L750,125"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path d="M850,150 L950,150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />

                {/* Animated transformation paths for traditional approach */}

                {/* Primary horizontal paths */}
                <motion.path
                  d="M50,50 L150,50 L150,100 L250,100 L350,100 L450,100 L550,100 L550,125 L650,125 L750,125 L750,150 L850,150 L950,150"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                <motion.path
                  d="M50,100 L150,100 L150,150 L250,150 L350,150 L450,150 L550,150 L550,175 L650,175 L750,175 L750,150 L850,150 L950,150"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                <motion.path
                  d="M50,150 L150,150 L150,200 L250,200 L350,200 L450,200 L550,200 L550,225 L650,225 L750,225 L750,150 L850,150 L950,150"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                {/* Vertical interconnecting paths */}
                <motion.path
                  d="M350,100 L350,50 L550,50 L550,100"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                <motion.path
                  d="M450,200 L450,250 L650,250 L650,225"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                <motion.path
                  d="M550,100 L650,50 L750,50 L750,125"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                {/* Additional cross-connections */}
                <motion.path
                  d="M250,150 L250,100"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                <motion.path
                  d="M350,150 L350,200"
                  stroke="url(#traditionalGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={
                    animate && activeTab === "traditional"
                      ? {
                          pathLength: [0, 1],
                          opacity: [0, 1, 1],
                        }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 5,
                    delay: 0,
                    repeat: 0, // No repeat
                  }}
                />

                {/* Animated data particles - more chaotic for traditional approach */}
                {[0, 0.1, 0.2, 0.3, 0.4].map((offset, i) => (
                  <motion.circle
                    key={`p1-${i}`}
                    r="4"
                    fill="url(#traditionalGradient)"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={
                      animate && activeTab === "traditional"
                        ? {
                            opacity: [0, 1, 1, 0],
                            offsetDistance: [`${offset * 100}%`, "100%"],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 5,
                      times: [0, 0.1, 0.9, 1],
                      delay: i * 0.1,
                      repeat: 0, // No repeat
                    }}
                    style={{
                      offsetPath:
                        "path('M50,50 L150,50 L150,100 L250,100 L350,100 L450,100 L550,100 L550,125 L650,125 L750,125 L750,150 L850,150 L950,150')",
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

                {[0, 0.1, 0.2, 0.3, 0.4].map((offset, i) => (
                  <motion.circle
                    key={`p2-${i}`}
                    r="4"
                    fill="url(#traditionalGradient)"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={
                      animate && activeTab === "traditional"
                        ? {
                            opacity: [0, 1, 1, 0],
                            offsetDistance: [`${offset * 100}%`, "100%"],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 5,
                      times: [0, 0.1, 0.9, 1],
                      delay: i * 0.1 + 0.2,
                      repeat: 0, // No repeat
                    }}
                    style={{
                      offsetPath:
                        "path('M50,100 L150,100 L150,150 L250,150 L350,150 L450,150 L550,150 L550,175 L650,175 L750,175 L750,150 L850,150 L950,150')",
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

                {[0, 0.1, 0.2, 0.3, 0.4].map((offset, i) => (
                  <motion.circle
                    key={`p3-${i}`}
                    r="4"
                    fill="url(#traditionalGradient)"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={
                      animate && activeTab === "traditional"
                        ? {
                            opacity: [0, 1, 1, 0],
                            offsetDistance: [`${offset * 100}%`, "100%"],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 5,
                      times: [0, 0.1, 0.9, 1],
                      delay: i * 0.1 + 0.4,
                      repeat: 0, // No repeat
                    }}
                    style={{
                      offsetPath:
                        "path('M50,150 L150,150 L150,200 L250,200 L350,200 L450,200 L550,200 L550,225 L650,225 L750,225 L750,150 L850,150 L950,150')",
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

                {/* Gradient and filter definitions */}
                <defs>
                  <linearGradient id="traditionalGradient" x1="0%" y1="0%" x2="100%" y1="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Traditional stages - positioned to align with the SVG paths */}
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Source Systems */}
                <div
                  className="absolute left-[2%] top-[8%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("source")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("blue")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Database className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Multiple Sources</h4>
                </div>

                {/* Extraction */}
                <div
                  className="absolute left-[22%] top-[33%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("extraction")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("orange")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FileText className="h-6 w-6 text-orange-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Data Extraction</h4>
                </div>

                {/* Staging */}
                <div
                  className="absolute left-[32%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("staging")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("yellow")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Layers className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Staging Area</h4>
                </div>

                {/* Transformation */}
                <div
                  className="absolute left-[42%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("transformation")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("indigo")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Cog className="h-6 w-6 text-indigo-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Transformation</h4>
                </div>

                {/* Validation */}
                <div
                  className="absolute left-[62%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("validation")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("red")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Data Validation</h4>
                </div>

                {/* Loading */}
                <div
                  className="absolute left-[72%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("loading")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("purple")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <RefreshCw className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Data Loading</h4>
                </div>

                {/* Security */}
                <div
                  className="absolute left-[82%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("security")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("gray")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Lock className="h-6 w-6 text-gray-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Security & Governance</h4>
                </div>

                {/* Analytics */}
                <div
                  className="absolute left-[92%] top-[50%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("analytics")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("pink")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <BarChart className="h-6 w-6 text-pink-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Analytics</h4>
                </div>

                {/* Consumption */}
                <div
                  className="absolute left-[92%] top-[67%] flex flex-col items-center w-20"
                  onMouseEnter={() => setActiveTraditionalStage("consumption")}
                  onMouseLeave={() => setActiveTraditionalStage(null)}
                >
                  <motion.div
                    className={`relative h-10 w-10 rounded-full ${getColorClass("green")} flex items-center justify-center mb-2 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Users className="h-6 w-6 text-green-400" />
                  </motion.div>
                  <h4 className="font-medium text-center text-xs">Consumption</h4>
                </div>
              </div>

              {/* Traditional Approach Challenges */}
              <div className="mt-8 p-4 rounded-lg bg-red-900/20 border border-red-900/30">
                <h4 className="font-semibold text-red-400 mb-2">Traditional Approach Challenges</h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm">Complex, brittle pipelines requiring constant maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm">Weeks to months of implementation time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm">Manual schema mapping and error-prone transformations</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Legend */}
        <div className="flex justify-center mt-8 gap-8">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Data Flow</span>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Transformation Process</span>
          </div>
        </div>
      </div>

      {/* Popup with stage details */}
      <AnimatePresence>
        {activeStage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 w-72 rounded-lg border border-${stages[activeStage].color}-500/30 bg-gray-900/95 p-4 shadow-lg backdrop-blur-md`}
            style={{
              top: activeStage === "consumption" ? "-180px" : "50px",
              left: (() => {
                switch (activeStage) {
                  case "source":
                    return "0px"
                  case "ingestion":
                    return "25%"
                  case "processing":
                    return "50%"
                  case "analytics":
                    return "calc(100% - 288px)"
                  case "consumption":
                    return "50%"
                  default:
                    return "50%"
                }
              })(),
              transform: activeStage === "consumption" ? "translateX(-50%)" : "none",
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`rounded-full ${getColorClass(stages[activeStage].color)} p-2 mt-1`}>
                {stages[activeStage].icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{stages[activeStage].title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{stages[activeStage].description}</p>
                <ul className="space-y-2">
                  {stages[activeStage].details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-${stages[activeStage].color}-500 flex-shrink-0 mt-0.5`}
                      >
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup with traditional stage details */}
      <AnimatePresence>
        {activeTraditionalStage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 w-72 rounded-lg border border-${traditionalStages[activeTraditionalStage].color}-500/30 bg-gray-900/95 p-4 shadow-lg backdrop-blur-md`}
            style={{
              top: "50px",
              left: (() => {
                const index = Object.keys(traditionalStages).indexOf(activeTraditionalStage)
                return `${(index + 0.5) * 10}%`
              })(),
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className={`rounded-full ${getColorClass(traditionalStages[activeTraditionalStage].color)} p-2 mt-1`}
              >
                {traditionalStages[activeTraditionalStage].icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{traditionalStages[activeTraditionalStage].title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {traditionalStages[activeTraditionalStage].description}
                </p>
                <ul className="space-y-2">
                  {traditionalStages[activeTraditionalStage].details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-${traditionalStages[activeTraditionalStage].color}-500 flex-shrink-0 mt-0.5`}
                      >
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison summary */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-blue-900/20 border border-blue-900/30">
          <h4 className="font-semibold text-xl text-blue-400 mb-4">AutoLake Approach</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Streamlined 3-step process with automated connections</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Intelligent schema detection and mapping</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Built-in security and governance</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Self-service analytics for business users</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Self service ingestion with no coding</span>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-red-900/20 border border-red-900/30">
          <h4 className="font-semibold text-xl text-red-400 mb-4">Traditional Approach</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Complex 9+ step process with manual handoffs</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Custom code for each data source and transformation</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Siloed security implementations</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>IT-dependent data access and reporting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
