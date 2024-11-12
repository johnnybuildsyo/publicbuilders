import { Resources } from "@/components/views/home/resources"
import { ReactElement } from "react"
import ReactMarkdown from "react-markdown"

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

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Resources>
        <div className="prose w-full max-w-5xl mx-auto text-left p-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Resources>
    </div>
  )
}
