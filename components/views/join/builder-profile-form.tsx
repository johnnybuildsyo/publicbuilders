"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Twitter, Twitch, Youtube, Github, CircleOff } from "lucide-react"
import BuilderSocialMediaField from "./builder-social-media-field"
import { HandleField, SocialMediaPlatform } from "./builder-social-media-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ReCAPTCHA from "react-google-recaptcha"

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    twitterHandle: z.string().optional(),
    twitter: z.string().url("Invalid URL").optional(),
    twitterFollowers: z.number().optional(),
    twitchHandle: z.string().optional(),
    twitch: z.string().url("Invalid URL").optional(),
    twitchSubscribers: z.number().optional(),
    youtubeHandle: z.string().optional(),
    youtube: z.string().url("Invalid URL").optional(),
    youtubeSubscribers: z.number().optional(),
    githubHandle: z.string().optional(),
    github: z.string().url("Invalid URL").optional(),
    githubFollowers: z.number().optional(),
    blueskyHandle: z.string().optional(),
    bluesky: z.string().url("Invalid URL").optional(),
    blueskyFollowers: z.number().optional(),
    website: z.preprocess((value) => {
      if (typeof value === "string" && !value.startsWith("http")) {
        return `https://${value}`
      }
      return value
    }, z.string().url("Invalid URL")),
    description: z.string().min(1, "Description is required"),
    tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
    currentProject: z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "Description is required"),
      link: z.preprocess((value) => {
        if (typeof value === "string" && !value.startsWith("http")) {
          return `https://${value}`
        }
        return value
      }, z.string().url("Invalid URL")),
      tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
    }),
  })
  .refine(
    (data) => {
      if (data.twitterHandle && !data.twitterFollowers) return false
      if (data.twitchHandle && !data.twitchSubscribers) return false
      if (data.youtubeHandle && !data.youtubeSubscribers) return false
      if (data.githubHandle && !data.githubFollowers) return false
      if (data.blueskyHandle && !data.blueskyFollowers) return false
      return true
    },
    {
      message: "Follower/subscriber count is required when social media account is provided",
      path: ["twitterFollowers"],
    }
  )

export type FormData = z.infer<typeof formSchema>

export default function BuilderProfileForm(): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
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

  type SocialMediaUrls = Pick<FormData, SocialMediaPlatform>

  const onSubmit = (data: FormData) => {
    // Compute social media URLs based on handles
    const socialPlatforms: SocialMediaPlatform[] = ["twitter", "twitch", "youtube", "github", "bluesky"]

    socialPlatforms.forEach((platform) => {
      const handleField = `${platform}Handle` as HandleField
      const urlField = platform as keyof SocialMediaUrls
      const handleValue = data[handleField]

      if (handleValue?.startsWith("http")) {
        ;(data as SocialMediaUrls)[urlField] = handleValue
      } else if (handleValue) {
        if (platform === "bluesky") {
          ;(data as SocialMediaUrls)[urlField] = `https://bsky.app/profile/${handleValue}`
        } else if (platform === "twitch") {
          ;(data as SocialMediaUrls)[urlField] = `https://twitch.tv/${handleValue}`
        } else if (platform === "youtube") {
          ;(data as SocialMediaUrls)[urlField] = `https://youtube.com/@${handleValue}`
        } else {
          ;(data as SocialMediaUrls)[urlField] = `https://${platform}.com/${handleValue}`
        }
      }
    })

    console.log("onSubmit", { ...data, captchaToken })
    console.log(JSON.stringify(data, null, 2))
    setIsSubmitted(true)
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
              <BuilderSocialMediaField field="twitter" icon={<Twitter size={20} />} label="X / Twitter Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="bluesky" icon={<Twitter size={20} />} label="Bluesky Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="twitch" icon={<Twitch size={20} />} label="Twitch Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="youtube" icon={<Youtube size={20} />} label="YouTube Account" register={register} errors={errors} setValue={setValue} watch={watch} />
              <BuilderSocialMediaField field="github" icon={<Github size={20} />} label="GitHub Account" register={register} errors={errors} setValue={setValue} watch={watch} />
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
          <div className="w-full flex justify-end">
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} theme="light" onChange={(value) => setCaptchaToken(value)} />
          </div>
          <div className="flex justify-end items-center gap-8">
            <Link href="/">Cancel</Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
            <CheckCircle2 className="mr-2" />
            Form submitted successfully! Check the console for the submitted data.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
