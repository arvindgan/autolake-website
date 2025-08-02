"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"

export default function AutonomousIngestionFeatures() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
  }



  // Modern icon components with improved designs
  const IconComponents = {
    TimeTravel: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Snapshot: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    History: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    FullLoad: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    IncrementalLoad: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    SnapshotLoad: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    AutoScaling: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    AutoIndexing: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    Scheduling: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    ExecutionHistory: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    DataValidation: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    SmartRetry: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  }

  const features = [
    {
      title: "Time Travel",
      description: "Access historical data states at any point in time with precision versioning and rollback capabilities",
      icon: "TimeTravel",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Current Snapshot",
      description: "Real-time view of your data's current state with instant synchronization and monitoring",
      icon: "Snapshot",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      title: "History View",
      description: "Complete audit trail of all data changes with detailed logging and compliance tracking",
      icon: "History",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      title: "Full Load",
      description: "Complete data synchronization capabilities with optimized bulk transfer protocols",
      icon: "FullLoad",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      title: "Incremental Load",
      description: "Efficient delta-only data updates with change detection and minimal resource usage",
      icon: "IncrementalLoad",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      title: "Snapshot Load",
      description: "Point-in-time data capture and loading with consistent state preservation",
      icon: "SnapshotLoad",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      borderColor: "border-pink-200 dark:border-pink-800"
    },
    {
      title: "Auto Pipeline Scaling",
      description: "Dynamic resource allocation based on demand with intelligent load balancing",
      icon: "AutoScaling",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      title: "Auto Indexing",
      description: "Intelligent index creation for optimal performance with automated optimization",
      icon: "AutoIndexing",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
      borderColor: "border-teal-200 dark:border-teal-800"
    },
    {
      title: "Custom Scheduling",
      description: "Flexible scheduling options for data operations with advanced cron and trigger systems",
      icon: "Scheduling",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-200 dark:border-amber-800"
    },
    {
      title: "Execution History",
      description: "Detailed logs and monitoring of all pipeline runs with comprehensive analytics",
      icon: "ExecutionHistory",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50 dark:bg-slate-950/30",
      borderColor: "border-slate-200 dark:border-slate-800"
    },
    {
      title: "Data Validation",
      description: "Automated data quality checks and validation rules with real-time monitoring",
      icon: "DataValidation",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-200 dark:border-emerald-800"
    },
    {
      title: "Smart Retry Logic",
      description: "Intelligent failure recovery with exponential backoff and circuit breaker patterns",
      icon: "SmartRetry",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
      borderColor: "border-violet-200 dark:border-violet-800"
    }
  ]

  // Auto-rotation logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(features.length / 4))
    }, 8000) // Rotate every 8 seconds (much slower)

    return () => clearInterval(timer)
  }, [features.length])

  return (
    <AnimatedSection className="py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={containerVariants}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.p 
              className="uppercase text-sm tracking-wider text-blue-600 dark:text-blue-400 mb-4 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Feature Preview
            </motion.p>
            <AnimatedText
              as="h2"
              className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent"
            >
              Most Widely Used Autonomous Features
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.1}
              className="text-muted-foreground text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed"
            >
              A preview of some of our most widely used autonomous ingestion features 
              that power intelligent data workflows for thousands of enterprises
            </AnimatedText>
          </div>

          {/* Features Slider */}
          <div className="relative mb-16 pb-8 overflow-hidden">
            <motion.div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
              variants={containerVariants}
            >
              {Array.from({ length: Math.ceil(features.length / 4) }).map((_, slideIndex) => (
                <div 
                  key={slideIndex}
                  className="flex-none w-full grid grid-cols-4 gap-6 px-2 py-4"
                >
                  {features
                    .slice(slideIndex * 4, slideIndex * 4 + 4)
                    .map((feature, index) => {
                      const actualIndex = slideIndex * 4 + index
                      return (
              <motion.div
                          key={actualIndex}
                          variants={cardVariants}
                          className="group relative"
                          onHoverStart={() => setHoveredFeature(actualIndex)}
                          onHoverEnd={() => setHoveredFeature(null)}
                        >
                          <div className={`
                            relative h-full p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                            ${feature.bgColor} ${feature.borderColor}
                            hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30
                            hover:scale-105 hover:-translate-y-2
                            ${hoveredFeature === actualIndex ? 'ring-2 ring-blue-500/50' : ''}
                          `}>
                            {/* Icon Container */}
                            <div className={`
                              w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} 
                              flex items-center justify-center mb-4 text-white
                              shadow-lg group-hover:shadow-xl transition-all duration-300
                              group-hover:scale-110
                            `}>
                    {IconComponents[feature.icon as keyof typeof IconComponents]()}
                </div>
                
                            {/* Content */}
                            <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {feature.description}
                            </p>

                            {/* Hover Effect Gradient */}
                            <div className={`
                              absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} 
                              opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none
                            `} />
                  </div>
                        </motion.div>
                      )
                    })}
                </div>
              ))}
            </motion.div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: Math.ceil(features.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-blue-400'
                  }`}
                />
              ))}
                    </div>
          </div>



          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { label: "Featured Capabilities", value: "12" },
              { label: "User Adoption", value: "95%" },
              { label: "Time Saved", value: "80%" },
              { label: "Quick Setup", value: "<5min" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
