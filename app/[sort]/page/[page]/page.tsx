import Home from "@/components/views/home"
import { SHARE_IMAGE } from "@/app/_data"
import { getTitleCaseSocial } from "@/lib/utils"

export async function generateMetadata(props: { params: Promise<{ sort: string }> }) {
  const params = await props.params
  return {
    title: `Public Builders – The Top Build in Public Founders and Creators on ${getTitleCaseSocial(params.sort)}`,
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

export default async function HomePage(props: { params: Promise<{ sort: string; page: string }> }) {
  const { sort, page } = await props.params
  const pageNumber = parseInt(page)

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Home sort={sort} page={pageNumber} />
    </div>
  )
}
