"use client"

import { BuilderSubmission } from "@/app/_types"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import BuilderReviewForm from "./builder-review-form"
import { useBuilderProfileReviewSubmit } from "@/components/hooks/useBuilderProfileReviewSubmit"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BuilderReview() {
  const [submissions, setSubmissions] = useState<BuilderSubmission[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch(`/api/admin/submission/load`)
        if (!response.ok) throw new Error("Failed to load submissions.")
        const data: BuilderSubmission[] = await response.json()

        const submissionsData = data.map((submission) => {
          const socialPlatforms = ["twitter", "youtube", "twitch", "github", "bluesky"] as const

          socialPlatforms.forEach((platform) => {
            const platformData = submission[platform]
            if (platformData?.url && !platformData.handle) {
              platformData.handle = platformData.url
            }
          })

          return submission
        })

        setSubmissions(submissionsData)
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
        <>
          <p className="py-8">No submissions available.</p>
          <Link className="text-xl py-4" href="/recent">
            <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 scale-125">
              Go to Directory
            </Button>
          </Link>
        </>
      ) : (
        <p className="pb-8">There {submissions.length > 1 ? `are ${submissions.length} submissions` : "is 1 submission"} to review.</p>
      )}

      {submissions.length > 0 &&
        submissions.slice(0, 1).map((submission, index) => (
          <Card key={index} className="w-full max-w-4xl mx-auto p-8 mb-16">
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
