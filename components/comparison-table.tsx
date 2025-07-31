"use client"

import { motion } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { Check, X, ArrowRight } from "lucide-react"

const ComparisonTable = () => {
  const comparisons = [
    {
      category: "Setup & Configuration",
      traditional: "Manual schema mapping and complex ETL setup",
      autolake: "Automated schema detection and one-click setup",
      impact: "95% faster deployment",
    },
    {
      category: "Data Integration",
      traditional: "Complex, brittle pipelines requiring constant maintenance",
      autolake: "Intelligent, self-healing data pipelines",
      impact: "70% less maintenance",
    },
    {
      category: "Scalability",
      traditional: "Limited scalability with performance bottlenecks",
      autolake: "Infinite horizontal scaling with auto-optimization",
      impact: "10x better performance",
    },
    {
      category: "Error Handling",
      traditional: "Manual error detection and complex recovery processes",
      autolake: "Automated error detection with intelligent recovery",
      impact: "99.9% uptime guarantee",
    },
    {
      category: "Cost Management",
      traditional: "High infrastructure costs with over-provisioning",
      autolake: "Pay-per-use model with intelligent resource optimization",
      impact: "50% cost reduction",
    },
    {
      category: "Time to Insights",
      traditional: "Weeks to months for data availability",
      autolake: "Real-time data availability and instant insights",
      impact: "Minutes vs. months",
    },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-purple-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200/60 rounded-full text-red-700 text-sm font-medium mb-6">
            <X className="w-4 h-4" />
            The Problem with Traditional Approaches
          </div>
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why traditional data integration
            <br />
            <span className="text-red-600">fails modern businesses</span>
          </AnimatedText>
          <AnimatedText delay={0.1} className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how AutoLake's modern approach solves the fundamental problems that plague traditional data infrastructure.
          </AnimatedText>
        </motion.div>

        {/* Comparison Cards */}
        <div className="space-y-6 mb-16">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.category}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Category */}
                  <div className="lg:w-1/4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.category}</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-sm font-medium">
                      <ArrowRight className="w-3 h-3" />
                      {item.impact}
                    </div>
                  </div>

                  {/* Comparison */}
                  <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Traditional Approach */}
                    <motion.div
                      className="relative p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200/60"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <X className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-red-800 mb-1">Traditional Approach</h4>
                          <div className="w-12 h-1 bg-red-300 rounded-full" />
                        </div>
                      </div>
                      <p className="text-red-700 text-sm leading-relaxed">{item.traditional}</p>
                      
                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-red-200/30 rounded-full blur-xl" />
                    </motion.div>

                    {/* AutoLake Approach */}
                    <motion.div
                      className="relative p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/60"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">AutoLake Solution</h4>
                          <div className="w-12 h-1 bg-blue-300 rounded-full" />
                        </div>
                      </div>
                      <p className="text-blue-700 text-sm leading-relaxed">{item.autolake}</p>
                      
                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full blur-xl" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom testimonial and stats */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200/60 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <blockquote className="text-2xl font-medium text-gray-900 mb-4">
              "AutoLake transformed our data infrastructure in just 3 days. What used to take months now happens automatically."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                SJ
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-gray-600">CTO, TechFlow Solutions</div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "95%", label: "Faster Implementation", color: "blue" },
              { value: "50%", label: "Cost Reduction", color: "indigo" },
              { value: "10x", label: "Better Performance", color: "purple" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ComparisonTable