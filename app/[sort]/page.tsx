import { WebPage, WithContext } from "schema-dts"
import Home from "@/components/views/home"
import { SHARE_IMAGE } from "../_data"
import { getTitleCaseSocial } from "@/lib/utils"
import { breadcrumbJsonLd as breadcrumb } from "../_util"

const description =
  "Public Builders is a directory for finding builders who are actively and consistently building in public. Browse founders, makers, creators and entrepreneurs who #buildinpublic on Twitter, Bluesky, GitHub, YouTube, and more."

export async function generateMetadata(props: { params: Promise<{ sort: string }> }) {
  const params = await props.params
  return {
    title: params.sort === "recent" ? `Public Builders Most Recently Added – Top Build in Public Founders and Creators` : `Public Builders – The Top Build in Public Founders and Creators`,
    description,
    openGraph: {
      images: SHARE_IMAGE,
    },
    twitter: {
      images: SHARE_IMAGE,
    },
    icons: {
      icon: "/icon.svg",
    },
  }
}

export default async function HomePage(props: { params: Promise<{ sort: string }> }) {
  const { sort } = await props.params

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Top Public Builders on " + getTitleCaseSocial(sort),
    url: "https://publicbuilders.org/" + sort,
    description,
    breadcrumb,
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Home sort={sort} />
    </div>
  )
}
