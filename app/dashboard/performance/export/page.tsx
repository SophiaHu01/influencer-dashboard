"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon, Download, FileText, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function ExportReportPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: new Date(), // Today
  })
  const [reportType, setReportType] = useState("")
  const [campaigns, setCampaigns] = useState<string[]>([])
  const [metrics, setMetrics] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("")

  const availableCampaigns = [
    { id: "1", name: "Summer Collection" },
    { id: "2", name: "Holiday Guide" },
    { id: "3", name: "Product Launch" },
    { id: "4", name: "Brand Awareness" },
  ]

  const availableMetrics = [
    { id: "reach", name: "Reach" },
    { id: "impressions", name: "Impressions" },
    { id: "engagement", name: "Engagement Rate" },
    { id: "clicks", name: "Clicks" },
    { id: "conversions", name: "Conversions" },
    { id: "cost", name: "Cost per Engagement" },
    { id: "roi", name: "ROI" },
  ]

  const handleCampaignChange = (campaignId: string, checked: boolean) => {
    if (checked) {
      setCampaigns([...campaigns, campaignId])
    } else {
      setCampaigns(campaigns.filter((id) => id !== campaignId))
    }
  }

  const handleMetricChange = (metricId: string, checked: boolean) => {
    if (checked) {
      setMetrics([...metrics, metricId])
    } else {
      setMetrics(metrics.filter((id) => id !== metricId))
    }
  }

  const handleExport = () => {
    if (!reportType) {
      toast({
        title: "Error",
        description: "Please select a report type.",
        variant: "destructive",
      })
      return
    }

    if (!exportFormat) {
      toast({
        title: "Error",
        description: "Please select an export format.",
        variant: "destructive",
      })
      return
    }

    if (campaigns.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one campaign.",
        variant: "destructive",
      })
      return
    }

    if (metrics.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one metric.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Export started",
      description: "Your report is being generated and will be downloaded shortly.",
    })

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export completed",
        description: "Your report has been downloaded successfully.",
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <DashboardHeader heading="Export Report" text="Generate and download custom performance reports" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type */}
          <Card>
            <CardHeader>
              <CardTitle>Report Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign">Campaign Performance</SelectItem>
                  <SelectItem value="influencer">Influencer Performance</SelectItem>
                  <SelectItem value="content">Content Performance</SelectItem>
                  <SelectItem value="audience">Audience Analytics</SelectItem>
                  <SelectItem value="roi">ROI Analysis</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={campaign.id}
                      checked={campaigns.includes(campaign.id)}
                      onCheckedChange={(checked) => handleCampaignChange(campaign.id, checked as boolean)}
                    />
                    <Label htmlFor={campaign.id} className="text-sm font-normal">
                      {campaign.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Metrics to Include</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {availableMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric.id}
                      checked={metrics.includes(metric.id)}
                      onCheckedChange={(checked) => handleMetricChange(metric.id, checked as boolean)}
                    />
                    <Label htmlFor={metric.id} className="text-sm font-normal">
                      {metric.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Export Format */}
          <Card>
            <CardHeader>
              <CardTitle>Export Format</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Report
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Excel Spreadsheet
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      CSV File
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium">Report Type:</div>
                <div className="text-muted-foreground">{reportType || "Not selected"}</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Date Range:</div>
                <div className="text-muted-foreground">
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                    : "Not selected"}
                </div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Campaigns:</div>
                <div className="text-muted-foreground">{campaigns.length} selected</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Metrics:</div>
                <div className="text-muted-foreground">{metrics.length} selected</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Format:</div>
                <div className="text-muted-foreground">{exportFormat || "Not selected"}</div>
              </div>
            </CardContent>
          </Card>

          {/* Export Button */}
          <Card>
            <CardContent className="pt-6">
              <Button onClick={handleExport} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
