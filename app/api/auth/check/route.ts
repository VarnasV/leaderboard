import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (token) {
    const user = mockUsers.find((u) => u.id === token)
    if (user) {
      return NextResponse.json({ authenticated: true, user: { id: user.id, email: user.email, name: user.name } })
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
