import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import KeyFeatures from "@/components/key-features"
import WorksOnAllPlatforms from "@/components/works-on-all-platforms"
import AutonomousIngestionFeatures from "@/components/autonomous-ingestion-features"
import ComparisonTable from "@/components/comparison-table"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import FaqSection from "@/components/faq-section"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-400/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-gray-900/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-blue-300/6 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <KeyFeatures />
        <WorksOnAllPlatforms />
        <AutonomousIngestionFeatures />
        <ComparisonTable />
        <FaqSection />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
