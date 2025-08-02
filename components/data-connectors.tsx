"use client"

import { useState, memo } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import GridBackground from "@/components/grid-background"
import Image from "next/image"

// Connector interface
interface Connector {
  name: string
  logo: string
  category: string
  imageUrl?: string // Optional PNG image path
}

// Data connector items - supports both emoji (logo) and PNG images (imageUrl)
// To use a PNG image: add imageUrl field pointing to /images/connectors/filename.png
// To use emoji: just use the logo field (will be used as fallback)
const connectors: Connector[] = [
  { name: "Adobe Analytics", logo: "📊", category: "Analytics", imageUrl: "/images/connectors/icon-adobeanalytics.webp" },
  { name: "Adobe Marketo Engage", logo: "📈", category: "Marketing", imageUrl: "/images/connectors/icon-adobemarketoengage.webp" },
  { name: "Amazon Aurora", logo: "☁️", category: "Database", imageUrl: "/images/connectors/icon-aurora.webp" },
  { name: "Amazon DocumentDB", logo: "🗄️", category: "Database", imageUrl: "/images/connectors/icon-documentdb.webp" },
  { name: "Amazon DynamoDB", logo: "🗄️", category: "Database", imageUrl: "/images/connectors/icon-dynamodb.webp" },
  { name: "Amazon OpenSearch Service", logo: "🔍", category: "Search", imageUrl: "/images/connectors/icon-opensearch.webp" },
  { name: "Amazon Redshift", logo: "🗄️", category: "Data Warehouse", imageUrl: "/images/connectors/icon-redshift.webp" },
  { name: "Asana", logo: "✅", category: "Project Management", imageUrl: "/images/connectors/icon-asana.webp" },
  { name: "Azure Cosmos", logo: "☁️", category: "Database", imageUrl: "/images/connectors/icon-cosmosdb.webp" },
  { name: "Azure SQL", logo: "🗄️", category: "Database", imageUrl: "/images/connectors/icon-azuresql.webp" },
  { name: "Binary", logo: "📄", category: "File Format", imageUrl: "/images/connectors/icon-binary.webp" },
  { name: "Blackbaud", logo: "💼", category: "CRM", imageUrl: "/images/connectors/icon-blackbaudfenxt.webp" },
  { name: "CircleCI", logo: "🔄", category: "DevOps", imageUrl: "/images/connectors/icon-circleci.webp" },
  { name: "Cloud Storage API", logo: "☁️", category: "API", imageUrl: "/images/connectors/icon-cloudstorageapi.webp" },
  { name: "CSV", logo: "📄", category: "File Format", imageUrl: "/images/connectors/icon-csv.webp" },
  { name: "Datadog", logo: "📊", category: "Monitoring", imageUrl: "/images/connectors/icon-datadog.webp" },
  { name: "Docusign Monitor", logo: "📋", category: "Document", imageUrl: "/images/connectors/icon-docusign.webp" },
  { name: "Domo", logo: "📈", category: "Analytics", imageUrl: "/images/connectors/icon-domo.webp" },
  { name: "Dynatrace", logo: "📊", category: "Monitoring", imageUrl: "/images/connectors/icon-dynatrace.webp" },
  { name: "Excel", logo: "📊", category: "File Format", imageUrl: "/images/connectors/icon-excel.webp" },
  { name: "Facebook Ads", logo: "📱", category: "Advertising", imageUrl: "/images/connectors/icon-facebookads.webp" },
  { name: "Facebook Page Insights", logo: "📊", category: "Analytics", imageUrl: "/images/connectors/icon-facebookpageinsights.webp" },
  { name: "File-Based API", logo: "📄", category: "API", imageUrl: "/images/connectors/icon-filebasedapi.webp" },
  { name: "Fixed-Width (COBAL)", logo: "📄", category: "File Format", imageUrl: "/images/connectors/icon-fixedwidthcobal.webp" },
  { name: "Freshdesk", logo: "🎧", category: "Support", imageUrl: "/images/connectors/icon-freshdesk.webp" },
  { name: "Freshsales", logo: "💼", category: "CRM", imageUrl: "/images/connectors/icon-freshsales.webp" },
  { name: "Google Ads", logo: "📱", category: "Advertising", imageUrl: "/images/connectors/icon-googleads.webp" },
  { name: "Google Analytics 4", logo: "📈", category: "Analytics", imageUrl: "/images/connectors/icon-googleanalytics4.webp" },
  { name: "Google BigQuery", logo: "📊", category: "Data Warehouse", imageUrl: "/images/connectors/icon-googlebigquery.webp" },
  { name: "Google Search Console", logo: "🔍", category: "Analytics", imageUrl: "/images/connectors/icon-googlesearchconsole.webp" },
  { name: "Google Sheets", logo: "📊", category: "Spreadsheet", imageUrl: "/images/connectors/icon-googlesheets.webp" },
  { name: "GraphQL API", logo: "🔗", category: "API", imageUrl: "/images/connectors/icon-graphqlapi.webp" },
  { name: "HubSpot", logo: "🎯", category: "CRM", imageUrl: "/images/connectors/icon-hubspot.webp" },
  { name: "Instagram Ads", logo: "📷", category: "Advertising", imageUrl: "/images/connectors/icon-instagramads.webp" },
  { name: "Intercom", logo: "💬", category: "Communication", imageUrl: "/images/connectors/icon-intercom.webp" },
  { name: "JDBC", logo: "🔗", category: "Database", imageUrl: "/images/connectors/icon-jdbc.webp" },
  { name: "Jira Cloud", logo: "🎫", category: "Project Management", imageUrl: "/images/connectors/icon-jiracloud.webp" },
  { name: "JSON", logo: "📄", category: "File Format", imageUrl: "/images/connectors/icon-json.webp" },
  { name: "Kafka", logo: "📡", category: "Streaming", imageUrl: "/images/connectors/icon-kafka.webp" },
  { name: "Kustomer", logo: "🎧", category: "Support", imageUrl: "/images/connectors/icon-kustomer.webp" },
  { name: "LinkedIn", logo: "💼", category: "Social Media", imageUrl: "/images/connectors/icon-linkedin.webp" },
  { name: "Mailchimp", logo: "📧", category: "Email Marketing", imageUrl: "/images/connectors/icon-mailchimp.webp" },
  { name: "Microsoft Dynamics 365 CRM", logo: "💼", category: "CRM", imageUrl: "/images/connectors/icon-microsoftdynamics365crm.webp" },
  { name: "Microsoft Teams", logo: "👥", category: "Communication", imageUrl: "/images/connectors/icon-microsoftteams.webp" },
  { name: "Mixpanel", logo: "📊", category: "Analytics", imageUrl: "/images/connectors/icon-mixpanel.webp" },
  { name: "Monday", logo: "📅", category: "Project Management", imageUrl: "/images/connectors/icon-monday.webp" },
  { name: "MongoDB", logo: "🍃", category: "Database", imageUrl: "/images/connectors/icon-mongodb.webp" },
  { name: "MongoDB Atlas", logo: "🍃", category: "Database", imageUrl: "/images/connectors/icon-mongodbatlas.webp" },
  { name: "Okta", logo: "🔒", category: "Identity", imageUrl: "/images/connectors/icon-okta.webp" },
  { name: "Oracle NetSuite", logo: "💼", category: "ERP", imageUrl: "/images/connectors/icon-oraclenetsuite.webp" },
  { name: "Paypal", logo: "💳", category: "Payment", imageUrl: "/images/connectors/icon-paypal.webp" },
  { name: "Pendo", logo: "📊", category: "Analytics", imageUrl: "/images/connectors/icon-pendo.webp" },
  { name: "Pipedrive", logo: "💼", category: "CRM", imageUrl: "/images/connectors/icon-pipedrive.webp" },
  { name: "Productboard", logo: "📋", category: "Product Management", imageUrl: "/images/connectors/icon-productboard.webp" },
  { name: "QuickBooks", logo: "💼", category: "Accounting", imageUrl: "/images/connectors/icon-quickbooks.webp" },
  { name: "Rest API", logo: "🔗", category: "API", imageUrl: "/images/connectors/icon-restapi.webp" },
  { name: "Salesforce", logo: "☁️", category: "CRM", imageUrl: "/images/connectors/icon-salesforce.webp" },
  { name: "Salesforce Commerce Cloud", logo: "🛒", category: "E-commerce", imageUrl: "/images/connectors/icon-salesforcecommercecloud.webp" },
  { name: "Salesforce Marketing Cloud", logo: "📧", category: "Marketing", imageUrl: "/images/connectors/icon-salesforcemarketingcloud.webp" },
  { name: "Salesforce Marketing Cloud Account Engagement", logo: "📈", category: "Marketing", imageUrl: "/images/connectors/icon-salesforce-marketingcloudaccountengagement.webp" },
  { name: "SAP HANA", logo: "💎", category: "Database", imageUrl: "/images/connectors/icon-saphana.webp" },
  { name: "SAP OData", logo: "💎", category: "API", imageUrl: "/images/connectors/icon-sap-odata.webp" },
  { name: "SendGrid", logo: "📧", category: "Email", imageUrl: "/images/connectors/icon-sendgrid.webp" },
  { name: "ServiceNow", logo: "🔧", category: "ITSM", imageUrl: "/images/connectors/icon-servicenow.webp" },
  { name: "Slack", logo: "💬", category: "Communication", imageUrl: "/images/connectors/icon-slack.webp" },
  { name: "Smartsheet", logo: "📊", category: "Spreadsheet", imageUrl: "/images/connectors/icon-smartsheet.webp" },
  { name: "Snapchat Ads", logo: "👻", category: "Advertising", imageUrl: "/images/connectors/icon-snapchatads.webp" },
  { name: "Snowflake", logo: "❄️", category: "Data Warehouse", imageUrl: "/images/connectors/icon-snowflake.webp" },
  { name: "SOAP API", logo: "🔗", category: "API", imageUrl: "/images/connectors/icon-soapapi.webp" },
  { name: "Streaming API", logo: "📡", category: "API", imageUrl: "/images/connectors/icon-streamingapi.webp" },
  { name: "Stripe", logo: "💳", category: "Payment", imageUrl: "/images/connectors/icon-stripe.webp" },
  { name: "Teradata Vantage", logo: "🗄️", category: "Data Warehouse", imageUrl: "/images/connectors/icon-teradatavantage.webp" },
  { name: "Twilio", logo: "📞", category: "Communication", imageUrl: "/images/connectors/icon-twilio.webp" },
  { name: "Vertica", logo: "🗄️", category: "Database", imageUrl: "/images/connectors/icon-vertica.webp" },
  { name: "Webhook/Push API", logo: "🔗", category: "API", imageUrl: "/images/connectors/icon-webhookpushapi.webp" },
  { name: "WooCommerce", logo: "🛒", category: "E-commerce", imageUrl: "/images/connectors/icon-woocommerce.webp" },
  { name: "XML", logo: "📄", category: "File Format", imageUrl: "/images/connectors/icon-xml.webp" },
  { name: "Zendesk", logo: "🎧", category: "Support", imageUrl: "/images/connectors/icon-zendesk.webp" },
  { name: "Zoho CRM", logo: "💼", category: "CRM", imageUrl: "/images/connectors/icon-zohocrm.webp" },
  { name: "Zoom Meetings", logo: "📹", category: "Communication", imageUrl: "/images/connectors/icon-zoommeetings.webp" }
]

const DataConnectors = memo(function DataConnectors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(12) // Show 12 initially (3 rows of 4)

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
                <div className="mb-2 flex items-center justify-center h-8">
                  {connector.imageUrl ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={connector.imageUrl}
                        alt={`${connector.name} logo`}
                        fill
                        className="object-contain"
                        loading="lazy"
                        sizes="32px"
                        quality={75}
                      />
                    </div>
                  ) : (
                    <div className="text-2xl">{connector.logo}</div>
                  )}
                </div>
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
              onClick={() => setVisibleCount(prev => prev + 12)}
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
})

export default DataConnectors