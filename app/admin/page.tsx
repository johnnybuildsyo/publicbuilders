import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApproveBuilderPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <h1 className="font-extrabold text-4xl border-b border-foreground/30 px-8 pb-2">Admin</h1>
      <div className="flex flex-col gap-4 py-8 justify-center items-center">
        <Link href="/admin/approve">
          <Button variant="outline">Review Builder Applications</Button>
        </Link>
        <Link href="/admin/review">
          <Button variant="outline">Import Builders from Feed</Button>
        </Link>
        <Link href="/admin/news/tips">
          <Button variant="outline">Generate Tools and Tips</Button>
        </Link>
      </div>
    </div>
  )
}
