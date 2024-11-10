"use client"

import { BuilderSubmission } from "@/app/_types"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import BuilderReviewForm from "./builder-review-form"
import { useBuilderProfileReviewSubmit } from "@/components/hooks/useBuilderProfileReviewSubmit"

export default function BuilderReview() {
  const [submissions, setSubmissions] = useState<BuilderSubmission[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch(`/api/admin/submission/load`)
        if (!response.ok) throw new Error("Failed to load submissions.")
        const data: BuilderSubmission[] = await response.json()
        setSubmissions(data)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An unknown error occurred.")
        console.error(error)
      }
    }

    loadSubmissions()
  }, [])

  const { onSubmit, isLoading } = useBuilderProfileReviewSubmit()

  return (
    <>
      {error && <p className="text-red-500 py-8">{error}</p>}
      {submissions.length === 0 ? (
        <p className="py-8">No submissions available.</p>
      ) : (
        <p className="pb-8">There {submissions.length > 1 ? `are ${submissions.length} submissions` : "is 1 submission"} to review.</p>
      )}

      {submissions.length > 0 &&
        submissions.map((submission, index) => (
          <Card key={index} className="w-full max-w-4xl mx-auto p-8">
            <CardContent>
              <BuilderReviewForm
                defaultValues={submission}
                submissionId={submission.id || `submission-${index}`} // Add an id if it's available
                {...{ isLoading, onSubmit }}
              />
            </CardContent>
          </Card>
        ))}
    </>
  )
}
