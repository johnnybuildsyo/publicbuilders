import { getTips } from "@/lib/admin/tips"
import TipsReviewForm from "@/components/views/admin/tips-review-form"

export default async function TipsAdminPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Ensure it only runs in development
  }

  const { data, filePath } = await getTips()

  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <h1 className="font-extrabold text-4xl pb-8">Review Tools and Tips</h1>
      {data.length > 0 ? <TipsReviewForm data={data} filePath={filePath} /> : <p>No tips available for review.</p>}
    </div>
  )
}
