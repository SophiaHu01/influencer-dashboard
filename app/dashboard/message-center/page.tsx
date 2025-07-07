"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Send, Eye, Edit, Trash2, Copy, Mail, Smartphone, Monitor, MoreHorizontal, Settings, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for email templates
const mockTemplates = [
  {
    id: 1,
    name: "Initial Outreach",
    subject: "Collaboration Opportunity with [Brand Name]",
    body: "Hi {{name}},\n\nI hope this email finds you well! I'm reaching out from [Brand Name] because we love your content on {{platform}} and believe your audience of {{followers}} followers would be a great fit for our upcoming campaign.\n\nWould you be interested in collaborating with us? We'd love to send you some products to feature in your content.\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name]\n[Brand Name]",
    lastEdited: "2025-06-01",
    category: "Outreach",
  },
  {
    id: 2,
    name: "Campaign Brief",
    subject: "Campaign Brief: Summer Collection Launch",
    body: "Hi {{name}},\n\nThank you for agreeing to participate in our Summer Collection campaign! Here are the details:\n\n- Campaign period: June 15 - July 15, 2025\n- Deliverables: 1 in-feed post and 2 stories\n- Key messaging: Focus on the versatility and comfort of the products\n- Hashtags: #SummerCollection #BrandNameStyle\n\nPlease submit your content for approval by June 20th. Let me know if you have any questions!\n\nBest,\n[Your Name]",
    lastEdited: "2025-06-05",
    category: "Campaign",
  },
  {
    id: 3,
    name: "Content Approval",
    subject: "Your Content Has Been Approved!",
    body: "Hi {{name}},\n\nGreat news! We've reviewed your content submission and it looks fantastic. Your post has been approved and is ready to go live according to our agreed schedule.\n\nRemember to tag @brandname and use the campaign hashtags when posting.\n\nThank you for your amazing work!\n\nBest regards,\n[Your Name]",
    lastEdited: "2025-06-10",
    category: "Approval",
  },
  {
    id: 4,
    name: "Payment Confirmation",
    subject: "Payment Confirmation for Your Collaboration",
    body: "Hi {{name}},\n\nI'm writing to confirm that payment for your recent collaboration with us has been processed. You should receive the agreed amount of $XXX within 3-5 business days.\n\nThank you again for your wonderful content and partnership!\n\nBest regards,\n[Your Name]\n[Brand Name]",
    lastEdited: "2025-06-15",
    category: "Payment",
  },
]

// Mock data for influencer lists
const mockLists = [
  {
    id: 1,
    name: "Summer Campaign",
    count: 12,
  },
  {
    id: 2,
    name: "Beauty Influencers",
    count: 8,
  },
  {
    id: 3,
    name: "High Engagement",
    count: 15,
  },
  {
    id: 4,
    name: "Micro Influencers",
    count: 20,
  },
]

// Mock data for influencers with extended data
const mockInfluencers = [
  {
    id: 1,
    name: "Sarah Jones",
    username: "sarahjones",
    handle: "@sarahjones",
    bio: "Fashion & Lifestyle Content Creator | Sustainable Living Advocate",
    email: "sarah.jones@example.com",
    platform: "Instagram",
    followers: 125000,
    verified: true,
    business_account: true,
    category: "Fashion & Lifestyle",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "sarah.jones@example.com",
    bio_link: "https://sarahjones.com",
    avg_views: 35000,
    avg_likes: 2800,
    avg_comments: 180,
    avg_engagements: 2980,
    avg_engagement_rate: 4.2,
  },
  {
    id: 2,
    name: "Mike Brown",
    username: "mikebrown",
    handle: "@mikebrown",
    bio: "Comedy & Dance Content Creator | Making people smile daily",
    email: "mike.brown@example.com",
    platform: "TikTok",
    followers: 450000,
    verified: true,
    business_account: false,
    category: "Comedy & Dance",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "mike.brown@example.com",
    bio_link: "https://linktr.ee/mikebrown",
    avg_views: 125000,
    avg_likes: 8500,
    avg_comments: 420,
    avg_engagements: 8920,
    avg_engagement_rate: 7.8,
  },
  {
    id: 3,
    name: "Emily Wilson",
    username: "emilywilson",
    handle: "@emilywilson",
    bio: "Beauty & Skincare Expert | Clean beauty advocate",
    email: "emily.wilson@example.com",
    platform: "Instagram",
    followers: 89000,
    verified: false,
    business_account: true,
    category: "Beauty & Skincare",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "emily.wilson@example.com",
    bio_link: "https://emilywilson.beauty",
    avg_views: 28000,
    avg_likes: 1800,
    avg_comments: 120,
    avg_engagements: 1920,
    avg_engagement_rate: 5.1,
  },
  {
    id: 4,
    name: "Alex Chen",
    username: "alexchen",
    handle: "@alexchen",
    bio: "Tech Reviewer | Gaming Enthusiast | Gadget Expert",
    email: "alex.chen@example.com",
    platform: "YouTube",
    followers: 320000,
    verified: true,
    business_account: true,
    category: "Tech & Gaming",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "alex.chen@example.com",
    bio_link: "https://alexchen.tech",
    avg_views: 85000,
    avg_likes: 3200,
    avg_comments: 280,
    avg_engagements: 3480,
    avg_engagement_rate: 3.9,
  },
]

// Default available variables
const defaultVariables = [
  { key: "name", label: "Name", description: "Influencer's full name" },
  { key: "username", label: "Username", description: "Platform username without @" },
  { key: "handle", label: "Handle", description: "Platform handle with @" },
  { key: "platform", label: "Platform", description: "Social media platform" },
  { key: "followers", label: "Followers", description: "Number of followers" },
  { key: "bio", label: "Bio", description: "Influencer's bio/description" },
  { key: "category", label: "Category", description: "Content category" },
  { key: "avg_engagement_rate", label: "Engagement Rate", description: "Average engagement rate %" },
  { key: "contact_email", label: "Contact Email", description: "Contact email address" },
  { key: "bio_link", label: "Bio Link", description: "Link in bio URL" },
]

const processEmailContent = (content: string, influencer?: any, customVariables?: any[]) => {
  if (!influencer) return content

  let processedContent = content

  // Process default variables
  defaultVariables.forEach(variable => {
    const regex = new RegExp(`\\{\\{${variable.key}\\}\\}`, 'g')
    const value = influencer[variable.key] || ""
    processedContent = processedContent.replace(regex, value.toString())
  })

  // Process custom variables if any
  if (customVariables) {
    customVariables.forEach(variable => {
      const regex = new RegExp(`\\{\\{${variable.key}\\}\\}`, 'g')
      processedContent = processedContent.replace(regex, variable.value || "")
    })
  }

  return processedContent
}

export default function MessageCenterPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([])
  const [selectedList, setSelectedList] = useState<number | null>(null)
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false)
  const [showVariableManagerDialog, setShowVariableManagerDialog] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [newTemplateSubject, setNewTemplateSubject] = useState("")
  const [newTemplateBody, setNewTemplateBody] = useState("")
  const [newTemplateCategory, setNewTemplateCategory] = useState("Outreach")
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [customVariables, setCustomVariables] = useState<{key: string, value: string, description: string}[]>([])
  const [newVariableKey, setNewVariableKey] = useState("")
  const [newVariableValue, setNewVariableValue] = useState("")
  const [newVariableDescription, setNewVariableDescription] = useState("")
  const [selectedVariables, setSelectedVariables] = useState<string[]>(defaultVariables.map(v => v.key))

  const handleTemplateSelect = (templateId: number) => {
    const template = mockTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setEmailSubject(template.subject)
      setEmailBody(template.body)
    }
  }

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() === "") {
      toast({
        title: "Error",
        description: "Template name cannot be empty",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Template created",
      description: `"${newTemplateName}" has been created successfully.`,
    })

    setShowNewTemplateDialog(false)
    setNewTemplateName("")
    setNewTemplateSubject("")
    setNewTemplateBody("")
    setNewTemplateCategory("Outreach")
  }

  const handleSendEmail = (isTest = false) => {
    if (selectedRecipients.length === 0 && !selectedList) {
      toast({
        title: "Error",
        description: "Please select recipients or a list",
        variant: "destructive",
      })
      return
    }

    const recipientCount = selectedList
      ? mockLists.find((l) => l.id === selectedList)?.count || 0
      : selectedRecipients.length

    toast({
      title: isTest ? "Test email sent" : "Emails sent",
      description: isTest ? "Test email sent to your email address" : `Email sent to ${recipientCount} recipients`,
    })
  }

  const handleRecipientToggle = (influencerId: number) => {
    setSelectedRecipients((prev) =>
      prev.includes(influencerId) ? prev.filter((id) => id !== influencerId) : [...prev, influencerId],
    )
  }

  const handleAddCustomVariable = () => {
    if (!newVariableKey.trim() || !newVariableValue.trim()) {
      toast({
        title: "Error",
        description: "Variable key and value are required",
        variant: "destructive",
      })
      return
    }

    setCustomVariables([...customVariables, {
      key: newVariableKey,
      value: newVariableValue,
      description: newVariableDescription
    }])

    setNewVariableKey("")
    setNewVariableValue("")
    setNewVariableDescription("")

    toast({
      title: "Variable added",
      description: `Custom variable "${newVariableKey}" has been added.`,
    })
  }

  const handleRemoveCustomVariable = (key: string) => {
    setCustomVariables(customVariables.filter(v => v.key !== key))
    toast({
      title: "Variable removed",
      description: `Custom variable "${key}" has been removed.`,
    })
  }

  const insertVariable = (variableKey: string) => {
    const cursorPosition = (document.getElementById('emailBody') as HTMLTextAreaElement)?.selectionStart || emailBody.length
    const beforeCursor = emailBody.substring(0, cursorPosition)
    const afterCursor = emailBody.substring(cursorPosition)
    const newContent = beforeCursor + `{{${variableKey}}}` + afterCursor
    setEmailBody(newContent)
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      Outreach: "bg-blue-500",
      Campaign: "bg-purple-500",
      Approval: "bg-green-500",
      Payment: "bg-amber-500",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-500"}>{category}</Badge>
  }

  const allVariables = [...defaultVariables, ...customVariables.map(v => ({
    key: v.key,
    label: v.key,
    description: v.description
  }))]

  const getSelectedInfluencers = () => {
    if (selectedList) {
      return mockInfluencers // In real app, this would filter by list
    }
    return mockInfluencers.filter(inf => selectedRecipients.includes(inf.id))
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Message Center"
        text="Create and send personalized emails to your influencers using templates."
      />

      <Tabs defaultValue="compose" className="w-full">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sent">Sent Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Email Composer */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Compose Email</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowVariableManagerDialog(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Variables
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="template">Select Template (Optional)</Label>
                    <Select onValueChange={(value) => handleTemplateSelect(Number.parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            <div className="flex items-center gap-2">
                              <span>{template.name}</span>
                              {getCategoryBadge(template.category)}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter email subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailBody">Message</Label>
                      <div className="flex gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Insert Variable
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64">
                            {allVariables.filter(v => selectedVariables.includes(v.key)).map((variable) => (
                              <DropdownMenuItem
                                key={variable.key}
                                onClick={() => insertVariable(variable.key)}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">{{`{${variable.key}}`}}</span>
                                  <span className="text-xs text-muted-foreground">{variable.description}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <Textarea
                      id="emailBody"
                      placeholder="Enter your message here. Use variables like {{name}}, {{platform}}, etc. for personalization."
                      className="min-h-[300px]"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                    />
                    <div className="text-xs text-muted-foreground">
                      Available variables: {allVariables.filter(v => selectedVariables.includes(v.key)).map(v => `{{${v.key}}}`).join(', ')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSendEmail(true)} variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Send Test
                    </Button>
                    <Button onClick={() => handleSendEmail(false)}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Preview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Email Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`mx-auto border rounded-lg p-4 bg-white ${previewMode === "mobile" ? "max-w-sm" : "max-w-2xl"}`}
                  >
                    <div className="border-b pb-2 mb-4">
                      <div className="text-sm text-gray-600">Subject:</div>
                      <div className="font-medium">
                        {processEmailContent(emailSubject, mockInfluencers[0], customVariables) || "No subject"}
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap text-sm">
                      {processEmailContent(emailBody, mockInfluencers[0], customVariables) || "No message content"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Variable Preview Table */}
              {getSelectedInfluencers().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Variable Preview</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Preview how variables will be replaced for each selected influencer
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="px-2 py-2 text-left font-medium">Influencer</th>
                            {allVariables.filter(v => selectedVariables.includes(v.key)).map(variable => (
                              <th key={variable.key} className="px-2 py-2 text-left font-medium">
                                {{`{${variable.key}}`}}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {getSelectedInfluencers().slice(0, 5).map((influencer) => (
                            <tr key={influencer.id} className="border-b">
                              <td className="px-2 py-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={influencer.profile_pic || "/placeholder.svg"}
                                    alt={influencer.name}
                                    className="h-6 w-6 rounded-full object-cover"
                                  />
                                  <span className="font-medium">{influencer.name}</span>
                                </div>
                              </td>
                              {allVariables.filter(v => selectedVariables.includes(v.key)).map(variable => (
                                <td key={variable.key} className="px-2 py-2 text-muted-foreground">
                                  {customVariables.find(cv => cv.key === variable.key)?.value || 
                                   (influencer as any)[variable.key]?.toString() || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {getSelectedInfluencers().length > 5 && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Showing 5 of {getSelectedInfluencers().length} selected influencers
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recipients */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Send to List</Label>
                    <Select onValueChange={(value) => setSelectedList(Number.parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a list" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLists.map((list) => (
                          <SelectItem key={list.id} value={list.id.toString()}>
                            {list.name} ({list.count} influencers)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">or</div>

                  <div className="grid gap-2">
                    <Label>Select Individual Recipients</Label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mockInfluencers.map((influencer) => (
                        <div key={influencer.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`influencer-${influencer.id}`}
                            checked={selectedRecipients.includes(influencer.id)}
                            onCheckedChange={() => handleRecipientToggle(influencer.id)}
                          />
                          <div className="flex items-center gap-2 flex-1">
                            <img
                              src={influencer.profile_pic || "/placeholder.svg"}
                              alt={influencer.name}
                              className="h-6 w-6 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{influencer.name}</p>
                              <p className="text-xs text-muted-foreground">{influencer.handle}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      {selectedList
                        ? `List: ${mockLists.find((l) => l.id === selectedList)?.name} (${mockLists.find((l) => l.id === selectedList)?.count} recipients)`
                        : `Selected: ${selectedRecipients.length} recipients`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Email Templates</CardTitle>
                <p className="text-sm text-muted-foreground">Manage your email templates</p>
              </div>
              <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Template</DialogTitle>
                    <DialogDescription>Create a new email template for your campaigns.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input
                        id="templateName"
                        placeholder="Enter template name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="templateCategory">Category</Label>
                      <Select value={newTemplateCategory} onValueChange={setNewTemplateCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Outreach">Outreach</SelectItem>
                          <SelectItem value="Campaign">Campaign</SelectItem>
                          <SelectItem value="Approval">Approval</SelectItem>
                          <SelectItem value="Payment">Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="templateSubject">Subject</Label>
                      <Input
                        id="templateSubject"
                        placeholder="Enter email subject"
                        value={newTemplateSubject}
                        onChange={(e) => setNewTemplateSubject(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="templateBody">Message</Label>
                      <Textarea
                        id="templateBody"
                        placeholder="Enter template content"
                        className="min-h-[200px]"
                        value={newTemplateBody}
                        onChange={(e) => setNewTemplateBody(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTemplateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>Create Template</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleTemplateSelect(template.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Use Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mb-2">{getCategoryBadge(template.category)}</div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{template.subject}</p>
                      <p className="text-xs text-muted-foreground">Last edited: {template.lastEdited}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sent Messages</CardTitle>
              <p className="text-sm text-muted-foreground">View your sent email history</p>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No sent messages</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Your sent message history will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Variable Manager Dialog */}
      <Dialog open={showVariableManagerDialog} onOpenChange={setShowVariableManagerDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Email Variables</DialogTitle>
            <DialogDescription>
              Configure which variables are available for your email templates and add custom variables.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Available Variables */}
            <div>
              <h4 className="font-medium mb-3">Available Variables</h4>
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {defaultVariables.map((variable) => (
                  <div key={variable.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`var-${variable.key}`}
                      checked={selectedVariables.includes(variable.key)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedVariables([...selectedVariables, variable.key])
                        } else {
                          setSelectedVariables(selectedVariables.filter(v => v !== variable.key))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-1 rounded">{{`{${variable.key}}`}}</code>
                        <span className="text-sm font-medium">{variable.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{variable.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Variables */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Custom Variables</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Variable key"
                    value={newVariableKey}
                    onChange={(e) => setNewVariableKey(e.target.value)}
                    className="w-32"
                  />
                  <Input
                    placeholder="Default value"
                    value={newVariableValue}
                    onChange={(e) => setNewVariableValue(e.target.value)}
                    className="w-32"
                  />
                  <Input
                    placeholder="Description"
                    value={newVariableDescription}
                    onChange={(e) => setNewVariableDescription(e.target.value)}
                    className="w-40"
                  />
                  <Button onClick={handleAddCustomVariable} size="sm">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {customVariables.map((variable) => (
                  <div key={variable.key} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-1 rounded">{{`{${variable.key}}`}}</code>
                        <span className="text-sm font-medium">{variable.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{variable.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCustomVariable(variable.key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {customVariables.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No custom variables added yet
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowVariableManagerDialog(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
