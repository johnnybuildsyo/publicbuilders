"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"

export default function CopyNotifyButton() {
  const [isCopied, setIsCopied] = useState(false)
  const textToCopy = `I added you to my directory of people who build in public — hope that's ok? https://publicbuilders.org/recent`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="py-4 flex justify-center">
      <Button onClick={copyToClipboard} className="w-full flex items-center justify-center" variant={isCopied ? "outline" : "default"}>
        {isCopied ? (
          <>
            <CheckIcon className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy Notify Added Post
          </>
        )}
      </Button>
    </div>
  )
}
