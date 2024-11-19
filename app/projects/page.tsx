import { WebPage, WithContext } from "schema-dts"
import ProjectsHome from "@/components/views/projects"
import { breadcrumbJsonLd as breadcrumb } from "../_util"

export default function ProjectsPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Public Builders Projects Directory",
    url: "https://publicbuilders.org/projects",
    description: "The Projects Directory on Public Builders is a directory for finding projects made by builders who are actively and consistently building in public.",
    breadcrumb,
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectsHome />
    </div>
  )
}
