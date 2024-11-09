"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CircleOff } from "lucide-react"
import { TwitterXIcon } from "@/components/icons/x"
import BuilderSocialMediaField from "./builder-social-media-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ReCAPTCHA from "react-google-recaptcha"
import { formSchema, FormData, SocialMediaPlatform } from "@/app/_types"
import { BlueskyIcon } from "@/components/icons/bluesky"
import { TwitchIcon } from "@/components/icons/twitch"
import { YoutubeIcon } from "@/components/icons/youtube"
import { GithubIcon } from "@/components/icons/github"
import BuilderProfileFormSuccess from "./builder-profile-form-success"
import { Spinner } from "@/components/ui/spinner"
type SocialMediaHandles = {
  [key in SocialMediaPlatform]?: {
    handle: string
    url: string
  }
}

export default function BuilderProfileForm(): JSX.Element {
  const [submittedWithoutCaptcha, setSubmittedWithoutCaptcha] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
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

  const onSubmit = async (data: FormData) => {
    console.log("Form data before processing:", data)

    if (!captchaToken) {
      setSubmittedWithoutCaptcha(true)
      return
    }

    setIsLoading(true)

    // Define social media URL mappings
    const socialPlatforms: { platform: SocialMediaPlatform; urlPrefix: string }[] = [
      { platform: "twitter", urlPrefix: "https://twitter.com/" },
      { platform: "twitch", urlPrefix: "https://twitch.tv/" },
      { platform: "youtube", urlPrefix: "https://youtube.com/@" },
      { platform: "github", urlPrefix: "https://github.com/" },
      { platform: "bluesky", urlPrefix: "https://bsky.app/profile/" },
    ]

    // Construct social media URLs if handles are present
    const socialMediaData: SocialMediaHandles = {}
    socialPlatforms.forEach(({ platform, urlPrefix }) => {
      const handle = data[platform]?.handle
      if (handle) {
        socialMediaData[platform] = {
          handle,
          url: handle.startsWith("http") ? handle : `${urlPrefix}${handle}`,
        }
      }
    })

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          socialMedia: socialMediaData,
          captchaToken,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error submitting form:", errorData.error)
        alert(`Error: ${errorData.error}`)
        return
      }

      const result = await response.json()
      console.log("Submission result:", result)

      setHasSubmitted(true)
      setCaptchaToken(null)
    } catch (error) {
      console.error("Submission error:", error)
      alert("There was an error submitting the form.")
    } finally {
      setIsLoading(false)
    }
  }

  if (hasSubmitted) {
    return <BuilderProfileFormSuccess />
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground/70 tracking-wider font-extrabold -mb-2">Submit Builder Profile</CardTitle>
        <CardDescription>Must #buildinpublic to get considered for publicbuilders.org</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="bg-amber-200 border-none mb-4">
          <CircleOff className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>This form does not do anything yet! We’ll have it hooked up soon.</AlertDescription>
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} className="mt-1" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...register("website")} className="mt-1" />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} className="mt-1" />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="tags">
              Tags <span className="text-xs font-normal">(comma-separated)</span>
            </Label>
            <Input id="tags" {...register("tags")} className="mt-1" />
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Media Accounts</h3>
            <div className="space-y-6">
              <BuilderSocialMediaField field="twitter" icon={<TwitterXIcon />} label="X / Twitter Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="bluesky" icon={<BlueskyIcon />} label="Bluesky Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="twitch" icon={<TwitchIcon />} label="Twitch Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="youtube" icon={<YoutubeIcon />} label="YouTube Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="github" icon={<GithubIcon />} label="GitHub Account" register={register} errors={errors} setValue={setValue} watch={watch} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentProjectName">Name</Label>
                <Input id="currentProjectName" {...register("currentProject.name")} className="mt-1" />
                {errors.currentProject?.name && <p className="text-red-500 text-sm mt-1">{errors.currentProject.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="currentProjectLink">Link</Label>
                <Input id="currentProjectLink" {...register("currentProject.link")} className="mt-1" />
                {errors.currentProject?.link && <p className="text-red-500 text-sm mt-1">{errors.currentProject.link.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="currentProjectDescription">Description</Label>
              <Textarea id="currentProjectDescription" {...register("currentProject.description")} className="mt-1" />
              {errors.currentProject?.description && <p className="text-red-500 text-sm mt-1">{errors.currentProject.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="currentProjectTags">
                Tags <span className="text-xs font-normal">(comma-separated)</span>
              </Label>
              <Input id="currentProjectTags" {...register("currentProject.tags")} className="mt-1" />
              {errors.currentProject?.tags && <p className="text-red-500 text-sm mt-1">{errors.currentProject.tags.message}</p>}
            </div>
          </div>
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
      </CardContent>
    </Card>
  )
}
