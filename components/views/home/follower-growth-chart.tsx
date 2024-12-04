"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

type FollowerGrowth = { date: string; count: number }[]

type FollowerGrowthChartProps = {
  xFollowerGrowth?: FollowerGrowth
  bskyFollowerGrowth?: FollowerGrowth
  hideIfNoGrowth?: boolean
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

export function FollowerGrowthChart({ xFollowerGrowth, bskyFollowerGrowth, hideIfNoGrowth }: FollowerGrowthChartProps) {
  if (!xFollowerGrowth && !bskyFollowerGrowth) {
    return null
  }

  const data = processData(xFollowerGrowth, bskyFollowerGrowth)

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
    <Card className="w-full border-none p-0 bg-slate-50 shadow-none max-w-2xl mx-auto">
      <CardHeader className="h-0">
        <CardTitle className="sr-only">Followers</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <div>
          {hasGrowth ? (
            <>
              <div className="flex justify-center gap-4 items-center relative -top-8 -mb-4 scale-90">
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
            </>
          ) : (
            <div className="aspect-video flex justify-center items-center text-center text-foreground/50 font-thin text-lg italic relative -top-8 -mb-4">Still gathering follower data...</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
