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
    <AnimatedSection className="py-24 relative">
      <div className="container max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <AnimatedText as="h2" className="text-4xl font-bold text-center mb-16">
            The traditional data integration model is outdated
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-900/10 rounded-lg p-6 border border-red-900/20">
              <AnimatedText as="h3" delay={0.1} className="text-xl font-medium mb-8 text-red-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Traditional Integration
              </AnimatedText>
              <div className="space-y-6">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={`traditional-${index}`}
                    className="flex items-center gap-3"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  >
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ rotate: [0, 15, -15, 0], transition: { duration: 0.5 } }}
                    >
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.div>
                    <span className="text-muted-foreground">{item.traditional}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-900/20">
              <AnimatedText as="h3" delay={0.1} className="text-xl font-medium mb-8 text-blue-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AutoLake
              </AnimatedText>
              <div className="space-y-6">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={`autolake-${index}`}
                    className="flex items-center gap-3"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  >
                    <motion.div className="flex-shrink-0" whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}>
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span>{item.autolake}</span>
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

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gray-800/30 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-muted-foreground">Faster Implementation</div>
            </motion.div>

            <motion.div
              className="bg-gray-800/30 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">50%</div>
              <div className="text-muted-foreground">Cost Reduction</div>
            </motion.div>

            <motion.div
              className="bg-gray-800/30 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-green-400 mb-2">3x</div>
              <div className="text-muted-foreground">Faster Time to Insight</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default ComparisonTable
