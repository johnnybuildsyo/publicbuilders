"use client"

import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FormData } from "@/app/_types"
import BuilderSocialMediaField from "./builder-social-media-field"
import { TwitterXIcon } from "@/components/icons/x"
import { BlueskyIcon } from "@/components/icons/bluesky"
import { TwitchIcon } from "@/components/icons/twitch"
import { YoutubeIcon } from "@/components/icons/youtube"
import { GithubIcon } from "@/components/icons/github"
import { RedditIcon } from "@/components/icons/reddit"
import { ProductHuntIcon } from "@/components/icons/producthunt"
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, useWatch, Control } from "react-hook-form"

interface BuilderProfileFieldsProps {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
  control: Control<FormData>
}

export default function BuilderProfileFields({ register, errors, setValue, watch, control }: BuilderProfileFieldsProps) {
  const name = watch("name")
  const website = watch("website")
  const newsletter = watch("newsletter")
  const writing = watch("writing")
  const podcast = watch("podcast")
  const revenue = watch("revenue")
  const currentProject = watch("currentProject")

  const pathname = usePathname()
  const isAdmin = pathname.includes("admin/")

  const bluesky = useWatch({ control, name: "bluesky" })
  const youtube = useWatch({ control, name: "youtube" })
  const github = useWatch({ control, name: "github" })
  const producthunt = useWatch({ control, name: "producthunt" })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} className="mt-1" />
          {isAdmin && (
            <a target="_blank" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline" href={`https://www.google.com/search?q=%22${encodeURIComponent(name)}`}>
              Search {name} on Google
            </a>
          )}
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="website">Your Primary Website</Label>
          <Input id="website" {...register("website")} className="mt-1" />
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
              {website.replace("https://", "")}
            </a>
          )}
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="description">
          Description <span className="text-xs font-normal">(super short bio and quick explanation of how you build in public - may be edited for length)</span>
        </Label>
        <Textarea id="description" {...register("description")} className="mt-1" />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="tags">
          Tags <span className="text-xs font-normal">(comma-separated)</span>
        </Label>
        <Input
          id="tags"
          {...register("tags")}
          onBlur={(e) => {
            const tagsArray = e.target.value
              .split(",")
              .map((tag) => tag.trim().toLowerCase())
              .filter((tag) => tag) // Remove empty tags
            setValue("tags", tagsArray) // Set as an array
          }}
          className="mt-1"
        />
        {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
      </div>

      <div className="pt-4">
        <Label htmlFor="writing">
          Do you have a personal RSS feed for sharing posts and written content? <span className="text-xs font-normal">(provide url)</span>
        </Label>
        <Input id="writing" {...register("writing")} placeholder="Optional" className="mt-1" />
        {writing && (
          <a href={writing} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
            {writing.replace("https://", "")}
          </a>
        )}
      </div>
      <div className="pt-4">
        <Label htmlFor="newsletter">
          Do you publish a newsletter? <span className="text-xs font-normal">(provide url)</span>
        </Label>
        <Input id="newsletter" {...register("newsletter")} placeholder="Optional" className="mt-1" />
        {newsletter && (
          <a href={newsletter} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
            {newsletter.replace("https://", "")}
          </a>
        )}
      </div>
      <div className="pt-4">
        <Label htmlFor="podcast">
          Do you host a podcast? <span className="text-xs font-normal">(provide url)</span>
        </Label>
        <Input id="podcast" {...register("podcast")} placeholder="Optional" className="mt-1" />
        {podcast && (
          <a href={podcast} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
            {podcast.replace("https://", "")}
          </a>
        )}
      </div>
      <div className="pt-4">
        <Label htmlFor="revenue">
          Do you share revenue data? <span className="text-xs font-normal">(provide url)</span>
        </Label>
        <Input id="revenue" {...register("revenue")} placeholder="Optional" className="mt-1" />
        {revenue && (
          <a href={revenue} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
            {revenue.replace("https://", "")}
          </a>
        )}
      </div>
      <div className="space-y-4 pt-8">
        <h3 className="text-lg font-semibold">Social Media Accounts</h3>
        <div className="space-y-6">
          <BuilderSocialMediaField field="twitter" icon={<TwitterXIcon />} label="X / Twitter Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          <BuilderSocialMediaField field="bluesky" icon={<BlueskyIcon />} label="Bluesky Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          {isAdmin && !bluesky && (
            <a className="text-sm pl-1 -mt-2 text-blue-500 hover:underline" href={"https://bsky.app/search?q=" + name} target="_blank">
              Search {name} on Bluesky
            </a>
          )}
          <BuilderSocialMediaField field="twitch" icon={<TwitchIcon />} label="Twitch Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          <BuilderSocialMediaField field="youtube" icon={<YoutubeIcon />} label="YouTube Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          {isAdmin && !youtube && (
            <a className="text-sm pl-1 -mt-2 text-blue-500 hover:underline" href={`https://www.youtube.com/results?search_query=${name}&sp=EgIQAg%253D%253D`} target="_blank">
              Search {name} on YouTube
            </a>
          )}
          <BuilderSocialMediaField field="github" icon={<GithubIcon />} label="GitHub Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          {isAdmin && !github && (
            <a className="text-sm pl-1 -mt-2 text-blue-500 hover:underline" href={`https://github.com/search?q=${name}&type=users`} target="_blank">
              Search {name} on Github
            </a>
          )}
          <BuilderSocialMediaField field="reddit" icon={<RedditIcon />} label="Reddit Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          <BuilderSocialMediaField field="producthunt" icon={<ProductHuntIcon />} label="Product Hunt Account" register={register} errors={errors} setValue={setValue} watch={watch} />
          {isAdmin && !producthunt && (
            <a className="text-sm pl-1 -mt-2 text-blue-500 hover:underline" href={`https://www.producthunt.com/search/users?q=${encodeURIComponent(name)}`} target="_blank">
              Search {name} on Product Hunt
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4">
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
            {currentProject?.link && (
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="text-sm pl-1 -mt-2 text-blue-500 hover:underline">
                {currentProject.link.replace("https://", "")}
              </a>
            )}
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
          <Input
            id="currentProjectTags"
            {...register("currentProject.tags")}
            onBlur={(e) => {
              const tagsArray = e.target.value
                .split(",")
                .map((tag) => tag.trim().toLowerCase())
                .filter((tag) => tag) // Remove empty tags
              setValue("currentProject.tags", tagsArray) // Set as an array
            }}
            className="mt-1"
          />
          {errors.currentProject?.tags && <p className="text-red-500 text-sm mt-1">{errors.currentProject.tags.message}</p>}
        </div>
      </div>
    </>
  )
}
