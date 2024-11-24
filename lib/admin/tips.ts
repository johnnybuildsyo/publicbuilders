"use server";

import fs from "fs";
import path from "path";
import slugify from "slugify";
import { BuildToolOrTip } from "@/app/_types";

export async function removeTip(filePath: string, index: number): Promise<BuildToolOrTip[]> {
  try {
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf8")) as BuildToolOrTip[];

    const updatedData = [...fileData];
    updatedData.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf8");

    return updatedData;
  } catch (error) {
    console.error("Error removing tip:", error);
    throw new Error("Failed to update tips file.");
  }
}

export async function addTip(
  tip: BuildToolOrTip,
  filePath: string,
  index: number
): Promise<BuildToolOrTip[]> {
  const DEST_DIR = path.join(process.cwd(), "app/_data/news/sources/tips");

  try {
    // Ensure the destination directory exists
    if (!fs.existsSync(DEST_DIR)) {
      fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    // Generate the filename
    const date = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const slugifiedTitle = slugify(tip.title, { lower: true, strict: true });
    const fileName = `${slugifiedTitle}-${date}.json`;
    const filePathToWrite = path.join(DEST_DIR, fileName);

    // Write the tip data to the new file
    fs.writeFileSync(filePathToWrite, JSON.stringify(tip, null, 2), "utf8");
    console.log(`Tip approved and saved to: ${filePathToWrite}`);

    // Handle existing or new tips
    if (index === -1) {
      console.log("Adding new tip from scratch.");
      return JSON.parse(fs.readFileSync(filePath, "utf8")) as BuildToolOrTip[];
    } else {
      console.log("Approving existing tip.");
      const updatedData = await removeTip(filePath, index);
      return updatedData;
    }
  } catch (error) {
    console.error("Error approving tip:", error);
    throw new Error("Failed to approve and save the tip.");
  }
}

export async function getTips(): Promise<{ data: BuildToolOrTip[]; filePath: string }> {
  const TIPS_DIR = "secretsauce/data/news/tips";

  try {
    const files = fs.readdirSync(TIPS_DIR);

    const mostRecentFile = files
      .filter((file) => path.extname(file) === ".json")
      .map((file) => {
        const dateMatch = file.match(/-(\d{4}-\d{2}-\d{2})\.json$/);
        if (dateMatch) {
          const date = new Date(dateMatch[1]);
          return { file, date };
        }
        return null;
      })
      .filter((item): item is { file: string; date: Date } => item !== null)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .shift()?.file;

    if (!mostRecentFile) throw new Error("No recent file found.");

    const filePath = path.join(TIPS_DIR, mostRecentFile);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as BuildToolOrTip[];

    return { data, filePath };
  } catch (error) {
    console.error("Error reading tips files:", error);
    throw new Error("Failed to load tips data.");
  }
}
