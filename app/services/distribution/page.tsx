import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, GitBranch, Square, Plane, BarChart } from "lucide-react"

export default function DistributionServicesPage() {
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
        <main className="container py-24">
          <h1 className="mb-6 text-4xl font-bold">AutoLake Distribution Services</h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Our distribution services make it easy to share and access data across your organization, ensuring the right
            people have the right data at the right time. Choose from our specialized distribution services to meet your
            specific data access and analysis needs.
          </p>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <GitBranch className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Hierarchy Dimension Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Hierarchy Dimension Service creates and manages hierarchical data structures, enabling efficient
              drill-down and roll-up operations. This service is ideal for organizations dealing with complex,
              multi-level data relationships.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Support for both balanced and ragged hierarchies</li>
              <li>Automated hierarchy generation and maintenance</li>
              <li>Efficient querying and traversal of hierarchical data</li>
              <li>Integration with popular BI tools for hierarchical reporting</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <Square className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Flat Dimension Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Flat Dimension Service creates denormalized, easy-to-query dimensional structures. This service is
              perfect for scenarios where query performance and simplicity are prioritized over storage efficiency.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Automated denormalization of complex data structures</li>
              <li>Support for high-performance analytical queries</li>
              <li>Easy integration with reporting and dashboarding tools</li>
              <li>Configurable update strategies for dimension changes</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <Plane className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Fly-through Dimension Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Fly-through Dimension Service creates a flexible, hybrid approach to dimensional modeling, combining
              aspects of both hierarchical and flat dimensions. This service is ideal for complex analytical scenarios
              that require both performance and flexibility.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Dynamic generation of dimension structures based on query patterns</li>
              <li>Support for both hierarchical and flat querying paradigms</li>
              <li>Optimized storage and query performance for large, complex dimensions</li>
              <li>Automated maintenance and updates of fly-through structures</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <BarChart className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Analytics Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Analytics Service provides advanced analytical capabilities on top of your distributed data. This
              service enables data scientists and analysts to derive insights and make data-driven decisions quickly and
              efficiently.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>
                Support for various analytical techniques including statistical analysis, machine learning, and data
                mining
              </li>
              <li>Integration with popular data science tools and notebooks</li>
              <li>Scalable computation for large-scale data analysis</li>
              <li>Automated model training, deployment, and monitoring</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
