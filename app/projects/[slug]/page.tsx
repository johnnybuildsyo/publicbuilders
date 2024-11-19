import { WebPage, WithContext } from "schema-dts"
import { SHARE_IMAGE, builders } from "@/app/_data"
import Profile from "@/components/views/profile"
import { reverseSlugify } from "@/lib/utils"
import { breadcrumbJsonLd as breadcrumb } from "@/app/_util"
import Project from "@/components/views/project"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const name = reverseSlugify(slug)

  return {
    title: `Public Builders | Project Page | ${name}`,
    description: `Public Builder Project Page for ${name}. PublicBuilders.org is a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Discover who is doing #buildinpublic on YouTube, GitHub, Twitch, Twitter, Bluesky and more.`,
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

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const name = reverseSlugify(slug)
  const builder = builders.find((builder) => builder.currentProject?.name === name)

  let jsonLd: WithContext<WebPage> | undefined
  if (builder) {
    const sameAs = []
    if (builder.twitter?.url) sameAs.push(builder.twitter.url)
    if (builder.bluesky?.url) sameAs.push(builder.bluesky.url)
    if (builder.youtube?.url) sameAs.push(builder.youtube.url)
    if (builder.github?.url) sameAs.push(builder.github.url)

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Build In Public Project | " + builder.currentProject?.name,
      url: "https://publicbuilders.org/resources",
      description: `${builder.currentProject?.name} is a #buildinpublic project by ${builder.name}. PublicBuilders.org is a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Discover who is doing #buildinpublic on YouTube, GitHub, Twitch, Twitter, Bluesky and more.`,
      breadcrumb,
    }
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      {builder && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </>
      )}

      <Project builder={builder} slug={slug} />
    </div>
  )
}
