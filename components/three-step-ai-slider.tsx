"use client"

import { useState, useEffect, useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

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
    subtitle: "Four ways real-time AI transforms your productivity and meetings workflow.",
    description: "Cluely automatically takes AI meeting notes, transcribes meetings in real-time, and provides live meeting summaries so you never lose track of what's going on.",
    image: "/images/meetings-slide.png",
    alt: "AI meeting notes and transcription interface"
  },
  {
    id: "sales",
    title: "Sales calls",
    subtitle: "Four ways real-time AI transforms your productivity and meetings workflow.",
    description: "Increase sales revenue with Cluely's real-time AI sales insights, instant objection handling, and product knowledge. Answer any question and close deals faster with personalized, in-meeting support.",
    image: "/images/sales-slide.png",
    alt: "AI sales insights and objection handling interface"
  },
  {
    id: "assist",
    title: "On-screen assist",
    subtitle: "Four ways real-time AI transforms your productivity and meetings workflow.",
    description: "Even without audio, Cluely reads your screen and provides AI suggestions - perfect for live meeting transcripts, AI note taking, studying, coding, or research.",
    image: "/images/assist-slide.png",
    alt: "AI on-screen assistance interface"
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    subtitle: "Four ways real-time AI transforms your productivity and meetings workflow.",
    description: "Get comprehensive analytics and insights from your data pipelines. Monitor performance, track data quality, and optimize your ingestion processes with intelligent recommendations.",
    image: "/images/2ndstep_ingestion.png",
    alt: "Data analytics and insights dashboard interface"
  }
]

export default function FourStepAISlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to slide index
  const slideProgress = useTransform(scrollYProgress, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1], [0, 0, 1, 1, 2, 2, 3, 3])

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
      className="pt-24 pb-32 min-h-[150vh]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {slides[currentSlide].subtitle}
          </h2>
        </div>

        {/* Main Slider Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start min-h-[600px]">
          {/* Left side - Text Content */}
          <div className="lg:sticky lg:top-52 space-y-6">
            <div className="space-y-6 transition-opacity duration-300">
              <h3 className="text-5xl font-bold text-gray-900 dark:text-white">
                {slides[currentSlide].title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                {slides[currentSlide].description}
              </p>
            </div>

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
          <div>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative h-96 ${
                  index === 0 ? 'mb-48' : index === 1 ? 'mb-96' : index === 2 ? 'mb-96' : ''
                }`}
                style={{
                  opacity: index === currentSlide ? 1 : 0.3,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}
              >
                <div className="sticky top-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Step number indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>
                  {/* Feature Image based on the slide */}
                  {index === 0 && (
                    <div className="relative w-full h-full">
                      <img 
                        src="/images/feature-transcribe.png" 
                        alt="AI transcription and meeting features interface"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="relative w-full h-full">
                      <img 
                        src="/images/2ndstep_ingestion.png" 
                        alt="Data ingestion and pipeline automation interface"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {index === 2 && (
                    <div className="relative w-full h-full">
                      <img 
                        src="/images/2ndstep_ingestion.png" 
                        alt="Data ingestion and pipeline automation interface"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {index === 3 && (
                    <div className="relative w-full h-full">
                      <img 
                        src="/images/2ndstep_ingestion.png" 
                        alt="Data analytics and insights dashboard interface"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Extra spacer to ensure 4th step stickiness */}
            <div className="h-[32rem]"></div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="flex justify-center mt-24">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm mb-2">Scroll to explore each step</p>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full mx-auto relative">
              <div className="w-1 h-3 bg-gray-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
