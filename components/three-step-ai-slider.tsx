"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

interface SlideContent {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  alt: string
}

const slides: SlideContent[] = [
  {
    id: "meetings",
    title: "Meetings",
    subtitle: "Three ways real-time AI transforms your productivity and meetings workflow.",
    description: "Cluely automatically takes AI meeting notes, transcribes meetings in real-time, and provides live meeting summaries so you never lose track of what's going on.",
    image: "/images/meetings-slide.png",
    alt: "AI meeting notes and transcription interface"
  },
  {
    id: "sales",
    title: "Sales calls",
    subtitle: "Three ways real-time AI transforms your productivity and meetings workflow.",
    description: "Increase sales revenue with Cluely's real-time AI sales insights, instant objection handling, and product knowledge. Answer any question and close deals faster with personalized, in-meeting support.",
    image: "/images/sales-slide.png",
    alt: "AI sales insights and objection handling interface"
  },
  {
    id: "assist",
    title: "On-screen assist",
    subtitle: "Three ways real-time AI transforms your productivity and meetings workflow.",
    description: "Even without audio, Cluely reads your screen and provides AI suggestions - perfect for live meeting transcripts, AI note taking, studying, coding, or research.",
    image: "/images/assist-slide.png",
    alt: "AI on-screen assistance interface"
  }
]

export default function ThreeStepAISlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to slide index
  const slideProgress = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0, 1, 1, 2, 2])

  useEffect(() => {
    const unsubscribe = slideProgress.onChange((latest) => {
      const newSlide = Math.round(latest)
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
        setCurrentSlide(newSlide)
      }
    })

    return unsubscribe
  }, [slideProgress, currentSlide])

  return (
    <section 
      ref={containerRef}
      className="py-16 min-h-screen"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {slides[currentSlide].subtitle}
          </motion.h2>
        </div>

        {/* Main Slider Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start min-h-[600px]">
          {/* Left side - Text Content */}
          <div className="lg:sticky lg:top-52 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-5xl font-bold text-gray-900 dark:text-white">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Scroll Progress Indicator */}
            <div className="flex gap-2 pt-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? "bg-blue-500 w-12" 
                      : "bg-gray-300 w-6"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Scroll Trigger Areas */}
          <div className="space-y-32">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className="relative h-96"
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: index === currentSlide ? 1 : 0.3,
                  scale: index === currentSlide ? 1 : 0.95
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="sticky top-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Step number indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>
                  {/* Mock Interface based on the slide */}
                  {index === 0 && (
                    <div className="p-6 space-y-4">
                      {/* Meetings Interface */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        </div>
                        <span className="text-sm font-medium">Google Meet</span>
                        <span className="text-xs text-gray-500 ml-auto">18:24</span>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-sm">AI Response</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <p><strong>What did I miss in the last 15 min?</strong></p>
                          <p>Based on the last 15 minutes of discussion, here's what you missed:</p>
                          <p>The team finalized the Q2 launch timeline - Sarah moved the beta testing phase up by one week to start March 1st instead of March 8th. This should give us an extra buffer before the April 15th public release.</p>
                          <p>There was some debate about the marketing budget allocation. Mike suggested increasing social media spend by 20%, but Jennifer pushed back citing the current ROI metrics. They agreed to table this until next week when we have the latest quarterly data.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="p-6 space-y-4">
                      {/* Sales Interface */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        </div>
                        <span className="text-sm font-medium">Zoom</span>
                        <span className="text-xs text-gray-500 ml-auto">11:31</span>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-sm">AI Response</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <p>We're SOC 2 Type II certified and all data is encrypted both in transit and at rest. Your competitor DataCorp just implemented our solution specifically because of our security standards.</p>
                          <p>We also have dedicated data centers in the US and EU to ensure compliance with local regulations. And we never share your data with third parties - ever.</p>
                          <p>With our solution, you'll actually be able to offer them even stronger security guarantees than you do today. We can also provide audit logs and compliance reports that make your annual audits much smoother.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="p-6 space-y-4">
                      {/* On-screen Assist Interface */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <span className="text-sm font-medium">Google Docs</span>
                        <span className="text-xs text-gray-500 ml-auto">00:00</span>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-sm">AI Response</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <p><strong>Question 12:</strong> During photosynthesis, chlorophyll primarily absorbs which wavelengths of light?</p>
                          <p>A) All visible light wavelengths equally<br/>
                          B) Red and blue wavelengths, reflecting green<br/>
                          C) Only ultraviolet wavelengths<br/>
                          D) Green and yellow wavelengths only</p>
                          <p><strong>Answer:</strong> B) Red and blue wavelengths, reflecting green</p>
                          <p><strong>Explanation:</strong> Chlorophyll has two main types - chlorophyll a and chlorophyll b...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="flex justify-center mt-12">
          <motion.div 
            className="text-center text-gray-500 dark:text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm mb-2">Scroll to explore each step</p>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full mx-auto relative">
              <motion.div 
                className="w-1 h-3 bg-gray-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}