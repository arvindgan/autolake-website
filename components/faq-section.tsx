"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
  category: "setup" | "security" | "integration" | "support"
}

const faqs: FaqItem[] = [
  {
    question: "How quickly can I get AutoLake up and running?",
    answer: "Most customers are operational within 24 hours. Our automated setup process handles infrastructure provisioning, schema detection, and initial data ingestion. You'll receive a personalized onboarding session to ensure optimal configuration for your specific use case.",
    category: "setup"
  },
  {
    question: "How does AutoLake ensure my data remains secure?",
    answer: "AutoLake deploys entirely within your cloud infrastructure, ensuring your data never leaves your environment. We implement enterprise-grade security including end-to-end encryption, role-based access controls, comprehensive audit logging, and compliance with SOC2, GDPR, and HIPAA standards.",
    category: "security"
  },
  {
    question: "Can AutoLake handle schema changes automatically?",
    answer: "Yes, AutoLake continuously monitors your source systems and automatically adapts to schema changes. When changes are detected, AutoLake updates the target schema while preserving historical data and maintaining backward compatibility for your existing analytics and reporting.",
    category: "integration"
  },
  {
    question: "What business intelligence tools does AutoLake support?",
    answer: "AutoLake integrates seamlessly with all major BI platforms including Tableau, Power BI, Looker, Qlik, and more. Our standardized data formats and comprehensive APIs ensure smooth integration with your existing analytics stack and reporting workflows.",
    category: "integration"
  },
  {
    question: "What level of support does AutoLake provide?",
    answer: "We offer comprehensive support including 24/7 technical assistance, regular maintenance updates, dedicated customer success managers for enterprise customers, and access to our team of data engineering experts. Our support team averages a 15-minute response time for critical issues.",
    category: "support"
  },
  {
    question: "How does AutoLake pricing work?",
    answer: "AutoLake uses a transparent, usage-based pricing model. You only pay for the data you process and store, with no upfront costs or long-term commitments. Enterprise customers can opt for predictable monthly pricing with volume discounts and dedicated support.",
    category: "setup"
  },
]

const categoryColors = {
  setup: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "text-blue-600" },
  security: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "text-emerald-600" },
  integration: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: "text-purple-600" },
  support: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: "text-amber-600" },
}

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0) // First item expanded by default
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-gradient-to-b from-purple-50/30 via-gray-50/50 to-blue-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <div className="container relative z-10 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to know
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              about AutoLake
            </span>
          </AnimatedText>
          <AnimatedText delay={0.1} className="text-xl text-gray-600">
            Get answers to the most common questions about our autonomous data lake platform.
          </AnimatedText>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const colors = categoryColors[faq.category]
            const isExpanded = expandedIndex === index
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border ${colors.border} bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -2 }}
              >
                {/* Category indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg.replace('bg-', 'bg-').replace('-50', '-400')}`} />
                
                {/* Question button */}
                <motion.button
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-2xl"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 ${colors.bg} rounded-lg border ${colors.border} mt-1`}>
                      <MessageCircle className={`w-4 h-4 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 pr-4">
                        {faq.question}
                      </h3>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 ${colors.bg} ${colors.border} border rounded-full text-xs font-medium ${colors.text}`}>
                        {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </motion.button>

                {/* Answer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-12 pr-4">
                          <div className={`w-full h-px ${colors.bg.replace('bg-', 'bg-').replace('-50', '-200')} mb-4`} />
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover effect overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${colors.bg.replace('bg-', 'from-').replace('-50', '-50/20')} to-transparent opacity-0 pointer-events-none`}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team of data experts is here to help you understand how AutoLake can transform your data infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </motion.button>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}