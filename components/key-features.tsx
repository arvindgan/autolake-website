"use client"

import Image from "next/image"
import AnimatedSection from "./animated-section"
import AnimatedText from "./animated-text"
import { motion } from "framer-motion"

const keyFeatures = [
  {
    title: "Answers anything",
    description:
      "Autolake AI answers questions about anything on your screen – assignments, code, docs, slides, and more.",
    img: "/images/answers-anything.png",
    aspect: "1220/1156",
  },
  {
    title: "Transcribes meetings",
    description:
      "Autolake listens into your meetings and takes AI notes in real-time, providing instant answers and suggestions.",
    img: "/images/feature-transcribe.png",
    aspect: "1220/1156",
  },
  {
    title: "One shortcut away",
    description:
      "Autolake always knows what you’re doing and responds with exactly what matters when you need it.",
    img: "/images/feature-shortcut.png",
    aspect: "1220/1156",
  },
]


export default function KeyFeatures() {
  return (
    <AnimatedSection className="container space-y-24 py-24 md:py-32">
      {/* Headline */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="uppercase text-sm tracking-wide text-muted-foreground mb-2">AI assistant for data, insights & more</p>
        <AnimatedText
          as="h2"
          className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl"
        >
          The only real-time AI data lake copilot
        </AnimatedText>
      </div>

      {/* Feature rows */}
      <div className="space-y-24">
        {keyFeatures.map((f, i) => {
          const aspect = f.aspect ?? "";
          return (
          <div
            key={f.title}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              className={i % 2 === 1 ? "md:order-last" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={`relative w-full ${aspect ? `aspect-[${aspect}]` : 'h-[280px] md:h-[360px]' } rounded-3xl overflow-hidden shadow-xl ring-1 ring-border/20`}>
                <Image src={f.img} alt={f.title} fill className={aspect ? 'object-contain' : 'object-cover'} />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className={i % 2 === 1 ? "md:order-first md:text-right md:ml-auto" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={i % 2 === 1 ? "block w-1 h-5 bg-primary mb-4 md:ml-auto" : "block w-1 h-5 bg-primary mb-4"} />
              <h3 className="text-2xl font-semibold mb-4">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">{f.description}</p>
            </motion.div>
          </div>
          );
        })}
      </div>
    </AnimatedSection>
  )
}
