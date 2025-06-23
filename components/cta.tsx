"use client"

import Link from "next/link"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { AnimatedButton } from "./animated-button"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <AnimatedSection className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <AnimatedText as="h2" className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to accelerate your data strategy?
        </AnimatedText>
        <AnimatedText
          delay={0.1}
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        >
          Join leading companies who trust AutoLake to drive their digital transformation and stay ahead in the rapidly
          evolving tech landscape.
        </AnimatedText>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <motion.div
            className="flex items-center text-muted-foreground text-sm gap-2 bg-gray-800/30 px-4 py-2 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Clock className="h-4 w-4" />
            <span>30-minute demo</span>
          </motion.div>

          <motion.div
            className="flex items-center text-muted-foreground text-sm gap-2 bg-gray-800/30 px-4 py-2 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule at your convenience</span>
          </motion.div>
        </div>

        <Link href="/book-demo" className="mt-8">
          <AnimatedButton
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg group"
            delay={0.2}
          >
            <span className="flex items-center">
              Schedule Your Demo Today
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </span>
          </AnimatedButton>
        </Link>
      </div>
    </AnimatedSection>
  )
}
