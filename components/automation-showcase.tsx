"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, ChevronRight } from "lucide-react"

export default function AutomationShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple Setup, Powerful Results</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AutoLake's intuitive interface makes it easy to set up and manage your data ingestion processes.
        </p>
      </div>

      <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-background">
        <Tabs defaultValue="connect" className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-[#f7f8fa] dark:bg-slate-800 px-4">
            <TabsList className="bg-transparent h-14">
              <TabsTrigger value="connect" className="data-[state=active]:bg-background/50">
                1. Connect Source
              </TabsTrigger>
              <TabsTrigger value="configure" className="data-[state=active]:bg-background/50">
                2. Configure Extraction
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-background/50">
                3. Schedule & Monitor
              </TabsTrigger>
              <TabsTrigger value="analyze" className="data-[state=active]:bg-background/50">
                4. Analyze Data
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="connect" className="p-0 m-0">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/database-connection-screen-4K2Wd0Ygz8UVfhzIBQrjGfgXwW8Iqo.png"
                alt="Database Connection Interface"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="gap-2 bg-primary/90 hover:bg-primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play className="h-5 w-5" />
                  {isPlaying ? "Pause Demo" : "Watch Demo"}
                </Button>
              </div>
            </div>
            <div className="p-6 bg-background">
              <h3 className="text-xl font-semibold mb-2">Connect to Any Data Source</h3>
              <p className="text-muted-foreground mb-4">
                Our secure connection manager automatically detects database schema and tables, eliminating manual
                configuration.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">Oracle</div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">
                  SQL Server
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">MySQL</div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">
                  PostgreSQL
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">MongoDB</div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm text-center">+ More</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configure" className="p-0 m-0">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/extraction-config-screen-4K2Wd0Ygz8UVfhzIBQrjGfgXwW8Iqo.png"
                alt="Extraction Configuration Interface"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="p-6 bg-background">
              <h3 className="text-xl font-semibold mb-2">Configure Your Extraction</h3>
              <p className="text-muted-foreground mb-4">
                Choose between full or incremental extraction, set filters, and define transformation rules with our
                intuitive interface.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Automated Schema Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Data Type Conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Filter Configuration</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="p-0 m-0">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/schedule-monitor-screen-4K2Wd0Ygz8UVfhzIBQrjGfgXwW8Iqo.png"
                alt="Scheduling and Monitoring Interface"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="p-6 bg-background">
              <h3 className="text-xl font-semibold mb-2">Schedule & Monitor Your Pipelines</h3>
              <p className="text-muted-foreground mb-4">
                Set up recurring schedules, monitor pipeline health, and receive alerts when issues arise.
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-gray-800/50">
                  <div className="font-medium mb-1">Real-time Monitoring</div>
                  <div className="text-muted-foreground">Track pipeline status and performance metrics</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-800/50">
                  <div className="font-medium mb-1">Flexible Scheduling</div>
                  <div className="text-muted-foreground">Cron expressions or simple interval settings</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-800/50">
                  <div className="font-medium mb-1">Automated Alerts</div>
                  <div className="text-muted-foreground">Email, Slack, or webhook notifications</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analyze" className="p-0 m-0">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/analytics-dashboard-screen-4K2Wd0Ygz8UVfhzIBQrjGfgXwW8Iqo.png"
                alt="Analytics Dashboard Interface"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="p-6 bg-background">
              <h3 className="text-xl font-semibold mb-2">Analyze Your Data</h3>
              <p className="text-muted-foreground mb-4">
                Explore your data with built-in analytics tools or connect to your favorite BI platform.
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Compatible with all major BI tools including Tableau, Power BI, and Looker
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  Learn More <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
