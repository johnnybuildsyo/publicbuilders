"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { formSchema, FormData } from "@/app/_types"
import { TwitterXIcon } from "@/components/icons/x"
import { BlueskyIcon } from "@/components/icons/bluesky"
import { TwitchIcon } from "@/components/icons/twitch"
import { YoutubeIcon } from "@/components/icons/youtube"
import { GithubIcon } from "@/components/icons/github"
import BuilderSocialMediaField from "./builder-social-media-field"

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
  )
}
