import React, { useState, useEffect } from "react"
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { FormData } from "./builder-profile-form"

export type SocialMediaPlatform = "twitter" | "twitch" | "youtube" | "github" | "bluesky"
export type HandleField = `${SocialMediaPlatform}Handle`
export type FollowerField = `${SocialMediaPlatform}${"Followers" | "Subscribers"}`

const followerSuffixMap: Record<SocialMediaPlatform, "Followers" | "Subscribers"> = {
  twitter: "Followers",
  bluesky: "Followers",
  github: "Followers",
  twitch: "Subscribers",
  youtube: "Subscribers",
}

interface BuilderSocialMediaFieldProps {
  field: SocialMediaPlatform
  icon: React.ReactNode
  label: string
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

export default function BuilderSocialMediaField({ field, icon, label, register, errors, watch }: BuilderSocialMediaFieldProps): JSX.Element {
  const handleField = `${field}Handle` as HandleField
  const followerSuffix = followerSuffixMap[field]
  const followerField = `${field}${followerSuffix}` as FollowerField
  const handle = watch(handleField)

  // Initialize isEditing to true if handle is empty or undefined
  const [isEditing, setIsEditing] = useState<boolean>(true)

  useEffect(() => {
    if (!handle || handle.trim() === "") {
      setIsEditing(true)
    }
  }, [handle])

  const handleBlur = () => {
    if (handle && handle.trim() !== "") {
      setIsEditing(false)
    }
    // If handle is empty, keep isEditing as true
  }

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-4 items-end">
      <div>
        <Label htmlFor={handleField}>{label}</Label>
        {isEditing ? (
          <Input id={handleField} {...register(handleField as keyof FormData)} placeholder={`Enter ${field} handle or url`} className="mt-1" onBlur={handleBlur} autoFocus />
        ) : (
          <div className="flex items-center mt-1 px-2 py-0.5 bg-gray-100 rounded">
            {icon}
            <span className="ml-2">{handle}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="ml-auto">
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </div>
      <div>
        <Label htmlFor={followerField} className="text-sm">
          # {followerSuffix.toLowerCase()}
        </Label>
        <Input
          id={followerField}
          type="number"
          {...register(followerField as keyof FormData, {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className="mt-1"
        />
      </div>
      {errors[followerField as keyof FormData] && <p className="text-red-500 text-sm col-span-2">{errors[followerField as keyof FormData]?.message}</p>}
    </div>
  )
}
