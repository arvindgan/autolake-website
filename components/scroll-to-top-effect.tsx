"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * Global scroll-to-top effect that runs on every route change.
 * Placing this high in the component tree avoids the need to manually
 * scroll in individual navigation handlers and prevents layout thrashing.
 */
export default function ScrollToTopEffect() {
  const pathname = usePathname()

  useEffect(() => {
    // Instant scroll to top for maximum performance
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
