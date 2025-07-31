import Link from "next/link"
import Image from "next/image"
import { Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20" />
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="relative h-8 w-8">
              <Image src="/images/autolake-logo.png" alt="AutoLake Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-[#FF5252]">AutoLake</span>
          </Link>
          <p className="text-blue-100">Streamlining your data lake, one workflow at a time.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="text-blue-100 hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-blue-100 hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Integrations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us" className="text-blue-100 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:scale-110 transform">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:scale-110 transform">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-blue-700/50 text-center text-blue-100 relative">
        <p>&copy; 2025 AutoLake. All rights reserved.</p>
      </div>
    </footer>
  )
}
