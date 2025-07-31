import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/images/autolake-logo.png" alt="Autolake Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#FF5252]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Autolake</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-primary">
            Features
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-primary">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-primary">
            Pricing
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  )
}
