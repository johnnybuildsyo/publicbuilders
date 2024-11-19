import { WebPage, WithContext } from "schema-dts"
import { Metadata } from "next"
import { APP_ICON, SHARE_IMAGE } from "../_data"
import Join from "@/components/views/join"
import { breadcrumbJsonLd as breadcrumb } from "../_util"

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
    breadcrumb,
  }

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Join />
    </div>
  )
}
