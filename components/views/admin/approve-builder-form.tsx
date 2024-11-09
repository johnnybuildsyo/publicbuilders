"use client"

import { Builder } from "@/app/_types"
import { useState, useEffect } from "react"

export default function ApproveBuilderForm() {
  const [submissions, setSubmissions] = useState<Builder[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch(`/api/admin/submission/load`)
        if (!response.ok) throw new Error("Failed to load submissions.")
        const data: Builder[] = await response.json()
        console.log(JSON.stringify(data, null, 2))
        setSubmissions(data)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An unknown error occurred.")
        console.error(error)
      }
    }

    loadSubmissions()
  }, [])

  const handleApproveSubmission = async (submission: Builder) => {
    try {
      const response = await fetch("/api/submission/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionData: submission }),
      })

      if (!response.ok) throw new Error("Failed to approve submission.")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {error && <p className="text-red-500 py-8">{error}</p>}
      {submissions.length === 0 && <p>No submissions available.</p>}
      <p>There {submissions.length > 1 ? `are ${submissions.length} submissions` : "is 1 submission"} to review.</p>

      {submissions.length > 0 && (
        <div>
          <pre>{JSON.stringify(submissions[0], null, 2)}</pre>
          <button onClick={() => handleApproveSubmission(submissions[0])}>Approve Submission</button>
        </div>
      )}
    </>
  )
}
