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
      {/* Simplified background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-blue-50/30 to-background dark:from-background dark:to-background" />

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