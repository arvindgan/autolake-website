"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DefinitionButtonProps {
  term: string
  definition: string
  className?: string
  onZoom?: () => void
  onSelect?: () => void
  isSelected?: boolean
}

export function DefinitionButton({ term, definition, className, onZoom, onSelect, isSelected }: DefinitionButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full font-normal", className, isSelected && "bg-muted/40")}
      onClick={() => {
        if (onZoom) {
          onZoom()
        } else if (onSelect) {
          onSelect()
        }
      }}
    >
      {term}
    </Button>
  )
}
