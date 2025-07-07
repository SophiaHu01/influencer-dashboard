"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search, Users, Megaphone, Mail, Inbox, ImageIcon, BarChart3, Settings, Home, List } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Influencer Search",
    href: "/dashboard/influencer-search",
    icon: Search,
  },
  {
    name: "Influencer Lists",
    href: "/dashboard/influencer-lists",
    icon: List,
  },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    name: "Message Center",
    href: "/dashboard/message-center",
    icon: Mail,
  },
  {
    name: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    name: "Content Gallery",
    href: "/dashboard/content-gallery",
    icon: ImageIcon,
  },
  {
    name: "Performance",
    href: "/dashboard/performance",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white">
            <Users className="h-4 w-4" />
          </div>
          <span>InfluenceHub</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-purple-100 text-purple-900 hover:bg-purple-100 hover:text-purple-900",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
