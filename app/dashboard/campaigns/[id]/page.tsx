"use client"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Eye,
  Upload,
  Download,
  BarChart3,
  Instagram,
  TwitterIcon as TikTok,
  Youtube,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock campaign data
const campaignData = {
  id: 1,
  name: "Summer Collection Launch",
  description: "Promoting our new summer collection with lifestyle influencers",
  platform: "Instagram",
  status: "Active",
  influencerCount: 12,
  startDate: "2025-06-15",
  endDate: "2025-07-15",
  budget: 25000,
  spent: 15000,
  progress: 65,
  metrics: {
    impressions: 1250000,
    engagement: 85000,
    clicks: 32000,
    conversions: 1800,
  },
}

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

// Mock content submissions
const mockContentSubmissions = [
  {
    id: 1,
    influencerId: 2,
    influencerName: "Mike Brown",
    influencerHandle: "@mikebrown",
    platform: "TikTok",
    type: "video",
    thumbnail: "/placeholder.svg?height=200&width=200",
    caption: "Summer vibes with @brandname's new collection! #SummerStyle #ad",
    status: "approved",
    submittedDate: "2025-06-18",
    approvedDate: "2025-06-19",
    scheduledDate: "2025-06-22",
  },
  {
    id: 2,
    influencerId: 3,
    influencerName: "Emily Wilson",
    influencerHandle: "@emilywilson",
    platform: "Instagram",
    type: "image",
    thumbnail: "/placeholder.svg?height=200&width=200",
    caption: "Loving my new summer essentials from @brandname! Perfect for beach days ☀️ #SummerCollection #ad",
    status: "pending",
    submittedDate: "2025-06-19",
    approvedDate: null,
    scheduledDate: "2025-06-24",
  },
  {
    id: 3,
    influencerId: 4,
    influencerName: "Alex Chen",
    influencerHandle: "@alexchen",
    platform: "YouTube",
    type: "video",
    thumbnail: "/placeholder.svg?height=200&width=200",
    caption: "SUMMER HAUL 2025 | Trying on the new @brandname summer collection! #SummerFashion #ad",
    status: "live",
    submittedDate: "2025-06-15",
    approvedDate: "2025-06-16",
    scheduledDate: "2025-06-18",
  },
]

// Mock timeline events
const mockTimelineEvents = [
  {
    date: "2025-06-01",
    title: "Campaign Planning",
    description: "Finalize campaign brief and influencer requirements",
    status: "completed",
  },
  {
    date: "2025-06-05",
    title: "Influencer Outreach",
    description: "Send initial outreach emails to potential influencers",
    status: "completed",
  },
  {
    date: "2025-06-10",
    title: "Contracts Signed",
    description: "Finalize contracts with all participating influencers",
    status: "completed",
  },
  {
    date: "2025-06-12",
    title: "Product Shipment",
    description: "Ship products to all confirmed influencers",
    status: "completed",
  },
  {
    date: "2025-06-20",
    title: "Content Approval Deadline",
    description: "All content must be submitted for approval by this date",
    status: "in-progress",
  },
  {
    date: "2025-06-25",
    title: "Content Live",
    description: "All influencer content should be published",
    status: "upcoming",
  },
  {
    date: "2025-07-05",
    title: "Performance Review",
    description: "Review campaign performance and gather insights",
    status: "upcoming",
  },
  {
    date: "2025-07-15",
    title: "Campaign End",
    description: "Official end date of the campaign",
    status: "upcoming",
  },
]

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaignId = params.id

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

  const getContentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Needs Revision</Badge>
      case "live":
        return <Badge className="bg-green-500">Live</Badge>
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

  const getTimelineStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        )
      case "in-progress":
        return (
          <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
            <Clock className="h-4 w-4" />
          </div>
        )
      case "upcoming":
        return (
          <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </div>
        )
      default:
        return null
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      case "TikTok":
        return <TikTok className="h-4 w-4" />
      case "YouTube":
        return <Youtube className="h-4 w-4" />
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/campaigns">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>
      </div>

      <DashboardHeader heading={campaignData.name} text={campaignData.description}>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/campaigns/${campaignData.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Campaign
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Influencers
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message All
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusBadge(campaignData.status)}</div>
            <p className="text-xs text-muted-foreground">
              {formatDate(campaignData.startDate)} - {formatDate(campaignData.endDate)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${campaignData.spent.toLocaleString()}</div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <span>of ${campaignData.budget.toLocaleString()}</span>
              <span className="ml-auto">{Math.round((campaignData.spent / campaignData.budget) * 100)}%</span>
            </div>
            <Progress value={(campaignData.spent / campaignData.budget) * 100} className="mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Influencers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaignData.influencerCount}</div>
            <div className="mt-2 flex -space-x-2">
              {mockCampaignInfluencers.slice(0, 5).map((influencer) => (
                <Avatar key={influencer.id} className="border-2 border-background">
                  <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.name} />
                  <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {campaignData.influencerCount > 5 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{campaignData.influencerCount - 5}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaignData.progress}%</div>
            <Progress value={campaignData.progress} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Campaign is on track</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Key metrics for your campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <span className="text-sm font-medium text-muted-foreground">Impressions</span>
                <span className="text-2xl font-bold">{campaignData.metrics.impressions.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <span className="text-sm font-medium text-muted-foreground">Engagement</span>
                <span className="text-2xl font-bold">{campaignData.metrics.engagement.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <span className="text-sm font-medium text-muted-foreground">Clicks</span>
                <span className="text-2xl font-bold">{campaignData.metrics.clicks.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                <span className="text-sm font-medium text-muted-foreground">Conversions</span>
                <span className="text-2xl font-bold">{campaignData.metrics.conversions.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 h-[200px] w-full flex items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">Performance Chart</h3>
                <p className="mt-1 text-xs text-muted-foreground">Detailed performance charts coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Campaign Timeline</CardTitle>
            <CardDescription>Key milestones and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-8">
              {mockTimelineEvents.map((event, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  {getTimelineStatusIcon(event.status)}
                  <div
                    className={`absolute left-3 top-3 h-full w-px bg-border ${
                      index === mockTimelineEvents.length - 1 ? "hidden" : ""
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-muted-foreground">{event.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="influencers" className="w-full">
        <TabsList>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="influencers" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Campaign Influencers</CardTitle>
                <CardDescription>Manage influencers and track their progress</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Influencers
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
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
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {getPlatformIcon(influencer.platform)}
                              <span className="ml-2">{influencer.platform}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{formatFollowers(influencer.followers)}</td>
                          <td className="px-4 py-3">{getInfluencerStatusBadge(influencer.status)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {influencer.tasks.map((task, index) => (
                                <div
                                  key={index}
                                  className="flex items-center"
                                  title={`${task.name}: ${formatDate(task.date)}`}
                                >
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
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove from Campaign
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Content Gallery</CardTitle>
                <CardDescription>Review and approve influencer content submissions</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Content
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockContentSubmissions.map((content) => (
                  <Card key={content.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={content.thumbnail || "/placeholder.svg"}
                        alt={`Content by ${content.influencerName}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(content.platform)}
                          <span className="text-sm font-medium">{content.platform}</span>
                        </div>
                        {getContentStatusBadge(content.status)}
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={content.influencerName} />
                          <AvatarFallback>{content.influencerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{content.influencerHandle}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{content.caption}</p>
                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <span>Submitted: {formatDate(content.submittedDate)}</span>
                        {content.scheduledDate && <span>Scheduled: {formatDate(content.scheduledDate)}</span>}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        {content.status === "pending" ? (
                          <Button size="sm" className="flex-1">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        ) : (
                          <Button variant="secondary" size="sm" className="flex-1">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Comment
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Messages</CardTitle>
              <CardDescription>Communication with campaign influencers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">Message Center</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Message center functionality coming soon</p>
                  <Button className="mt-4 bg-transparent" variant="outline">
                    Send Campaign Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
