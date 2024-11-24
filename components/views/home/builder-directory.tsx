import { Builder } from "@/app/_types"
import { BuilderList } from "./builder-list"
import { getTitleCaseSocial } from "@/lib/utils"
import Heading from "@/components/typography/heading"
import Subhead from "@/components/typography/subhead"

export function BuilderDirectory({ builders, sort, page, numPages }: { builders: Builder[]; sort?: string; page: number; numPages: number }) {
  let subhead = `A list of the top people building in public${sort ? ` on ${getTitleCaseSocial(sort)}` : ", including social links, follower counts, current projects and more"}.`

  if (sort === "recent") {
    subhead = "A list of the most recently added public builders, including social links, follower counts, current projects and more."
  }

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <Heading>Public Builder Directory</Heading>
        <Subhead>{subhead}</Subhead>
        <BuilderList {...{ builders, sort, page, numPages }} />
      </div>
    </section>
  )
}
