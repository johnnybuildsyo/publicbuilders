import { Metadata } from "next"
import { APP_ICON, SHARE_IMAGE } from "../_data"
import Link from "next/link"
import { WebPage, WithContext } from "schema-dts"

const description =
  "Information about PublicBuilders.org, a directory for finding builders who are actively and consistently building in public. Browse founders, makers, creators and entrepreneurs who #buildinpublic on Twitter, Bluesky, GitHub, YouTube, and more."

export const metadata: Metadata = {
  title: "Public Builders | About",
  description,
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

const linkClass = "font-semibold border-b border-dashed border-white/50 hover:border-white/70"

export default function AboutPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Public Builders, the directory of people building in public",
    url: "https://publicbuilders.org/about",
    description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://publicbuilders.org",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resources",
          item: "https://publicbuilders.org/resources",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Join",
          item: "https://publicbuilders.org/join",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Top Public Builders on Twitter",
          item: "https://publicbuilders.org/twitter",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Top Public Builders on Bluesky",
          item: "https://publicbuilders.org/bluesky",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Top Public Builders on GitHub",
          item: "https://publicbuilders.org/github",
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Top Public Builders on YouTube",
          item: "https://publicbuilders.org/youtube",
        },
      ],
    },
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-grow">
        <section className=" py-20 w-full h-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-12 text-balance" style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, .25)" }}>
              About Public Builders
            </h1>
            <div className="text-lg text-left w-full max-w-3xl mx-auto flex flex-col gap-4" style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, .5)" }}>
              <p>When I was getting started building in public, I had a hard time finding a good list of people who were actively and consistently building in public. So I made one!</p>
              <p>
                <Link className={linkClass} href="/">
                  PublicBuilders.org
                </Link>{" "}
                exists to provide a list of people who{" "}
                <a className={linkClass} href="https://bsky.app/hashtag/buildinpublic">
                  #buildinpublic
                </a>
                , sharing their journeys as they create projects in front of the world.
              </p>
              <p>
                This project is itself being built in public by{" "}
                <a className={linkClass} href="https://johnnybuilds.com">
                  Johnny Builds
                </a>
                . It started out as a reply in{" "}
                <a className={linkClass} href="https://bsky.app/profile/johnnybuilds.bsky.social/post/3la3lpowi5o2t">
                  a BlueSky thread
                </a>
                . The prototype was built and deployed in 20 minutes{" "}
                <a className={linkClass} href="https://v0.dev/chat/wQ2wK1qyHMB?b=b_bbroDnKtltd">
                  with v0
                </a>
                . You can read all the progress updates as they are published to the{" "}
                <a className={linkClass} href="https://github.com/johnnybuildsyo/publicbuilders/blob/main/README.md">
                  Public Build Log
                </a>
                .
              </p>
              <p>
                Source code is published{" "}
                <a className={linkClass} href="https://github.com/johnnybuildsyo/publicbuilders">
                  on Github
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
