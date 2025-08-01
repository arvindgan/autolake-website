import Link from "next/link"
import Image from "next/image"
import { Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-20 bg-gray-900 text-gray-100 border-t border-gray-800 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="relative h-8 w-8">
              <Image src="/images/autolake-logo.png" alt="AutoLake Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-blue-600">AutoLake</span>
          </Link>
          <p className="text-gray-300">Streamlining your data lake, one workflow at a time.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="text-gray-300 hover:text-blue-400">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-gray-300 hover:text-blue-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
                Integrations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us" className="text-gray-300 hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-300 hover:text-blue-400">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-blue-400">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>&copy; 2025 AutoLake. All rights reserved.</p>
      </div>
    </footer>
  )
}
