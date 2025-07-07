"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Instagram, TwitterIcon as TikTok, Youtube, Search, PlusCircle, Filter, Star, ListPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for influencers
const mockInfluencers = [
  {
    id: 1,
    name: "Sarah Jones",
    handle: "@sarahjones",
    platform: "Instagram",
    followers: 125000,
    engagementRate: 4.2,
    categories: ["Fashion", "Lifestyle"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Mike Brown",
    handle: "@mikebrown",
    platform: "TikTok",
    followers: 450000,
    engagementRate: 7.8,
    categories: ["Comedy", "Dance"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Wilson",
    handle: "@emilywilson",
    platform: "Instagram",
    followers: 89000,
    engagementRate: 5.1,
    categories: ["Beauty", "Skincare"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Alex Chen",
    handle: "@alexchen",
    platform: "YouTube",
    followers: 320000,
    engagementRate: 3.9,
    categories: ["Tech", "Gaming"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Jordan Taylor",
    handle: "@jordantaylor",
    platform: "Instagram",
    followers: 175000,
    engagementRate: 4.7,
    categories: ["Fitness", "Health"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Priya Sharma",
    handle: "@priyasharma",
    platform: "TikTok",
    followers: 520000,
    engagementRate: 8.2,
    categories: ["Food", "Travel"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Carlos Rodriguez",
    handle: "@carlosrodriguez",
    platform: "YouTube",
    followers: 410000,
    engagementRate: 4.5,
    categories: ["Education", "Science"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 8,
    name: "Zoe Williams",
    handle: "@zoewilliams",
    platform: "Instagram",
    followers: 98000,
    engagementRate: 6.3,
    categories: ["Art", "Photography"],
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Mock data for lists
const mockLists = [
  { id: 1, name: "Summer Campaign" },
  { id: 2, name: "Beauty Influencers" },
  { id: 3, name: "High Engagement" },
  { id: 4, name: "Micro Influencers" },
]

// Mock data for campaigns
const mockCampaigns = [
  { id: 1, name: "Summer Collection Launch" },
  { id: 2, name: "Holiday Gift Guide" },
  { id: 3, name: "New Product Teaser" },
  { id: 4, name: "Brand Awareness" },
]

export default function InfluencerSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredInfluencers, setFilteredInfluencers] = useState(mockInfluencers)
  const [engagementRange, setEngagementRange] = useState([0, 10])
  const [followersRange, setFollowersRange] = useState([0, 1000000])
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    Instagram: true,
    TikTok: true,
    YouTube: true,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter influencers based on search query and filters
    const filtered = mockInfluencers.filter((influencer) => {
      const matchesSearch =
        searchQuery === "" ||
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.handle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlatform = selectedPlatforms[influencer.platform as keyof typeof selectedPlatforms]

      const matchesEngagement =
        influencer.engagementRate >= engagementRange[0] && influencer.engagementRate <= engagementRange[1]

      const matchesFollowers = influencer.followers >= followersRange[0] && influencer.followers <= followersRange[1]

      return matchesSearch && matchesPlatform && matchesEngagement && matchesFollowers
    })

    setFilteredInfluencers(filtered)
  }

  const handleAddToList = (influencerId: number, listId: number) => {
    toast({
      title: "Added to list",
      description: `Influencer added to list successfully.`,
    })
  }

  const handleAddToCampaign = (influencerId: number, campaignId: number) => {
    toast({
      title: "Added to campaign",
      description: `Influencer added to campaign successfully.`,
    })
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
      <DashboardHeader
        heading="Influencer Search"
        text="Find and connect with the perfect influencers for your campaigns."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Filters</h3>
                <form onSubmit={handleSearch}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platforms">Platforms</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="instagram"
                            checked={selectedPlatforms.Instagram}
                            onCheckedChange={(checked) =>
                              setSelectedPlatforms({ ...selectedPlatforms, Instagram: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="instagram"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Instagram
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tiktok"
                            checked={selectedPlatforms.TikTok}
                            onCheckedChange={(checked) =>
                              setSelectedPlatforms({ ...selectedPlatforms, TikTok: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="tiktok"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            TikTok
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="youtube"
                            checked={selectedPlatforms.YouTube}
                            onCheckedChange={(checked) =>
                              setSelectedPlatforms({ ...selectedPlatforms, YouTube: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="youtube"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            YouTube
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Engagement Rate (%)</Label>
                      <Slider
                        defaultValue={[0, 10]}
                        max={10}
                        step={0.1}
                        value={engagementRange}
                        onValueChange={setEngagementRange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{engagementRange[0]}%</span>
                        <span>{engagementRange[1]}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Followers</Label>
                      <Slider
                        defaultValue={[0, 1000000]}
                        max={1000000}
                        step={10000}
                        value={followersRange}
                        onValueChange={setFollowersRange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatFollowers(followersRange[0])}</span>
                        <span>{formatFollowers(followersRange[1])}</span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search results */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Instagram handle or keyword..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
            </div>
            <Button onClick={(e) => handleSearch(e)}>Search</Button>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">{filteredInfluencers.length} influencers found</div>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInfluencers.map((influencer) => (
                  <Card key={influencer.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col">
                        <div className="bg-purple-50 p-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={influencer.image || "/placeholder.svg"}
                              alt={influencer.name}
                              className="h-16 w-16 rounded-full border-2 border-white object-cover"
                            />
                            <div>
                              <Link
                                href={`/dashboard/influencer-search/${influencer.id}`}
                                className="font-medium text-purple-600 hover:underline"
                              >
                                {influencer.name}
                              </Link>
                              <div className="flex items-center text-sm text-muted-foreground">
                                {getPlatformIcon(influencer.platform)}
                                <span className="ml-1">{influencer.handle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Followers</p>
                              <p className="font-medium">{formatFollowers(influencer.followers)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Engagement</p>
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{influencer.engagementRate}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-4 flex flex-wrap gap-2">
                            {influencer.categories.map((category) => (
                              <Badge key={category} variant="secondary">
                                {category}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                  <ListPlus className="mr-2 h-4 w-4" />
                                  Add to List
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {mockLists.map((list) => (
                                  <DropdownMenuItem
                                    key={list.id}
                                    onClick={() => handleAddToList(influencer.id, list.id)}
                                  >
                                    {list.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="sm" className="flex-1">
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add to Campaign
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {mockCampaigns.map((campaign) => (
                                  <DropdownMenuItem
                                    key={campaign.id}
                                    onClick={() => handleAddToCampaign(influencer.id, campaign.id)}
                                  >
                                    {campaign.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Influencer</th>
                          <th className="px-4 py-3 text-left font-medium">Platform</th>
                          <th className="px-4 py-3 text-left font-medium">Followers</th>
                          <th className="px-4 py-3 text-left font-medium">Engagement</th>
                          <th className="px-4 py-3 text-left font-medium">Categories</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInfluencers.map((influencer) => (
                          <tr key={influencer.id} className="border-b">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={influencer.image || "/placeholder.svg"}
                                  alt={influencer.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                  <Link
                                    href={`/dashboard/influencer-search/${influencer.id}`}
                                    className="font-medium text-purple-600 hover:underline"
                                  >
                                    {influencer.name}
                                  </Link>
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
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{influencer.engagementRate}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {influencer.categories.map((category) => (
                                  <Badge key={category} variant="secondary" className="mr-1">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <ListPlus className="mr-2 h-4 w-4" />
                                      Add to List
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {mockLists.map((list) => (
                                      <DropdownMenuItem
                                        key={list.id}
                                        onClick={() => handleAddToList(influencer.id, list.id)}
                                      >
                                        {list.name}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="sm">
                                      <PlusCircle className="mr-2 h-4 w-4" />
                                      Add to Campaign
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {mockCampaigns.map((campaign) => (
                                      <DropdownMenuItem
                                        key={campaign.id}
                                        onClick={() => handleAddToCampaign(influencer.id, campaign.id)}
                                      >
                                        {campaign.name}
                                      </DropdownMenuItem>
                                    ))}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
