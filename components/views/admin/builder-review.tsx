"use client"

import { BuilderSubmission } from "@/app/_types"
import { Card, CardContent } from "@/components/ui/card"
import BuilderReviewForm from "./builder-review-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useBuilderProfileReviewSubmit } from "@/components/hooks/useBuilderProfileReviewSubmit"

export default function BuilderReview({ submissions }: { submissions: BuilderSubmission[] }) {
  const { onSubmit, isLoading } = useBuilderProfileReviewSubmit()

  return (
    <>
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
