import { useState } from "react";
import { FormData } from "@/app/_types";
import { mapSocialMediaData } from "@/app/_data";

export function useBuilderProfileSubmit() {
  const [submittedWithoutCaptcha, setSubmittedWithoutCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      setSubmittedWithoutCaptcha(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          socialMedia: mapSocialMediaData(data),
          captchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      if (result.success) {
        alert("Form submitted successfully!");
        setHasSubmitted(true);
      } else {
        alert("There was an error submitting the form.");
      }
      setCaptchaToken(null);
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
    setCaptchaToken,
    setSubmittedWithoutCaptcha,
  };
}
