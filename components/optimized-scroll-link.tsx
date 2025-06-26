"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface OptimizedScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  asChild?: boolean
}

export function OptimizedScrollLink({ href, children, className, asChild }: OptimizedScrollLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Use requestAnimationFrame for smooth navigation
    requestAnimationFrame(() => {
      router.push(href)
      // Smooth scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    })
  }

  if (asChild) {
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}