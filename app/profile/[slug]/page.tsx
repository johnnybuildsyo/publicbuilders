import { SHARE_IMAGE, builders } from "@/app/_data"
import Profile from "@/components/views/profile"
import { reverseSlugify } from "@/lib/utils"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const name = reverseSlugify(slug)

  return {
    title: `Public Builders | Builder Profile | ${name}`,
    description:
      "Public Builders is a directory of top build in public founders, creators, makers and indie hackers sharing their journey. Discover who is doing #buildinpublic on YouTube, GitHub, Twitch, Twitter, Bluesky and more.",
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
  const profileData = builders.find((builder) => builder.name === name)

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Profile builder={profileData} slug={slug} />
    </div>
  )
}
