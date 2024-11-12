import Main from "@/components/layout/main"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "./builder-directory"

export default function Home({ builders, sort }: { builders: Builder[]; sort?: string }) {
  return (
    <Main>
      <BuilderDirectory {...{ builders, sort }} />
    </Main>
  )
}
