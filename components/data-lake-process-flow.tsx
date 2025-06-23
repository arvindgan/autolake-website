"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Server, Cog, BarChart, Users, FileText, Layers, AlertTriangle, Lock, RefreshCw } from "lucide-react"

export default function DataLakeProcessFlow() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Data Lake Process Flow</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare AutoLake's streamlined approach with traditional complex data integration processes.
        </p>
      </div>

      <Tabs defaultValue="autolake" className="w-full">
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
          <div className="relative h-[300px] bg-gray-900/50 rounded-lg overflow-hidden">
            {/* SVG for AutoLake flow */}
            <svg className="w-full h-full" viewBox="0 0 1000 300">
              {/* Animated path */}
              <motion.path
                d="M100,150 L300,150 C350,150 350,150 400,150 L600,150 C650,150 650,150 700,150 L900,150"
                stroke="url(#flowGradient)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Icons */}
            <div className="absolute inset-0 flex justify-between items-center px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-blue-500/20">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-sm">Source Systems</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-purple-500/20">
                  <Server className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-sm">Ingestion</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-indigo-500/20">
                  <Cog className="h-6 w-6 text-indigo-400" />
                </div>
                <span className="text-sm">Processing</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-pink-500/20">
                  <BarChart className="h-6 w-6 text-pink-400" />
                </div>
                <span className="text-sm">Analytics</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-green-500/20">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-sm">Consumption</span>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-lg bg-blue-900/20 border border-blue-900/30">
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
                <span>70% faster implementation time</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-blue-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Automated schema detection and mapping</span>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="traditional" className="relative">
          <div className="relative h-[300px] bg-gray-900/50 rounded-lg overflow-hidden">
            {/* Traditional approach visualization */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="grid grid-cols-3 gap-8 px-8">
                {[
                  { icon: <Database className="h-6 w-6" />, label: "Multiple Sources" },
                  { icon: <FileText className="h-6 w-6" />, label: "Data Extraction" },
                  { icon: <Layers className="h-6 w-6" />, label: "Staging Area" },
                  { icon: <Cog className="h-6 w-6" />, label: "Transformation" },
                  { icon: <AlertTriangle className="h-6 w-6" />, label: "Data Validation" },
                  { icon: <RefreshCw className="h-6 w-6" />, label: "Data Loading" },
                  { icon: <Lock className="h-6 w-6" />, label: "Security" },
                  { icon: <BarChart className="h-6 w-6" />, label: "Analytics" },
                  { icon: <Users className="h-6 w-6" />, label: "Consumption" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="p-4 rounded-full bg-gray-800/50">{item.icon}</div>
                    <span className="text-sm text-center">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-lg bg-red-900/20 border border-red-900/30">
            <h4 className="font-semibold text-red-400 mb-4">Traditional Approach Challenges</h4>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span>Complex, brittle pipelines requiring constant maintenance</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span>Weeks to months of implementation time</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="h-3 w-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span>Manual schema mapping and error-prone transformations</span>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
