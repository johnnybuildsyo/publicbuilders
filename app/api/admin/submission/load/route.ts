import { BuilderSubmission } from "@/app/_types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Access denied. This API is only available in a local development environment" },
      { status: 403 }
    );
  }

  try {
    const submissionsDir = path.join(process.cwd(), "data/submissions/pending");
    console.log("Checking directory:", submissionsDir);

    if (!fs.existsSync(submissionsDir)) {
      console.error("Directory does not exist:", submissionsDir);
      return NextResponse.json({ error: "Directory not found" }, { status: 500 });
    }

    const files = fs.readdirSync(submissionsDir);
    console.log("Files found:", files);

    if (files.length === 0) {
      console.warn("No files found in the directory");
    }

    const submissions:BuilderSubmission[] = files
      .filter((file) => path.extname(file) === ".json") // Filter for JSON files only
      .map((file) => {
        const filePath = path.join(submissionsDir, file);
        try {
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          console.log("Data for file", file, ":", data);
          return { id: file.replace(".json", ""), ...data };
        } catch (error) {
          console.error(`Error parsing JSON file ${file}:`, error);
          return null; // Skip files with parsing errors
        }
      })
      .filter(Boolean); // Remove null entries from the list

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error reading files:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
