import SPAApp from "@/components/spa-app"

// Static data for the pricing page (could come from CMS/API in real app)
const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "All essential features to get you started.",
    buttonText: "Download for Mac",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Limited AI responses per day",
      "Unlimited real-time meeting notetaking",
      "Personalized with custom system prompt",
      "Generate follow up emails after meetings",
      "Ask AI about all your past meetings"
    ]
  },
  {
    name: "Pro",
    price: "$20",
    period: "/mo",
    description: "Unlimited access to all of Cluely",
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Unlimited AI responses",
      "Access to smartest models",
      "Always get full response outputs",
      "Priority support",
      "Plus everything in Free"
    ]
  },
  {
    name: "Enterprise",
    price: "$200",
    period: "/mo",
    description: "For teams who need full customization.",
    buttonText: "Talk to Sales",
    buttonVariant: "outline" as const,
    popular: true,
    features: [
      "Admin dashboard with usage analytics",
      "Team-wide knowledge and prompts",
      "Push-out AI suggestions and coaching insights",
      "Data privacy and advanced security",
      "Plus everything in Pro"
    ]
  }
]

const featureComparison = [
  {
    category: "Features",
    items: [
      {
        name: "Custom system prompt",
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: "Pro Responses / day",
        free: "Limited",
        pro: "Unlimited",
        enterprise: "Unlimited"
      },
      {
        name: "Token limit",
        free: "Limited",
        pro: "Unlimited",
        enterprise: "Unlimited"
      },
      {
        name: "Models",
        free: "Base",
        pro: "Smartest",
        enterprise: "Enterprise-only"
      },
      {
        name: "Team-wide knowledge and system prompts",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Post-call AI suggestions and coaching insights",
        free: false,
        pro: false,
        enterprise: true
      }
    ]
  },
  {
    category: "Platform",
    items: [
      {
        name: "AI chat with your meeting summaries",
        free: true,
        pro: true,
        enterprise: true
      },
      {
        name: "Post-call AI suggestions and coaching insights",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Centralized team billing",
        free: false,
        pro: false,
        enterprise: true
      },
      {
        name: "Data privacy and advanced security",
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
        name: "Chatbot + email support",
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
        name: "Customized onboarding",
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
