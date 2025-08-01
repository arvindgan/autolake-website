"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, TrendingUp, Shield, Zap } from "lucide-react"

const industries = [
  {
    name: "Financial Services",
    icon: TrendingUp,
    description: "Secure, compliant data lakes for banking, insurance, and fintech companies.",
    features: ["Real-time fraud detection", "Regulatory compliance", "Risk analytics", "Customer insights"]
  },
  {
    name: "Healthcare",
    icon: Shield,
    description: "HIPAA-compliant data infrastructure for healthcare organizations.",
    features: ["Patient data management", "Clinical analytics", "Drug discovery", "Population health"]
  },
  {
    name: "Retail & E-commerce",
    icon: Building2,
    description: "Customer-centric data platforms for retail and e-commerce businesses.",
    features: ["Customer 360", "Inventory optimization", "Personalization", "Supply chain analytics"]
  },
  {
    name: "Technology",
    icon: Zap,
    description: "Scalable data solutions for fast-growing technology companies.",
    features: ["Product analytics", "User behavior", "Performance monitoring", "Growth metrics"]
  }
]

export default function IndustriesPage() {
  return (
    <main className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Industries We Serve
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          AutoLake powers data infrastructure for companies across diverse industries, 
          each with unique requirements and compliance needs.
        </motion.p>
      </div>

      {/* Industries Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {industries.map((industry, index) => {
          const Icon = industry.icon
          return (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{industry.name}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{industry.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Key Capabilities:</h4>
                  <ul className="space-y-1">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center bg-muted/50 rounded-2xl p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Don't See Your Industry?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We work with companies across all industries. Let's discuss how AutoLake 
          can be customized for your specific use case and compliance requirements.
        </p>
        <Button size="lg">
          Schedule a Consultation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </main>
  )
}