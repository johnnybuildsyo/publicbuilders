import React, { useState, useEffect } from "react"
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { FormData, SocialMediaPlatform } from "@/app/_types"

type HandleField = `${SocialMediaPlatform}.handle`
type FollowerField = `${SocialMediaPlatform}.followers`

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
  const handleField = `${field}.handle` as HandleField // Ensure it's `field.handle`
  const followerSuffix = followerSuffixMap[field]
  const followerField = `${field}.followers` as FollowerField
  const handle = watch(handleField)

  // Initialize `isEditing` based on whether the handle is empty
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
  }

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-4 items-end">
      <div>
        <Label htmlFor={handleField}>{label}</Label>
        {isEditing ? (
          <Input id={handleField} {...register(handleField)} placeholder={`Enter ${field} handle or url`} className="mt-1" onBlur={handleBlur} />
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
          {...register(followerField, {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className="mt-1"
        />
      </div>
      {errors[field]?.handle && <p className="text-red-500 text-sm col-span-2">{errors[field]?.handle?.message}</p>}
    </div>
  )
}
