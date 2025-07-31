"use client"

import { Brain, Cloud, Shield, Zap } from "lucide-react"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import AnimatedCard from "./animated-card"
import AnimatedIcon from "./animated-icon"
import { motion } from "framer-motion"
import { useState } from "react"

const features = [
  {
    name: "AI-Powered Analytics",
    description: "Harness the power of machine learning to derive actionable insights from your data.",
    icon: Brain,
    stats: "Reduce analysis time by up to 60%",
    detail:
      "Our AI algorithms automatically identify patterns and anomalies, enabling faster decision-making and reducing manual analysis work.",
  },
  {
    name: "Cloud-Native Architecture",
    description: "Scalable, resilient, and efficient solutions built for the modern cloud ecosystem.",
    icon: Cloud,
    stats: "Scale to petabytes with 99.99% availability",
    detail:
      "Built on cloud-native principles, AutoLake scales horizontally with your data needs while maintaining enterprise-grade reliability.",
  },
  {
    name: "Enterprise-Grade Security",
    description: "State-of-the-art security measures to protect your most valuable assets.",
    icon: Shield,
    stats: "Compliant with SOC2, GDPR, HIPAA",
    detail:
      "End-to-end encryption, role-based access controls, and comprehensive audit logs ensure your data remains secure and compliant.",
  },
  {
    name: "High-Performance Systems",
    description: "Optimized for speed and efficiency, our solutions deliver unparalleled performance.",
    icon: Zap,
    stats: "Query performance up to 10x faster",
    detail:
      "Our optimized query engine and intelligent caching mechanisms deliver responses in milliseconds, even for complex analytics workloads.",
  },
]

export default function Features() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <AnimatedSection className="container space-y-16 py-24 md:py-32 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30">
      <div className="mx-auto max-w-[58rem] text-center">
        <AnimatedText as="h2" className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Cutting-Edge Solutions
        </AnimatedText>
        <AnimatedText delay={0.1} className="mt-4 text-slate-600 sm:text-lg">
          Discover how AutoLake can transform your business with our innovative technologies.
        </AnimatedText>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature, index) => {
          const isAnimating = expandedCard === index
          return (
            <AnimatedCard key={feature.name} delay={index * 0.1 + 0.2}>
              <motion.div
                className="relative overflow-hidden rounded-xl border border-blue-200/60 bg-white/80 backdrop-blur-sm p-8 group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300/80"
                whileHover={{ y: -5 }}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-center gap-4">
                  <AnimatedIcon delay={index * 0.1 + 0.3}>
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </AnimatedIcon>
                  <AnimatedText as="h3" delay={index * 0.1 + 0.4} className="font-bold text-slate-900 relative z-10">
                    {feature.name}
                  </AnimatedText>
                </div>
                <AnimatedText delay={index * 0.1 + 0.5} className="mt-2 text-slate-600 relative z-10">
                  {feature.description}
                </AnimatedText>

                {/* Stats badge */}
                <div className="mt-4 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 text-sm text-blue-700 font-medium relative z-10">
                  {feature.stats}
                </div>

                {/* Expanded detail on hover */}
                <motion.div
                  className="mt-4 pt-4 border-t border-blue-200 text-sm text-slate-600 relative z-10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={isAnimating ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.detail}
                </motion.div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 text-xs text-slate-500 opacity-60 relative z-10">
                  {expandedCard === index ? "Click to collapse" : "Click for details"}
                </div>
              </motion.div>
            </AnimatedCard>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
