"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Database, Clock, BarChart, Shield } from "lucide-react"

const useCases = [
  {
    icon: <Clock className="h-10 w-10 text-blue-400" />,
    title: "Reduced Integration Time",
    description: "Customers report 70% faster data integration compared to traditional ETL processes.",
    company: "Global Financial Services Corp.",
    quote:
      "AutoLake cut our data integration time from weeks to days, allowing us to respond to market changes faster.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-purple-400" />,
    title: "Real-Time Analytics",
    description: "Enable instant insights with automated data pipelines and real-time processing.",
    company: "TechNova Solutions",
    quote: "We can now analyze customer behavior in real-time, leading to a 25% increase in conversion rates.",
  },
  {
    icon: <Database className="h-10 w-10 text-pink-400" />,
    title: "Unified Data Access",
    description: "Break down data silos with a centralized platform for all your data sources.",
    company: "HealthCare Innovations",
    quote: "AutoLake helped us consolidate 12 different data sources, improving our diagnostic accuracy by 30%.",
  },
  {
    icon: <Shield className="h-10 w-10 text-green-400" />,
    title: "Enhanced Security & Compliance",
    description: "Meet regulatory requirements with built-in governance and security controls.",
    company: "Financial Trust Bank",
    quote: "The robust security features helped us achieve compliance while maintaining high performance.",
  },
]

export default function UseCases() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Real-World Impact</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how organizations across industries are transforming their data infrastructure with AutoLake.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((useCase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden border-gray-200 dark:border-gray-700 bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#f7f8fa] dark:bg-slate-800 p-3">{useCase.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <blockquote className="border-l-2 border-blue-500 pl-4 italic text-sm text-muted-foreground">
                    "{useCase.quote}"
                    <footer className="mt-2 text-xs font-medium text-blue-400">— {useCase.company}</footer>
                  </blockquote>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
