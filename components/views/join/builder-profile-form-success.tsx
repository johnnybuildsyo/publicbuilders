import Link from "next/link"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function BuilderProfileFormSuccess() {
  return (
    <div className="flex flex-col items-center justify-start h-[75vh] pt-12">
      <Card className="w-full max-w-lg mx-auto flex flex-col items-center justify-center p-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Submission Successful</h1>
        <p className="text-gray-600 mb-4">Thank you for submitting your profile!</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to home
        </Link>
      </Card>
    </div>
  )
}
