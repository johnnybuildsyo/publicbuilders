import { calculatePlatformGrowth } from "@/lib/utils"
import { builders } from "@/app/_data"
import { FollowerGrowthChart } from "@/components/views/home/follower-growth-chart"
import Heading from "@/components/typography/heading"

export default function GrowthPage() {
  const { twitterGrowth, blueskyGrowth } = calculatePlatformGrowth(builders)
  const { twitterGrowth: smallTwitterGrowth, blueskyGrowth: smallBlueskyGrowth } = calculatePlatformGrowth(
    builders.filter((builder) => {
      const twitterFollowers = builder.twitter?.followers || 0
      const blueskyFollowers = builder.bluesky?.followers || 0
      return twitterFollowers < 5000 && blueskyFollowers < 5000
    })
  )

  // Convert cumulative growth data into the structure expected by FollowerGrowthChart
  const xFollowerGrowth = twitterGrowth.map(({ date, total }) => ({ date, count: total }))
  const bskyFollowerGrowth = blueskyGrowth.map(({ date, total }) => ({ date, count: total }))

  const smallXFollowerGrowth = smallTwitterGrowth.map(({ date, total }) => ({ date, count: total }))
  const smallBskyFollowerGrowth = smallBlueskyGrowth.map(({ date, total }) => ({ date, count: total }))

  return (
    <div className="py-8 sm:py-16 flex flex-col gap-4 items-center justify-center w-full px-2">
      <Heading>
        Follower Growth: <span className="whitespace-nowrap">𝕏 vs 🦋</span>
      </Heading>
      <div className="w-full max-w-4xl mx-auto">
        <FollowerGrowthChart containerClassName="relative px-8" xFollowerGrowth={xFollowerGrowth} bskyFollowerGrowth={bskyFollowerGrowth} showGrowthRate={true} totalBuilders={builders.length} />
      </div>

      <div className="mt-16">
        <Heading>
          Follower Growth: <span className="text-4xl relative -top-0.5">&lt;5k Followers</span>
        </Heading>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <FollowerGrowthChart
          containerClassName="relative px-8"
          xFollowerGrowth={smallXFollowerGrowth}
          bskyFollowerGrowth={smallBskyFollowerGrowth}
          showGrowthRate={true}
          totalBuilders={builders.filter((b) => (b.twitter?.followers || 0) < 5000 && (b.bluesky?.followers || 0) < 5000).length}
        />
      </div>
    </div>
  )
}
