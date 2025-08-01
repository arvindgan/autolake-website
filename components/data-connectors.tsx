"use client"

import { useState } from "react"
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
  { name: "Adobe Analytics", logo: "📊", category: "Analytics", imageUrl: "icon-adobeanalytics.png" },
  { name: "Adobe Marketo Engage", logo: "📈", category: "Marketing", imageUrl: "icon-adobemarketoengage.png" },
  { name: "Amazon Aurora", logo: "☁️", category: "Database", imageUrl: "icon-amazonaurora.png" },
  { name: "Amazon DocumentDB", logo: "🗄️", category: "Database", imageUrl: "icon-amazondocumentdb.png" },
  { name: "Amazon DynamoDB", logo: "🗄️", category: "Database", imageUrl: "icon-amazondynamodb.png" },
  { name: "Amazon OpenSearch Service", logo: "🔍", category: "Search", imageUrl: "icon-amazonopensearchservice.png" },
  { name: "Amazon Redshift", logo: "🗄️", category: "Data Warehouse", imageUrl: "icon-amazonredshift.png" },
  { name: "Asana", logo: "✅", category: "Project Management", imageUrl: "icon-asana.png" },
  { name: "Azure Cosmos", logo: "☁️", category: "Database", imageUrl: "icon-azurecosmos.png" },
  { name: "Azure SQL", logo: "🗄️", category: "Database", imageUrl: "icon-azuresql.png" },
  { name: "Binary", logo: "📄", category: "File Format", imageUrl: "icon-binary.png" },
  { name: "Blackbaud", logo: "💼", category: "CRM", imageUrl: "icon-blackbaud.png" },
  { name: "CircleCI", logo: "🔄", category: "DevOps", imageUrl: "icon-circleci.png" },
  { name: "Cloud Storage API", logo: "☁️", category: "API", imageUrl: "icon-cloudstorageapi.png" },
  { name: "CSV", logo: "📄", category: "File Format", imageUrl: "icon-csv.png" },
  { name: "Datadog", logo: "📊", category: "Monitoring", imageUrl: "icon-datadog.png" },
  { name: "Docusign Monitor", logo: "📋", category: "Document", imageUrl: "icon-docusignmonitor.png" },
  { name: "Domo", logo: "📈", category: "Analytics", imageUrl: "icon-domo.png" },
  { name: "Dynatrace", logo: "📊", category: "Monitoring", imageUrl: "icon-dynatrace.png" },
  { name: "Excel", logo: "📊", category: "File Format", imageUrl: "icon-excel.png" },
  { name: "Facebook Ads", logo: "📱", category: "Advertising", imageUrl: "icon-facebookads.png" },
  { name: "Facebook Page Insights", logo: "📊", category: "Analytics", imageUrl: "icon-facebookpageinsights.png" },
  { name: "File-Based API", logo: "📄", category: "API", imageUrl: "icon-filebasedapi.png" },
  { name: "Fixed-Width (COBAL)", logo: "📄", category: "File Format", imageUrl: "icon-fixedwidthcobal.png" },
  { name: "Freshdesk", logo: "🎧", category: "Support", imageUrl: "icon-freshdesk.png" },
  { name: "Freshsales", logo: "💼", category: "CRM", imageUrl: "icon-freshsales.png" },
  { name: "Google Ads", logo: "📱", category: "Advertising", imageUrl: "icon-googleads.png" },
  { name: "Google Analytics 4", logo: "📈", category: "Analytics", imageUrl: "icon-googleanalytics4.png" },
  { name: "Google BigQuery", logo: "📊", category: "Data Warehouse", imageUrl: "icon-googlebigquery.png" },
  { name: "Google Search Console", logo: "🔍", category: "Analytics", imageUrl: "icon-googlesearchconsole.png" },
  { name: "Google Sheets", logo: "📊", category: "Spreadsheet", imageUrl: "icon-googlesheets.png" },
  { name: "GraphQL API", logo: "🔗", category: "API", imageUrl: "icon-graphqlapi.png" },
  { name: "HubSpot", logo: "🎯", category: "CRM", imageUrl: "icon-hubspot.png" },
  { name: "Instagram Ads", logo: "📷", category: "Advertising", imageUrl: "icon-instagramads.png" },
  { name: "Intercom", logo: "💬", category: "Communication", imageUrl: "icon-intercom.png" },
  { name: "JDBC", logo: "🔗", category: "Database", imageUrl: "icon-jdbc.png" },
  { name: "Jira Cloud", logo: "🎫", category: "Project Management", imageUrl: "icon-jiracloud.png" },
  { name: "JSON", logo: "📄", category: "File Format", imageUrl: "icon-json.png" },
  { name: "Kafka", logo: "📡", category: "Streaming", imageUrl: "icon-kafka.png" },
  { name: "Kustomer", logo: "🎧", category: "Support", imageUrl: "icon-kustomer.png" },
  { name: "LinkedIn", logo: "💼", category: "Social Media", imageUrl: "icon-linkedin.png" },
  { name: "Mailchimp", logo: "📧", category: "Email Marketing", imageUrl: "icon-mailchimp.png" },
  { name: "Microsoft Dynamics 365 CRM", logo: "💼", category: "CRM", imageUrl: "icon-microsoftdynamics365crm.png" },
  { name: "Microsoft Teams", logo: "👥", category: "Communication", imageUrl: "icon-microsoftteams.png" },
  { name: "Mixpanel", logo: "📊", category: "Analytics", imageUrl: "icon-mixpanel.png" },
  { name: "Monday", logo: "📅", category: "Project Management", imageUrl: "icon-monday.png" },
  { name: "MongoDB", logo: "🍃", category: "Database", imageUrl: "icon-mongodb.png" },
  { name: "MongoDB Atlas", logo: "🍃", category: "Database", imageUrl: "icon-mongodbatlas.png" },
  { name: "Okta", logo: "🔒", category: "Identity", imageUrl: "icon-okta.png" },
  { name: "Oracle NetSuite", logo: "💼", category: "ERP", imageUrl: "icon-oraclenetsuite.png" },
  { name: "Paypal", logo: "💳", category: "Payment", imageUrl: "icon-paypal.png" },
  { name: "Pendo", logo: "📊", category: "Analytics", imageUrl: "icon-pendo.png" },
  { name: "Pipedrive", logo: "💼", category: "CRM", imageUrl: "icon-pipedrive.png" },
  { name: "Productboard", logo: "📋", category: "Product Management", imageUrl: "icon-productboard.png" },
  { name: "QuickBooks", logo: "💼", category: "Accounting", imageUrl: "icon-quickbooks.png" },
  { name: "Rest API", logo: "🔗", category: "API", imageUrl: "icon-restapi.png" },
  { name: "Salesforce", logo: "☁️", category: "CRM", imageUrl: "icon-salesforce.png" },
  { name: "Salesforce Commerce Cloud", logo: "🛒", category: "E-commerce", imageUrl: "icon-salesforcecommercecloud.png" },
  { name: "Salesforce Marketing Cloud", logo: "📧", category: "Marketing", imageUrl: "icon-salesforcemarketingcloud.png" },
  { name: "Salesforce Marketing Cloud Account Engagement", logo: "📈", category: "Marketing", imageUrl: "icon-salesforce-marketingcloudaccountengagement.png" },
  { name: "SAP HANA", logo: "💎", category: "Database", imageUrl: "icon-saphana.png" },
  { name: "SAP OData", logo: "💎", category: "API", imageUrl: "icon-sap-odata.png" },
  { name: "SendGrid", logo: "📧", category: "Email", imageUrl: "icon-sendgrid.png" },
  { name: "ServiceNow", logo: "🔧", category: "ITSM", imageUrl: "icon-servicenow.png" },
  { name: "Slack", logo: "💬", category: "Communication", imageUrl: "icon-slack.png" },
  { name: "Smartsheet", logo: "📊", category: "Spreadsheet", imageUrl: "icon-smartsheet.png" },
  { name: "Snapchat Ads", logo: "👻", category: "Advertising", imageUrl: "icon-snapchatads.png" },
  { name: "Snowflake", logo: "❄️", category: "Data Warehouse", imageUrl: "icon-snowflake.png" },
  { name: "SOAP API", logo: "🔗", category: "API", imageUrl: "icon-soapapi.png" },
  { name: "Streaming API", logo: "📡", category: "API", imageUrl: "icon-streamingapi.png" },
  { name: "Stripe", logo: "💳", category: "Payment", imageUrl: "icon-stripe.png" },
  { name: "Teradata Vantage", logo: "🗄️", category: "Data Warehouse", imageUrl: "icon-teradatavantage.png" },
  { name: "Twilio", logo: "📞", category: "Communication", imageUrl: "icon-twilio.png" },
  { name: "Vertica", logo: "🗄️", category: "Database", imageUrl: "icon-vertica.png" },
  { name: "Webhook/Push API", logo: "🔗", category: "API", imageUrl: "icon-webhookpushapi.png" },
  { name: "WooCommerce", logo: "🛒", category: "E-commerce", imageUrl: "icon-woocommerce.png" },
  { name: "XML", logo: "📄", category: "File Format", imageUrl: "icon-xml.png" },
  { name: "Zendesk", logo: "🎧", category: "Support", imageUrl: "icon-zendesk.png" },
  { name: "Zoho CRM", logo: "💼", category: "CRM", imageUrl: "icon-zohocrm.png" },
  { name: "Zoom Meetings", logo: "📹", category: "Communication", imageUrl: "icon-zoommeetings.png" }
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
                <div className="mb-2 flex items-center justify-center h-8">
                  {connector.imageUrl ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={connector.imageUrl}
                        alt={`${connector.name} logo`}
                        fill
                        className="object-contain"
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