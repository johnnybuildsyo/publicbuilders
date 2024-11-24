"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ExternalLink } from "lucide-react"
import { BuildToolOrTip } from "@/app/_types"
import { Checkbox } from "@/components/ui/checkbox"
import { removeTip, approveTip } from "@/lib/admin/tips" // Import the server action

interface TipsReviewFormProps {
  data: BuildToolOrTip[]
  filePath: string
}

export default function TipsReviewForm({ data, filePath }: TipsReviewFormProps) {
  const [tips, setTips] = useState(data)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentTip = tips[currentIndex]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("author.")) {
      const authorKey = name.split(".")[1]
      setTips((prev) =>
        prev.map((tip, index) =>
          index === currentIndex
            ? {
                ...tip,
                author: {
                  ...tip.author,
                  [authorKey]: value,
                },
              }
            : tip
        )
      )
    } else {
      setTips((prev) => prev.map((tip, index) => (index === currentIndex ? { ...tip, [name]: value } : tip)))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setTips((prev) => prev.map((tip, index) => (index === currentIndex ? { ...tip, isTool: checked } : tip)))
  }

  const handleApprove = async () => {
    console.log("Approved:", currentTip)
    try {
      const updatedTips = await approveTip(currentTip, filePath, currentIndex)
      setTips(updatedTips)
      if (currentIndex >= updatedTips.length) {
        setCurrentIndex(updatedTips.length - 1) // Avoid out-of-bounds index
      }
    } catch (error) {
      console.error("Error approving tip:", error)
    }
  }

  const handleReject = async () => {
    console.log("Rejected:", currentTip)
    try {
      const updatedTips = await removeTip(filePath, currentIndex)
      setTips(updatedTips)
      if (currentIndex >= updatedTips.length) {
        setCurrentIndex(updatedTips.length - 1) // Avoid out-of-bounds index
      }
    } catch (error) {
      console.error("Error rejecting tip:", error)
    }
  }

  if (!currentTip) {
    return <p>No more tips to review.</p>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={currentTip.title} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={currentTip.description} onChange={handleChange} rows={5} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <div className="flex space-x-2">
            <Input id="url" name="url" value={currentTip.url} onChange={handleChange} />
            <Button variant="outline" onClick={() => window.open(currentTip.url, "_blank")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="author.name">Author Name</Label>
          <Input id="author.name" name="author.name" value={currentTip.author.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author.url">Author Twitter URL</Label>
          <div className="flex space-x-2">
            <Input id="author.url" name="author.url" value={currentTip.author.twitterUrl} onChange={handleChange} />
            <Button variant="outline" onClick={() => window.open(currentTip.author.twitterUrl, "_blank")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-1 py-2">
          <Checkbox id="isTool" name="isTool" checked={currentTip.isTool} onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked))} />
          <Label htmlFor="isTool">Is Tool</Label>
        </div>
        <Input type="hidden" id="created" name="created" value={currentTip.created} readOnly />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={handleReject}>
          Reject
        </Button>
        <Button onClick={handleApprove}>Approve</Button>
      </CardFooter>
    </Card>
  )
}
