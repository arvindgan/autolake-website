import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataArchitecture from "@/components/data-architecture"

export default function ArchitecturePage() {
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
          <h1 className="text-4xl font-bold mb-12">Autonomous Data Lake Architecture</h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-3xl">
            Explore our comprehensive data lake architecture designed to handle complex data workflows with automated
            intelligence and enterprise-grade security.
          </p>
          <DataArchitecture />
        </main>
        <Footer />
      </div>
    </div>
  )
}
