import { useState } from "react";
import { FormData } from "@/app/_types";
import { mapSocialMediaData } from "@/app/_data";

export function useBuilderProfileReviewSubmit() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData, action: "approve" | "reject", submissionId: string, rejectReason?: string) => { 
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/submission/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          socialMedia: mapSocialMediaData(data),
          action,
          id: submissionId,
          rejectReason
        }),
      });

      const result = await response.json();

      if (!result.ok) {
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
