"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Database, Clock, BarChart, Shield } from "lucide-react"

const useCases = [
  {
    icon: <Clock className="h-8 w-8 text-slate-600 dark:text-slate-400" />,
    title: "Reduced Integration Time",
    description: "Customers report 70% faster data integration compared to traditional ETL processes.",
    company: "Global Financial Services Corp.",
    quote:
      "AutoLake cut our data integration time from weeks to days, allowing us to respond to market changes faster.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-slate-600 dark:text-slate-400" />,
    title: "Real-Time Analytics",
    description: "Enable instant insights with automated data pipelines and real-time processing.",
    company: "TechNova Solutions",
    quote: "We can now analyze customer behavior in real-time, leading to a 25% increase in conversion rates.",
  },
  {
    icon: <Database className="h-8 w-8 text-slate-600 dark:text-slate-400" />,
    title: "Unified Data Access",
    description: "Break down data silos with a centralized platform for all your data sources.",
    company: "HealthCare Innovations",
    quote: "AutoLake helped us consolidate 12 different data sources, improving our diagnostic accuracy by 30%.",
  },
  {
    icon: <Shield className="h-8 w-8 text-slate-600 dark:text-slate-400" />,
    title: "Enhanced Security & Compliance",
    description: "Meet regulatory requirements with built-in governance and security controls.",
    company: "Financial Trust Bank",
    quote: "The robust security features helped us achieve compliance while maintaining high performance.",
  },
]

export default function UseCases() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6">
            Real-World Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how organizations across industries are transforming their data infrastructure with AutoLake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-3xl relative">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl" />
                
                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-6">
                    <motion.div 
                      className="rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {useCase.icon}
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {useCase.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {useCase.description}
                      </motion.p>
                      <motion.blockquote 
                        className="border-l-4 border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 pl-6 py-2 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                          "{useCase.quote}"
                        </p>
                        <footer className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                          — {useCase.company}
                        </footer>
                      </motion.blockquote>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
