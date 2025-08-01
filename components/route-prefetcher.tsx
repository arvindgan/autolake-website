"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Proactively prefetches key routes to make navigation instant.
 * Uses Next.js router.prefetch() to warm up commonly-visited pages.
 */
export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    // Only prefetch in production for optimal user experience
    if (process.env.NODE_ENV === 'production') {
      // Prefetch high-traffic routes after initial load
      const prefetchRoutes = [
        '/pricing',
        '/services/ingestion', 
        '/services/curation',
        '/services/distribution',
        '/book-demo',
        '/industries',
        '/architecture'
      ]

      const timeout = setTimeout(() => {
        prefetchRoutes.forEach(route => {
          router.prefetch(route)
        })
      }, 1000) // Wait 1s after initial load to avoid blocking critical rendering

      return () => clearTimeout(timeout)
    }
  }, [router])

  return null
}