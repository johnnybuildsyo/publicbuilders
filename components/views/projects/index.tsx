import Main from "@/components/layout/main"
import { builders } from "@/app/_data"
import { shuffleWithDateSeed } from "@/lib/utils"
import { Builder } from "@/app/_types"
import { ProjectDirectory } from "./project-directory"

const PER_PAGE = 24

export default function ProjectsHome({ page = 1 }: { page?: number }) {
  const buildersToShow: Builder[] = shuffleWithDateSeed(builders)

  const numPages = Math.ceil(buildersToShow.length / PER_PAGE)
  const startIndex = (page - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE

  return (
    <Main variant="projects">
      <ProjectDirectory builders={buildersToShow.slice(startIndex, endIndex)} page={page} numPages={numPages} />
    </Main>
  )
}
