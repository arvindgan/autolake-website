"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import GridBackground from "@/components/grid-background"

// Data connector items based on the image
const connectors = [
  { name: "ADP", logo: "🏢", category: "HR" },
  { name: "Access", logo: "📊", category: "Database" },
  { name: "Act CRM", logo: "🔗", category: "CRM" },
  { name: "Act-On", logo: "📈", category: "Marketing" },
  { name: "Active Directory", logo: "🔒", category: "Identity" },
  { name: "ActiveCampaign", logo: "📧", category: "Marketing" },
  { name: "Acumatica", logo: "💼", category: "ERP" },
  { name: "Adobe Analytics", logo: "📊", category: "Analytics" },
  { name: "Adobe Commerce", logo: "🛒", category: "E-commerce" },
  { name: "Adobe Target", logo: "🎯", category: "Marketing" },
  { name: "Airtable", logo: "📋", category: "Database" },
  { name: "AlloyDB", logo: "🗄️", category: "Database" },
  { name: "Amazon Athena", logo: "📊", category: "Analytics" },
  { name: "Amazon DynamoDB", logo: "🗄️", category: "Database" },
  { name: "Amazon Marketplace", logo: "🛒", category: "E-commerce" },
  { name: "Amazon S3", logo: "☁️", category: "Storage" },
  { name: "Asana", logo: "✅", category: "Project Management" },
  { name: "Authorize.Net", logo: "💳", category: "Payment" },
  { name: "Avalara AvaTax", logo: "🧾", category: "Tax" },
  { name: "Avro", logo: "📄", category: "Format" },
  { name: "Azure Active Directory", logo: "🔒", category: "Identity" },
  { name: "Azure Analysis Services", logo: "📊", category: "Analytics" },
  { name: "Azure Data Catalog", logo: "📚", category: "Data Management" },
  { name: "Azure Data Lake Storage", logo: "🗄️", category: "Storage" },
  { name: "BigQuery", logo: "📊", category: "Analytics" },
  { name: "Box", logo: "📦", category: "Storage" },
  { name: "Cassandra", logo: "🗄️", category: "Database" },
  { name: "Confluence", logo: "📄", category: "Documentation" },
  { name: "Databricks", logo: "⚡", category: "Analytics" },
  { name: "Docker", logo: "🐳", category: "Platform" },
  { name: "Dropbox", logo: "📦", category: "Storage" },
  { name: "Elasticsearch", logo: "🔍", category: "Search" },
  { name: "Facebook Ads", logo: "📱", category: "Advertising" },
  { name: "Google Analytics", logo: "📈", category: "Analytics" },
  { name: "Google Drive", logo: "💾", category: "Storage" },
  { name: "Google Sheets", logo: "📊", category: "Spreadsheet" },
  { name: "HubSpot", logo: "🎯", category: "CRM" },
  { name: "Jira", logo: "🎫", category: "Project Management" },
  { name: "Kafka", logo: "📡", category: "Streaming" },
  { name: "Kubernetes", logo: "⚓", category: "Platform" },
  { name: "LinkedIn Ads", logo: "💼", category: "Advertising" },
  { name: "Mailchimp", logo: "📧", category: "Email Marketing" },
  { name: "MongoDB", logo: "🍃", category: "Database" },
  { name: "MySQL", logo: "🐬", category: "Database" },
  { name: "Oracle", logo: "🔴", category: "Database" },
  { name: "PostgreSQL", logo: "🐘", category: "Database" },
  { name: "Redis", logo: "🔴", category: "Database" },
  { name: "Salesforce", logo: "☁️", category: "CRM" },
  { name: "SAP", logo: "💎", category: "ERP" },
  { name: "Shopify", logo: "🛍️", category: "E-commerce" },
  { name: "Slack", logo: "💬", category: "Communication" },
  { name: "Snowflake", logo: "❄️", category: "Data Warehouse" },
  { name: "Stripe", logo: "💳", category: "Payment" },
  { name: "Tableau", logo: "📊", category: "Analytics" },
  { name: "Trello", logo: "📋", category: "Project Management" },
  { name: "Twitter", logo: "🐦", category: "Social Media" },
  { name: "Workday", logo: "📅", category: "HR" },
  { name: "Zendesk", logo: "🎧", category: "Support" },
  { name: "Zoom", logo: "📹", category: "Communication" }
]

export default function DataConnectors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(24) // Show 24 initially (6 rows of 4)

  // Filter connectors based on search term
  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connector.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleConnectors = filteredConnectors.slice(0, visibleCount)

  return (
    <motion.section
      className="relative py-16 bg-black text-white overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Grid Background with Stars */}
      <GridBackground starCount={40} id="connectors" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Standards-based data connectors
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The most comprehensive collection of data drivers. Anywhere.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search connectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-center bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </motion.div>
        </div>

        {/* Connectors Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {visibleConnectors.map((connector, index) => (
            <motion.div
              key={connector.name}
              className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.02 // Stagger animation
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{connector.logo}</div>
                <h3 className="font-medium text-sm mb-1 text-white">{connector.name}</h3>
                <p className="text-xs text-gray-400">{connector.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {filteredConnectors.length > visibleCount && (
          <div className="text-center">
            <Button
              onClick={() => setVisibleCount(prev => prev + 24)}
              variant="outline"
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
            >
              View More Connectors
            </Button>
          </div>
        )}

        {/* Show count when searching */}
        {searchTerm && (
          <div className="text-center mt-4">
            <p className="text-gray-400">
              Showing {visibleConnectors.length} of {filteredConnectors.length} connectors
            </p>
          </div>
        )}
      </div>
    </motion.section>
  )
}