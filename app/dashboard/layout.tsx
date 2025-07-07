import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { TopNav } from "@/components/top-nav"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
