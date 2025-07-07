"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Week 1",
    impressions: 45000,
    engagement: 2800,
    clicks: 1200,
  },
  {
    name: "Week 2",
    impressions: 52000,
    engagement: 3200,
    clicks: 1450,
  },
  {
    name: "Week 3",
    impressions: 48000,
    engagement: 2950,
    clicks: 1320,
  },
  {
    name: "Week 4",
    impressions: 61000,
    engagement: 3800,
    clicks: 1680,
  },
]

export function CampaignOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="engagement" stroke="#06b6d4" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
