import { NextRequest, NextResponse } from "next/server"

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

export async function POST(req: NextRequest) {
  try {
    const { captchaToken } = await req.json()

    if (!captchaToken) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
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
    const { title, description, contact } = await req.json()

    if (!title || !description || !contact) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Process the form data (e.g., save to database)
    console.log("Form submitted:", { name, description })

    // Send a success response
    return NextResponse.json({ message: "Request submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
