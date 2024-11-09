import ApproveBuilderForm from "@/components/views/admin/approve-builder-form"

export default function ApproveBuilderPage() {
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  return (
    <div>
      <h1>Approve Builder Submission</h1>
      <ApproveBuilderForm />
    </div>
  )
}
