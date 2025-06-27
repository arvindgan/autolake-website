"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Building2,
  ShoppingCart,
  Heart,
  Factory,
  Cpu,
  Zap,
  GraduationCap,
  Landmark,
  Film,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Shield,
  Clock,
  ZapIcon,
} from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useInView, useScroll, useTransform, useAnimation } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

// Replace the AnimatedParticles component with a more sophisticated NetworkBackground
const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated nodes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 rounded-full bg-blue-500/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(15)].map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endX = Math.random() * 100
          const endY = Math.random() * 100

          return (
            <motion.path
              key={`line-${i}`}
              d={`M ${startX}%,${startY}% L ${endX}%,${endY}%`}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                times: [0, 0.4, 0.6, 1],
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Add a new component for animated infographics
const AnimatedStat = ({ value, label, color, icon, delay = 0 }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    if (isInView && !counted) {
      controls.start({
        scale: [0.5, 1.1, 1],
        opacity: [0, 1, 1],
        transition: { duration: 0.7, delay },
      })
      setCounted(true)
    }
  }, [isInView, controls, counted, delay])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, scale: 0.5 }}
      className="flex flex-col items-center p-6 bg-gray-800/30 rounded-lg"
    >
      <div className={`p-4 rounded-full ${color} mb-4`}>{icon}</div>
      <motion.div className="text-4xl font-bold mb-2" animate={counted ? { opacity: 1 } : { opacity: 0 }}>
        {counted && <CountUp start={0} end={value} duration={2} separator="," />}
        <span>%</span>
      </motion.div>
      <p className="text-center text-muted-foreground">{label}</p>
    </motion.div>
  )
}

// Add a CountUp component for animated numbers
const CountUp = ({ start, end, duration, separator = "," }) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime
    let animationFrame

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * (end - start) + start))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [start, end, duration])

  return <>{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}</>
}

// Add a component for animated testimonial carousel
const TestimonialCarousel = ({ testimonials }) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative h-64 overflow-hidden">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex flex-col justify-center p-6 bg-gray-800/30 rounded-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: active === index ? 1 : 0,
            x: active === index ? 0 : 100,
            zIndex: active === index ? 10 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-4xl text-blue-400/30 absolute top-4 left-4"
            initial={{ scale: 0 }}
            animate={{
              scale: active === index ? [0, 1.2, 1] : 0,
              rotate: active === index ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            "
          </motion.div>
          <p className="italic text-lg mb-4 z-10">{testimonial.quote}</p>
          <div>
            <p className="font-medium">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
          </div>
          <motion.div
            className="text-4xl text-blue-400/30 absolute bottom-4 right-4"
            initial={{ scale: 0 }}
            animate={{
              scale: active === index ? [0, 1.2, 1] : 0,
              rotate: active === index ? [0, -10, 0] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            "
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${active === index ? "bg-blue-500" : "bg-gray-500"}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Update the IndustryCard component with enhanced animations
const IndustryCard = ({ industry, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Custom animation for each industry icon
  const getIconAnimation = (industryId) => {
    switch (industryId) {
      case "financial-services":
        return {
          animate: isHovered
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
              }
            : {},
        }
      case "healthcare":
        return {
          animate: isHovered
            ? {
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
              }
            : {},
        }
      case "manufacturing":
        return {
          animate: isHovered
            ? {
                rotate: 360,
                transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }
            : {},
        }
      case "retail":
        return {
          animate: isHovered
            ? {
                x: [0, 5, 0],
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
              }
            : {},
        }
      case "technology":
        return {
          animate: isHovered
            ? {
                scale: [1, 1.1, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
              }
            : {},
        }
      default:
        return {
          animate: isHovered
            ? {
                scale: [1, 1.1, 1],
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
              }
            : {},
        }
    }
  }

  const iconAnimation = getIconAnimation(industry.id)

  return (
    <motion.div
      className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden relative ${getColorClass(industry.color).replace("text-", "border-").replace("400", "500/30")}`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 30px -15px rgba(0, 0, 0, 0.3)",
        y: -10,
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          opacity: isHovered ? 0.2 : 0.1,
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          background: `linear-gradient(45deg, transparent, ${industry.color}, transparent)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="flex flex-col h-full relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div className={`p-3 rounded-full ${getColorClass(industry.color)}`} {...iconAnimation}>
            {industry.icon}
          </motion.div>
          <h3 className="text-xl font-semibold">{industry.name}</h3>
        </motion.div>

        <div className="mb-4 flex-grow">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Key Challenges</h4>
          <ul className="space-y-1">
            {industry.challenges.slice(0, 2).map((challenge, index) => (
              <motion.li
                key={index}
                className="text-sm flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-gray-800 flex-shrink-0 mt-0.5 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.2, 1],
                          transition: { duration: 1, delay: index * 0.2, repeat: Number.POSITIVE_INFINITY },
                        }
                      : {}
                  }
                >
                  <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span>{challenge}</span>
              </motion.li>
            ))}
            {industry.challenges.length > 2 && (
              <motion.li
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                + {industry.challenges.length - 2} more
              </motion.li>
            )}
          </ul>
        </div>

        <motion.div
          className="mt-auto flex items-center text-sm font-medium"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span>Learn more</span>
          <motion.div
            animate={
              isHovered
                ? {
                    x: [0, 8, 0],
                    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                  }
                : {
                    x: [0, 5, 0],
                    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                  }
            }
          >
            <ArrowRight className="h-4 w-4 ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Update the FAQ component with enhanced animations
const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
        >
          <motion.button
            className="flex items-center justify-between w-full p-4 text-left"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            initial={false}
            animate={{ backgroundColor: expandedIndex === index ? "rgba(255, 255, 255, 0.03)" : "transparent" }}
          >
            <h3 className="font-medium">{faq.question}</h3>
            <motion.div
              animate={{
                rotate: expandedIndex === index ? 180 : 0,
                backgroundColor: expandedIndex === index ? "rgba(59, 130, 246, 0.1)" : "transparent",
                scale: expandedIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="p-1 rounded-full"
            >
              {expandedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-blue-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: expandedIndex === index ? "auto" : 0,
              opacity: expandedIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className="p-4 pt-0 border-t border-border/40 text-muted-foreground"
              initial={{ y: -10 }}
              animate={{ y: expandedIndex === index ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// Industry data
const industries = [
  {
    id: "financial-services",
    name: "Financial Services",
    icon: <Building2 className="h-8 w-8" />,
    color: "blue",
    challenges: ["Regulatory compliance", "Data privacy", "Fraud detection", "Real-time analytics"],
    solutions: [
      "Automated regulatory reporting",
      "Secure real-time transaction analytics",
      "Fraud detection powered by ML analytics",
    ],
    useCase:
      "Quickly identify fraudulent patterns in banking transactions, reduce operational costs through intelligent data processing.",
    testimonial: {
      quote:
        "With AutoLake, we reduced fraud-related losses by 35% through real-time analytics and predictive detection.",
      author: "CTO, XYZ Bank",
      company: "Financial Services",
    },
    caseStudy: {
      title: "How a Leading Bank Reduced Fraud by 35%",
      description:
        "A top 10 US bank implemented AutoLake to analyze transaction patterns in real-time. Within 3 months, they identified previously undetected fraud patterns, resulting in a 35% reduction in fraud-related losses and saving over $12M annually.",
      results: ["35% reduction in fraud", "$12M annual savings", "Compliance reporting time reduced by 60%"],
    },
    keyBenefits: [
      "Automated compliance reporting",
      "Real-time fraud detection",
      "Secure customer data management",
      "Personalized banking insights",
    ],
    seoKeywords: "financial data lake solutions, banking analytics platform, financial compliance automation",
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    icon: <ShoppingCart className="h-8 w-8" />,
    color: "green",
    challenges: ["Customer analytics", "Inventory management", "Personalization", "Real-time customer insights"],
    solutions: [
      "Real-time customer behavior analysis",
      "Optimized inventory forecasting",
      "Personalized marketing analytics",
    ],
    useCase:
      "Real-time customer insights that boost sales through dynamic recommendations and optimized inventory turnover.",
    testimonial: {
      quote:
        "Inventory forecasting has never been more accurate. AutoLake significantly reduced our holding costs and boosted sales.",
      author: "Head of Operations, ABC Retail",
      company: "Retail",
    },
    caseStudy: {
      title: "How a Major Retailer Increased Sales by 28%",
      description:
        "A national retail chain implemented AutoLake to analyze customer behavior and optimize inventory. The result was a 28% increase in sales through personalized recommendations and a 15% reduction in inventory costs.",
      results: ["28% increase in sales", "15% reduction in inventory costs", "42% improvement in customer retention"],
    },
    keyBenefits: [
      "Customer behavior insights",
      "Inventory optimization",
      "Personalized marketing",
      "Supply chain visibility",
    ],
    seoKeywords: "retail analytics platform, e-commerce data solutions, inventory optimization analytics",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Heart className="h-8 w-8" />,
    color: "red",
    challenges: ["Patient data security (HIPAA compliance)", "Predictive health analytics", "Operational efficiencies"],
    solutions: [
      "Secure, HIPAA-compliant patient data lakes",
      "Predictive analytics for patient health outcomes",
      "Streamlined healthcare data integration",
    ],
    useCase: "Enhance patient care through predictive analytics and secure, real-time medical data sharing.",
    testimonial: {
      quote:
        "AutoLake's HIPAA-compliant solution has transformed how we leverage patient data, improving outcomes while maintaining the highest security standards.",
      author: "CIO, MedTech Innovations",
      company: "Healthcare",
    },
    caseStudy: {
      title: "How a Hospital Network Improved Patient Outcomes by 22%",
      description:
        "A leading hospital network implemented AutoLake to integrate patient data across facilities. The result was a 22% improvement in patient outcomes through predictive analytics and a 30% reduction in readmission rates.",
      results: [
        "22% improvement in patient outcomes",
        "30% reduction in readmissions",
        "100% HIPAA compliance maintained",
      ],
    },
    keyBenefits: [
      "HIPAA-compliant data management",
      "Predictive patient analytics",
      "Operational efficiency",
      "Integrated care coordination",
    ],
    seoKeywords: "healthcare data compliance tools, patient analytics platform, HIPAA compliant data lake",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply Chain",
    icon: <Factory className="h-8 w-8" />,
    color: "orange",
    challenges: ["Production optimization", "Real-time supply chain visibility", "Predictive maintenance"],
    solutions: [
      "Supply chain analytics and optimization",
      "IoT integration for predictive maintenance",
      "Production data monitoring & efficiency analytics",
    ],
    useCase:
      "Reduce downtime and streamline supply chains with predictive analytics and seamless IoT data integration.",
    testimonial: {
      quote:
        "Since implementing AutoLake, our maintenance costs have decreased by 28% and production efficiency has increased by 15%.",
      author: "VP of Operations, Global Manufacturing Inc.",
      company: "Manufacturing",
    },
    caseStudy: {
      title: "How a Manufacturer Reduced Downtime by 43%",
      description:
        "A global manufacturer implemented AutoLake to analyze production data and predict maintenance needs. The result was a 43% reduction in unplanned downtime and a 28% decrease in maintenance costs.",
      results: [
        "43% reduction in downtime",
        "28% decrease in maintenance costs",
        "15% increase in production efficiency",
      ],
    },
    keyBenefits: [
      "Predictive maintenance",
      "Supply chain optimization",
      "Production efficiency analytics",
      "IoT data integration",
    ],
    seoKeywords: "manufacturing analytics platform, predictive maintenance solutions, supply chain optimization",
  },
  {
    id: "technology",
    name: "Technology & SaaS",
    icon: <Cpu className="h-8 w-8" />,
    color: "purple",
    challenges: ["Data-driven product development", "Scalability", "Multi-tenant analytics"],
    solutions: ["Scalable data architectures", "Real-time customer insights", "Intelligent product analytics"],
    useCase: "Empower product teams with actionable insights from user data at scale, driving innovation and growth.",
    testimonial: {
      quote:
        "AutoLake has been instrumental in our product development cycle, giving us insights we never had access to before.",
      author: "Product Director, SaaS Solutions",
      company: "Technology",
    },
    caseStudy: {
      title: "How a SaaS Company Accelerated Feature Development by 40%",
      description:
        "A growing SaaS company implemented AutoLake to analyze user behavior and feature usage. The result was a 40% acceleration in feature development cycles and a 25% increase in user engagement.",
      results: ["40% faster feature development", "25% increase in user engagement", "32% reduction in churn rate"],
    },
    keyBenefits: [
      "User behavior analytics",
      "Product usage insights",
      "Multi-tenant data architecture",
      "Scalable analytics infrastructure",
    ],
    seoKeywords: "SaaS analytics platform, product usage analytics, user behavior insights",
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    icon: <Zap className="h-8 w-8" />,
    color: "yellow",
    challenges: ["Resource optimization", "IoT sensor integration", "Predictive maintenance"],
    solutions: [
      "Smart grid data analytics",
      "Predictive maintenance of infrastructure",
      "Real-time monitoring of energy assets",
    ],
    useCase: "Enhance efficiency and reliability of energy assets through predictive analytics and real-time insights.",
    testimonial: {
      quote:
        "AutoLake's real-time analytics have revolutionized how we manage our grid, resulting in fewer outages and better resource allocation.",
      author: "Chief Data Officer, PowerGrid Utilities",
      company: "Energy",
    },
    caseStudy: {
      title: "How a Utility Provider Reduced Outages by 38%",
      description:
        "A major utility provider implemented AutoLake to analyze grid performance and predict maintenance needs. The result was a 38% reduction in outages and a 22% improvement in resource allocation efficiency.",
      results: [
        "38% reduction in outages",
        "22% improvement in resource allocation",
        "18% decrease in operational costs",
      ],
    },
    keyBenefits: ["Smart grid analytics", "Predictive maintenance", "Resource optimization", "IoT sensor integration"],
    seoKeywords: "energy analytics platform, smart grid solutions, utility predictive maintenance",
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-8 w-8" />,
    color: "sky",
    challenges: ["Student success analytics", "Institutional research", "Data security"],
    solutions: [
      "Data-driven student performance analytics",
      "Secure management of sensitive institutional data",
      "Institutional research optimization",
    ],
    useCase: "Improve student outcomes with predictive insights into performance and resource allocation.",
    testimonial: {
      quote:
        "The insights we've gained through AutoLake have directly contributed to a 12% increase in student retention rates.",
      author: "Dean of Analytics, University of Innovation",
      company: "Education",
    },
    caseStudy: {
      title: "How a University Increased Student Retention by 12%",
      description:
        "A large university implemented AutoLake to analyze student performance data and identify at-risk students. The result was a 12% increase in retention rates and a 15% improvement in graduation rates.",
      results: [
        "12% increase in student retention",
        "15% improvement in graduation rates",
        "20% more efficient resource allocation",
      ],
    },
    keyBenefits: [
      "Student success analytics",
      "Institutional research",
      "Secure data management",
      "Resource optimization",
    ],
    seoKeywords: "education analytics platform, student success solutions, institutional research tools",
  },
  {
    id: "government",
    name: "Government & Public Sector",
    icon: <Landmark className="h-8 w-8" />,
    color: "indigo",
    challenges: ["Citizen service optimization", "Resource allocation", "Regulatory compliance", "Security"],
    solutions: [
      "Citizen service analytics",
      "Resource optimization",
      "Compliance automation",
      "Secure data management",
    ],
    useCase:
      "Improve citizen services and optimize resource allocation through data-driven insights and secure analytics.",
    testimonial: {
      quote:
        "AutoLake has transformed how we deliver services to citizens, resulting in faster response times and more efficient resource allocation.",
      author: "CIO, Metropolitan Government",
      company: "Government",
    },
    caseStudy: {
      title: "How a City Government Improved Service Delivery by 35%",
      description:
        "A major city implemented AutoLake to analyze service delivery data and optimize resource allocation. The result was a 35% improvement in service delivery times and a 20% reduction in operational costs.",
      results: [
        "35% improvement in service delivery",
        "20% reduction in operational costs",
        "42% increase in citizen satisfaction",
      ],
    },
    keyBenefits: [
      "Citizen service optimization",
      "Resource allocation",
      "Compliance automation",
      "Secure data management",
    ],
    seoKeywords: "government analytics platform, public sector data solutions, citizen service optimization",
  },
  {
    id: "media",
    name: "Media & Entertainment",
    icon: <Film className="h-8 w-8" />,
    color: "pink",
    challenges: ["Content personalization", "Audience analytics", "Streaming optimization", "Ad targeting"],
    solutions: [
      "Audience behavior analytics",
      "Content recommendation engines",
      "Streaming performance optimization",
      "Targeted advertising",
    ],
    useCase:
      "Enhance audience engagement and optimize content delivery through data-driven insights and personalization.",
    testimonial: {
      quote:
        "AutoLake's analytics have revolutionized how we understand our audience, resulting in more engaging content and higher retention rates.",
      author: "Chief Content Officer, Global Media Corp",
      company: "Media & Entertainment",
    },
    caseStudy: {
      title: "How a Streaming Service Increased Viewer Engagement by 45%",
      description:
        "A streaming service implemented AutoLake to analyze viewer behavior and optimize content recommendations. The result was a 45% increase in viewer engagement and a 30% reduction in churn rate.",
      results: [
        "45% increase in viewer engagement",
        "30% reduction in churn rate",
        "25% improvement in ad targeting efficiency",
      ],
    },
    keyBenefits: ["Audience behavior analytics", "Content recommendation", "Streaming optimization", "Ad targeting"],
    seoKeywords: "media analytics platform, audience behavior insights, content recommendation engine",
  },
]

// Benefits data
const benefits = [
  {
    title: "Seamless Integration",
    description: "Effortlessly connect with your existing infrastructure and data sources",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Rapid Deployment",
    description: "Get up and running in days, not months, reducing time-to-insight",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Flexible Solutions",
    description: "Adaptable to your unique industry needs and specific use cases",
    icon: <ZapIcon className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Enhanced Security",
    description: "Industry-specific compliance and security measures built-in",
    icon: <Shield className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Predictive Analytics",
    description: "Stay ahead of the competition with forward-looking insights",
    icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
  },
]

// FAQ data
const faqs = [
  {
    question: "How quickly can AutoLake be integrated into existing industry-specific data workflows?",
    answer:
      "Most AutoLake implementations are completed within 2-4 weeks, depending on the complexity of your existing infrastructure. Our team works closely with your IT department to ensure a smooth transition with minimal disruption to your operations.",
  },
  {
    question: "What measures does AutoLake have in place to comply with industry-specific data regulations?",
    answer:
      "AutoLake is built with compliance at its core. We offer industry-specific compliance modules for GDPR, HIPAA, SOC2, PCI-DSS, and other regulatory frameworks. Our platform includes built-in data governance, encryption, access controls, and audit logging to meet the most stringent regulatory requirements.",
  },
  {
    question: "Can AutoLake handle the volume and variety of data specific to my industry?",
    answer:
      "Absolutely. AutoLake is designed to scale horizontally and vertically to accommodate data of any volume, variety, and velocity. Our platform has been successfully deployed in environments processing petabytes of data across diverse industries.",
  },
  {
    question: "How does AutoLake ensure data quality for industry-specific analytics?",
    answer:
      "AutoLake includes robust data quality management features including automated data profiling, validation rules, anomaly detection, and data lineage tracking. These capabilities ensure that your analytics are based on high-quality, trustworthy data.",
  },
  {
    question: "What kind of ROI can we expect from implementing AutoLake in our industry?",
    answer:
      "While ROI varies by industry and use case, our customers typically see returns within 3-6 months of implementation. These returns come from operational efficiencies, reduced infrastructure costs, faster time-to-insight, and new revenue opportunities enabled by advanced analytics.",
  },
]

// Color utility function
const getColorClass = (color) => {
  const colorMap = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    orange: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    sky: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    pink: "bg-pink-500/10 border-pink-500/30 text-pink-400",
  }
  return colorMap[color] || colorMap.blue
}

// Industry Card component
const IndustryCardOld = ({ industry, onClick }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden relative ${getColorClass(industry.color).replace("text-", "border-").replace("400", "500/30")}`}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Add animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          background: `linear-gradient(45deg, transparent, ${industry.color}, transparent)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="flex flex-col h-full relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className={`p-3 rounded-full ${getColorClass(industry.color)}`}
            whileHover={{ rotate: 10 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            {industry.icon}
          </motion.div>
          <h3 className="text-xl font-semibold">{industry.name}</h3>
        </motion.div>

        <div className="mb-4 flex-grow">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Key Challenges</h4>
          <ul className="space-y-1">
            {industry.challenges.slice(0, 2).map((challenge, index) => (
              <motion.li
                key={index}
                className="text-sm flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-gray-800 flex-shrink-0 mt-0.5 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span>{challenge}</span>
              </motion.li>
            ))}
            {industry.challenges.length > 2 && (
              <motion.li
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                + {industry.challenges.length - 2} more
              </motion.li>
            )}
          </ul>
        </div>

        <motion.div
          className="mt-auto flex items-center text-sm font-medium"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span>Learn more</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <ArrowRight className="h-4 w-4 ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Industry Detail component
const IndustryDetail = ({ industry, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${industry.color}, transparent)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`p-3 rounded-full ${getColorClass(industry.color)}`}
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            {industry.icon}
          </motion.div>
          <h2 className="text-2xl font-bold">{industry.name}</h2>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" onClick={onBack}>
            Back to Industries
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div>
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-3">Industry Challenges</h3>
            <ul className="space-y-2">
              {industry.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  <motion.div
                    className="h-5 w-5 rounded-full bg-gray-800 flex-shrink-0 mt-0.5 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span>{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-3">AutoLake Solutions</h3>
            <ul className="space-y-2">
              {industry.solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className={`h-5 w-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${getColorClass(industry.color).replace("bg-", "bg-").replace("/10", "/80")}`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 0px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {industry.keyBenefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="h-5 w-5 rounded-full bg-blue-500/80 flex-shrink-0 mt-0.5 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(59,130,246,0)",
                        "0 0 10px rgba(59,130,246,0.5)",
                        "0 0 0px rgba(59,130,246,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div>
          <motion.div
            className="bg-gray-800/50 p-6 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
          >
            <h3 className="text-xl font-semibold mb-3">Case Study</h3>
            <h4 className="text-lg font-medium mb-2">{industry.caseStudy.title}</h4>
            <p className="text-muted-foreground mb-4">{industry.caseStudy.description}</p>
            <motion.div
              className="bg-gray-900/50 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h5 className="font-medium mb-2">Key Results:</h5>
              <ul className="space-y-2">
                {industry.caseStudy.results.map((result, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                  >
                    <motion.div
                      className="h-5 w-5 rounded-full bg-green-500/80 flex-shrink-0 mt-0.5 flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(34,197,94,0)",
                          "0 0 10px rgba(34,197,94,0.5)",
                          "0 0 0px rgba(34,197,94,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span>{result}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className={`p-6 rounded-lg border mb-6 ${getColorClass(industry.color).replace("text-", "border-").replace("400", "500/30")}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
          >
            <h3 className="text-xl font-semibold mb-3">Customer Testimonial</h3>
            <div className="flex flex-col space-y-4">
              <motion.p
                className="italic text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                "{industry.testimonial.quote}"
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
                <p className="font-medium">{industry.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{industry.testimonial.company}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/book-demo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  Schedule a Demo
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Industry Grid component
const IndustryGrid = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null)

  return (
    <div>
      {selectedIndustry ? (
        <IndustryDetail industry={selectedIndustry} onBack={() => setSelectedIndustry(null)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} onClick={() => setSelectedIndustry(industry)} />
          ))}
        </div>
      )}
    </div>
  )
}

// Industry Selector component (Tabs version)
const IndustrySelector = () => {
  return (
    <Tabs defaultValue={industries[0].id} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto p-1 mb-8 overflow-x-auto">
        {industries.map((industry) => (
          <TabsTrigger key={industry.id} value={industry.id} className="py-2 data-[state=active]:bg-primary/10">
            {industry.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {industries.map((industry) => (
        <TabsContent key={industry.id} value={industry.id} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full ${getColorClass(industry.color)}`}>{industry.icon}</div>
                <h3 className="text-2xl font-semibold">{industry.name}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-2">Challenges</h4>
                  <ul className="space-y-2">
                    {industry.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-gray-800 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Solutions</h4>
                  <ul className="space-y-2">
                    {industry.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div
                          className={`h-5 w-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${getColorClass(industry.color).replace("bg-", "bg-").replace("/10", "/80")}`}
                        >
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Use Case</h4>
                <p className="text-muted-foreground">{industry.useCase}</p>
              </div>

              <div
                className={`p-6 rounded-lg border ${getColorClass(industry.color).replace("text-", "border-").replace("400", "500/30")}`}
              >
                <div className="flex flex-col space-y-4">
                  <p className="italic text-lg">"{industry.testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{industry.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{industry.testimonial.company}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

// Why Choose AutoLake section
const WhyChooseAutoLake = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          className="bg-gray-800/30 p-6 rounded-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
            backgroundColor: "rgba(31, 41, 55, 0.4)",
          }}
        >
          {/* Add subtle animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
              backgroundSize: "200% 200%",
            }}
          />

          <div className="flex items-start gap-4 relative z-10">
            <motion.div
              className="mt-1"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.2 }}
            >
              {benefit.icon}
            </motion.div>
            <div>
              <motion.h3
                className="text-xl font-medium mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {benefit.title}
              </motion.h3>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {benefit.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Update the main IndustriesPage component to include our new animations
export default function IndustriesPage() {
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("industriesAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/industries-auth")
    }
  }, [router])

  // Add a ref for parallax effect
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Create testimonials array for the carousel
  const testimonials = industries.slice(0, 6).map((industry) => industry.testimonial)

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {/* Background gradients with parallax effect */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <motion.div
          className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container py-24">
          {/* Enhanced Hero Section */}
          <motion.div
            className="flex flex-col items-center justify-center text-center mb-16 relative min-h-[60vh] flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <NetworkBackground />

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 h-[120px] md:h-[150px] flex items-center justify-center">
                <TypeAnimation
                  sequence={[
                    "Empowering Financial Services with AutoLake Solutions",
                    2000,
                    "Empowering Retail & E-commerce with AutoLake Solutions",
                    2000,
                    "Empowering Healthcare with AutoLake Solutions",
                    2000,
                    "Empowering Manufacturing with AutoLake Solutions",
                    2000,
                    "Empowering Every Industry with AutoLake Solutions",
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={0}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                />
              </h1>

              <motion.p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                AutoLake delivers tailored data solutions that address the unique challenges of your industry,
                transforming raw data into actionable intelligence with unmatched speed, security, and flexibility.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <Link href="/book-demo">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5L12 19M12 19L19 12M12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Industry Grid with staggered animations */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Industry-Specific Solutions
              </span>
            </motion.h2>
            <IndustryGrid />
          </motion.section>

          {/* Animated Stats Section */}
          <motion.section
            className="mb-24 py-12 bg-gray-900/30 rounded-xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-10 pointer-events-none"
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

            <div className="container">
              <motion.h2
                className="text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Proven Results Across Industries
                </span>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedStat
                  value={35}
                  label="Average Reduction in Operational Costs"
                  color="bg-blue-500/20 text-blue-400"
                  icon={<BarChart3 className="h-8 w-8" />}
                  delay={0}
                />
                <AnimatedStat
                  value={42}
                  label="Increase in Data Processing Speed"
                  color="bg-purple-500/20 text-purple-400"
                  icon={<ZapIcon className="h-8 w-8" />}
                  delay={0.2}
                />
                <AnimatedStat
                  value={28}
                  label="Improvement in Decision-Making Accuracy"
                  color="bg-green-500/20 text-green-400"
                  icon={<CheckCircle className="h-8 w-8" />}
                  delay={0.4}
                />
              </div>
            </div>
          </motion.section>

          {/* Why Choose AutoLake with enhanced animations */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Why Choose AutoLake for Your Industry
              </span>
            </motion.h2>
            <WhyChooseAutoLake />
          </motion.section>

          {/* Customer Testimonials with carousel */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                What Our Customers Say
              </span>
            </motion.h2>

            <TestimonialCarousel testimonials={testimonials} />
          </motion.section>

          {/* Enhanced FAQs */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Frequently Asked Questions
              </span>
            </motion.h2>
            <FAQ />
          </motion.section>

          {/* Enhanced CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-12 text-center relative overflow-hidden"
              whileHover={{ boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.4)" }}
            >
              {/* Enhanced animated background */}
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

              {/* Enhanced animated particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-blue-500/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [Math.random() * -50, Math.random() * 50],
                      x: [Math.random() * -50, Math.random() * 50],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transform Your Industry Today
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Join industry leaders who are leveraging AutoLake to gain competitive advantage through data-driven
                insights.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10"
              >
                <Link href="/book-demo">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg"
                    >
                      <motion.span className="relative z-10">Schedule a Personalized Demo</motion.span>
                      <motion.div
                        className="absolute inset-0 -m-[2px] rounded-lg"
                        animate={{
                          boxShadow: [
                            "0 0 0px 0px rgba(59,130,246,0)",
                            "0 0 10px 2px rgba(59,130,246,0.5)",
                            "0 0 0px 0px rgba(59,130,246,0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
