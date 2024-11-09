import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import slugify from "slugify";
import { builderSchema, FormData } from "@/app/_types";
import { z } from "zod";
import { verifyCaptcha } from "@/app/_actions";

// Env vars check
const { GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN, GITHUB_BOT, GITHUB_BOT_EMAIL, RECAPTCHA_SECRET_KEY } = process.env;
const hasRequiredEnvVars = GITHUB_OWNER && GITHUB_REPO && GITHUB_TOKEN && GITHUB_BOT && GITHUB_BOT_EMAIL && RECAPTCHA_SECRET_KEY;
if (!hasRequiredEnvVars) {
  throw new Error("Required environment variables are not configured.");
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    if (!hasRequiredEnvVars) {
      return NextResponse.json({ error: "Required environment variables are not configured." }, { status: 500 });
    }

    // Validate and parse request data using Zod
    const { captchaToken, ...builderData } = requestData;
    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha token is missing" }, { status: 400 });
    }
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json({ error: "reCAPTCHA validation failed" }, { status: 400 });
    }

    const validatedData = builderSchema.parse(builderData);
    console.log({ builderData, validatedData });
    const { name } = validatedData as FormData;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const timestamp = new Date().getTime();
    const slug = slugify(name, { lower: true });
    const filename = `data/submissions/${timestamp}-${slug}.json`;
    const fileContent = JSON.stringify(validatedData, null, 2);

    // Commit JSON file for submission data to GitHub directory
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: filename,
      message: `Add submission for ${name}`,
      content: Buffer.from(fileContent).toString("base64"),
      committer: {
        name: GITHUB_BOT,
        email: GITHUB_BOT_EMAIL,
      },
      author: {
        name: GITHUB_BOT,
        email: GITHUB_BOT_EMAIL,
      },
    });

    if (response?.data?.content?.html_url) {
      return NextResponse.json(
        { message: "Submission saved successfully", url: response.data.content.html_url },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: `Failed to save submission, ${response.data}` }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }

    console.error("Error processing form submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
