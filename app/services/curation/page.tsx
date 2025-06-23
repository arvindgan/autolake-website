import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Star, Layers } from "lucide-react"

export default function CurationServicesPage() {
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
          <h1 className="mb-6 text-4xl font-bold">AutoLake Curation Services</h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Our curation services transform raw data into valuable, organized information that's ready for analysis and
            consumption. Choose from our specialized curation services to meet your specific data modeling needs.
          </p>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <Database className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Data Vault Warehouse Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Data Vault Warehouse Service implements the Data Vault 2.0 methodology, providing a highly scalable
              and flexible approach to data warehousing. This service is ideal for organizations dealing with complex,
              rapidly changing data environments.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Automated creation of hubs, links, and satellites</li>
              <li>Support for both raw and business vault layers</li>
              <li>Integration with various data sources and formats</li>
              <li>Built-in data lineage and auditability</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <Star className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Star Schema Warehouse Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Star Schema Warehouse Service creates dimensional models optimized for query performance and ease of
              use. This service is perfect for business intelligence and reporting applications that require fast,
              intuitive access to data.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Automated fact and dimension table generation</li>
              <li>Support for slowly changing dimensions (SCD) types 1, 2, and 3</li>
              <li>Intelligent denormalization for improved query performance</li>
              <li>Integration with popular BI tools and platforms</li>
            </ul>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <Layers className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Operational Data Store Service</h2>
            </div>
            <p className="mb-6 text-lg text-muted-foreground">
              Our Operational Data Store (ODS) Service creates a centralized, integrated view of operational data from
              multiple source systems. This service is ideal for organizations that need near real-time access to
              current operational data for reporting and analysis.
            </p>
            <ul className="mb-8 list-inside list-disc space-y-2">
              <li>Real-time data integration from multiple operational systems</li>
              <li>Support for both transactional and analytical queries</li>
              <li>Configurable data retention and archiving policies</li>
              <li>Built-in data quality checks and reconciliation</li>
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
