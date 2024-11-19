import { WebPage, Organization, WithContext } from "schema-dts"
import Home from "@/components/views/home"
import { breadcrumbJsonLd as breadcrumb } from "./_util"

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
    breadcrumb,
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Home />
    </div>
  )
}
