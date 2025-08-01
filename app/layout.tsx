import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"

import ScrollToTopEffect from "@/components/scroll-to-top-effect"
import RoutePrefetcher from "@/components/route-prefetcher"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        {/* Automatically scroll to top on route change */}
        {/* This avoids manually handling scroll in navigation components */}
        <ScrollToTopEffect />
        {/* Prefetch common routes for instant navigation */}
        <RoutePrefetcher />
        {children}
      </body>
    </html>
  )
}
