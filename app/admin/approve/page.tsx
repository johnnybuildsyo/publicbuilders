import BuilderReview from "@/components/views/admin/builder-review"

export default function ApproveBuilderPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="font-extrabold text-4xl">Review Submissions</h1>
      <BuilderReview />
    </div>
  )
}
