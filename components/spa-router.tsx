"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

// Define all possible routes
export type SPARoute = 
  | 'home' 
  | 'pricing' 
  | 'services-ingestion' 
  | 'services-curation' 
  | 'services-distribution'
  | 'industries' 
  | 'architecture'
  | 'about-us'

interface SPARouterContextType {
  currentRoute: SPARoute
  navigateTo: (route: SPARoute) => void
}

const SPARouterContext = createContext<SPARouterContextType | null>(null)

export function useSPARouter() {
  const context = useContext(SPARouterContext)
  if (!context) {
    throw new Error('useSPARouter must be used within SPARouterProvider')
  }
  return context
}

// Map URL paths to SPA routes
const pathToRoute: Record<string, SPARoute> = {
  '/': 'home',
  '/pricing': 'pricing',
  '/services/ingestion': 'services-ingestion',
  '/services/curation': 'services-curation',
  '/services/distribution': 'services-distribution',
  '/industries': 'industries',
  '/architecture': 'architecture',
  '/about-us': 'about-us',
}

// Map SPA routes to URL paths
const routeToPath: Record<SPARoute, string> = {
  'home': '/',
  'pricing': '/pricing',
  'services-ingestion': '/services/ingestion',
  'services-curation': '/services/curation',
  'services-distribution': '/services/distribution',
  'industries': '/industries',
  'architecture': '/architecture',
  'about-us': '/about-us',
}

interface SPARouterProviderProps {
  children: React.ReactNode
}

export function SPARouterProvider({ children }: SPARouterProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Initialize current route based on URL
  const [currentRoute, setCurrentRoute] = useState<SPARoute>(() => {
    return pathToRoute[pathname] || 'home'
  })

  // Sync with URL changes (for browser back/forward)
  useEffect(() => {
    const route = pathToRoute[pathname] || 'home'
    if (route !== currentRoute) {
      setCurrentRoute(route)
    }
  }, [pathname, currentRoute])

  const navigateTo = useCallback((route: SPARoute) => {
    if (route === currentRoute) return
    
    // Update URL without page reload
    const path = routeToPath[route]
    window.history.pushState({}, '', path)
    
    // Update state immediately for instant UI change
    setCurrentRoute(route)
    
    // Scroll to top instantly
    window.scrollTo(0, 0)
  }, [currentRoute])

  return (
    <SPARouterContext.Provider 
      value={{ 
        currentRoute, 
        navigateTo
      }}
    >
      {children}
    </SPARouterContext.Provider>
  )
}
