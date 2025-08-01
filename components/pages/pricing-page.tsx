"use client"

import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"
import React, { useState } from "react"
import BookingModal from "@/components/booking-modal"

// Default pricing data (can be overridden by props)
const defaultPricingPlans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    description: "Essential data lake features to get started.",
    buttonText: "Start Free",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Up to 10GB data storage",
      "5 data connectors",
      "Basic data ingestion",
      "Standard data validation",
      "Community support"
    ]
  },
  {
    name: "Pro",
    monthlyPrice: "$1000",
    annualPrice: "$12,000",
    description: "Full autonomous data lake platform",
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Unlimited data storage",
      "All 300+ data connectors",
      "Autonomous ingestion & curation",
      "AI-powered analytics",
      "Time travel & snapshots",
      "Auto-scaling & indexing",
      "Priority support",
      "Plus everything in Free"
    ]
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    description: "For organizations requiring enterprise-grade data solutions.",
    buttonText: "Book a demo",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      "Custom data architecture",
      "Dedicated cloud infrastructure",
      "Enterprise security & compliance",
      "Custom SLAs & support",
      "Advanced governance & auditing",
      "On-premise deployment options",
      "Plus everything in Pro"
    ]
  }
]

const defaultFeatureComparison = [
  {
    category: "Data Storage & Processing",
    items: [
      {
        name: "Data storage capacity",
        free: "10GB",
        pro: "Unlimited",
        enterprise: "Unlimited"
      },
      {
        name: "Data connectors",
        free: "5 connectors",
        pro: "300+ connectors",
        enterprise: "300+ connectors"
      },
      {
        name: "Data ingestion methods",
        free: "Basic",
        pro: "Full + Incremental + Snapshot",
        enterprise: "Full + Incremental + Snapshot"
      },
      {
        name: "Auto-scaling",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "Time travel & versioning",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "AI-powered analytics",
        free: false,
        pro: true,
        enterprise: true
      }
    ]
  },
  {
    category: "Enterprise Features",
    items: [
      {
        name: "Data validation & quality checks",
        free: "Basic",
        pro: "Advanced",
        enterprise: "Enterprise-grade"
      },
      {
        name: "Security & compliance",
        free: "Standard",
        pro: "Advanced",
        enterprise: "SOC2, GDPR, HIPAA"
      },
      {
        name: "Custom data architecture",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Dedicated infrastructure",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "On-premise deployment",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Advanced governance",
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  },
  {
    category: "Support",
    items: [
      {
        name: "Community support",
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: "Priority support",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "Dedicated support manager",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Custom SLAs",
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  }
]

interface PricingPageProps {
  pricingPlans?: typeof defaultPricingPlans
  featureComparison?: typeof defaultFeatureComparison
}

export default function PricingPage({ 
  pricingPlans = defaultPricingPlans, 
  featureComparison = defaultFeatureComparison 
}: PricingPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly")

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

  return (
    <main className="container mx-auto px-4 py-24">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={itemVariants}
        >
          Pricing
        </motion.h1>
                  <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Whether you're building a modern data lake, migrating legacy systems, or scaling data operations, Autolake adapts to your needs.
          </motion.p>
        
        {/* Billing toggle */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <span className={billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annually" : "monthly")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingPeriod === "annually" ? "bg-primary" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingPeriod === "annually" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={billingPeriod === "annually" ? "text-foreground" : "text-muted-foreground"}>
            Annually
          </span>
        </motion.div>
      </motion.div>

      {/* Pricing cards */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`relative rounded-2xl border p-8 ${
              plan.popular 
                ? "bg-gray-900 border-gray-700 text-white" 
                : "bg-background border-border"
            }`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">
                  {billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-muted-foreground ml-1">
                  {billingPeriod === "monthly" ? "/mo" : "/yr"}
                </span>
              </div>
              <p className={plan.popular ? "text-gray-300" : "text-muted-foreground"}>
                {plan.description}
              </p>
            </div>

            <BookingModal>
              <Button 
                className="w-full mb-6" 
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </BookingModal>

            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className={plan.popular ? "text-gray-300" : "text-muted-foreground"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature comparison table */}
      <motion.div
        className="bg-background/50 backdrop-blur-sm rounded-2xl border p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-8 font-medium">Features</th>
                <th className="text-center py-4 px-4 font-medium text-blue-400">Free</th>
                <th className="text-center py-4 px-4 font-medium text-blue-400">Pro</th>
                <th className="text-center py-4 px-4 font-medium text-blue-400">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureComparison.map((category, categoryIndex) => (
                <React.Fragment key={category.category}>
                  <tr>
                    <td colSpan={4} className="py-6">
                      <h3 className="font-semibold text-lg">{category.category}</h3>
                    </td>
                  </tr>
                  {category.items.map((item, index) => (
                    <tr key={`${category.category}-${index}`} className="border-b border-border/50">
                      <td className="py-4 pr-8 text-muted-foreground">{item.name}</td>
                      <td className="text-center py-4 px-4">
                        {typeof item.free === "boolean" ? (
                          item.free ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{item.free}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof item.pro === "boolean" ? (
                          item.pro ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{item.pro}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof item.enterprise === "boolean" ? (
                          item.enterprise ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-500 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{item.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  )
}
