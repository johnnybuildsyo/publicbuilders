import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-8 pb-16 text-center flex flex-col gap-8">
      <h1 className="text-6xl font-extrabold" style={{ textWrap: "balance" }}>
        JohnnyBuilds Next.js Starter
      </h1>
      <p style={{ textWrap: "balance" }}>
        Minimal Next.js starter with ESList and VSCode settings for automatic code formatting, theme provider for light/dark mode, Rethink Sans font, default layout component and shadcn/ui components
        support.
      </p>
      <div>
        <Button asChild>
          <Link href="https://github.com/johnnybuildsyo/johnnybuilds-nextjs-starter" className="inline-flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </div>
    </div>
  )
}
