"use client"

import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"

const ComparisonTable = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const comparisons = [
    {
      traditional: "Manual schema mapping",
      autolake: "Automated schema detection",
    },
    {
      traditional: "Complex ETL pipelines",
      autolake: "Intelligent data pipelines",
    },
    {
      traditional: "Long implementation cycles",
      autolake: "Rapid deployment",
    },
    {
      traditional: "High maintenance overhead",
      autolake: "Self-maintaining systems",
    },
    {
      traditional: "Limited scalability",
      autolake: "Infinite scalability",
    },
    {
      traditional: "Rigid data transformations",
      autolake: "Flexible transformations",
    },
    {
      traditional: "Complex error handling",
      autolake: "Automated error recovery",
    },
  ]

  return (
    <AnimatedSection className="py-24 bg-gradient-to-br from-black via-gray-900 to-blue-950/30 text-white">
      <div className="container max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-center mb-4">
            The traditional data integration model is outdated
          </AnimatedText>
          <p className="text-center text-gray-300 text-lg mb-20 max-w-3xl mx-auto">
            Modern data teams need solutions that scale automatically, reduce complexity, and deliver results faster.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Traditional Integration Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-red-400">Traditional Integration</h3>
              </div>
              <div className="space-y-4">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={`traditional-${index}`}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-red-500/5 transition-colors duration-200"
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-300 text-base leading-relaxed">{item.traditional}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AutoLake Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-green-400">AutoLake</h3>
              </div>
              <div className="space-y-4">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={`autolake-${index}`}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200"
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-white text-base leading-relaxed font-medium">{item.autolake}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer testimonial */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-900/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  FT
                </div>
              </div>
              <div>
                <p className="text-lg italic mb-4">
                  "AutoLake reduced our data integration time by 70% and cut infrastructure costs by half. The automated
                  schema detection alone saved our team countless hours of manual work."
                </p>
                <div className="flex items-center">
                  <span className="font-medium">Sarah Johnson</span>
                  <span className="mx-2">•</span>
                  <span className="text-muted-foreground">CTO, FinTech Innovations</span>
                </div>
              </div>
            </div>
          </motion.div>


        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default ComparisonTable
