import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Access denied. This API is only available in a local development environment" }, { status: 403 });
  }

  const { action, ...data } = await req.json();

  if (!data) {
    return NextResponse.json({ error: "Invalid submission data." }, { status: 400 });
  }

  if (action === "approve") {
    try {
      const buildersFilePath = path.join(process.cwd(), "app/_data/builders.json");
      const buildersData = JSON.parse(fs.readFileSync(buildersFilePath, "utf8"));

      buildersData.push(data);
      fs.writeFileSync(buildersFilePath, JSON.stringify(buildersData, null, 2));

      return NextResponse.json({ error: "Submission approved and added successfully." }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  } else if (action === "reject") {
    // Handle rejection logic
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  
}
