import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { SPARouterProvider } from "@/components/spa-router"

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
        <SPARouterProvider>
          {children}
        </SPARouterProvider>
      </body>
    </html>
  )
}
