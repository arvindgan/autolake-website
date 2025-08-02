import Hero from "@/components/hero"
import KeyFeatures from "@/components/key-features"
import WorksOnAllPlatforms from "@/components/works-on-all-platforms"
import AutonomousIngestionFeatures from "@/components/autonomous-ingestion-features"
import ComparisonTable from "@/components/comparison-table"
import CTA from "@/components/cta"
import FaqSection from "@/components/faq-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeyFeatures />
      <WorksOnAllPlatforms />
      <AutonomousIngestionFeatures />
      <ComparisonTable />
      <FaqSection />
      <CTA />
    </>
  )
}
