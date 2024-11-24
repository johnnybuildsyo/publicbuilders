"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type FollowerGrowth = { date: string; count: number }[]

type FollowerGrowthChartProps = {
  xFollowerGrowth?: FollowerGrowth
  bskyFollowerGrowth?: FollowerGrowth
}

const formatDate = (dateString: string) => {
  const [, month, day] = dateString.split("-")
  return `${month}/${day}`
}

const computeDifferences = (growth: FollowerGrowth) => {
  return growth.map((entry, index) => {
    if (index === 0) return { date: formatDate(entry.date), change: 0 } // First entry has no change
    const previousCount = growth[index - 1].count
    return { date: formatDate(entry.date), change: entry.count - previousCount }
  })
}

const processData = (xFollowerGrowth?: FollowerGrowth, bskyFollowerGrowth?: FollowerGrowth) => {
  const xData = xFollowerGrowth ? computeDifferences(xFollowerGrowth) : []
  const bskyData = bskyFollowerGrowth ? computeDifferences(bskyFollowerGrowth) : []

  // Merge data and align by date
  const allDates = Array.from(new Set([...xData.map((d) => d.date), ...bskyData.map((d) => d.date)])).sort()

  return allDates.map((date) => {
    const xEntry = xData.find((entry) => entry.date === date)
    const bskyEntry = bskyData.find((entry) => entry.date === date)
    return {
      date,
      x: xEntry?.change || 0,
      bsky: bskyEntry?.change || 0,
    }
  })
}

export function FollowerGrowthChart({ xFollowerGrowth, bskyFollowerGrowth }: FollowerGrowthChartProps) {
  // Return null if both datasets are undefined
  if (!xFollowerGrowth && !bskyFollowerGrowth) {
    return null
  }

  console.log(JSON.stringify({ xFollowerGrowth, bskyFollowerGrowth }, null, 2))

  const data = processData(xFollowerGrowth, bskyFollowerGrowth)

  console.log(JSON.stringify({ data }, null, 2))

  const currentCounts = {
    x: data.reduce((sum, entry) => sum + entry.x, 0),
    bsky: data.reduce((sum, entry) => sum + entry.bsky, 0),
  }

  return (
    <Card className="w-full border-none p-0 bg-slate-50 shadow-none">
      <CardHeader className="h-0">
        <CardTitle className="sr-only">Followers</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <div>
          <div className="flex justify-center gap-4 items-center relative -top-8 -mb-4 scale-90">
            {xFollowerGrowth && (
              <div className="bg-background flex items-center space-x-2 rounded border px-2 py-1 text-sm">
                <span className="scale-90">𝕏</span>
                <span className="font-semibold text-foreground/70">{currentCounts.x > 0 ? `+${currentCounts.x}` : currentCounts.x}</span>
              </div>
            )}
            {bskyFollowerGrowth && (
              <div className="bg-background flex items-center space-x-2 rounded border px-2 py-1 text-sm">
                <span className="scale-90">🦋</span>
                <span className="font-semibold text-foreground/70">{currentCounts.bsky > 0 ? `+${currentCounts.bsky}` : currentCounts.bsky}</span>
              </div>
            )}
          </div>
          <ChartContainer
            config={{
              x: {
                label: "X",
                color: "#64748b", // Hardcoded slate-700
              },
              bsky: {
                label: "Bluesky",
                color: "#3b82f6", // Hardcoded blue-500
              },
            }}
            className="w-[108%] relative -left-[10%]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ position: "relative", left: "10%", top: "-10%" }} formatter={(value: string) => (value === "x" ? "𝕏" : "🦋")} />
                {xFollowerGrowth && (
                  <Line
                    type="monotone"
                    dataKey="x"
                    stroke="#64748b" // Hardcoded slate-500
                    name="x"
                    activeDot={{ r: 8 }}
                  />
                )}
                {bskyFollowerGrowth && (
                  <Line
                    type="monotone"
                    dataKey="bsky"
                    stroke="#3b82f6" // Hardcoded blue-500
                    name="bsky"
                    activeDot={{ r: 8 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
