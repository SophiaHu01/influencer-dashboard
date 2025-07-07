import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Review content submissions",
    campaign: "Summer Collection",
    dueDate: "Today",
    priority: "high",
    count: 3,
  },
  {
    id: 2,
    title: "Send campaign brief",
    campaign: "Holiday Guide",
    dueDate: "Tomorrow",
    priority: "medium",
    count: 1,
  },
  {
    id: 3,
    title: "Approve final posts",
    campaign: "Product Teaser",
    dueDate: "Jun 25",
    priority: "high",
    count: 2,
  },
  {
    id: 4,
    title: "Process payments",
    campaign: "Brand Awareness",
    dueDate: "Jun 28",
    priority: "low",
    count: 5,
  },
]

export function UpcomingTasks() {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "low":
        return <Calendar className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            {getPriorityIcon(task.priority)}
            <div>
              <p className="text-sm font-medium">{task.title}</p>
              <p className="text-xs text-muted-foreground">{task.campaign}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{task.count}</Badge>
            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
