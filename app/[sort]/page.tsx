import Home from "@/components/views/home"
import { SHARE_IMAGE, builders } from "../_data"
import { getTitleCaseSocial } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { sort: string } }) {
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

export default function HomePage({ params }: { params: { sort: string } }) {
  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Home builders={builders} sort={params.sort} />
    </div>
  )
}
