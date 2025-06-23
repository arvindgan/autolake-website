"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Award, Clock, Zap, Heart, Shield } from "lucide-react"
import Image from "next/image"
import AnimatedSection from "@/components/animated-section"
import AnimatedText from "@/components/animated-text"
import { AnimatedButton } from "@/components/animated-button"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"

// Team members data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    bio: "Former CTO at TechVision with 15+ years of experience in data infrastructure and cloud computing.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Previously led data engineering at DataStream. Expert in distributed systems and data architecture.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Product",
    bio: "Product leader with experience at major tech companies. Passionate about user-centered design.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Engineering leader with a background in building scalable data platforms for Fortune 500 companies.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Priya Patel",
    role: "Head of Customer Success",
    bio: "Dedicated to ensuring customers achieve their goals with AutoLake's solutions.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "James Wilson",
    role: "Head of Sales",
    bio: "Experienced in enterprise software sales with a deep understanding of data infrastructure needs.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Company values data
const companyValues = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer-Centric",
    description: "We put our customers at the center of everything we do, ensuring their success is our success.",
    color: "blue",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Innovation-Driven",
    description: "We constantly push the boundaries of what's possible in data infrastructure and analytics.",
    color: "purple",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description: "We strive for excellence in our products, our service, and our relationships.",
    color: "pink",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security & Trust",
    description: "We prioritize the security and privacy of our customers' data above all else.",
    color: "green",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Passion",
    description: "We're passionate about helping organizations unlock the full potential of their data.",
    color: "red",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Agility",
    description: "We move quickly and adapt to changing technologies and customer needs.",
    color: "yellow",
  },
]

// Company milestones
const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "AutoLake was founded by Sarah Johnson and Michael Chen with a vision to revolutionize data lakes.",
  },
  {
    year: "2021",
    title: "Seed Funding",
    description: "Secured $5M in seed funding to accelerate product development and expand the team.",
  },
  {
    year: "2022",
    title: "First Enterprise Customer",
    description: "Signed our first enterprise customer, a Fortune 500 financial services company.",
  },
  {
    year: "2023",
    title: "Series A Funding",
    description: "Raised $25M in Series A funding to scale operations and expand market reach.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Expanded operations to Europe and Asia, with customers in over 20 countries.",
  },
  {
    year: "2025",
    title: "Industry Recognition",
    description: "Named a leader in the Gartner Magic Quadrant for Data Lake Solutions.",
    badge: "Latest",
  },
]

// Helper function for color classes
const getColorClass = (color) => {
  const colorMap = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    pink: "bg-pink-500/10 border-pink-500/30 text-pink-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  }
  return colorMap[color] || colorMap.blue
}

export default function AboutUsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = sessionStorage.getItem("aboutUsAuthenticated") === "true"
    setIsAuthenticated(authenticated)
    setIsLoading(false)

    // If not authenticated, redirect to auth page
    if (!authenticated) {
      router.push("/about-us-auth")
    }
  }, [router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // If authenticated, show the about us content
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
          {/* Hero Section */}
          <AnimatedSection className="mb-24 text-center">
            <AnimatedText as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AutoLake
              </span>
            </AnimatedText>
            <AnimatedText delay={0.1} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Pioneering the future of data infrastructure with innovative, secure, and scalable solutions.
            </AnimatedText>

            {/* Company Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                className="bg-gray-800/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
                <div className="text-muted-foreground">Enterprise Customers</div>
              </motion.div>

              <motion.div
                className="bg-gray-800/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </motion.div>

              <motion.div
                className="bg-gray-800/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
                <div className="text-muted-foreground">Team Members</div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Our Story Section */}
          <AnimatedSection className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedText as="h2" className="text-3xl font-bold mb-6">
                  Our Story
                </AnimatedText>
                <AnimatedText delay={0.1} className="text-muted-foreground mb-6">
                  AutoLake was founded in 2020 by Sarah Johnson and Michael Chen, two data infrastructure experts who
                  saw a gap in the market for a truly autonomous data lake solution. Having worked at leading tech
                  companies, they experienced firsthand the challenges organizations face when building and maintaining
                  data lakes.
                </AnimatedText>
                <AnimatedText delay={0.2} className="text-muted-foreground mb-6">
                  They envisioned a solution that would eliminate the complexity of data lake implementation and
                  management, allowing organizations to focus on deriving insights from their data rather than wrestling
                  with infrastructure.
                </AnimatedText>
                <AnimatedText delay={0.3} className="text-muted-foreground">
                  Today, AutoLake is trusted by organizations across industries to power their data infrastructure,
                  enabling them to make data-driven decisions with confidence.
                </AnimatedText>
              </div>
              <motion.div
                className="relative rounded-lg overflow-hidden h-[400px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="AutoLake team working"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Our Mission Section */}
          <AnimatedSection className="mb-24">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-12 text-center relative overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.5), rgba(168,85,247,0.5), transparent)",
                  backgroundSize: "200% 200%",
                }}
              />

              <AnimatedText as="h2" className="text-3xl font-bold mb-6 relative z-10">
                Our Mission
              </AnimatedText>
              <AnimatedText delay={0.1} className="text-xl max-w-3xl mx-auto mb-8 relative z-10">
                To empower organizations to unlock the full potential of their data by providing the most intuitive,
                secure, and scalable data lake solution on the market.
              </AnimatedText>
              <AnimatedText delay={0.2} className="text-muted-foreground max-w-3xl mx-auto relative z-10">
                We believe that data should be accessible, actionable, and secure. Our mission is to democratize data
                infrastructure, making it possible for organizations of all sizes to harness the power of their data
                without the complexity traditionally associated with data lakes.
              </AnimatedText>
            </div>
          </AnimatedSection>

          {/* Our Values Section */}
          <AnimatedSection className="mb-24">
            <AnimatedText as="h2" className="text-3xl font-bold text-center mb-12">
              Our Values
            </AnimatedText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg border ${getColorClass(value.color).replace("text-", "border-").replace("400", "500/30")}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${getColorClass(value.color)}`}>{value.icon}</div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Our Team Section */}
          <AnimatedSection className="mb-24">
            <AnimatedText as="h2" className="text-3xl font-bold text-center mb-12">
              Meet Our Leadership Team
            </AnimatedText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/20 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-400 mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Company Timeline */}
          <AnimatedSection className="mb-24">
            <AnimatedText as="h2" className="text-3xl font-bold text-center mb-12">
              Our Journey
            </AnimatedText>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <motion.div
                        className="z-10 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Clock className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                    <div
                      className={`bg-gray-800/30 p-6 rounded-lg max-w-xl mx-auto ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{milestone.title}</h3>
                        <div className="flex items-center">
                          <span className="text-blue-400 font-medium">{milestone.year}</span>
                          {milestone.badge && (
                            <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {milestone.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-12 text-center">
              <AnimatedText as="h2" className="text-3xl font-bold mb-6">
                Join Us on Our Mission
              </AnimatedText>
              <AnimatedText delay={0.1} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Ready to transform your data infrastructure with AutoLake? Schedule a demo today to see how our solution
                can help your organization unlock the full potential of your data.
              </AnimatedText>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ScrollToTopLink href="/book-demo">
                  <AnimatedButton size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                    Schedule a Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AnimatedButton>
                </ScrollToTopLink>
              </motion.div>
            </div>
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </div>
  )
}
