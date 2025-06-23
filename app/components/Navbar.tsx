import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/images/autolake-logo.png" alt="AutoLake Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-[#FF5252]">AutoLake</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Pricing
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Resources
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Community
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  Download
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm">
              Sign In
            </Button>
            <Button className="text-sm bg-gradient-to-r from-primary to-accent hover:opacity-90">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
