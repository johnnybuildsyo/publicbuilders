import { calculatePlatformGrowth } from "@/lib/utils"
import { builders } from "@/app/_data"
import { FollowerGrowthChart } from "@/components/views/home/follower-growth-chart"
import Heading from "@/components/typography/heading"

export default function GrowthPage() {
  const { twitterGrowth, blueskyGrowth } = calculatePlatformGrowth(builders)

  // Convert cumulative growth data into the structure expected by FollowerGrowthChart
  const xFollowerGrowth = twitterGrowth.map(({ date, total }) => ({ date, count: total }))
  const bskyFollowerGrowth = blueskyGrowth.map(({ date, total }) => ({ date, count: total }))

  return (
    <div className="py-8 sm:py-16 flex flex-col gap-8 items-center justify-center">
      <Heading>Overall Follower Growth: Twitter vs. Bluesky</Heading>
      <div className="w-full max-w-4xl mx-auto">
        <FollowerGrowthChart xFollowerGrowth={xFollowerGrowth} bskyFollowerGrowth={bskyFollowerGrowth} />
      </div>
    </div>
  )
}
