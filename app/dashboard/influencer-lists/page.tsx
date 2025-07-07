"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Instagram, TwitterIcon as TikTok, Youtube, Search, MoreHorizontal, PlusCircle, Trash2, Edit, Star, Tag, Filter, UserPlus } from 'lucide-react'
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for influencer lists
const mockLists = [
  {
    id: 1,
    name: "Summer Campaign",
    description: "Influencers for our summer product launch",
    count: 12,
    created: "2025-05-15",
    lastModified: "2025-06-18",
  },
  {
    id: 2,
    name: "Beauty Influencers",
    description: "Top beauty content creators",
    count: 8,
    created: "2025-04-20",
    lastModified: "2025-06-10",
  },
  {
    id: 3,
    name: "High Engagement",
    description: "Influencers with >5% engagement rate",
    count: 15,
    created: "2025-03-10",
    lastModified: "2025-06-15",
  },
  {
    id: 4,
    name: "Micro Influencers",
    description: "Creators with 10K-50K followers",
    count: 20,
    created: "2025-02-28",
    lastModified: "2025-06-12",
  },
]

// Mock data for influencers
const mockInfluencers = [
  {
    id: 1,
    name: "Sarah Jones",
    username: "sarahjones",
    handle: "@sarahjones",
    bio: "Fashion & Lifestyle Content Creator | Sustainable Living Advocate",
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
    tags: ["Summer", "High Engagement"],
    notes: "Great for product unboxing content. Quick to respond.",
  },
  {
    id: 2,
    name: "Mike Brown",
    username: "mikebrown",
    handle: "@mikebrown",
    bio: "Comedy & Dance Content Creator | Making people smile daily",
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
    tags: ["Video", "Trending"],
    notes: "Creates viral dance videos. Good for challenges.",
  },
  {
    id: 3,
    name: "Emily Wilson",
    username: "emilywilson",
    handle: "@emilywilson",
    bio: "Beauty & Skincare Expert | Clean beauty advocate",
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
    tags: ["Beauty", "Tutorial"],
    notes: "Specializes in skincare routines and product reviews.",
  },
  {
    id: 4,
    name: "Alex Chen",
    username: "alexchen",
    handle: "@alexchen",
    bio: "Tech Reviewer | Gaming Enthusiast | Gadget Expert",
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
    tags: ["Tech", "Reviews"],
    notes: "Detailed product reviews. Prefers longer partnerships.",
  },
]

// All available influencers for adding to lists
const mockAvailableInfluencers = [
  ...mockInfluencers,
  {
    id: 5,
    name: "Jordan Taylor",
    username: "jordantaylor",
    handle: "@jordantaylor",
    bio: "Fitness Coach | Wellness Advocate | Healthy Living",
    platform: "Instagram",
    followers: 175000,
    verified: false,
    business_account: true,
    category: "Fitness & Health",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "jordan.taylor@example.com",
    bio_link: "https://jordantaylor.fit",
    avg_views: 42000,
    avg_likes: 3200,
    avg_comments: 210,
    avg_engagements: 3410,
    avg_engagement_rate: 4.7,
    tags: ["Fitness", "Wellness"],
    notes: "Fitness coach with highly engaged audience.",
  },
  {
    id: 6,
    name: "Priya Sharma",
    username: "priyasharma",
    handle: "@priyasharma",
    bio: "Food & Travel Blogger | Exploring cultures through cuisine",
    platform: "TikTok",
    followers: 520000,
    verified: true,
    business_account: true,
    category: "Food & Travel",
    profile_pic: "/placeholder.svg?height=80&width=80",
    contact_email: "priya.sharma@example.com",
    bio_link: "https://priyasharma.food",
    avg_views: 180000,
    avg_likes: 12000,
    avg_comments: 580,
    avg_engagements: 12580,
    avg_engagement_rate: 8.2,
    tags: ["Foodie", "Travel"],
    notes: "Creates food and travel content. Open to brand trips.",
  },
]

// All possible tags for filtering
const allTags = [
  "Summer",
  "High Engagement",
  "Video",
  "Trending",
  "Beauty",
  "Tutorial",
  "Tech",
  "Reviews",
  "Fitness",
  "Wellness",
  "Foodie",
  "Travel",
  "Educational",
  "Explainer",
  "Creative",
  "Visual",
]

export default function InfluencerListsPage() {
  const [selectedList, setSelectedList] = useState(mockLists[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewListDialog, setShowNewListDialog] = useState(false)
  const [showEditListDialog, setShowEditListDialog] = useState(false)
  const [showAddInfluencersDialog, setShowAddInfluencersDialog] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [newListDescription, setNewListDescription] = useState("")
  const [editListName, setEditListName] = useState("")
  const [editListDescription, setEditListDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [selectedInfluencersToAdd, setSelectedInfluencersToAdd] = useState<number[]>([])
  const [addInfluencersSearch, setAddInfluencersSearch] = useState("")

  const handleCreateList = () => {
    if (newListName.trim() === "") {
      toast({
        title: "Error",
        description: "List name cannot be empty",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "List created",
      description: `"${newListName}" has been created successfully.`,
    })

    setShowNewListDialog(false)
    setNewListName("")
    setNewListDescription("")
  }

  const handleEditList = () => {
    if (editListName.trim() === "") {
      toast({
        title: "Error",
        description: "List name cannot be empty",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "List updated",
      description: `"${editListName}" has been updated successfully.`,
    })

    setShowEditListDialog(false)
    setEditListName("")
    setEditListDescription("")
  }

  const handleDeleteList = (listId: number) => {
    toast({
      title: "List deleted",
      description: "The list has been deleted successfully.",
    })
  }

  const handleAddInfluencersToList = () => {
    if (selectedInfluencersToAdd.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one influencer to add",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Influencers added",
      description: `${selectedInfluencersToAdd.length} influencer(s) have been added to the list.`,
    })

    setShowAddInfluencersDialog(false)
    setSelectedInfluencersToAdd([])
    setAddInfluencersSearch("")
  }

  const handleAddTag = (influencerId: number, tag: string) => {
    toast({
      title: "Tag added",
      description: `Tag "${tag}" added to influencer.`,
    })
  }

  const handleUpdateNotes = (influencerId: number, notes: string) => {
    toast({
      title: "Notes updated",
      description: "Influencer notes have been updated.",
    })
  }

  const handleRemoveFromList = (influencerId: number) => {
    toast({
      title: "Removed from list",
      description: "Influencer has been removed from the list.",
    })
  }

  const openEditDialog = (list: any) => {
    setEditListName(list.name)
    setEditListDescription(list.description)
    setShowEditListDialog(true)
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

  // Filter influencers based on search, tags, and platform
  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    const matchesSearch =
      searchQuery === "" ||
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || influencer.tags.some((tag) => selectedTags.includes(tag))

    const matchesPlatform = selectedPlatform === "all" || influencer.platform === selectedPlatform

    return matchesSearch && matchesTags && matchesPlatform
  })

  // Filter available influencers for adding
  const filteredAvailableInfluencers = mockAvailableInfluencers.filter((influencer) => {
    const matchesSearch =
      addInfluencersSearch === "" ||
      influencer.name.toLowerCase().includes(addInfluencersSearch.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(addInfluencersSearch.toLowerCase())

    return matchesSearch
  })

  // Sort influencers
  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "followers":
        return b.followers - a.followers
      case "engagement":
        return b.avg_engagement_rate - a.avg_engagement_rate
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Influencer Lists" text="Organize and manage your influencers in custom lists." />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Lists sidebar */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Lists</CardTitle>
            <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-4 w-4" />
                  New List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New List</DialogTitle>
                  <DialogDescription>Create a new list to organize your influencers.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">List Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter list name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter list description"
                      value={newListDescription}
                      onChange={(e) => setNewListDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateList}>Create List</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockLists.map((list) => (
                <div
                  key={list.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors ${
                    selectedList.id === list.id
                      ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-50"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedList(list)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{list.name}</span>
                    <span className="text-xs text-muted-foreground">{list.count} influencers</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(list)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit List
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowAddInfluencersDialog(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Influencers
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteList(list.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete List
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* List content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>{selectedList.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedList.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(selectedList)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit List
                  </Button>
                  <Button size="sm" onClick={() => setShowAddInfluencersDialog(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Influencers
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters and search */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search influencers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="default">
                        <Tag className="mr-2 h-4 w-4" />
                        Tags
                        {selectedTags.length > 0 && (
                          <Badge className="ml-2" variant="secondary">
                            {selectedTags.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {allTags.map((tag) => (
                        <DropdownMenuItem
                          key={tag}
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter((t) => t !== tag))
                            } else {
                              setSelectedTags([...selectedTags, tag])
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded-sm border ${
                                selectedTags.includes(tag) ? "bg-purple-600 border-purple-600" : "border-input"
                              }`}
                            >
                              {selectedTags.includes(tag) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                            <span>{tag}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="followers">Followers</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Influencer table */}
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Influencer</th>
                        <th className="px-4 py-3 text-left font-medium">Tags</th>
                        <th className="px-4 py-3 text-left font-medium">Notes</th>
                        <th className="px-4 py-3 text-left font-medium">Platform</th>
                        <th className="px-4 py-3 text-left font-medium">Followers</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedInfluencers.map((influencer) => (
                        <tr key={influencer.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={influencer.profile_pic || "/placeholder.svg"}
                                alt={influencer.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{influencer.name}</p>
                                  {influencer.verified && (
                                    <Badge className="bg-blue-500 text-xs">Verified</Badge>
                                  )}
                                  {influencer.business_account && (
                                    <Badge variant="outline" className="text-xs">Business</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {influencer.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="mr-1">
                                  {tag}
                                </Badge>
                              ))}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Tags</DialogTitle>
                                    <DialogDescription>Add tags to categorize this influencer.</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-2">
                                      {allTags.map((tag) => (
                                        <div key={tag} className="flex items-center gap-2">
                                          <div
                                            className={`h-4 w-4 rounded-sm border cursor-pointer ${
                                              influencer.tags.includes(tag)
                                                ? "bg-purple-600 border-purple-600"
                                                : "border-input"
                                            }`}
                                            onClick={() => handleAddTag(influencer.id, tag)}
                                          >
                                            {influencer.tags.includes(tag) && (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4 text-white"
                                              >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                              </svg>
                                            )}
                                          </div>
                                          <span className="text-sm">{tag}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button>Save Tags</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 justify-start p-2 text-left text-xs text-muted-foreground"
                                >
                                  {influencer.notes.length > 30
                                    ? `${influencer.notes.substring(0, 30)}...`
                                    : influencer.notes}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Notes</DialogTitle>
                                  <DialogDescription>Update notes for {influencer.name}</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <Textarea
                                    defaultValue={influencer.notes}
                                    placeholder="Add notes about this influencer"
                                    className="min-h-[100px]"
                                  />
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleUpdateNotes(influencer.id, "Updated notes")}>
                                    Save Notes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {getPlatformIcon(influencer.platform)}
                              <span className="ml-2">{influencer.platform}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span>{formatFollowers(influencer.followers)}</span>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{influencer.avg_engagement_rate}% engagement</span>
                              </div>
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add to Campaign
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleRemoveFromList(influencer.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove from List
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

              {sortedInfluencers.length === 0 && (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <Filter className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No influencers found</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                      No influencers match your current filters. Try adjusting your search or filters.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedTags([])
                        setSelectedPlatform("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit List Dialog */}
      <Dialog open={showEditListDialog} onOpenChange={setShowEditListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit List</DialogTitle>
            <DialogDescription>Update the list name and description.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editName">List Name</Label>
              <Input
                id="editName"
                placeholder="Enter list name"
                value={editListName}
                onChange={(e) => setEditListName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                placeholder="Enter list description"
                value={editListDescription}
                onChange={(e) => setEditListDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditListDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditList}>Update List</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Influencers Dialog */}
      <Dialog open={showAddInfluencersDialog} onOpenChange={setShowAddInfluencersDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Influencers to {selectedList.name}</DialogTitle>
            <DialogDescription>Select influencers to add to this list.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search influencers..."
                className="pl-8"
                value={addInfluencersSearch}
                onChange={(e) => setAddInfluencersSearch(e.target.value)}
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {filteredAvailableInfluencers.map((influencer) => (
                  <div key={influencer.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={`add-influencer-${influencer.id}`}
                      checked={selectedInfluencersToAdd.includes(influencer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedInfluencersToAdd([...selectedInfluencersToAdd, influencer.id])
                        } else {
                          setSelectedInfluencersToAdd(selectedInfluencersToAdd.filter(id => id !== influencer.id))
                        }
                      }}
                    />
                    <img
                      src={influencer.profile_pic || "/placeholder.svg"}
                      alt={influencer.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{influencer.name}</p>
                        {influencer.verified && (
                          <Badge className="bg-blue-500 text-xs">Verified</Badge>
                        )}
                        {influencer.business_account && (
                          <Badge variant="outline" className="text-xs">Business</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(influencer.platform)}
                          <span className="text-xs text-muted-foreground">{influencer.platform}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatFollowers(influencer.followers)} followers
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {influencer.avg_engagement_rate}% engagement
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Selected: {selectedInfluencersToAdd.length} influencer(s)
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddInfluencersDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddInfluencersToList}>
              Add {selectedInfluencersToAdd.length} Influencer(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
