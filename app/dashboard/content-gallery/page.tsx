"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Play,
  ImageIcon,
  Video,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock content data
const mockContent = [
  {
    id: 1,
    influencerId: 1,
    influencerName: "Sarah Jones",
    influencerHandle: "@sarahjones",
    influencerAvatar: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    type: "image",
    title: "Summer Collection Showcase",
    description: "Beautiful summer dress collection featuring sustainable materials",
    thumbnail: "/placeholder.svg?height=300&width=300",
    url: "https://instagram.com/p/example1",
    status: "approved",
    uploadDate: "2025-06-20",
    approvalDate: "2025-06-21",
    publishDate: "2025-06-22",
    campaign: "Summer Collection Launch",
    tags: ["fashion", "sustainable", "summer"],
    metrics: {
      likes: 5400,
      comments: 189,
      shares: 45,
      saves: 320,
      reach: 28000,
      impressions: 45000,
    },
    caption: "Loving this sustainable summer collection! Perfect for beach days ☀️ #SustainableFashion #SummerVibes",
  },
  {
    id: 2,
    influencerId: 2,
    influencerName: "Mike Brown",
    influencerHandle: "@mikebrown",
    influencerAvatar: "/placeholder.svg?height=40&width=40",
    platform: "TikTok",
    type: "video",
    title: "Product Unboxing Video",
    description: "Exciting unboxing of the new product line with honest review",
    thumbnail: "/placeholder.svg?height=300&width=300",
    url: "https://tiktok.com/@mikebrown/video/example2",
    status: "pending",
    uploadDate: "2025-06-19",
    approvalDate: null,
    publishDate: "2025-06-23",
    campaign: "Product Launch",
    tags: ["unboxing", "review", "tech"],
    metrics: {
      likes: 8200,
      comments: 245,
      shares: 180,
      saves: 0,
      reach: 45000,
      impressions: 89000,
    },
    caption: "Unboxing the latest tech! This is actually amazing 🤯 #TechReview #Unboxing",
  },
  {
    id: 3,
    influencerId: 3,
    influencerName: "Emily Wilson",
    influencerHandle: "@emilywilson",
    influencerAvatar: "/placeholder.svg?height=40&width=40",
    platform: "YouTube",
    type: "video",
    title: "Brand Story Documentary",
    description: "In-depth look at the brand's sustainability journey and mission",
    thumbnail: "/placeholder.svg?height=300&width=300",
    url: "https://youtube.com/watch?v=example3",
    status: "live",
    uploadDate: "2025-06-15",
    approvalDate: "2025-06-16",
    publishDate: "2025-06-18",
    campaign: "Brand Awareness",
    tags: ["documentary", "sustainability", "brand-story"],
    metrics: {
      likes: 1200,
      comments: 89,
      shares: 34,
      saves: 0,
      reach: 15000,
      impressions: 23000,
    },
    caption: "The inspiring story behind sustainable fashion - a must watch! 🌱",
  },
  {
    id: 4,
    influencerId: 4,
    influencerName: "Alex Chen",
    influencerHandle: "@alexchen",
    influencerAvatar: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    type: "image",
    title: "Lifestyle Photography",
    description: "Aesthetic lifestyle shots featuring the product in natural settings",
    thumbnail: "/placeholder.svg?height=300&width=300",
    url: "https://instagram.com/p/example4",
    status: "rejected",
    uploadDate: "2025-06-18",
    approvalDate: "2025-06-19",
    publishDate: null,
    campaign: "Lifestyle Campaign",
    tags: ["lifestyle", "photography", "aesthetic"],
    metrics: {
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      reach: 0,
      impressions: 0,
    },
    caption: "Living my best life with these amazing products! #Lifestyle #Aesthetic",
    rejectionReason: "Image quality needs improvement. Please resubmit with higher resolution photos.",
  },
]

export default function ContentGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedContent, setSelectedContent] = useState<(typeof mockContent)[0] | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadPlatform, setUploadPlatform] = useState("")
  const [uploadCampaign, setUploadCampaign] = useState("")

  const handleUpload = () => {
    if (!uploadTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the content.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Content uploaded",
      description: "Your content has been uploaded successfully and is pending review.",
    })

    setShowUploadDialog(false)
    setUploadTitle("")
    setUploadDescription("")
    setUploadPlatform("")
    setUploadCampaign("")
  }

  const handleApprove = (contentId: number) => {
    toast({
      title: "Content approved",
      description: "The content has been approved and scheduled for publishing.",
    })
  }

  const handleReject = (contentId: number) => {
    toast({
      title: "Content rejected",
      description: "The content has been rejected and feedback has been sent to the influencer.",
    })
  }

  const handleDelete = (contentId: number) => {
    toast({
      title: "Content deleted",
      description: "The content has been permanently deleted.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "pending":
        return <Badge className="bg-amber-500">Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      case "live":
        return <Badge className="bg-blue-500">Live</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter content based on search and filters
  const filteredContent = mockContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.influencerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesPlatform = selectedPlatform === "all" || content.platform === selectedPlatform
    const matchesStatus = selectedStatus === "all" || content.status === selectedStatus

    return matchesSearch && matchesPlatform && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Content Gallery"
        text="Manage and review all influencer-generated content across campaigns."
      >
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload New Content</DialogTitle>
              <DialogDescription>Upload new content to the gallery for review and approval.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter content description"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={uploadPlatform} onValueChange={setUploadPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="campaign">Campaign</Label>
                  <Select value={uploadCampaign} onValueChange={setUploadCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summer">Summer Collection</SelectItem>
                      <SelectItem value="holiday">Holiday Guide</SelectItem>
                      <SelectItem value="product">Product Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File Upload</Label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4 or GIF (MAX. 50MB)</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload Content</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-[300px]"
                />
              </div>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContent.map((content) => (
              <Card key={content.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    {getPlatformIcon(content.platform)}
                    {getContentTypeIcon(content.type)}
                  </div>
                  <div className="absolute top-2 right-2">{getStatusBadge(content.status)}</div>
                  {content.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 p-3">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-1">{content.title}</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={content.influencerAvatar || "/placeholder.svg"}
                          alt={content.influencerName}
                        />
                        <AvatarFallback>{content.influencerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{content.influencerHandle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>

                    {content.status === "live" && (
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(content.metrics.likes)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {formatNumber(content.metrics.comments)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {formatNumber(content.metrics.shares)}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">{formatDate(content.uploadDate)}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedContent(content)
                              setShowPreviewDialog(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          {content.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleApprove(content.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(content.id)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(content.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Content</th>
                      <th className="px-4 py-3 text-left font-medium">Influencer</th>
                      <th className="px-4 py-3 text-left font-medium">Platform</th>
                      <th className="px-4 py-3 text-left font-medium">Campaign</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Upload Date</th>
                      <th className="px-4 py-3 text-left font-medium">Performance</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((content) => (
                      <tr key={content.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded">
                              <img
                                src={content.thumbnail || "/placeholder.svg"}
                                alt={content.title}
                                className="h-full w-full object-cover"
                              />
                              {content.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{content.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{content.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={content.influencerAvatar || "/placeholder.svg"}
                                alt={content.influencerName}
                              />
                              <AvatarFallback>{content.influencerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{content.influencerName}</p>
                              <p className="text-sm text-muted-foreground">{content.influencerHandle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(content.platform)}
                            <span>{content.platform}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{content.campaign}</td>
                        <td className="px-4 py-3">{getStatusBadge(content.status)}</td>
                        <td className="px-4 py-3">{formatDate(content.uploadDate)}</td>
                        <td className="px-4 py-3">
                          {content.status === "live" ? (
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {formatNumber(content.metrics.likes)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatNumber(content.metrics.reach)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedContent(content)
                                  setShowPreviewDialog(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              {content.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleApprove(content.id)}>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReject(content.id)}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDelete(content.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
            <DialogDescription>Content preview and details</DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="grid gap-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={selectedContent.thumbnail || "/placeholder.svg"}
                      alt={selectedContent.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {selectedContent.status === "live" && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Likes:</span>
                          <span className="font-medium">{formatNumber(selectedContent.metrics.likes)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Comments:</span>
                          <span className="font-medium">{formatNumber(selectedContent.metrics.comments)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Shares:</span>
                          <span className="font-medium">{formatNumber(selectedContent.metrics.shares)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Reach:</span>
                          <span className="font-medium">{formatNumber(selectedContent.metrics.reach)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Impressions:</span>
                          <span className="font-medium">{formatNumber(selectedContent.metrics.impressions)}</span>
                        </div>
                        {selectedContent.metrics.saves > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Saves:</span>
                            <span className="font-medium">{formatNumber(selectedContent.metrics.saves)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Content Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Influencer:</span>
                        <span>{selectedContent.influencerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Platform:</span>
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(selectedContent.platform)}
                          <span>{selectedContent.platform}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Campaign:</span>
                        <span>{selectedContent.campaign}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        {getStatusBadge(selectedContent.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Upload Date:</span>
                        <span>{formatDate(selectedContent.uploadDate)}</span>
                      </div>
                      {selectedContent.publishDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Publish Date:</span>
                          <span>{formatDate(selectedContent.publishDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Caption</h4>
                    <p className="text-sm text-muted-foreground">{selectedContent.caption}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedContent.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedContent.status === "rejected" && selectedContent.rejectionReason && (
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Rejection Reason</h4>
                      <p className="text-sm text-red-600">{selectedContent.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              Close
            </Button>
            {selectedContent?.status === "pending" && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleReject(selectedContent.id)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button onClick={() => handleApprove(selectedContent.id)}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
