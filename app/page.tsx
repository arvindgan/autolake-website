import SPAApp from "@/components/spa-app"

// Static data for the pricing page (could come from CMS/API in real app)
const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    description: "Essential data lake features to get started.",
    buttonText: "Start Free",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Up to 10GB data storage",
      "5 data connectors",
      "Basic data ingestion",
      "Standard data validation",
      "Community support"
    ]
  },
  {
    name: "Pro",
    monthlyPrice: "$1000",
    annualPrice: "$12,000",
    description: "Full autonomous data lake platform",
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Unlimited data storage",
      "All 300+ data connectors",
      "Autonomous ingestion & curation",
      "AI-powered analytics",
      "Time travel & snapshots",
      "Auto-scaling & indexing",
      "Priority support",
      "Plus everything in Free"
    ]
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    description: "For organizations requiring enterprise-grade data solutions.",
    buttonText: "Book a demo",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      "Custom data architecture",
      "Dedicated cloud infrastructure",
      "Enterprise security & compliance",
      "Custom SLAs & support",
      "Advanced governance & auditing",
      "On-premise deployment options",
      "Plus everything in Pro"
    ]
  }
]

const featureComparison = [
  {
    category: "Data Storage & Processing",
    items: [
      {
        name: "Data storage capacity",
        free: "10GB",
        pro: "Unlimited",
        enterprise: "Unlimited"
      },
      {
        name: "Data connectors",
        free: "5 connectors",
        pro: "300+ connectors",
        enterprise: "300+ connectors"
      },
      {
        name: "Data ingestion methods",
        free: "Basic",
        pro: "Full + Incremental + Snapshot",
        enterprise: "Full + Incremental + Snapshot"
      },
      {
        name: "Auto-scaling",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "Time travel & versioning",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "AI-powered analytics",
        free: false,
        pro: true,
        enterprise: true
      }
    ]
  },
  {
    category: "Enterprise Features",
    items: [
      {
        name: "Data validation & quality checks",
        free: "Basic",
        pro: "Advanced",
        enterprise: "Enterprise-grade"
      },
      {
        name: "Security & compliance",
        free: "Standard",
        pro: "Advanced",
        enterprise: "SOC2, GDPR, HIPAA"
      },
      {
        name: "Custom data architecture",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Dedicated infrastructure",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "On-premise deployment",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Advanced governance",
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  },
  {
    category: "Support",
    items: [
      {
        name: "Community support",
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: "Priority support",
        free: false,
        pro: true,
        enterprise: true
      },
      {
        name: "Dedicated support manager",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Custom SLAs",
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  }
]

export default function Home() {
  return (
    <SPAApp 
      initialData={{
        pricingPlans,
        featureComparison
      }}
    />
  )
}

