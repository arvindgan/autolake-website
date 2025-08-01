"use client"

import Image from "next/image"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"

export default function WorksOnAllPlatforms() {
  return (
    <AnimatedSection className="relative py-24 md:py-32 overflow-hidden bg-black text-white">
      {/* Decorative blurred ellipse backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="uppercase text-sm tracking-wide text-gray-400 mb-2">
            Cross-Platform Compatibility
          </p>
          <AnimatedText
            as="h2"
            className="font-bold text-3xl leading-[1.1] sm:text-4xl md:text-5xl"
          >
            Works on all platforms. No meeting bots.
          </AnimatedText>
          <p className="mt-4 text-gray-300 sm:text-lg">
            Transcribe audio and generate AI notes without bots joining your meetings.
          </p>
        </div>

        {/* Cloud provider logos */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8">
          {[
            { src: "/images/aws-logo.png", alt: "AWS" },
            { src: "/images/azure-logo.png", alt: "Azure" },
            { src: "/images/gcp-logo.png", alt: "Google Cloud" },
          ].map((logo) => (
            <div
              key={logo.alt}
              className="relative h-28 w-44 sm:h-36 sm:w-56 rounded-2xl bg-gray-800 border border-gray-600 shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Image src={logo.src} alt={logo.alt} fill className="object-contain p-4" />
            </div>
          ))}
        </div>

        
      </div>
    </AnimatedSection>
  )
}
