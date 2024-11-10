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

  const { action, rejectReason, id, ...data } = await req.json();

  if (!id || !data) {
    return NextResponse.json({ error: "Invalid submission data." }, { status: 400 });
  }

  const pendingDir = path.join(process.cwd(), "data/submissions/pending");
  const approvedDir = path.join(process.cwd(), "data/submissions/approved");
  const rejectedDir = path.join(process.cwd(), "data/submissions/rejected");
  const pendingFilePath = path.join(pendingDir, `${id}.json`);
  const approvedFilePath = path.join(approvedDir, `${id}.json`);
  const rejectedFilePath = path.join(rejectedDir, `${id}.json`);

  if (action === "approve") {
    try {
      // Load and update builders.json
      const buildersFilePath = path.join(process.cwd(), "app/_data/builders.json");
      const buildersData = JSON.parse(fs.readFileSync(buildersFilePath, "utf8"));
      buildersData.push(data);

      fs.writeFileSync(buildersFilePath, JSON.stringify(buildersData, null, 2));

      // Ensure the approved directory exists
      if (!fs.existsSync(approvedDir)) {
        fs.mkdirSync(approvedDir, { recursive: true });
      }

      // Move the file from pending to approved
      fs.renameSync(pendingFilePath, approvedFilePath);

      return NextResponse.json(
        { message: "Submission approved and moved to approved directory", ok: true },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error approving submission:", error);
      return NextResponse.json({ error: "Error processing approval" }, { status: 500 });
    }
  } else if (action === "reject") {
    try {
      // Ensure the rejected directory exists
      if (!fs.existsSync(rejectedDir)) {
        fs.mkdirSync(rejectedDir, { recursive: true });
      }

      // Read the original data from the pending file, add rejectReason, and save it to rejected
      const submissionData = JSON.parse(fs.readFileSync(pendingFilePath, "utf8"));
      const updatedData = { ...submissionData, rejectReason };

      fs.writeFileSync(rejectedFilePath, JSON.stringify(updatedData, null, 2));

      // Remove the original pending file
      fs.unlinkSync(pendingFilePath);

      return NextResponse.json(
        { message: "Submission rejected and moved to rejected directory", ok: true },
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
