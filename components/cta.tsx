"use client"

import Link from "next/link"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { AnimatedButton } from "./animated-button"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-6 h-6 bg-cyan-400/40 rounded-full"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to Transform Your Data?
          </div>
          
          <AnimatedText as="h2" className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Start your data transformation
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              journey today
            </span>
          </AnimatedText>
          
          <AnimatedText delay={0.1} className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join leading companies who trust AutoLake to power their data infrastructure and drive innovation at scale.
          </AnimatedText>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.div
              className="flex items-center gap-2 text-blue-100 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Clock className="w-4 h-4 text-cyan-300" />
              <span>30-minute personalized demo</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-blue-100 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Users className="w-4 h-4 text-cyan-300" />
              <span>Trusted by 500+ companies</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-blue-100 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <TrendingUp className="w-4 h-4 text-cyan-300" />
              <span>Average 3x ROI in 6 months</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/book-demo">
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Schedule Your Demo</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </Link>

          <Link href="/services/ingestion">
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Solutions</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Social proof section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Join industry leaders who chose AutoLake
            </h3>
            <p className="text-blue-100">
              See why companies worldwide trust AutoLake for their data transformation
            </p>
          </div>

          {/* Company logos placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white/60 text-xs font-medium">Company {i}</div>
              </motion.div>
            ))}
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            {[
              { value: "500+", label: "Enterprise Customers", icon: Users },
              { value: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
              { value: "24/7", label: "Expert Support", icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-cyan-300" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}