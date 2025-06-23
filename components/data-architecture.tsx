"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { DefinitionButton } from "@/components/definition-button"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const definitions = {
  // Data Sources
  Database: "A structured set of data held in a computer, especially one that is accessible in various ways.",
  Files: "Collections of data stored in a computer system for easy retrieval and manipulation.",
  "API's":
    "Application Programming Interfaces that allow different software applications to communicate with each other.",
  Stream: "A continuous flow of data that can be processed in real-time.",

  // Data Storage
  "Data Ingestion":
    "The process of importing, transferring, loading and processing data for later use or storage in a database.",
  "Data Curation":
    "The organization and integration of data collected from various sources, annotation of the data, and presentation of the data such that the value of the data is maintained over time.",
  "Data Distribution": "The process of sharing or delivering data to users or other systems.",
  "Data Replication":
    "The process of storing data in more than one site or node, often in different physical locations.",
  "Data Warehouse":
    "A large store of data accumulated from a wide range of sources within a company and used to guide management decisions.",
  "Operational Data Store":
    "A database designed to integrate data from multiple sources for additional operations on the data.",
  "Synthetic Data": "Artificially generated data that mimics real data in terms of essential characteristics.",

  // Analytics
  "Data Mining":
    "The process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems.",
  "Predictive Analytics":
    "The use of data, statistical algorithms and machine learning techniques to identify the likelihood of future outcomes based on historical data.",

  // Transformation
  "Data Validation": "The process of ensuring that data is clean, correct and useful.",
  "Data Merge": "The process of combining two or more datasets into a single dataset.",
  "Data Conversion": "The process of transforming data from one format or structure into another.",

  // Distribution
  "Rest API": "A software architectural style that defines a set of constraints to be used for creating Web services.",
  "Pub/Sub":
    "A messaging pattern where senders of messages, called publishers, do not program the messages to be sent directly to specific receivers, called subscribers.",
  Streaming: "The continuous transfer of data from a server to a client.",
  "JDBC/ODBC Direct SQL":
    "Database connectivity standards that provide a common interface for connecting from applications to databases.",
  SDK: "Software Development Kit, a collection of software development tools in one installable package.",
  Reporting:
    "The process of organizing data into informational summaries to monitor how different areas of a business are performing.",

  // Governance
  "Data Governance":
    "A collection of practices and processes which help to ensure the formal management of data assets within an organization.",
  "Data Privacy":
    "The aspect of information technology that deals with the ability an organization or individual has to determine what data in a computer system can be shared with third parties.",
  "Data Security":
    "The practice of protecting digital information from unauthorized access, corruption, or theft throughout its entire lifecycle.",
  "Data Profiling":
    "The process of examining the data available in an existing data source and collecting statistics and information about that data.",
  "Access Control":
    "The selective restriction of access to a place or other resource, the act of accessing may mean consuming, entering, or using.",
  "Metadata Management":
    "The administration of data that describes other data, involving establishing policies and processes to ensure information can be integrated, accessed, shared, linked, analyzed and maintained.",
  "Data Tokenization":
    "The process of substituting a sensitive data element with a non-sensitive equivalent, referred to as a token, that has no extrinsic or exploitable meaning or value.",
  "Data Classification": "The process of organizing data into categories for its most effective and efficient use.",
  "Data Deduping": "A technique for eliminating redundant data in a data set.",
  Logging: "The process of recording events, operations, and other activities that occur in systems and applications.",

  // Add new definitions for Analytics, Notification, and Usage Tracking
  Analytics: "The systematic computational analysis of data or statistics.",
  Notification: "The act of informing or making known.",
  "Usage Tracking": "The process of monitoring and recording how a system or its components are being used.",

  // Add definitions for specific items under these new categories as needed
}

const sections = {
  "Data Sources": {
    internal: ["Database", "Files", "API's", "Stream"],
    external: ["Files", "API's"],
  },
  "Data Storage": [
    "Data Ingestion",
    "Data Curation",
    "Data Distribution",
    "Data Replication",
    "Data Warehouse",
    "Operational Data Store",
    "Synthetic Data",
  ],
  Transformation: ["Data Validation", "Data Merge", "Data Conversion"],
  "Governance, Access Control & Security": [
    "Data Governance",
    "Data Privacy",
    "Data Security",
    "Data Profiling",
    "Access Control",
    "Metadata Management",
    "Data Tokenization",
    "Data Classification",
    "Data Deduping",
    "Logging",
  ],
  Analytics: ["Data Mining", "Predictive Analytics"],
  Notification: ["Error Handling", "Messaging"],
  Distribution: {
    internal: ["Rest API", "Pub/Sub", "Streaming", "JDBC/ODBC Direct SQL", "SDK", "Reporting"],
    external: ["Rest API", "Files"],
  },
  "Usage Tracking": ["Who", "When", "What", "How"],
}

export default function DataArchitecture() {
  const [zoomedSection, setZoomedSection] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const closeZoomedSection = useCallback(() => {
    setZoomedSection(null)
    setSelectedTerm(null)
  }, [])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeZoomedSection()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [closeZoomedSection])

  const renderZoomedSection = () => {
    if (!zoomedSection) return null

    let content
    if (zoomedSection === "Data Sources" || zoomedSection === "Distribution") {
      content = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-semibold mb-2">Internal</h4>
            <div className="space-y-2">
              {sections[zoomedSection].internal.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <DefinitionButton
                    term={item}
                    definition={definitions[item] || "Definition not available."}
                    className="bg-muted/20 hover:bg-muted/30 justify-start"
                    onSelect={() => setSelectedTerm(item)}
                    isSelected={selectedTerm === item}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold mb-2">External</h4>
            <div className="space-y-2">
              {sections[zoomedSection].external.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <DefinitionButton
                    term={item}
                    definition={definitions[item] || "Definition not available."}
                    className="bg-muted/20 hover:bg-muted/30 justify-start"
                    onSelect={() => setSelectedTerm(item)}
                    isSelected={selectedTerm === item}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {sections[zoomedSection].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <DefinitionButton
                  term={item}
                  definition={definitions[item] || "Definition not available."}
                  className="bg-muted/20 hover:bg-muted/30 justify-start"
                  onSelect={() => setSelectedTerm(item)}
                  isSelected={selectedTerm === item}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-4 z-50 bg-background/95 backdrop-blur-sm rounded-lg p-8 overflow-auto"
      >
        <button className="absolute top-4 right-4 text-2xl" onClick={closeZoomedSection}>
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-6">{zoomedSection}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content}
          <motion.div
            className="bg-muted/10 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedTerm ? (
              <>
                <h4 className="font-semibold mb-2">{selectedTerm}</h4>
                <p className="text-sm text-muted-foreground">
                  {definitions[selectedTerm] || "Definition not available."}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a term to see its definition.</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    )
  }

  const sectionColors = {
    "Data Sources": "bg-blue-100/10 hover:bg-blue-100/20",
    "Data Storage": "bg-green-100/10 hover:bg-green-100/20",
    Transformation: "bg-purple-100/10 hover:bg-purple-100/20",
    "Governance, Access Control & Security": "bg-yellow-100/10 hover:bg-yellow-100/20",
    Analytics: "bg-red-100/10 hover:bg-red-100/20",
    Notification: "bg-indigo-100/10 hover:bg-indigo-100/20",
    Distribution: "bg-pink-100/10 hover:bg-pink-100/20",
    "Usage Tracking": "bg-orange-100/10 hover:bg-orange-100/20",
  }

  return (
    <section className="container py-16">
      <Card className="p-8">
        <motion.h3
          className="text-2xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Autonomous Data Lake Conceptual Architecture
        </motion.h3>

        <AnimatePresence>
          {zoomedSection && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={closeZoomedSection}
            />
          )}
          {renderZoomedSection()}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.keys(sections).map((sectionName, index) => (
            <motion.div
              key={sectionName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DefinitionButton
                term={sectionName}
                definition={`Click to see ${
                  Array.isArray(sections[sectionName])
                    ? sections[sectionName].length
                    : sections[sectionName].internal.length + sections[sectionName].external.length
                } items in this category.`}
                className={`${sectionColors[sectionName]} text-center justify-center`}
                onZoom={() => {
                  setZoomedSection(sectionName)
                  setSelectedTerm(null)
                }}
              />
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  )
}
