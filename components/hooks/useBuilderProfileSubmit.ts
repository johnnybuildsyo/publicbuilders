import { useState } from "react";
import { FormData } from "@/app/_types";
import { mapSocialMediaData } from "@/app/_data";

export function useBuilderProfileSubmit() {
  const [submittedWithoutCaptcha, setSubmittedWithoutCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = async (data: FormData, captchaToken: string) => {
    if (!captchaToken) {
      setSubmittedWithoutCaptcha(true);
      return;
    }

    setIsLoading(true);

    const socialMediaData = mapSocialMediaData(data);
    const payload = {
      ...data,
      ...socialMediaData,
      captchaToken,
    }

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      if (result.url) {
        setHasSubmitted(true);
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
    hasSubmitted,
    submittedWithoutCaptcha,
    setSubmittedWithoutCaptcha,
  };
}
