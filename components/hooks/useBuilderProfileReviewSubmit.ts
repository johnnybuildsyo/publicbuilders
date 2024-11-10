import { useState } from "react";
import { FormData } from "@/app/_types";
import { mapSocialMediaData } from "@/app/_data";

export function useBuilderProfileReviewSubmit() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData, action: "approve" | "reject", submissionId: string) => {
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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(result.success ? `${action === "approve" ? "Approved" : "Rejected"} successfully!` : "There was an error processing the request.");
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
