"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, Eye, Heart, DollarSign, Download, Calendar, Star, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Mock performance data
const mockCampaignMetrics = [
  {
    id: 1,
    name: "Summer Collection Launch",
    status: "Active",
    impressions: 1250000,
    engagement: 85000,
    clicks: 32000,
    conversions: 1800,
    roi: 320,
    spend: 15000,
    revenue: 48000,
    progress: 65,
  },
  {
    id: 2,
    name: "Holiday Gift Guide",
    status: "Planning",
    impressions: 0,
    engagement: 0,
    clicks: 0,
    conversions: 0,
    roi: 0,
    spend: 0,
    revenue: 0,
    progress: 25,
  },
  {
    id: 3,
    name: "Product Teaser",
    status: "Active",
    impressions: 890000,
    engagement: 67000,
    clicks: 28000,
    conversions: 1200,
    roi: 280,
    spend: 12000,
    revenue: 33600,
    progress: 80,
  },
  {
    id: 4,
    name: "Brand Awareness",
    status: "Completed",
    impressions: 2100000,
    engagement: 145000,
    clicks: 58000,
    conversions: 3200,
    roi: 450,
    spend: 35000,
    revenue: 157500,
    progress: 100,
  },
]

const mockInfluencerPerformance = [
  {
    id: 1,
    name: "Sarah Jones",
    username: "sarahjones",
    handle: "@sarahjones",
    bio: "Fashion & Lifestyle Content Creator | Sustainable Living Advocate",
    image: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    followers: 125000,
    verified: true,
    business_account: true,
    category: "Fashion & Lifestyle",
    contact_email: "sarah.jones@example.com",
    bio_link: "https://sarahjones.com",
    impressions: 450000,
    engagement: 28000,
    avg_views: 35000,
    avg_likes: 2800,
    avg_comments: 180,
    avg_engagements: 2980,
    avg_engagement_rate: 6.2,
    clicks: 12000,
    conversions: 680,
    revenue: 15300,
    campaign_id: 1,
    campaign_name: "Summer Collection Launch",
  },
  {
    id: 2,
    name: "Mike Brown",
    username: "mikebrown",
    handle: "@mikebrown",
    bio: "Comedy & Dance Content Creator | Making people smile daily",
    image: "/placeholder.svg?height=40&width=40",
    platform: "TikTok",
    followers: 450000,
    verified: true,
    business_account: false,
    category: "Comedy & Dance",
    contact_email: "mike.brown@example.com",
    bio_link: "https://linktr.ee/mikebrown",
    impressions: 890000,
    engagement: 67000,
    avg_views: 125000,
    avg_likes: 8500,
    avg_comments: 420,
    avg_engagements: 8920,
    avg_engagement_rate: 7.5,
    clicks: 28000,
    conversions: 1200,
    revenue: 28800,
    campaign_id: 1,
    campaign_name: "Summer Collection Launch",
  },
  {
    id: 3,
    name: "Emily Wilson",
    username: "emilywilson",
    handle: "@emilywilson",
    bio: "Beauty & Skincare Expert | Clean beauty advocate",
    image: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    followers: 89000,
    verified: false,
    business_account: true,
    category: "Beauty & Skincare",
    contact_email: "emily.wilson@example.com",
    bio_link: "https://emilywilson.beauty",
    impressions: 320000,
    engagement: 19000,
    avg_views: 28000,
    avg_likes: 1800,
    avg_comments: 120,
    avg_engagements: 1920,
    avg_engagement_rate: 5.9,
    clicks: 8500,
    conversions: 420,
    revenue: 9240,
    campaign_id: 3,
    campaign_name: "Product Teaser",
  },
  {
    id: 4,
    name: "Alex Chen",
    username: "alexchen",
    handle: "@alexchen",
    bio: "Tech Reviewer | Gaming Enthusiast | Gadget Expert",
    image: "/placeholder.svg?height=40&width=40",
    platform: "YouTube",
    followers: 320000,
    verified: true,
    business_account: true,
    category: "Tech & Gaming",
    contact_email: "alex.chen@example.com",
    bio_link: "https://alexchen.tech",
    impressions: 680000,
    engagement: 42000,
    avg_views: 85000,
    avg_likes: 3200,
    avg_comments: 280,
    avg_engagements: 3480,
    avg_engagement_rate: 6.2,
    clicks: 18000,
    conversions: 890,
    revenue: 21360,
    campaign_id: 4,
    campaign_name: "Brand Awareness",
  },
]

const mockTopContent = [
  {
    id: 1,
    influencer: "Sarah Jones",
    platform: "Instagram",
    type: "Post",
    impressions: 125000,
    engagement: 8500,
    engagementRate: 6.8,
    clicks: 3200,
    conversions: 180,
  },
  {
    id: 2,
    influencer: "Mike Brown",
    platform: "TikTok",
    type: "Video",
    impressions: 340000,
    engagement: 28000,
    engagementRate: 8.2,
    clicks: 12000,
    conversions: 520,
  },
  {
    id: 3,
    influencer: "Alex Chen",
    platform: "YouTube",
    type: "Video",
    impressions: 280000,
    engagement: 18000,
    engagementRate: 6.4,
    clicks: 8500,
    conversions: 380,
  },
]

export default function PerformancePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedCampaign, setSelectedCampaign] = useState("all")

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
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

  // Calculate totals
  const totalImpressions = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.impressions, 0)
  const totalEngagement = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.engagement, 0)
  const totalClicks = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.clicks, 0)
  const totalConversions = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const totalSpend = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.spend, 0)
  const totalRevenue = mockCampaignMetrics.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const averageROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Performance Analytics"
        text="Track and analyze your influencer marketing campaign performance."
      >
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link href="/dashboard/performance/export">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalImpressions)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalEngagement)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageROI.toFixed(0)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="influencers">Influencer Performance</TabsTrigger>
          <TabsTrigger value="top-influencers">Top Performance Influencers</TabsTrigger>
          <TabsTrigger value="content">Top Content</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Performance metrics for all your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Campaign</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Impressions</th>
                      <th className="px-4 py-3 text-left font-medium">Engagement</th>
                      <th className="px-4 py-3 text-left font-medium">Clicks</th>
                      <th className="px-4 py-3 text-left font-medium">Conversions</th>
                      <th className="px-4 py-3 text-left font-medium">ROI</th>
                      <th className="px-4 py-3 text-left font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCampaignMetrics.map((campaign) => (
                      <tr key={campaign.id} className="border-b">
                        <td className="px-4 py-3 font-medium">{campaign.name}</td>
                        <td className="px-4 py-3">{getStatusBadge(campaign.status)}</td>
                        <td className="px-4 py-3">{formatNumber(campaign.impressions)}</td>
                        <td className="px-4 py-3">{formatNumber(campaign.engagement)}</td>
                        <td className="px-4 py-3">{formatNumber(campaign.clicks)}</td>
                        <td className="px-4 py-3">{campaign.conversions.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {campaign.roi > 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                            )}
                            <span className={campaign.roi > 0 ? "text-green-600" : "text-red-600"}>
                              {campaign.roi}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={campaign.progress} className="w-16" />
                            <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="influencers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Influencer Performance</CardTitle>
              <CardDescription>Performance metrics for your influencers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Influencer</th>
                      <th className="px-4 py-3 text-left font-medium">Platform</th>
                      <th className="px-4 py-3 text-left font-medium">Followers</th>
                      <th className="px-4 py-3 text-left font-medium">Impressions</th>
                      <th className="px-4 py-3 text-left font-medium">Engagement Rate</th>
                      <th className="px-4 py-3 text-left font-medium">Clicks</th>
                      <th className="px-4 py-3 text-left font-medium">Conversions</th>
                      <th className="px-4 py-3 text-left font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInfluencerPerformance.map((influencer) => (
                      <tr key={influencer.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.name} />
                              <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{influencer.name}</p>
                              <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{influencer.platform}</td>
                        <td className="px-4 py-3">{formatNumber(influencer.followers)}</td>
                        <td className="px-4 py-3">{formatNumber(influencer.impressions)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="font-medium">{influencer.avg_engagement_rate}%</span>
                            <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                          </div>
                        </td>
                        <td className="px-4 py-3">{formatNumber(influencer.clicks)}</td>
                        <td className="px-4 py-3">{influencer.conversions.toLocaleString()}</td>
                        <td className="px-4 py-3 font-medium">{formatCurrency(influencer.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-influencers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performance Influencers</CardTitle>
              <CardDescription>Your highest performing influencers with detailed metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInfluencerPerformance
                  .sort((a, b) => b.avg_engagement_rate - a.avg_engagement_rate)
                  .map((influencer, index) => (
                    <Card key={influencer.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-medium">
                            #{index + 1}
                          </div>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.name} />
                            <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{influencer.name}</h3>
                                {influencer.verified && (
                                  <Badge className="bg-blue-500 text-xs">
                                    Verified
                                  </Badge>
                                )}
                                {influencer.business_account && (
                                  <Badge variant="outline" className="text-xs">
                                    Business
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                              <p className="text-sm text-muted-foreground mt-1">{influencer.bio}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="secondary">{influencer.platform}</Badge>
                                <Badge variant="outline">{influencer.category}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {influencer.contact_email}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/campaigns/${influencer.campaign_id}`}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Campaign
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/influencer-search/${influencer.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm">
                            <div>
                              <p className="font-medium">{formatNumber(influencer.followers)}</p>
                              <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div>
                              <p className="font-medium">{formatNumber(influencer.avg_views)}</p>
                              <p className="text-xs text-muted-foreground">Avg Views</p>
                            </div>
                            <div>
                              <p className="font-medium">{formatNumber(influencer.avg_likes)}</p>
                              <p className="text-xs text-muted-foreground">Avg Likes</p>
                            </div>
                            <div>
                              <p className="font-medium">{influencer.avg_comments}</p>
                              <p className="text-xs text-muted-foreground">Avg Comments</p>
                            </div>
                            <div>
                              <p className="font-medium">{formatNumber(influencer.avg_engagements)}</p>
                              <p className="text-xs text-muted-foreground">Avg Engagements</p>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{influencer.avg_engagement_rate}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Engagement Rate</p>
                            </div>
                            <div>
                              <p className="font-medium">{influencer.conversions}</p>
                              <p className="text-xs text-muted-foreground">Conversions</p>
                            </div>
                            <div>
                              <p className="font-medium">{formatCurrency(influencer.revenue)}</p>
                              <p className="text-xs text-muted-foreground">Revenue</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="text-sm text-muted-foreground">
                              Currently in: <span className="font-medium">{influencer.campaign_name}</span>
                            </div>
                            {influencer.bio_link && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={influencer.bio_link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Bio Link
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best performing content pieces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopContent.map((content, index) => (
                  <div key={content.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-medium">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{content.influencer}</p>
                        <p className="text-sm text-muted-foreground">
                          {content.platform} • {content.type}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">
                      <div>
                        <p className="text-sm font-medium">{formatNumber(content.impressions)}</p>
                        <p className="text-xs text-muted-foreground">Impressions</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{formatNumber(content.engagement)}</p>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{content.engagementRate}%</p>
                        <p className="text-xs text-muted-foreground">Eng. Rate</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{content.conversions}</p>
                        <p className="text-xs text-muted-foreground">Conversions</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">Performance Chart</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Interactive charts coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insights & Recommendations</CardTitle>
                <CardDescription>AI-powered insights to improve performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">High Performing Platform</span>
                    </div>
                    <p className="text-sm text-green-700">
                      TikTok content is showing 23% higher engagement rates. Consider allocating more budget to TikTok
                      influencers.
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Optimal Posting Time</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Posts published between 2-4 PM show 18% higher engagement. Schedule content during these hours.
                    </p>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Audience Insight</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Video content generates 2.3x more engagement than static images. Consider increasing video content
                      ratio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
