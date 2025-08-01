import Hero from "@/components/hero"
import KeyFeatures from "@/components/key-features"
import WorksOnAllPlatforms from "@/components/works-on-all-platforms"
import AutonomousIngestionFeatures from "@/components/autonomous-ingestion-features"
import ComparisonTable from "@/components/comparison-table"
import CTA from "@/components/cta"
import FaqSection from "@/components/faq-section"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background with light blue top gradient */}
      <div className="pointer-events-none fixed inset-0">
        {/* Base cream background */}
        <div className="absolute inset-0 bg-background" />
        {/* Enhanced light blue gradient overlay (light mode only) - Extended to cover more sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/80 via-blue-100/40 via-blue-100/30 via-blue-50/20 to-transparent dark:hidden" style={{ height: '100vh' }} />
      </div>

      <div className="relative z-10">
        <Hero />
        <KeyFeatures />
        <WorksOnAllPlatforms />
        <AutonomousIngestionFeatures />
        <ComparisonTable />
        <FaqSection />
        <CTA />
      </div>
    </div>
  )
}