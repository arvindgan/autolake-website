"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { ChevronDown } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: "How long does it take to set up AutoLake?",
    answer:
      "Most customers are up and running with AutoLake in less than a day. Our automated setup process handles the heavy lifting, allowing you to start ingesting data immediately after configuration.",
  },
  {
    question: "Is my data secure with AutoLake?",
    answer:
      "Absolutely. AutoLake is deployed within your own cloud infrastructure, meaning your data never leaves your environment. We implement enterprise-grade security measures including end-to-end encryption, role-based access controls, and comprehensive audit logging.",
  },
  {
    question: "How does AutoLake handle schema changes?",
    answer:
      "AutoLake automatically detects and adapts to schema changes in your source systems. When a change is detected, AutoLake automatically updates the target schema while preserving historical data, ensuring your analytics and reporting continue to function without interruption.",
  },
  {
    question: "Can AutoLake integrate with my existing BI tools?",
    answer:
      "Yes, AutoLake is designed to work seamlessly with all major business intelligence tools including Tableau, Power BI, Looker, and more. Our standardized data formats and APIs make integration straightforward and efficient.",
  },
  {
    question: "What kind of support does AutoLake provide?",
    answer:
      "We offer comprehensive support including 24/7 technical assistance, regular maintenance updates, and dedicated customer success managers for enterprise customers. Our team of data experts is always available to help you optimize your data lake implementation.",
  },
]

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <AnimatedSection className="py-24 bg-background">
      <div className="container max-w-4xl">
        <AnimatedText as="h2" className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </AnimatedText>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              >
                <h3 className="font-medium">{faq.question}</h3>
                <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 border-t border-border/40 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
