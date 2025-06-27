import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Building2, Factory, Heart, Landmark, ShoppingCart, Truck } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import AnimatedText from "@/components/animated-text"
import { AnimatedButton } from "@/components/animated-button"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"

const industries = [
  {
    name: "Financial Services",
    icon: <Landmark className="h-8 w-8" />,
    description: "Secure, compliant data solutions for banks, insurance companies, and fintech organizations.",
    features: ["Real-time fraud detection", "Regulatory compliance", "Risk analytics", "Customer insights"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Healthcare",
    icon: <Heart className="h-8 w-8" />,
    description: "HIPAA-compliant data infrastructure for hospitals, clinics, and healthcare technology companies.",
    features: ["Patient data analytics", "Clinical research", "Population health", "Medical imaging"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Retail & E-commerce",
    icon: <ShoppingCart className="h-8 w-8" />,
    description: "Customer behavior analytics and inventory optimization for retail and e-commerce businesses.",
    features: ["Customer segmentation", "Inventory optimization", "Price analytics", "Supply chain insights"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Manufacturing",
    icon: <Factory className="h-8 w-8" />,
    description: "IoT data integration and predictive maintenance solutions for manufacturing operations.",
    features: ["Predictive maintenance", "Quality control", "Supply chain optimization", "Equipment monitoring"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "Logistics & Transportation",
    icon: <Truck className="h-8 w-8" />,
    description: "Route optimization and fleet management through comprehensive data analytics.",
    features: ["Route optimization", "Fleet management", "Delivery tracking", "Cost optimization"],
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
  },
  {
    name: "Enterprise",
    icon: <Building2 className="h-8 w-8" />,
    description: "Scalable data solutions for large enterprises across multiple departments and use cases.",
    features: ["Multi-department integration", "Enterprise governance", "Scalable architecture", "Custom solutions"],
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-500/10",
  },
]

export default function IndustriesPage() {
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
              Industry{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Solutions
              </span>
            </AnimatedText>
            <AnimatedText delay={0.1} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Tailored data lake solutions designed for the unique challenges and requirements of your industry.
            </AnimatedText>
          </AnimatedSection>

          {/* Industries Grid */}
          <AnimatedSection className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-lg border border-white/10 ${industry.bgColor} p-8`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${industry.color} text-white mb-6`}>
                    {industry.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{industry.name}</h3>
                  <p className="text-muted-foreground mb-6">{industry.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm uppercase tracking-wide">Key Features</h4>
                    <ul className="space-y-2">
                      {industry.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${industry.color}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Why Choose AutoLake Section */}
          <AnimatedSection className="mb-24">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-12 text-center">
              <AnimatedText as="h2" className="text-3xl font-bold mb-6">
                Why Choose AutoLake for Your Industry?
              </AnimatedText>
              <AnimatedText delay={0.1} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Our platform is built to handle the specific data challenges and compliance requirements of your industry.
              </AnimatedText>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <motion.div
                  className="bg-gray-800/30 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime Guarantee</div>
                </motion.div>

                <motion.div
                  className="bg-gray-800/30 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="text-4xl font-bold text-purple-400 mb-2">SOC2</div>
                  <div className="text-muted-foreground">Compliance Certified</div>
                </motion.div>

                <motion.div
                  className="bg-gray-800/30 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                  <div className="text-muted-foreground">Expert Support</div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-12 text-center">
              <AnimatedText as="h2" className="text-3xl font-bold mb-6">
                Ready to Transform Your Industry Data?
              </AnimatedText>
              <AnimatedText delay={0.1} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Schedule a consultation with our industry experts to see how AutoLake can address your specific data challenges.
              </AnimatedText>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ScrollToTopLink href="/book-demo" asChild>
                  <AnimatedButton size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                    Schedule Consultation
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