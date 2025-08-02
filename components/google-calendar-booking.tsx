"use client"

interface GoogleCalendarBookingProps {
  className?: string
}

export default function GoogleCalendarBooking({ className = "" }: GoogleCalendarBookingProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <iframe 
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3MWkwbywHGrgZYMnxwkTRk5CzhMzoSH2p9lfyVFzh4fW8jHaQyQ-8YK6JuH89BJbtd_aLHu2gC?gv=true" 
        style={{ border: 0 }} 
        width="100%" 
        height="100%" 
        frameBorder="0"
        title="Schedule a Demo"
      />
    </div>
  )
}