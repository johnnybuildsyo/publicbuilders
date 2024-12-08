"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

type FollowerGrowth = { date: string; count: number }[]

type DateRange = "3" | "7" | "14" | "30" | "all"

type FollowerGrowthChartProps = {
  xFollowerGrowth?: FollowerGrowth
  bskyFollowerGrowth?: FollowerGrowth
  hideIfNoGrowth?: boolean
  totalBuilders?: number
}

const formatDate = (dateString: string) => {
  const [, month, day] = dateString.split("-")
  return `${month}/${day}`
}

const processData = (xFollowerGrowth?: FollowerGrowth, bskyFollowerGrowth?: FollowerGrowth) => {
  const xData = xFollowerGrowth
    ? xFollowerGrowth.map((entry) => ({
        date: formatDate(entry.date),
        count: entry.count,
      }))
    : []

  const bskyData = bskyFollowerGrowth
    ? bskyFollowerGrowth.map((entry) => ({
        date: formatDate(entry.date),
        count: entry.count,
      }))
    : []

  const allDates = Array.from(new Set([...xData.map((d) => d.date), ...bskyData.map((d) => d.date)])).sort()

  return allDates.map((date) => {
    const xEntry = xData.find((entry) => entry.date === date)
    const bskyEntry = bskyData.find((entry) => entry.date === date)
    return {
      date,
      x: xEntry?.count ?? null,
      bsky: bskyEntry?.count ?? null,
    }
  })
}

export function FollowerGrowthChart({ xFollowerGrowth, bskyFollowerGrowth, hideIfNoGrowth, totalBuilders }: FollowerGrowthChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>("14")

  if (!xFollowerGrowth && !bskyFollowerGrowth) {
    return null
  }

  const filterDataByRange = (data: ReturnType<typeof processData>) => {
    if (dateRange === "all") return data
    const daysAgo = parseInt(dateRange)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

    return data.filter((entry) => {
      const [month, day] = entry.date.split("/")
      const year = new Date().getFullYear()
      const entryDate = new Date(year, parseInt(month) - 1, parseInt(day))
      return entryDate >= cutoffDate
    })
  }

  const rawData = processData(xFollowerGrowth, bskyFollowerGrowth)
  const data = filterDataByRange(rawData)

  const calculateRangeGrowth = (growth?: FollowerGrowth) => {
    if (!growth || growth.length === 0) return 0

    // Filter growth data based on date range
    const filteredGrowth = growth.filter((entry) => {
      if (dateRange === "all") return true
      const daysAgo = parseInt(dateRange)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

      const [year, month, day] = entry.date.split("-")
      const entryDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return entryDate >= cutoffDate
    })

    if (filteredGrowth.length < 2) return 0
    return filteredGrowth[filteredGrowth.length - 1].count - filteredGrowth[0].count
  }

  const rangeTwitterGrowth = calculateRangeGrowth(xFollowerGrowth)
  const rangeBlueskyGrowth = calculateRangeGrowth(bskyFollowerGrowth)

  // Calculate growth rate ratio based on selected range
  const growthRateRatio = rangeTwitterGrowth > 0 ? (rangeBlueskyGrowth / rangeTwitterGrowth).toFixed(1) : "N/A"

  const getGrowth = (data: ReturnType<typeof processData>) => {
    if (data.length < 2) return { x: null, bsky: null }
    const first = data[0]
    const last = data[data.length - 1]
    return {
      x: first.x !== null && last.x !== null ? last.x - first.x : null,
      bsky: first.bsky !== null && last.bsky !== null ? last.bsky - first.bsky : null,
    }
  }

  const currentCounts = getGrowth(data)
  const hasGrowth = data.length > 0 && (data.some((d) => d.x !== null) || data.some((d) => d.bsky !== null))

  if (hideIfNoGrowth && !hasGrowth) {
    return null
  }

  return (
    <>
      {growthRateRatio !== "N/A" && (
        <div className="mb-8 px-4">
          <h3 className="text-xl text-center font-semibold">Bluesky Growth Rate: {growthRateRatio}x vs. X/Twitter</h3>
          <p className="text-sm font-thin opacity-70 text-center text-balance">As measured by follower count tracking {totalBuilders} builders across the Public Builders directory</p>
        </div>
      )}

      <Card className="w-full border-none p-0 bg-slate-50 shadow-none max-w-2xl mx-auto">
        <CardHeader className="h-0">
          <CardTitle className="sr-only">Followers</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <div>
            {hasGrowth ? (
              <>
                <div className="flex justify-between items-center relative -top-8 -mb-4">
                  <div className="flex gap-4 items-center scale-90">
                    {xFollowerGrowth && currentCounts.x != null && (
                      <div className="bg-background flex items-center space-x-2 rounded border px-2 py-1 text-sm">
                        <span className="scale-90">𝕏</span>
                        <span className="font-semibold text-foreground/70">{currentCounts.x > 0 ? `+${currentCounts.x}` : currentCounts.x === 0 ? "–" : currentCounts.x}</span>
                      </div>
                    )}
                    {bskyFollowerGrowth && currentCounts.bsky != null && (
                      <div className="bg-background flex items-center space-x-2 rounded border px-2 py-1 text-sm">
                        <span className="scale-90">🦋</span>
                        <span className="font-semibold text-foreground/70">{currentCounts.bsky > 0 ? `+${currentCounts.bsky}` : currentCounts.bsky}</span>
                      </div>
                    )}
                  </div>

                  <div className="scale-90">
                    <Select value={dateRange} onValueChange={(value: DateRange) => setDateRange(value)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">Last 3 days</SelectItem>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="14">Last 14 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="relative px-8">
                  <ChartContainer
                    config={{
                      x: {
                        label: "X",
                        color: "#64748b",
                      },
                      bsky: {
                        label: "Bluesky",
                        color: "#3b82f6",
                      },
                    }}
                    className="w-[108%] relative -left-[6%]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => value.toLocaleString()} />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded p-2 text-sm">
                                  <p className="font-semibold">{payload[0].payload.date}</p>
                                  {payload.map((entry) => (
                                    <p key={entry.dataKey}>
                                      {entry.dataKey === "x" ? "𝕏" : "🦋"}: {entry.value?.toLocaleString() ?? "-"}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            position: "relative",
                            left: "10%",
                            top: "-20px",
                          }}
                          formatter={(value: string) => (value === "x" ? "𝕏" : "🦋")}
                        />
                        {xFollowerGrowth && <Line type="monotone" dataKey="x" stroke="#64748b" name="x" activeDot={{ r: 8 }} isAnimationActive={false} />}
                        {bskyFollowerGrowth && <Line type="monotone" dataKey="bsky" stroke="#3b82f6" name="bsky" activeDot={{ r: 8 }} isAnimationActive={false} />}
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </>
            ) : (
              <div className="aspect-video flex justify-center items-center text-center text-foreground/50 font-thin text-lg italic relative -top-8 -mb-4">Still gathering follower data...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
