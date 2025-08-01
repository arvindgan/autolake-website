import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import UserRoleGrid from "@/components/user-role-grid"
import DataFlowDiagram from "@/components/data-flow-diagram"
import IngestionHero from "@/components/ingestion-hero"
import UseCases from "@/components/use-cases"

import ThreeStepAISlider from "@/components/three-step-ai-slider"

// Dummy RoleDiagram component to resolve the error. Replace with actual implementation if available.
const RoleDiagram = () => {
  return <div>{/* Placeholder for Role Diagram */}</div>
}

export default function IngestionServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      {/* Background with light blue top gradient */}
      <div className="pointer-events-none fixed inset-0">
        {/* Base cream background */}
        <div className="absolute inset-0 bg-background" />
        {/* Enhanced light blue gradient overlay (light mode only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/80 via-blue-100/40 to-transparent dark:hidden" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <div className="container py-12">
            {/* Hero Section with Value Proposition */}
            <IngestionHero />

            {/* Three Step AI Slider - Added between seamless database ingestions and data lake process flow */}
            <ThreeStepAISlider />
          </div>

          {/* Data Flow Diagram - Full width black background section */}
          <section className="relative py-24 md:py-32 overflow-hidden bg-black text-white">
            {/* Decorative blurred ellipse backgrounds */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/10 blur-3xl" />
            </div>
            
            <div className="container mx-auto">
              <DataFlowDiagram />
            </div>
          </section>

          <div className="container">
            <section className="mb-24 pt-12">
              <div className="mb-16">
                <div className="flex justify-center">
                  <RoleDiagram />
                </div>

                {/* Enhanced User Role Grid */}
                <div className="mt-16">
                  <UserRoleGrid />
                </div>
              </div>

              {/* Real-World Use Cases */}
              <UseCases />

              {/* Strong CTA */}
              <div className="flex justify-center mb-16">
                <ScrollToTopLink href="/book-demo" asChild>
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-8">
                    Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </ScrollToTopLink>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
