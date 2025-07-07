"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Send, Paperclip, MoreHorizontal, Star, Archive, Trash2, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    influencer: {
      name: "Sarah Jones",
      handle: "@sarahjones",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Thanks for the campaign details! I'm excited to work with you.",
    timestamp: "2 hours ago",
    unread: true,
    campaign: "Summer Collection",
  },
  {
    id: 2,
    influencer: {
      name: "Mike Brown",
      handle: "@mikebrown",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "I've submitted the content for review. Let me know if you need any changes.",
    timestamp: "4 hours ago",
    unread: false,
    campaign: "Product Teaser",
  },
  {
    id: 3,
    influencer: {
      name: "Emily Wilson",
      handle: "@emilywilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "When should I post the content? Also, do you have any specific timing preferences?",
    timestamp: "1 day ago",
    unread: true,
    campaign: "Holiday Guide",
  },
  {
    id: 4,
    influencer: {
      name: "Alex Chen",
      handle: "@alexchen",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "The video is ready! I'll send you the preview link shortly.",
    timestamp: "2 days ago",
    unread: false,
    campaign: "Brand Awareness",
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: "user",
    content:
      "Hi Sarah! Thanks for your interest in our Summer Collection campaign. I'd love to discuss the details with you.",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    sender: "influencer",
    content:
      "Hi! I'm really excited about this opportunity. Could you share more details about the campaign requirements?",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    sender: "user",
    content:
      "Of course! Here are the campaign details:\n\n- Campaign period: June 15 - July 15\n- Deliverables: 1 in-feed post and 2 stories\n- Products: Summer dress collection\n- Compensation: $500 + free products\n\nLet me know if you have any questions!",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    sender: "influencer",
    content: "Thanks for the campaign details! I'm excited to work with you. When will you be sending the products?",
    timestamp: "2 hours ago",
  },
]

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    })

    setNewMessage("")
  }

  const filteredConversations = mockConversations.filter(
    (conversation) =>
      conversation.influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.influencer.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.campaign.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Inbox" text="Manage conversations with your influencers." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/message-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Compose
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-muted/50 ${
                    selectedConversation.id === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={conversation.influencer.image || "/placeholder.svg"}
                      alt={conversation.influencer.name}
                    />
                    <AvatarFallback>{conversation.influencer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{conversation.influencer.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {conversation.campaign}
                      </Badge>
                      {conversation.unread && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedConversation.influencer.image || "/placeholder.svg"}
                  alt={selectedConversation.influencer.name}
                />
                <AvatarFallback>{selectedConversation.influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedConversation.influencer.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.influencer.handle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedConversation.campaign}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Star Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col">
            {/* Messages */}
            <div className="flex-1 space-y-4 p-4 max-h-96 overflow-y-auto">
              {mockMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-lg px-3 py-2 ${
                      message.sender === "user" ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender === "user" ? "text-purple-200" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="sm" className="h-8 w-8 p-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
