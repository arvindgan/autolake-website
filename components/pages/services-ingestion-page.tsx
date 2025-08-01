import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import UserRoleGrid from "@/components/user-role-grid"
import DataFlowDiagram from "@/components/data-flow-diagram"
import IngestionHero from "@/components/ingestion-hero"
import UseCases from "@/components/use-cases"
import DataConnectors from "@/components/data-connectors"
import ThreeStepAISlider from "@/components/three-step-ai-slider"
import GridBackground from "@/components/grid-background"

// Dummy RoleDiagram component to resolve the error. Replace with actual implementation if available.
const RoleDiagram = () => {
  return <div>{/* Placeholder for Role Diagram */}</div>
}

export default function ServicesIngestionPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background with light blue top gradient */}
      <div className="pointer-events-none fixed inset-0">
        {/* Base cream background */}
        <div className="absolute inset-0 bg-background" />
        {/* Enhanced light blue gradient overlay (light mode only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/80 via-blue-100/40 to-transparent dark:hidden" />
      </div>

      <div className="relative z-10">
        <main>
        <div className="container py-12">
          {/* Hero Section with Value Proposition */}
          <IngestionHero />

          {/* Three Step AI Slider - Added between seamless database ingestions and data lake process flow */}
          <ThreeStepAISlider />
        </div>

        {/* Data Flow Diagram - Full width black background section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-black text-white">
          {/* Grid Background with Stars */}
          <GridBackground starCount={50} id="dataflow" className="dataflow-grid" />
          
          {/* Decorative blurred ellipse backgrounds */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <DataFlowDiagram />
          </div>
        </section>

        {/* User Role Grid */}
        <section className="container py-24">
          <UserRoleGrid />
        </section>

        {/* Use Cases */}
        <section className="container py-24">
          <UseCases />
        </section>

        {/* Data Connectors Section */}
        <section>
          <DataConnectors />
        </section>

        {/* CTA Section */}
        <section className="container py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Data Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of companies using AutoLake to build scalable, autonomous data lakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  )
}