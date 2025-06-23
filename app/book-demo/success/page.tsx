import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"

export default function DemoSuccess() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl py-24 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <CheckCircle className="mx-auto h-24 w-24 text-green-500" />

          <h1 className="text-4xl font-bold">Demo Request Submitted!</h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Thank you for your interest in AutoLake. We've received your demo request and will contact you shortly to
            schedule a time that works for you.
          </p>

          <div className="pt-6">
            <Link href="/">
              <Button size="lg">Return to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
