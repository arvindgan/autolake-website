"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import GoogleCalendarBooking from "./google-calendar-booking"

interface BookingModalProps {
  children: React.ReactNode
  triggerClassName?: string
}

export default function BookingModal({ children, triggerClassName = "" }: BookingModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={triggerClassName}>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="max-w-6xl w-full h-[95vh] max-h-[900px] p-0 bg-white border border-gray-200 shadow-2xl">
          <DialogTitle className="sr-only">Schedule Your Demo</DialogTitle>
          <div className="h-full overflow-hidden bg-white">
            <GoogleCalendarBooking className="h-full w-full" />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}