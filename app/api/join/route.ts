import { NextRequest, NextResponse } from "next/server"
import { Octokit } from '@octokit/rest';
import slugify from 'slugify';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

export async function POST(req: NextRequest) {
  try {
    const { captchaToken } = await req.json()

    if (!captchaToken) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!process.env.GITHUB_OWNER || !process.env.GITHUB_REPO || !process.env.GITHUB_TOKEN || !process.env.GITHUB_BOT || !process.env.GITHUB_BOT_EMAIL) {
      return NextResponse.json({ error: "Environment variables not configured" }, { status: 500 })
    }

    // Verify the reCAPTCHA token with Google
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    })

    const captchaValidation = await response.json()

    if (!captchaValidation.success) {
      return NextResponse.json({ error: "reCAPTCHA validation failed" }, { status: 400 })
    }

    // Parse the request body
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const timestamp = new Date().toISOString();
    const slug = slugify(name, { lower: true });
    const filename = `${timestamp}-${slug}.json`;
    const fileContent = JSON.stringify(req.body, null, 2);

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    try {
      const response = await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: `data/submissions/${filename}`,
        message: `Add submission for ${name}`,
        content: Buffer.from(fileContent).toString('base64'),
        committer: {
          name: process.env.GITHUB_BOT,
          email: process.env.GITHUB_BOT_EMAIL,
        },
        author: {
          name: process.env.GITHUB_BOT,
          email: process.env.GITHUB_BOT_EMAIL,
        },
      });

      return NextResponse.json({ message: 'Submission saved successfully', url: response?.data?.content?.html_url }, { status: 201 })
    } catch (error: unknown) {
      return NextResponse.json({ message: 'Failed to save submission', error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
