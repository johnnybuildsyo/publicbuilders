import { Builder } from "@/app/_types"
import { BuilderList } from "./builder-list"
import { getTitleCaseSocial } from "@/lib/utils"

export function BuilderDirectory({ builders, sort }: { builders: Builder[]; sort?: string }) {
  const subhead = `The top people building in public${sort ? ` on ${getTitleCaseSocial(sort)}` : ""}`

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl tracking-wide font-black text-center mb-2">Builder Directory</h2>
        <h3 className="text-xl tracking-wide mb-8 font-medium text-foreground/50">{subhead}</h3>
        <BuilderList builders={builders} />
      </div>
    </section>
  )
}
