import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import UserRoleGrid from "@/components/user-role-grid"
import DataFlowDiagram from "@/components/data-flow-diagram"
import IngestionHero from "@/components/ingestion-hero"
import UseCases from "@/components/use-cases"
import AutomationShowcase from "@/components/automation-showcase"

// Dummy RoleDiagram component to resolve the error. Replace with actual implementation if available.
const RoleDiagram = () => {
  return <div>{/* Placeholder for Role Diagram */}</div>
}

export default function IngestionServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="container py-12">
          {/* Hero Section with Value Proposition */}
          <IngestionHero />

          {/* Data Flow Diagram - Moved here, between "Trusted by companies worldwide" and "Simple Setup, Powerful Results" */}
          <div className="mb-12 bg-gray-900/30 rounded-lg p-6">
            <DataFlowDiagram />
          </div>

          <section className="mb-24">
            {/* AutomationShowcase with "Simple Setup, Powerful Results" */}
            <AutomationShowcase />

            {/* Real-World Use Cases */}
            <UseCases />

            <div className="mb-16">
              <div className="flex justify-center">
                <RoleDiagram />
              </div>

              {/* Enhanced User Role Grid */}
              <div className="mt-16">
                <UserRoleGrid />
              </div>
            </div>

            {/* Strong CTA */}
            <div className="flex justify-center mb-16">
              <ScrollToTopLink href="/book-demo">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-8">
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </ScrollToTopLink>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
