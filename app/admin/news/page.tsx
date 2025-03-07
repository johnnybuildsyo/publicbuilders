import Heading from "@/components/typography/heading"
import Subhead from "@/components/typography/subhead"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AdminNewsPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  const today = new Date()
  const sunday = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? 7 : 0)))
  const saturday = new Date(today.setDate(today.getDate() + (6 - today.getDay())))

  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <Heading>
        Admin <span className="font-extralight opacity-50 px-2">|</span> News
      </Heading>
      <h2 className="text-center font-mono text-sm mb-8">
        Next Publication Week
        <br />
        {sunday.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })} - {saturday.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
      </h2>
      <Card className="w-full max-w-6xl mx-auto p-8">
        <CardHeader className="flex flex-col items-center justify-center">
          <Heading>Trending Builders</Heading>
          <Subhead>Who’s gained the most followers in the last week?</Subhead>
        </CardHeader>
      </Card>
      <Card className="w-full max-w-6xl mx-auto p-8">
        <CardHeader className="flex flex-col items-center justify-center">
          <Heading>Tools of the Week</Heading>
          <Subhead>Stuff we found useful this week</Subhead>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold">OpenGraph.xyz</h3>
          <p className="text-foreground-muted">Free Meta Tag Generator to preview all Open Graph meta tags in one place.</p>
          <Link href="https://www.opengraph.xyz/" className="text-sm">
            opengraph.xyz
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
