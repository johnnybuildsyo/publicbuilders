import Main from "@/components/layout/main"
import { builders } from "@/app/_data"
import { shuffleWithDateSeed } from "@/lib/utils"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "./builder-directory"

const PER_PAGE = 24

export default function Home({ sort, page = 1 }: { sort?: string; page?: number }) {
  let buildersToShow: Builder[] = builders

  if (!sort) {
    buildersToShow = shuffleWithDateSeed(builders)
  } else {
    if (sort === "twitter") {
      buildersToShow = builders.filter((b) => b.twitter?.followers)
    } else if (sort === "github") {
      buildersToShow = builders.filter((b) => b.github?.followers)
    } else if (sort === "youtube") {
      buildersToShow = builders.filter((b) => b.youtube?.followers)
    } else if (sort === "twitch") {
      buildersToShow = builders.filter((b) => b.twitch?.followers)
    } else if (sort === "bluesky") {
      buildersToShow = builders.filter((b) => b.bluesky?.followers)
    }

    buildersToShow = buildersToShow.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name)
      } else if (sort === "lastName") {
        const aLastName = a.name.split(" ").slice(-1)[0]
        const bLastName = b.name.split(" ").slice(-1)[0]
        return aLastName.localeCompare(bLastName)
      } else if (sort === "recent") {
        return new Date(b.created || "").getTime() - new Date(a.created || "").getTime()
      } else if (sort === "twitter") {
        return (b.twitter?.followers || 0) - (a.twitter?.followers || 0)
      } else if (sort === "github") {
        return (b.github?.followers || 0) - (a.github?.followers || 0)
      } else if (sort === "youtube") {
        return (b.youtube?.followers || 0) - (a.youtube?.followers || 0)
      } else if (sort === "twitch") {
        return (b.twitch?.followers || 0) - (a.twitch?.followers || 0)
      } else if (sort === "bluesky") {
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
      <BuilderDirectory builders={buildersToShow.slice(startIndex, endIndex)} page={page} sort={sort} numPages={numPages} />
    </Main>
  )
}
