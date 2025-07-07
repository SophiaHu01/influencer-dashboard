"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  PlusCircle,
  Trash2,
  Edit,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import Link from "next/link"

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Collection Launch",
    description: "Promoting our new summer collection with lifestyle influencers",
    platform: "Instagram",
    status: "Active",
    influencerCount: 12,
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    budget: 25000,
    progress: 65,
  },
  {
    id: 2,
    name: "Holiday Gift Guide",
    description: "Seasonal gift guide featuring our top products",
    platform: "Multiple",
    status: "Planning",
    influencerCount: 8,
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    budget: 18000,
    progress: 25,
  },
  {
    id: 3,
    name: "New Product Teaser",
    description: "Building anticipation for our upcoming product launch",
    platform: "TikTok",
    status: "Active",
    influencerCount: 5,
    startDate: "2025-05-20",
    endDate: "2025-06-10",
    budget: 12000,
    progress: 80,
  },
  {
    id: 4,
    name: "Brand Awareness",
    description: "General brand awareness campaign with diverse influencers",
    platform: "YouTube",
    status: "Completed",
    influencerCount: 15,
    startDate: "2025-03-01",
    endDate: "2025-04-30",
    budget: 35000,
    progress: 100,
  },
  {
    id: 5,
    name: "Product Review Series",
    description: "In-depth reviews of our flagship products",
    platform: "Multiple",
    status: "Active",
    influencerCount: 7,
    startDate: "2025-04-15",
    endDate: "2025-07-15",
    budget: 20000,
    progress: 45,
  },
]

// Mock data for campaign influencers
const mockCampaignInfluencers = [
  {
    id: 1,
    name: "Sarah Jones",
    handle: "@sarahjones",
    platform: "Instagram",
    followers: 125000,
    status: "Invited",
    tasks: [
      { name: "Contract Signed", status: "completed", date: "2025-06-10" },
      { name: "Product Shipped", status: "completed", date: "2025-06-12" },
      { name: "Content Approval", status: "pending", date: "2025-06-20" },
      { name: "Post Live", status: "not-started", date: "2025-06-25" },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Mike Brown",
    handle: "@mikebrown",
    platform: "TikTok",
    followers: 450000,
    status: "Confirmed",
    tasks: [
      { name: "Contract Signed", status: "completed", date: "2025-06-08" },
      { name: "Product Shipped", status: "completed", date: "2025-06-11" },
      { name: "Content Approval", status: "completed", date: "2025-06-18" },
      { name: "Post Live", status: "pending", date: "2025-06-22" },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Wilson",
    handle: "@emilywilson",
    platform: "Instagram",
    followers: 89000,
    status: "Content Submitted",
    tasks: [
      { name: "Contract Signed", status: "completed", date: "2025-06-05" },
      { name: "Product Shipped", status: "completed", date: "2025-06-09" },
      { name: "Content Approval", status: "pending", date: "2025-06-19" },
      { name: "Post Live", status: "not-started", date: "2025-06-24" },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Alex Chen",
    handle: "@alexchen",
    platform: "YouTube",
    followers: 320000,
    status: "Posted",
    tasks: [
      { name: "Contract Signed", status: "completed", date: "2025-06-02" },
      { name: "Product Shipped", status: "completed", date: "2025-06-05" },
      { name: "Content Approval", status: "completed", date: "2025-06-15" },
      { name: "Post Live", status: "completed", date: "2025-06-18" },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CampaignsPage() {
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)
  const [newCampaignName, setNewCampaignName] = useState("")
  const [newCampaignDescription, setNewCampaignDescription] = useState("")
  const [newCampaignPlatform, setNewCampaignPlatform] = useState("Instagram")
  const [newCampaignStartDate, setNewCampaignStartDate] = useState("")
  const [newCampaignEndDate, setNewCampaignEndDate] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const handleCreateCampaign = () => {
    if (newCampaignName.trim() === "") {
      toast({
        title: "Error",
        description: "Campaign name cannot be empty",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Campaign created",
      description: `"${newCampaignName}" has been created successfully.`,
    })

    setShowNewCampaignDialog(false)
    setNewCampaignName("")
    setNewCampaignDescription("")
    setNewCampaignPlatform("Instagram")
    setNewCampaignStartDate("")
    setNewCampaignEndDate("")
  }

  const handleDeleteCampaign = (campaignId: number) => {
    toast({
      title: "Campaign deleted",
      description: "The campaign has been deleted successfully.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Planning":
        return <Badge className="bg-blue-500">Planning</Badge>
      case "Completed":
        return <Badge variant="outline">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getInfluencerStatusBadge = (status: string) => {
    switch (status) {
      case "Invited":
        return <Badge variant="outline">Invited</Badge>
      case "Confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>
      case "Content Submitted":
        return <Badge className="bg-purple-500">Content Submitted</Badge>
      case "Posted":
        return <Badge className="bg-green-500">Posted</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "not-started":
        return <AlertCircle className="h-4 w-4 text-gray-300" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`
    }
    return followers.toString()
  }

  // Filter campaigns based on active tab
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    if (activeTab === "all") return true
    return campaign.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Campaign Management" text="Create and manage your influencer marketing campaigns." />

      <div className="flex flex-col gap-6">
        {/* Campaign tabs and create button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
            <DialogTrigger asChild>
              <Button className="sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Create a new campaign to organize your influencer marketing efforts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter campaign name"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter campaign description"
                    value={newCampaignDescription}
                    onChange={(e) => setNewCampaignDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={newCampaignPlatform} onValueChange={setNewCampaignPlatform}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Multiple">Multiple Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCampaignStartDate}
                      onChange={(e) => setNewCampaignStartDate(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newCampaignEndDate}
                      onChange={(e) => setNewCampaignEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Campaigns table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Campaign</th>
                    <th className="px-4 py-3 text-left font-medium">Platform</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Influencers</th>
                    <th className="px-4 py-3 text-left font-medium">Timeline</th>
                    <th className="px-4 py-3 text-left font-medium">Progress</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b">
                      <td className="px-4 py-3">
                        <div>
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="font-medium text-purple-600 hover:underline"
                          >
                            {campaign.name}
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-1">{campaign.description}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{campaign.platform}</td>
                      <td className="px-4 py-3">{getStatusBadge(campaign.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{campaign.influencerCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex w-full max-w-xs flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span>{campaign.progress}%</span>
                            <span>${campaign.budget.toLocaleString()}</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-purple-600" style={{ width: `${campaign.progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end">
                          <Link href={`/dashboard/campaigns/${campaign.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Influencers
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Campaign
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Campaign detail section (shown when a campaign is selected) */}
        {selectedCampaign && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="influencers">
                <TabsList>
                  <TabsTrigger value="influencers">Influencers</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="influencers" className="mt-4">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Influencer</th>
                          <th className="px-4 py-3 text-left font-medium">Platform</th>
                          <th className="px-4 py-3 text-left font-medium">Followers</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Tasks</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockCampaignInfluencers.map((influencer) => (
                          <tr key={influencer.id} className="border-b">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={influencer.image || "/placeholder.svg"}
                                  alt={influencer.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                  <p className="font-medium">{influencer.name}</p>
                                  <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">{influencer.platform}</td>
                            <td className="px-4 py-3">{formatFollowers(influencer.followers)}</td>
                            <td className="px-4 py-3">{getInfluencerStatusBadge(influencer.status)}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                {influencer.tasks.map((task, index) => (
                                  <div key={index} className="flex items-center">
                                    {getTaskStatusIcon(task.status)}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                                  <DropdownMenuItem>Update Status</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Remove from Campaign</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="mt-4">
                  <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">Timeline view coming soon</p>
                  </div>
                </TabsContent>
                <TabsContent value="content" className="mt-4">
                  <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">Content gallery coming soon</p>
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="mt-4">
                  <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">Performance metrics coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
