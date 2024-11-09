"use client"

import { useState, useEffect } from "react"

export default function ApproveBuilderForm() {
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [status, setStatus] = useState("")

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch(`/api/admin/submission/load`)
        if (!response.ok) throw new Error("Failed to load submissions.")
        const data = await response.json()
        console.log("Submissions loaded:", data)
        setSubmissions(data)
        setStatus("Submissions loaded successfully!")
      } catch (error) {
        setStatus("Failed to load submissions.")
        console.error(error)
      }
    }

    loadSubmissions()
  }, [])

  const handleApproveSubmission = async (submission) => {
    try {
      const response = await fetch("/api/submission/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionData: submission }),
      })

      if (!response.ok) throw new Error("Failed to approve submission.")

      setStatus("Submission approved and added to builders.json successfully!")
      setSelectedSubmission(null)
      setSubmissions(submissions.filter((sub) => sub.id !== submission.id))
    } catch (error) {
      setStatus("Failed to approve submission.")
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Submissions List</h2>
      {submissions.length === 0 && <p>No submissions available.</p>}
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <button onClick={() => setSelectedSubmission(submission)}>View {submission.id}</button>
          </li>
        ))}
      </ul>

      {selectedSubmission && (
        <div>
          <h2>Submission Preview:</h2>
          <pre>{JSON.stringify(selectedSubmission, null, 2)}</pre>
          <button onClick={() => handleApproveSubmission(selectedSubmission)}>Approve Submission</button>
        </div>
      )}

      <p>{status}</p>
    </div>
  )
}
