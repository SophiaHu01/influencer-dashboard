"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon, Save, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

// Mock campaign data
const mockCampaign = {
  id: 1,
  name: "Summer Collection Launch",
  description: "Promoting our new summer collection with lifestyle influencers across multiple platforms",
  platform: "Multiple",
  status: "Active",
  startDate: new Date(2025, 5, 15), // June 15, 2025
  endDate: new Date(2025, 6, 15), // July 15, 2025
  budget: 25000,
  targetAudience: "Women 18-35",
  objectives: ["Brand Awareness", "Sales", "Engagement"],
  hashtags: ["#SummerCollection", "#SustainableFashion", "#OOTD"],
  guidelines: "Please focus on sustainable fashion messaging and include lifestyle shots",
  deliverables: [
    { type: "Instagram Post", quantity: 2, deadline: "2025-06-25" },
    { type: "Instagram Story", quantity: 5, deadline: "2025-06-30" },
    { type: "TikTok Video", quantity: 1, deadline: "2025-07-05" },
  ],
  isActive: true,
  allowApplications: true,
  requireApproval: true,
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [campaign, setCampaign] = useState(mockCampaign)
  const [newHashtag, setNewHashtag] = useState("")
  const [newObjective, setNewObjective] = useState("")

  const handleSave = () => {
    toast({
      title: "Campaign updated",
      description: "Your campaign has been successfully updated.",
    })
    router.back()
  }

  const handleCancel = () => {
    router.back()
  }

  const addHashtag = () => {
    if (newHashtag.trim() && !campaign.hashtags.includes(newHashtag.trim())) {
      setCampaign({
        ...campaign,
        hashtags: [...campaign.hashtags, newHashtag.trim()],
      })
      setNewHashtag("")
    }
  }

  const removeHashtag = (hashtag: string) => {
    setCampaign({
      ...campaign,
      hashtags: campaign.hashtags.filter((h) => h !== hashtag),
    })
  }

  const addObjective = () => {
    if (newObjective.trim() && !campaign.objectives.includes(newObjective.trim())) {
      setCampaign({
        ...campaign,
        objectives: [...campaign.objectives, newObjective.trim()],
      })
      setNewObjective("")
    }
  }

  const removeObjective = (objective: string) => {
    setCampaign({
      ...campaign,
      objectives: campaign.objectives.filter((o) => o !== objective),
    })
  }

  const addDeliverable = () => {
    setCampaign({
      ...campaign,
      deliverables: [
        ...campaign.deliverables,
        { type: "Instagram Post", quantity: 1, deadline: format(new Date(), "yyyy-MM-dd") },
      ],
    })
  }

  const updateDeliverable = (index: number, field: string, value: string | number) => {
    const updatedDeliverables = [...campaign.deliverables]
    updatedDeliverables[index] = { ...updatedDeliverables[index], [field]: value }
    setCampaign({ ...campaign, deliverables: updatedDeliverables })
  }

  const removeDeliverable = (index: number) => {
    setCampaign({
      ...campaign,
      deliverables: campaign.deliverables.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <DashboardHeader heading="Edit Campaign" text="Update your campaign settings and requirements" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={campaign.name}
                  onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={campaign.description}
                  onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={campaign.platform}
                    onValueChange={(value) => setCampaign({ ...campaign, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Multiple">Multiple Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={campaign.status}
                    onValueChange={(value) => setCampaign({ ...campaign, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Budget */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !campaign.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaign.startDate ? format(campaign.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaign.startDate}
                        onSelect={(date) => setCampaign({ ...campaign, startDate: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !campaign.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaign.endDate ? format(campaign.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaign.endDate}
                        onSelect={(date) => setCampaign({ ...campaign, endDate: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={campaign.budget}
                  onChange={(e) => setCampaign({ ...campaign, budget: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={campaign.targetAudience}
                  onChange={(e) => setCampaign({ ...campaign, targetAudience: e.target.value })}
                  placeholder="e.g., Women 18-35, Tech enthusiasts"
                />
              </div>
            </CardContent>
          </Card>

          {/* Campaign Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {campaign.objectives.map((objective) => (
                  <Badge key={objective} variant="secondary" className="flex items-center gap-1">
                    {objective}
                    <button onClick={() => removeObjective(objective)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add new objective"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addObjective()}
                />
                <Button onClick={addObjective} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Hashtags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {campaign.hashtags.map((hashtag) => (
                  <Badge key={hashtag} variant="outline" className="flex items-center gap-1">
                    {hashtag}
                    <button onClick={() => removeHashtag(hashtag)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add new hashtag (e.g., #fashion)"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addHashtag()}
                />
                <Button onClick={addHashtag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="guidelines">Content Guidelines</Label>
                <Textarea
                  id="guidelines"
                  value={campaign.guidelines}
                  onChange={(e) => setCampaign({ ...campaign, guidelines: e.target.value })}
                  className="min-h-[120px]"
                  placeholder="Provide detailed guidelines for influencers..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle>Required Deliverables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaign.deliverables.map((deliverable, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-end">
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select value={deliverable.type} onValueChange={(value) => updateDeliverable(index, "type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram Post">Instagram Post</SelectItem>
                        <SelectItem value="Instagram Story">Instagram Story</SelectItem>
                        <SelectItem value="Instagram Reel">Instagram Reel</SelectItem>
                        <SelectItem value="TikTok Video">TikTok Video</SelectItem>
                        <SelectItem value="YouTube Video">YouTube Video</SelectItem>
                        <SelectItem value="YouTube Short">YouTube Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={deliverable.quantity}
                      onChange={(e) => updateDeliverable(index, "quantity", Number.parseInt(e.target.value) || 1)}
                      min="1"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={deliverable.deadline}
                      onChange={(e) => updateDeliverable(index, "deadline", e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDeliverable(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addDeliverable} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Deliverable
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Campaign Active</Label>
                  <div className="text-sm text-muted-foreground">Enable or disable this campaign</div>
                </div>
                <Switch
                  checked={campaign.isActive}
                  onCheckedChange={(checked) => setCampaign({ ...campaign, isActive: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Applications</Label>
                  <div className="text-sm text-muted-foreground">Let influencers apply to join</div>
                </div>
                <Switch
                  checked={campaign.allowApplications}
                  onCheckedChange={(checked) => setCampaign({ ...campaign, allowApplications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <div className="text-sm text-muted-foreground">Manually approve all content</div>
                </div>
                <Switch
                  checked={campaign.requireApproval}
                  onCheckedChange={(checked) => setCampaign({ ...campaign, requireApproval: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium">Duration:</div>
                <div className="text-muted-foreground">
                  {campaign.startDate && campaign.endDate
                    ? `${format(campaign.startDate, "MMM d")} - ${format(campaign.endDate, "MMM d, yyyy")}`
                    : "Not set"}
                </div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Budget:</div>
                <div className="text-muted-foreground">${campaign.budget.toLocaleString()}</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Platform:</div>
                <div className="text-muted-foreground">{campaign.platform}</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Deliverables:</div>
                <div className="text-muted-foreground">{campaign.deliverables.length} types</div>
              </div>
              <Separator />
              <div className="text-sm">
                <div className="font-medium">Objectives:</div>
                <div className="text-muted-foreground">{campaign.objectives.length} defined</div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button onClick={handleSave} size="lg" className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline" size="lg" className="w-full bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
