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

type BuilderProfileFormProps = {
  isLoading: boolean
  submittedWithoutCaptcha: boolean
  onSubmit: (data: FormData) => Promise<void>
}

export default function BuilderProfileForm({ isLoading, submittedWithoutCaptcha, onSubmit }: BuilderProfileFormProps): JSX.Element {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      currentProject: {
        tags: [],
      },
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <BuilderProfileFields {...{ register, errors, setValue, watch }} />

      {submittedWithoutCaptcha && !captchaToken && <p className="text-red-500 text-sm w-full text-right">Please complete the captcha to submit the form.</p>}
      <div className="w-full flex justify-end">
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} theme="light" onChange={(value) => setCaptchaToken(value)} />
      </div>
      <div className="flex justify-end items-center gap-8">
        {isLoading ? (
          <Spinner containerClassName="pr-2" className="fill-fuchsia-600" />
        ) : (
          <>
            <Link className="px-2" href="/">
              Cancel
            </Link>
            <Button
              className="disabled:opacity-30 transition-all ease-in-out duration-500 text-lg py-2 px-12 h-auto bg-fuchsia-600 hover:bg-fuchsia-600 hover:scale-105"
              disabled={submittedWithoutCaptcha && !captchaToken}
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
