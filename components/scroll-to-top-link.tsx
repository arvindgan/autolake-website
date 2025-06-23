"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import type { PropsWithChildren } from "react"

type ScrollToTopLinkProps = {
  href: string
  className?: string
}

export const ScrollToTopLink: React.FC<PropsWithChildren<ScrollToTopLinkProps>> = ({ children, className, href }) => {
  const router = useRouter()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        router.push(href.toString())
        window.scrollTo(0, 0)
      }}
      className={className}
    >
      {children}
    </button>
  )
}
