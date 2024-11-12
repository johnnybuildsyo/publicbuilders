import { WebPage, WithContext } from "schema-dts"
import { Metadata } from "next"
import { APP_ICON, SHARE_IMAGE } from "../_data"
import Join from "@/components/views/join"

const description =
  "Submit a request to join the Public Builders, a directory for finding builders who are actively and consistently building in public. Apply to be added by providing your #buildinpublic profile information."

export const metadata: Metadata = {
  title: "Public Builders | Join",
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

export default function JoinPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Public Builders | Join",
    url: "https://publicbuilders.org/resources",
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
    <div className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Join />
    </div>
  )
}
