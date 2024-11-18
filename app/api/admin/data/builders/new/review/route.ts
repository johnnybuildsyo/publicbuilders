import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Access denied. This API is only available in a local development environment" },
      { status: 403 }
    );
  }

  const { action, id, ...data } = await req.json();

  if (!action || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  
  if (!data) {
    return NextResponse.json({ error: "Invalid submission data." }, { status: 400 });
  }

  const sourceFile = path.join(process.cwd(), "secretsauce/data/builders/new", id + ".json");

  const deleteFile = () => {
    if (fs.existsSync(sourceFile)) {
      fs.unlinkSync(sourceFile);
      console.log(`File deleted: ${sourceFile}`);
    } else {
      console.warn(`File not found: ${sourceFile}`);
    }
  };

  if (action === "approve") {
    try {
      // Load and update builders.json
      const buildersFilePath = path.join(process.cwd(), "app/_data/builders.json");
      const buildersData = JSON.parse(fs.readFileSync(buildersFilePath, "utf8"));
      buildersData.push(...data);

      fs.writeFileSync(buildersFilePath, JSON.stringify(buildersData, null, 2));

      // Delete the file after approval
      deleteFile();

      return NextResponse.json(
        { message: "Submission approved", ok: true },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error approving submission:", error);
      return NextResponse.json({ error: "Error processing approval" }, { status: 500 });
    }
  } else if (action === "reject") {
    try {
      // Delete the file after rejection
      deleteFile();

      return NextResponse.json(
        { message: "Submission rejected and deleted", ok: true },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error rejecting submission:", error);
      return NextResponse.json({ error: "Error processing rejection" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}
