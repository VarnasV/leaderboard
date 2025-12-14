import { type NextRequest, NextResponse } from "next/server"
import { validateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = validateUser(email, password)

    if (user) {
      return NextResponse.json({
        success: true,
        user,
        token: user.id, // Simple token for demo purposes
      })
    } else {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
