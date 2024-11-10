"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { formSchema, FormData } from "@/app/_types"
import BuilderProfileFields from "../join/builder-profile-fields"

type BuilderProfileFormProps = {
  isLoading: boolean
  onSubmit: (data: FormData, action: "approve" | "reject", submissionId: string, rejectReason?: string) => Promise<void>
  defaultValues: FormData
  submissionId: string
}

export default function BuilderReviewForm({ isLoading, onSubmit, defaultValues, submissionId }: BuilderProfileFormProps): JSX.Element {
  const [rejectReason, setRejectReason] = useState<undefined | string>(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleApprove = handleSubmit((data) => onSubmit(data, "approve", submissionId))
  const handleReject = handleSubmit((data) => {
    if (rejectReason) {
      onSubmit(data, "reject", submissionId, rejectReason)
    } else {
      setRejectReason("")
    }
  })

  return (
    <form className="space-y-6">
      <BuilderProfileFields {...{ register, errors, setValue, watch }} />

      {rejectReason !== undefined && (
        <div>
          <label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700">
            Reason for Rejection
          </label>
          <Textarea id="rejectReason" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} className="mt-1 block w-full" placeholder="Enter reason for rejection..." />
        </div>
      )}

      <div className="flex justify-end items-center gap-8">
        {isLoading ? (
          <Spinner containerClassName="pr-2" className="fill-fuchsia-600" />
        ) : (
          <>
            <Button variant="ghost" type="button" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleReject}>
              Reject
            </Button>
            <Button className="disabled:opacity-30 transition-all ease-in-out duration-500 text-lg py-2 px-12 h-auto bg-green-600 hover:bg-green-600 hover:scale-105" onClick={handleApprove}>
              Approve
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
