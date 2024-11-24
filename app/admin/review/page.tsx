// Import necessary modules
import { BuilderSubmission } from "@/app/_types"
import fs from "fs"
import path from "path"
import Link from "next/link"
import BuilderReview from "@/components/views/admin/builder-review"

// Make the component asynchronous
export default async function ReviewBuilderPage() {
  // Check if the environment is development
  if (process.env.NODE_ENV !== "development") {
    return null // Return null if not in a local environment
  }

  // Initialize an empty array for submissions
  let submissions: BuilderSubmission[] = []

  try {
    // Define the directory path
    const newBuildersDir = path.join(process.cwd(), "secretsauce/data/builders/new")

    // Check if the directory exists
    if (fs.existsSync(newBuildersDir)) {
      const files = fs.readdirSync(newBuildersDir)

      // Read and parse JSON files
      submissions = files
        .filter((file) => path.extname(file) === ".json")
        .map((file) => {
          const filePath = path.join(newBuildersDir, file)
          try {
            const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
            return { id: file.replace(".json", ""), ...data }
          } catch (error) {
            console.error(`Error parsing JSON file ${file}:`, error)
            return null
          }
        })
        .filter(Boolean) // Remove null entries
    } else {
      console.error("Directory does not exist:", newBuildersDir)
    }
  } catch (error) {
    console.error("Error reading files:", error)
  }

  // Pass the submissions as a prop to BuilderReview
  return (
    <div className="flex flex-col items-center min-h-screen py-12 w-full bg-foreground/5">
      <h1 className="font-extrabold text-4xl">Review New Public Builders</h1>
      <Link className="text-blue-600 underline pb-4" href="/recent">
        Go to recently added
      </Link>
      <BuilderReview submissions={submissions} />
    </div>
  )
}
