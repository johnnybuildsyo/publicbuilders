import { WebPage, WithContext } from "schema-dts"
import ProjectsHome from "@/components/views/projects"
import { breadcrumbJsonLd as breadcrumb } from "../_util"
import { Metadata } from "next"
import { SHARE_IMAGE } from "../_data"
import { APP_ICON } from "../_data"

export const metadata: Metadata = {
  title: "Build In Public Projects Directory – Find #buildinpublic Projects made in the open.",
  description: "Explore Public Builders – a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Join the #buildinpublic community!",
  openGraph: {
    images: SHARE_IMAGE,
  },
  twitter: {
    images: SHARE_IMAGE,
  },
  icons: {
    icon: APP_ICON,
  },
}

export default function ProjectsPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Build In Public Projects Directory",
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
