"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"

export default function CopyNotifyButton({ twitterHandle }: { twitterHandle: string }) {
  const [isCopied, setIsCopied] = useState(false)
  const textToCopy = `Hey @${twitterHandle} I added you to my Public Builders Directory of #buildinpublic people — hope that's cool! https://publicbuilders.org/recent`

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
