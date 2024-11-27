import { calculatePlatformGrowth } from "@/lib/utils"
import { builders } from "@/app/_data"
import { FollowerGrowthChart } from "@/components/views/home/follower-growth-chart"
import Heading from "@/components/typography/heading"

export default function GrowthPage() {
  const { twitterGrowth, blueskyGrowth } = calculatePlatformGrowth(builders)

  // Convert cumulative growth data into the structure expected by FollowerGrowthChart
  const xFollowerGrowth = twitterGrowth.map(({ date, total }) => ({ date, count: total }))
  const bskyFollowerGrowth = blueskyGrowth.map(({ date, total }) => ({ date, count: total }))

  // Calculate total growth for the most recent date
  const totalTwitterGrowth = twitterGrowth.length > 0 ? twitterGrowth[twitterGrowth.length - 1].total : 0
  const totalBlueskyGrowth = blueskyGrowth.length > 0 ? blueskyGrowth[blueskyGrowth.length - 1].total : 0

  // Calculate growth rate ratio
  const growthRateRatio = totalTwitterGrowth > 0 ? (totalBlueskyGrowth / totalTwitterGrowth).toFixed(1) : "N/A"

  return (
    <div className="py-8 sm:py-16 flex flex-col gap-4 items-center justify-center">
      <Heading>Follower Growth: 𝕏 vs 🦋</Heading>
      <div>
        <h3 className="text-xl text-center font-semibold">Bluesky Growth Rate: {growthRateRatio}x vs. X/Twitter</h3>
        <p className="text-sm font-thin opacity-70 text-center">As measured by follower count tracking {builders.length} builders across the Public Builders directory</p>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <FollowerGrowthChart xFollowerGrowth={xFollowerGrowth} bskyFollowerGrowth={bskyFollowerGrowth} />
      </div>
    </div>
  )
}
