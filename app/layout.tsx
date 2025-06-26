import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import AnimatedPageTransition from "@/components/animated-page-transition"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true,
})

export const metadata: Metadata = {
  title: "AutoLake - Autonomous Data Lake Platform",
  description:
    "Transform your data infrastructure with our autonomous data lake solution. Streamline ingestion, processing, and distribution with enterprise-grade security and governance.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/autolake-logo.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {/* Optimize rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        <AnimatedPageTransition>{children}</AnimatedPageTransition>
      </body>
    </html>
  )
}