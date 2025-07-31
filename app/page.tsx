import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ComparisonTable from "@/components/comparison-table"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import FaqSection from "@/components/faq-section"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-gradient-to-bl from-blue-400/20 via-purple-400/15 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-gradient-to-tr from-indigo-400/20 via-blue-500/15 to-transparent blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-gradient-to-r from-cyan-300/10 to-blue-300/10 blur-[80px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <ComparisonTable />
        <FaqSection />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
