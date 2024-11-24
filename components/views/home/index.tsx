import Main from "@/components/layout/main"
import { builders } from "@/app/_data"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "./builder-directory"
import { calculateTotalGrowth } from "@/lib/utils"

const PER_PAGE = 24

export default function Home({ sort, page = 1 }: { sort?: string; page?: number }) {
  let buildersToShow: Builder[] = builders

  // Default to "trending" if no sort is specified
  const currentSort = sort || "trending"

  if (currentSort === "trending") {
    // Map builders to include total growth
    buildersToShow = builders
      .map((builder) => {
        const totalGrowth = calculateTotalGrowth(builder)
        return { ...builder, totalGrowth }
      })
      // Filter out builders with zero growth
      .filter((builder) => builder.totalGrowth > 0)
      // Sort by total growth descending
      .sort((a, b) => b.totalGrowth - a.totalGrowth)
  } else {
    // Existing sorting logic
    if (currentSort === "twitter") {
      buildersToShow = builders.filter((b) => b.twitter?.followers)
    } else if (currentSort === "github") {
      buildersToShow = builders.filter((b) => b.github?.followers)
    } else if (currentSort === "youtube") {
      buildersToShow = builders.filter((b) => b.youtube?.followers)
    } else if (currentSort === "twitch") {
      buildersToShow = builders.filter((b) => b.twitch?.followers)
    } else if (currentSort === "bluesky") {
      buildersToShow = builders.filter((b) => b.bluesky?.followers)
    }

    buildersToShow = buildersToShow.sort((a, b) => {
      if (currentSort === "name") {
        return a.name.localeCompare(b.name)
      } else if (currentSort === "lastName") {
        const aLastName = a.name.split(" ").slice(-1)[0]
        const bLastName = b.name.split(" ").slice(-1)[0]
        return aLastName.localeCompare(bLastName)
      } else if (currentSort === "recent") {
        return new Date(b.created || "").getTime() - new Date(a.created || "").getTime()
      } else if (currentSort === "twitter") {
        return (b.twitter?.followers || 0) - (a.twitter?.followers || 0)
      } else if (currentSort === "github") {
        return (b.github?.followers || 0) - (a.github?.followers || 0)
      } else if (currentSort === "youtube") {
        return (b.youtube?.followers || 0) - (a.youtube?.followers || 0)
      } else if (currentSort === "twitch") {
        return (b.twitch?.followers || 0) - (a.twitch?.followers || 0)
      } else if (currentSort === "bluesky") {
        return (b.bluesky?.followers || 0) - (a.bluesky?.followers || 0)
      } else {
        return 0
      }
    })
  }

  const numPages = Math.ceil(buildersToShow.length / PER_PAGE)
  const startIndex = (page - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE

  return (
    <Main>
      <BuilderDirectory builders={buildersToShow.slice(startIndex, endIndex)} page={page} sort={currentSort} numPages={numPages} />
    </Main>
  )
}
