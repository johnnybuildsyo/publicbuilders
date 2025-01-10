"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

type FollowerGrowth = { date: string; count: number }[]

type DateRange = "3" | "7" | "14" | "30" | "all"

type FollowerGrowthChartProps = {
  xFollowerGrowth?: FollowerGrowth
  bskyFollowerGrowth?: FollowerGrowth
  hideIfNoGrowth?: boolean
  totalBuilders?: number
  containerClassName?: string
  showGrowthRate?: boolean
  defaultToPercent?: boolean
}

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-")
  return {
    sort: `${year}-${month}-${day}`,
    display: `${month}/${day}`,
  }
}

const processData = (dateRange: DateRange, xFollowerGrowth?: FollowerGrowth, bskyFollowerGrowth?: FollowerGrowth, isPercent = false) => {
  const filterDataByRange = (data: { date: string; x: number | null; bsky: number | null }[], allDates: string[]) => {
    if (dateRange === "all") return data
    const daysAgo = parseInt(dateRange)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

    const cutoffSortDate = cutoffDate.toISOString().split("T")[0]
    const validDates = allDates.filter((d) => d >= cutoffSortDate)

    return data.filter((entry) => {
      const sortDate = allDates[allDates.findIndex((d) => d.split("-").slice(1).join("/") === entry.date)]
      return validDates.includes(sortDate)
    })
  }

  const interpolateMissingDates = (data: { sortDate: string; date: string; count: number }[]) => {
    if (data.length < 2) return data
    const result: { sortDate: string; date: string; count: number }[] = []

    for (let i = 0; i < data.length - 1; i++) {
      const current = data[i]
      const next = data[i + 1]
      result.push(current)

      // Parse dates using sortDate (YYYY-MM-DD format)
      const currentDate = new Date(current.sortDate)
      const nextDate = new Date(next.sortDate)
      const daysDiff = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff > 1) {
        const countDiff = next.count - current.count
        const dailyIncrease = countDiff / daysDiff

        // Add interpolated points
        for (let day = 1; day < daysDiff; day++) {
          const interpolatedDate = new Date(currentDate)
          interpolatedDate.setDate(currentDate.getDate() + day)
          result.push({
            sortDate: interpolatedDate.toISOString().split("T")[0],
            date: `${interpolatedDate.getMonth() + 1}/${interpolatedDate.getDate()}`,
            count: Math.round(current.count + dailyIncrease * day),
          })
        }
      }
    }
    result.push(data[data.length - 1])
    return result
  }

  const xData = xFollowerGrowth
    ? interpolateMissingDates(
        xFollowerGrowth
          .map((entry) => {
            const date = formatDate(entry.date)
            return {
              sortDate: date.sort,
              date: date.display,
              count: entry.count,
            }
          })
          .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
      )
    : []

  const bskyData = bskyFollowerGrowth
    ? interpolateMissingDates(
        bskyFollowerGrowth
          .map((entry) => {
            const date = formatDate(entry.date)
            return {
              sortDate: date.sort,
              date: date.display,
              count: entry.count,
            }
          })
          .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
      )
    : []

  const allDates = Array.from(new Set([...xData.map((d) => d.sortDate), ...bskyData.map((d) => d.sortDate)])).sort()

  // First create the combined data without normalization
  const combinedData = allDates.map((sortDate) => {
    const xEntry = xData.find((d) => d.sortDate === sortDate)
    const bskyEntry = bskyData.find((d) => d.sortDate === sortDate)
    const displayDate = xEntry?.date || bskyEntry?.date || sortDate.split("-").slice(1).join("/")

    return {
      date: displayDate,
      x: xEntry?.count ?? null,
      bsky: bskyEntry?.count ?? null,
    }
  })

  // Filter the data by range first
  const filteredData = filterDataByRange(combinedData, allDates)

  if (!isPercent) {
    // For absolute growth, normalize from initial values
    const xInitial = filteredData.find((d) => d.x !== null)?.x ?? 0
    const bskyInitial = filteredData.find((d) => d.bsky !== null)?.bsky ?? 0

    return filteredData.map((entry) => ({
      date: entry.date,
      x: entry.x !== null ? entry.x - xInitial : null,
      bsky: entry.bsky !== null ? entry.bsky - bskyInitial : null,
    }))
  }

  // For percentage, use raw values to calculate percent change
  return filteredData.map((entry) => ({
    date: entry.date,
    x: entry.x,
    bsky: entry.bsky,
  }))
}

export function FollowerGrowthChart({ xFollowerGrowth, bskyFollowerGrowth, hideIfNoGrowth, totalBuilders, containerClassName, showGrowthRate, defaultToPercent = false }: FollowerGrowthChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>("14")
  const [showPercent, setShowPercent] = useState(defaultToPercent)

  const data = useMemo(() => {
    const rawData = processData(dateRange, xFollowerGrowth, bskyFollowerGrowth, showPercent)
    if (!showPercent) return rawData

    // Calculate percentage change from initial values
    const firstX = rawData[0]?.x ?? 0
    const firstBsky = rawData[0]?.bsky ?? 0

    return rawData.map((entry) => ({
      date: entry.date,
      x: entry.x !== null && firstX ? ((entry.x - firstX) / firstX) * 100 : null,
      bsky: entry.bsky !== null && firstBsky ? ((entry.bsky - firstBsky) / firstBsky) * 100 : null,
    }))
  }, [dateRange, xFollowerGrowth, bskyFollowerGrowth, showPercent])

  // Simplify hasGrowth check
  const hasGrowth = data.length > 0 && data.some((d) => d.x !== null || d.bsky !== null)

  if (!xFollowerGrowth && !bskyFollowerGrowth) {
    return null
  }

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

  const getGrowth = (data: { date: string; x: number | null; bsky: number | null }[]) => {
    if (data.length < 2) return { x: null, bsky: null }
    const first = data[0]
    const last = data[data.length - 1]
    return {
      x: first.x !== null && last.x !== null ? last.x - first.x : null,
      bsky: first.bsky !== null && last.bsky !== null ? last.bsky - first.bsky : null,
    }
  }

  const currentCounts = getGrowth(data)

  if (hideIfNoGrowth && !hasGrowth) {
    return null
  }

  return (
    <>
      {growthRateRatio !== "N/A" && showGrowthRate && (
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
                        <span className="font-semibold text-foreground/70">
                          {showPercent ? `${currentCounts.x.toFixed(1)}%` : currentCounts.x > 0 ? `+${Math.round(currentCounts.x)}` : currentCounts.x === 0 ? "–" : Math.round(currentCounts.x)}
                        </span>
                      </div>
                    )}
                    {bskyFollowerGrowth && currentCounts.bsky != null && (
                      <div className="bg-background flex items-center space-x-2 rounded border px-2 py-1 text-sm">
                        <span className="scale-90">🦋</span>
                        <span className="font-semibold text-foreground/70">
                          {showPercent ? `${currentCounts.bsky.toFixed(1)}%` : currentCounts.bsky > 0 ? `+${Math.round(currentCounts.bsky)}` : Math.round(currentCounts.bsky)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 scale-90">
                    <Select value={showPercent ? "percent" : "absolute"} onValueChange={(value) => setShowPercent(value === "percent")}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="absolute">Growth (#)</SelectItem>
                        <SelectItem value="percent">Growth (%)</SelectItem>
                      </SelectContent>
                    </Select>

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
                <div className={containerClassName}>
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
                        <YAxis tickFormatter={(value) => (showPercent ? `${value.toFixed(1)}%` : value.toLocaleString())} />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded p-2 text-sm">
                                  <p className="font-semibold">{payload[0].payload.date}</p>
                                  {payload.map((entry) => (
                                    <p key={entry.dataKey}>
                                      {entry.dataKey === "x" ? "𝕏" : "🦋"}:{" "}
                                      {typeof entry.value === "number" ? (showPercent ? `${entry.value.toFixed(1)}%` : Math.round(entry.value).toLocaleString()) : "-"}
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
