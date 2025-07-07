"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Users,
  Heart,
  MessageCircle,
  Calendar,
  Mail,
  Plus,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock influencer data
const mockInfluencer = {
  id: 1,
  name: "Sarah Johnson",
  handle: "@sarahjohnson",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Fashion & Lifestyle Content Creator | Sustainable Living Advocate | Coffee Enthusiast ☕",
  location: "Los Angeles, CA",
  verified: true,
  platforms: {
    instagram: {
      followers: 125000,
      engagement: 4.2,
      posts: 1250,
      avgLikes: 5200,
      avgComments: 180,
    },
    tiktok: {
      followers: 89000,
      engagement: 6.8,
      posts: 450,
      avgLikes: 6100,
      avgComments: 220,
    },
    youtube: {
      followers: 45000,
      engagement: 3.9,
      posts: 120,
      avgLikes: 1800,
      avgComments: 95,
    },
  },
  demographics: {
    ageGroups: [
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 45 },
      { range: "35-44", percentage: 15 },
      { range: "45+", percentage: 5 },
    ],
    genderSplit: {
      female: 78,
      male: 20,
      other: 2,
    },
    topCountries: ["United States", "Canada", "United Kingdom", "Australia"],
  },
  categories: ["Fashion", "Lifestyle", "Beauty", "Sustainability"],
  recentPosts: [
    {
      id: 1,
      platform: "Instagram",
      image: "/placeholder.svg?height=300&width=300",
      caption: "Sustainable fashion finds for fall 🍂 #SustainableFashion #EcoFriendly",
      likes: 5400,
      comments: 189,
      date: "2025-06-18",
    },
    {
      id: 2,
      platform: "TikTok",
      image: "/placeholder.svg?height=300&width=300",
      caption: "Morning routine that changed my life ✨ #MorningRoutine #SelfCare",
      likes: 8200,
      comments: 245,
      date: "2025-06-17",
    },
    {
      id: 3,
      platform: "Instagram",
      image: "/placeholder.svg?height=300&width=300",
      caption: "Coffee shop hopping in LA ☕ Which one should I try next?",
      likes: 4800,
      comments: 156,
      date: "2025-06-16",
    },
  ],
  collaborationHistory: [
    {
      brand: "EcoWear",
      campaign: "Sustainable Summer",
      date: "2025-05-15",
      performance: "Excellent",
      reach: 89000,
    },
    {
      brand: "GreenBeauty",
      campaign: "Natural Skincare",
      date: "2025-04-20",
      performance: "Good",
      reach: 67000,
    },
  ],
  rates: {
    instagram: {
      post: 1200,
      story: 400,
      reel: 800,
    },
    tiktok: {
      video: 900,
    },
    youtube: {
      integration: 2500,
      dedicated: 4000,
    },
  },
}

export default function InfluencerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showAddToCampaignDialog, setShowAddToCampaignDialog] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [message, setMessage] = useState("")

  const handleContact = () => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${mockInfluencer.name}.`,
    })
    setShowContactDialog(false)
    setMessage("")
  }

  const handleAddToCampaign = () => {
    if (!selectedCampaign) {
      toast({
        title: "Error",
        description: "Please select a campaign.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Added to campaign",
      description: `${mockInfluencer.name} has been added to the selected campaign.`,
    })
    setShowAddToCampaignDialog(false)
    setSelectedCampaign("")
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      case "TikTok":
        return <Twitter className="h-4 w-4" />
      case "YouTube":
        return <Youtube className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <DashboardHeader heading={mockInfluencer.name} text="Influencer profile and analytics" />
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockInfluencer.avatar || "/placeholder.svg"} alt={mockInfluencer.name} />
                <AvatarFallback className="text-lg">{mockInfluencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{mockInfluencer.name}</h2>
                  {mockInfluencer.verified && <Badge className="bg-blue-500">Verified</Badge>}
                </div>
                <p className="text-muted-foreground">{mockInfluencer.handle}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  {mockInfluencer.location}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm mb-4">{mockInfluencer.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockInfluencer.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {mockInfluencer.name}</DialogTitle>
                      <DialogDescription>Send a message to start a collaboration.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Hi! I'd love to discuss a potential collaboration..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleContact}>Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showAddToCampaignDialog} onOpenChange={setShowAddToCampaignDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add to Campaign</DialogTitle>
                      <DialogDescription>Select a campaign to add this influencer to.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="campaign">Campaign</Label>
                        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a campaign" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Summer Collection</SelectItem>
                            <SelectItem value="2">Holiday Guide</SelectItem>
                            <SelectItem value="3">Product Launch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddToCampaignDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddToCampaign}>Add to Campaign</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Recent Content</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(mockInfluencer.platforms).map(([platform, data]) => (
              <Card key={platform}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium capitalize">{platform}</CardTitle>
                  {getPlatformIcon(platform)}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold">{formatNumber(data.followers)}</div>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{data.engagement}%</div>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                      <div>
                        <div className="font-medium">{data.posts}</div>
                        <p className="text-xs text-muted-foreground">Posts</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{formatNumber(data.avgLikes)}</div>
                        <p className="text-xs text-muted-foreground">Avg Likes</p>
                      </div>
                      <div>
                        <div className="font-medium">{data.avgComments}</div>
                        <p className="text-xs text-muted-foreground">Avg Comments</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(mockInfluencer.rates).map(([platform, rates]) => (
                  <div key={platform}>
                    <h4 className="font-medium capitalize mb-3 flex items-center gap-2">
                      {getPlatformIcon(platform)}
                      {platform}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(rates).map(([type, rate]) => (
                        <div key={type} className="flex justify-between text-sm">
                          <span className="capitalize text-muted-foreground">{type}:</span>
                          <span className="font-medium">${rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockInfluencer.recentPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-0">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post content"
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getPlatformIcon(post.platform)}
                      <span className="text-sm font-medium">{post.platform}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-3 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {formatNumber(post.likes)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInfluencer.demographics.ageGroups.map((group) => (
                  <div key={group.range} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{group.range}</span>
                      <span>{group.percentage}%</span>
                    </div>
                    <Progress value={group.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Split</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockInfluencer.demographics.genderSplit).map(([gender, percentage]) => (
                  <div key={gender} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{gender}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {mockInfluencer.demographics.topCountries.map((country, index) => (
                  <div key={country} className="flex items-center gap-2 text-sm">
                    <span className="w-6 text-muted-foreground">{index + 1}.</span>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInfluencer.collaborationHistory.map((collab, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{collab.brand}</h4>
                      <p className="text-sm text-muted-foreground">{collab.campaign}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(collab.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {formatNumber(collab.reach)} reach
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={
                        collab.performance === "Excellent"
                          ? "bg-green-500"
                          : collab.performance === "Good"
                            ? "bg-blue-500"
                            : "bg-amber-500"
                      }
                    >
                      {collab.performance}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
