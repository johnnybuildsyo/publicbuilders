import { getTips } from "@/lib/admin/tips"
import TipsReviewForm from "@/components/views/admin/tips-review-form"
import Heading from "@/components/typography/heading"

export default async function TipsAdminPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Ensure it only runs in development
  }

  const { data, filePath } = await getTips()

  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <Heading>Create Tools and Tips</Heading>
      {data.length > 0 ? <TipsReviewForm data={data} filePath={filePath} /> : <TipsReviewForm data={[]} filePath={filePath} isCreatingNewTip={true} />}
    </div>
  )
}
