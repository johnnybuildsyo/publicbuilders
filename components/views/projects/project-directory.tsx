import { Builder } from "@/app/_types"
import { ProjectList } from "./project-list"
import Heading from "@/components/typography/heading"
import Subhead from "@/components/typography/subhead"

export function ProjectDirectory({ builders, page, numPages }: { builders: Builder[]; page: number; numPages: number }) {
  const subhead = `A list of current #buildinpublic projects.`

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <Heading>Public Builder Projects</Heading>
        <Subhead>{subhead}</Subhead>
        <ProjectList {...{ builders, page, numPages }} />
      </div>
    </section>
  )
}
