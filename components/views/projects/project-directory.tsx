import { Builder } from "@/app/_types"
import { ProjectList } from "./project-list"

export function ProjectDirectory({ builders, page, numPages }: { builders: Builder[]; page: number; numPages: number }) {
  const subhead = `A list of current #buildinpublic projects.`

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl tracking-wide font-black text-center mb-3 text-balance">Public Builder Projects</h2>
        <h3 className="text-lg tracking-wide mb-8 text-foreground/50 text-balance">{subhead}</h3>
        <ProjectList {...{ builders, page, numPages }} />
      </div>
    </section>
  )
}
