import BuilderReview from "@/components/views/admin/builder-review"
import CopyNotifyButton from "@/components/views/admin/copy-notify-button"
import Link from "next/link"

export default function ReviewBuilderPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <h1 className="font-extrabold text-4xl">Review New Public Builders</h1>
      <CopyNotifyButton />
      <Link className="text-blue-600 underline pb-4" href="/recent">
        Go to recently added
      </Link>
      <BuilderReview />
    </div>
  )
}
