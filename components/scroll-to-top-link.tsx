"use client"

import type React from "react"
import type { PropsWithChildren } from "react"
import { useRouter } from "next/navigation"
import { Slot } from "@radix-ui/react-slot"

type ScrollToTopLinkProps = {
  href: string
  className?: string
  /**
   * When `asChild` is true, the component will **not** render its own DOM node
   * but instead pass all props (including the click handler) to its single
   * child. This is useful when you want to wrap an existing interactive
   * element (like the `Button` component) without creating invalid nested
   * interactive markup.
   */
  asChild?: boolean
}

export const ScrollToTopLink: React.FC<PropsWithChildren<ScrollToTopLinkProps>> = ({
  children,
  className,
  href,
  asChild = false,
}) => {
  const router = useRouter()

  const Comp: any = asChild ? Slot : "button"

  return (
    <Comp
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        router.push(href.toString())
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
    >
      {children}
    </Comp>
  )
}
