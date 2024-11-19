import { WebPage, Person, WithContext } from "schema-dts"
import { SHARE_IMAGE, builders } from "@/app/_data"
import Profile from "@/components/views/profile"
import { reverseSlugify } from "@/lib/utils"
import slugify from "slugify"
import { breadcrumbJsonLd as breadcrumb } from "@/app/_util"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const name = reverseSlugify(slug)

  return {
    title: `Public Builders | Builder Profile | ${name}`,
    description: `Public Builder profile for ${name}. PublicBuilders.org is a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Discover who is doing #buildinpublic on YouTube, GitHub, Twitch, Twitter, Bluesky and more.`,
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

export default async function ProfilePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const name = reverseSlugify(slug)
  const builder = builders.find((builder) => builder.name === name)

  let jsonLdPerson: WithContext<Person> | undefined
  let jsonLd: WithContext<WebPage> | undefined
  if (builder) {
    const sameAs = []
    if (builder.twitter?.url) sameAs.push(builder.twitter.url)
    if (builder.bluesky?.url) sameAs.push(builder.bluesky.url)
    if (builder.youtube?.url) sameAs.push(builder.youtube.url)
    if (builder.github?.url) sameAs.push(builder.github.url)

    jsonLdPerson = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: builder.name,
      image: builder.image,
      description: builder.description,
      url: builder.website,
      sameAs,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://publicbuilders.org/profile/${slugify(builder.name, { lower: true })}`,
      },
      knowsAbout: builder.tags,
    }

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Build In Public | " + builder.name,
      url: "https://publicbuilders.org/resources",
      description: `Public Builder profile for ${builder.name}. PublicBuilders.org is a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Discover who is doing #buildinpublic on YouTube, GitHub, Twitch, Twitter, Bluesky and more.`,
      breadcrumb,
    }
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      {builder && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </>
      )}

      <Profile builder={builder} slug={slug} />
    </div>
  )
}
