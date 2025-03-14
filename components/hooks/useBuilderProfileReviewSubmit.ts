import { useState } from "react";
import { FormData } from "@/app/_types";

type ReviewAction = "approve" | "reject";

interface RequestBody {
  action: ReviewAction;
  id: string;
  rejectReason?: string;
  data?: FormData;
}

export function useBuilderProfileReviewSubmit() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    data: FormData,
    action: ReviewAction,
    submissionId: string,
    rejectReason?: string
  ) => {
    setIsLoading(true);

    try {
      const requestBody: RequestBody = {
        action,
        id: submissionId,
        rejectReason,
      };

      if (action === "approve") {
        // Include form data only when approving
        requestBody.data = data;
      }

      const response = await fetch("/api/admin/data/builders/new/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        console.error("Error submitting form:", result.error);
        alert(`Error: ${result.error}`);
        return;
      }

      alert(`${action === "approve" ? "Approved" : "Rejected"} successfully!`);
      window.location.reload();
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
