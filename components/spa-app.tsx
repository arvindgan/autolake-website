"use client"

import { lazy, Suspense } from "react"
import { useSPARouter, type SPARoute } from "./spa-router"
import Navbar from "./navbar"
import Footer from "./footer"

// Lazy load all page components for code splitting
const HomePage = lazy(() => import("./pages/home-page"))
const PricingPage = lazy(() => import("./pages/pricing-page"))
const ServicesIngestionPage = lazy(() => import("./pages/services-ingestion-page"))
const BookDemoPage = lazy(() => import("./pages/book-demo-page"))
const IndustriesPage = lazy(() => import("./pages/industries-page"))
const AboutUsPage = lazy(() => import("./pages/about-us-page"))

// Loading component for lazy loading
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
)

interface SPAAppProps {
  initialData?: {
    pricingPlans?: any[]
    featureComparison?: any[]
  }
}

export default function SPAApp({ initialData }: SPAAppProps) {
  const { currentRoute } = useSPARouter()

  const renderPage = (route: SPARoute) => {
    switch (route) {
      case 'home':
        return <HomePage />
      case 'pricing':
        return (
          <PricingPage 
            pricingPlans={initialData?.pricingPlans} 
            featureComparison={initialData?.featureComparison} 
          />
        )
      case 'services-ingestion':
        return <ServicesIngestionPage />
      case 'book-demo':
        return <BookDemoPage />
      case 'industries':
        return <IndustriesPage />
      case 'about-us':
        return <AboutUsPage />
      case 'services-curation':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Services - Curation (Coming Soon)</h1>
          </div>
        )
      case 'services-distribution':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Services - Distribution (Coming Soon)</h1>
          </div>
        )
      case 'architecture':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Architecture (Coming Soon)</h1>
          </div>
        )
      default:
        return <HomePage />
    }
  }

  return (
    <div className="relative">
      {/* Simplified background */}
      <div className="pointer-events-none fixed inset-0 bg-background" />

      <div className="relative z-10">
        <Navbar />
        
        {/* Main content area - removed transitions for performance */}
        <Suspense fallback={<PageLoader />}>
          {renderPage(currentRoute)}
        </Suspense>

        <Footer />
      </div>
    </div>
  )
}
