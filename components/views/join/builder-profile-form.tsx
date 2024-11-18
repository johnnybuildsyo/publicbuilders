"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { formSchema, FormData } from "@/app/_types"
import BuilderProfileFields from "./builder-profile-fields"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type InitialCheckKey = "documentation" | "engagement" | "hashtags" | "value"

type BuilderProfileFormProps = {
  isLoading: boolean
  onSubmit: (data: FormData, captchaToken: string) => Promise<void>
}

export default function BuilderProfileForm({ isLoading, onSubmit }: BuilderProfileFormProps): JSX.Element {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState<boolean | "indeterminate">(false)
  const [initialChecks, setInitialChecks] = useState<Record<InitialCheckKey, boolean>>({
    documentation: false,
    engagement: false,
    hashtags: false,
    value: false,
  })

  const allInitialChecked = Object.values(initialChecks).every(Boolean)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      currentProject: {
        tags: [],
      },
    },
  })

  const submitForm = (data: FormData) => {
    if (!captchaToken) {
      alert("Please complete the captcha.")
      return
    }
    onSubmit(data, captchaToken)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="rounded-xl bg-fuchsia-50 border-2 border-fuchsia-100 p-8 space-y-4">
        <p>
          We’re excited to welcome builders who are open, engaged, and eager to share their journeys. Please check the boxes to let us know you’re aligned with what we’re looking for in our community:
        </p>
        {(["documentation", "engagement", "hashtags", "value"] as InitialCheckKey[]).map((key, index) => (
          <div className="flex items-start space-x-3" key={index}>
            <Checkbox id={key} checked={initialChecks[key]} onCheckedChange={(checked) => setInitialChecks((prev) => ({ ...prev, [key]: checked }))} />
            <Label htmlFor={key} className="font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {
                [
                  "I consistently document and share my project-building journey.",
                  "I actively engage with my audience by responding to feedback, answering questions, and initiating discussions.",
                  "I use #buildinpublic or similar hashtags and participate actively in the community.",
                  "I avoid purely promotional content and focus on adding value, sharing insights, or helping others learn.",
                ][index]
              }
            </Label>
          </div>
        ))}
      </div>

      <div className={`transition-all ease-in-out duration-500 ${allInitialChecked ? "" : "opacity-30 pointer-events-none"}`}>
        <BuilderProfileFields {...{ register, errors, setValue, watch, control }} />
      </div>

      <div className="w-full flex justify-end">
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} theme="light" onChange={(value) => setCaptchaToken(value)} />
      </div>
      <div className="flex justify-end items-center gap-8">
        {isLoading ? (
          <Spinner containerClassName="pr-2" className="fill-fuchsia-600" />
        ) : (
          <>
            <div className="grow flex items-center space-x-3">
              <Checkbox id="agree" checked={agreeTerms} onCheckedChange={setAgreeTerms} />
              <Label htmlFor="agree" className="!leading-tight text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-balance">
                I confirm the information provided is accurate, consent to it being shared publicly on publicbuilders.org and agree to the{" "}
                <Link target="_blank" className="text-blue-600" href="terms">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link target="_blank" className="text-blue-600" href="privacy">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
            <Link className="px-2" href="/">
              Cancel
            </Link>
            <Button
              className="disabled:opacity-30 transition-all ease-in-out duration-500 text-lg py-2 px-12 h-auto bg-fuchsia-600 hover:bg-fuchsia-600 hover:scale-105"
              disabled={!agreeTerms || !captchaToken}
              type="submit"
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
