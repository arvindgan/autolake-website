"use client"

import { Brain, Cloud, Shield, Zap, Database, Layers } from "lucide-react"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import AnimatedCard from "./animated-card"
import AnimatedIcon from "./animated-icon"
import { motion } from "framer-motion"
import { useState } from "react"

const features = [
  {
    name: "AI-Powered Analytics",
    description: "Harness the power of machine learning to derive actionable insights from your data automatically.",
    icon: Brain,
    stats: "Reduce analysis time by up to 60%",
    detail: "Our AI algorithms automatically identify patterns and anomalies, enabling faster decision-making and reducing manual analysis work.",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/60",
  },
  {
    name: "Cloud-Native Architecture",
    description: "Scalable, resilient, and efficient solutions built for the modern cloud ecosystem.",
    icon: Cloud,
    stats: "Scale to petabytes with 99.99% availability",
    detail: "Built on cloud-native principles, AutoLake scales horizontally with your data needs while maintaining enterprise-grade reliability.",
    color: "indigo",
    gradient: "from-indigo-500/10 to-indigo-600/20",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200/60",
  },
  {
    name: "Enterprise-Grade Security",
    description: "State-of-the-art security measures to protect your most valuable data assets.",
    icon: Shield,
    stats: "Compliant with SOC2, GDPR, HIPAA",
    detail: "End-to-end encryption, role-based access controls, and comprehensive audit logs ensure your data remains secure and compliant.",
    color: "emerald",
    gradient: "from-emerald-500/10 to-emerald-600/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200/60",
  },
  {
    name: "High-Performance Systems",
    description: "Optimized for speed and efficiency, delivering unparalleled query performance.",
    icon: Zap,
    stats: "Query performance up to 10x faster",
    detail: "Our optimized query engine and intelligent caching mechanisms deliver responses in milliseconds, even for complex analytics workloads.",
    color: "amber",
    gradient: "from-amber-500/10 to-amber-600/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/60",
  },
  {
    name: "Automated Data Ingestion",
    description: "Seamlessly connect and ingest data from multiple sources with zero configuration.",
    icon: Database,
    stats: "Connect 100+ data sources instantly",
    detail: "Our intelligent connectors automatically detect schema changes and adapt your data pipelines without manual intervention.",
    color: "purple",
    gradient: "from-purple-500/10 to-purple-600/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200/60",
  },
  {
    name: "Smart Data Curation",
    description: "Intelligent data organization and quality management powered by machine learning.",
    icon: Layers,
    stats: "Improve data quality by 85%",
    detail: "Advanced algorithms automatically clean, categorize, and optimize your data for maximum analytical value and business insights.",
    color: "rose",
    gradient: "from-rose-500/10 to-rose-600/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
    borderColor: "border-rose-200/60",
  },
]

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="mx-auto max-w-4xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/60 rounded-full text-blue-700 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Cutting-Edge Technology
            </div>
            <AnimatedText as="h2" className="font-bold text-4xl md:text-5xl text-gray-900 mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                transform your data
              </span>
            </AnimatedText>
            <AnimatedText delay={0.1} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how AutoLake's innovative features can revolutionize your data infrastructure and accelerate your business growth.
            </AnimatedText>
          </motion.div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className={`group relative overflow-hidden rounded-2xl border ${feature.borderColor} bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`p-3 rounded-xl ${feature.iconBg} border border-gray-200/60`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${feature.gradient} border ${feature.borderColor} text-sm font-medium text-gray-700 mb-4`}>
                  <div className={`w-2 h-2 rounded-full ${feature.iconColor.replace('text-', 'bg-')}`} />
                  {feature.stats}
                </div>

                {/* Expandable detail */}
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: hoveredCard === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-4 border-t border-gray-200/60">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative corner element */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-6">Ready to experience these features in action?</p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Demo
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}