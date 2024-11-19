import { WebPage, WithContext } from "schema-dts"
import { Metadata } from "next"
import { APP_ICON, SHARE_IMAGE_RESOURCES } from "../_data"
import { Resources } from "@/components/views/home/resources"
import { ReactElement } from "react"
import ReactMarkdown from "react-markdown"
import { breadcrumbJsonLd as breadcrumb } from "../_util"

const description = "Resources for indie makers, startup founders and ambitious entrepreneurs who are building in public, including tools, articles, communities, newsletters, podcasts and more."

export const metadata: Metadata = {
  title: "Public Builders | Resources for Building in Public",
  description,
  openGraph: {
    images: SHARE_IMAGE_RESOURCES,
  },
  twitter: {
    images: SHARE_IMAGE_RESOURCES,
  },
  icons: {
    icon: APP_ICON,
  },
}

async function fetchReadmeContent(): Promise<string> {
  const response = await fetch("https://api.github.com/repos/johnnybuildsyo/awesome-buildinpublic/readme", {
    headers: {
      Accept: "application/vnd.github.v3.raw",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch README content")
  }

  return response.text()
}

function extractRelevantSection(content: string): string {
  const start = content.indexOf("## Resource")
  const end = content.indexOf("## Star History")

  if (start === -1 || end === -1 || start >= end) {
    throw new Error("Relevant section not found in README content")
  }

  return content.slice(start, end).trim()
}

export default async function ResourcesPage(): Promise<ReactElement> {
  const fullContent = await fetchReadmeContent()
  const content = extractRelevantSection(fullContent)

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Build In Public Resources",
    url: "https://publicbuilders.org/resources",
    description,
    breadcrumb,
  }

  return (
    <main className="w-full text-center flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Resources>
        <div className="prose w-full max-w-5xl mx-auto text-left p-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Resources>
    </main>
  )
}
