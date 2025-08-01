"use client"

import { lazy, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.15
}

interface SPAAppProps {
  initialData?: {
    pricingPlans?: any[]
    featureComparison?: any[]
  }
}

export default function SPAApp({ initialData }: SPAAppProps) {
  const { currentRoute, isTransitioning } = useSPARouter()

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
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-400/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-gray-900/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-blue-300/6 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Main content area with transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={isTransitioning ? "pointer-events-none" : ""}
          >
            <Suspense fallback={<PageLoader />}>
              {renderPage(currentRoute)}
            </Suspense>
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  )
}