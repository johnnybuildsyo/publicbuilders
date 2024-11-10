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
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"

interface BuilderProfileFieldsProps {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

export default function BuilderProfileFields({ register, errors, setValue, watch }: BuilderProfileFieldsProps) {
  return (
    <>
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
    </>
  )
}