import { WebPage, Organization, WithContext } from "schema-dts"
import Home from "@/components/views/home"

export default function HomePage() {
  const jsonLdOrg: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Public Builders",
    url: "https://publicbuilders.org",
    logo: "https://publicbuilders.org/logo.png",
  }

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Public Builders Directory",
    url: "https://publicbuilders.org",
    description:
      "Public Builders is a directory for finding builders who are actively and consistently building in public. Browse founders, makers, creators and entrepreneurs who #buildinpublic on Twitter, Bluesky, GitHub, YouTube, and more.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Home />
    </div>
  )
}
