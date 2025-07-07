import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "Sarah Jones",
    action: "submitted content for review",
    campaign: "Summer Collection",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Mike Brown",
    action: "posted campaign content",
    campaign: "Product Teaser",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Emily Wilson",
    action: "signed campaign contract",
    campaign: "Holiday Guide",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "Alex Chen",
    action: "completed campaign deliverables",
    campaign: "Brand Awareness",
    time: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user} {activity.action}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.campaign} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
