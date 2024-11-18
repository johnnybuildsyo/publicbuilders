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
    const newBuildersDir = path.join(process.cwd(), "secretsauce/data/builders/new");
    
    if (!fs.existsSync(newBuildersDir)) {
      console.error("Directory does not exist:", newBuildersDir);
      return NextResponse.json({ error: "Directory not found" }, { status: 500 });
    }

    const files = fs.readdirSync(newBuildersDir);

    if (files.length === 0) {
      console.warn("No files found in the directory");
    }

    const newBuilders:BuilderSubmission[] = files
      .filter((file) => path.extname(file) === ".json") // Filter for JSON files only
      .map((file) => {
        const filePath = path.join(newBuildersDir, file);
        try {
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return { id: file.replace(".json", ""), ...data };
        } catch (error) {
          console.error(`Error parsing JSON file ${file}:`, error);
          return null; // Skip files with parsing errors
        }
      })
      .filter(Boolean); // Remove null entries from the list

    return NextResponse.json(newBuilders, { status: 200 });
  } catch (error) {
    console.error("Error reading files:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
