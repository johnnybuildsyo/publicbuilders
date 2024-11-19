import { Builder } from "@/app/_types"
import { BuilderList } from "./builder-list"
import { getTitleCaseSocial } from "@/lib/utils"

export function BuilderDirectory({ builders, sort, page, numPages }: { builders: Builder[]; sort?: string; page: number; numPages: number }) {
  let subhead = `A list of the top people building in public${sort ? ` on ${getTitleCaseSocial(sort)}` : ", including social links, follower counts, current projects and more"}.`

  if (sort === "recent") {
    subhead = "A list of the most recently added public builders, including social links, follower counts, current projects and more."
  }

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl tracking-wide font-black text-center mb-3 text-balance">Public Builder Directory</h2>
        <h3 className="text-lg tracking-wide mb-8 text-foreground/50 text-balance">{subhead}</h3>
        <BuilderList {...{ builders, sort, page, numPages }} />
      </div>
    </section>
  )
}
