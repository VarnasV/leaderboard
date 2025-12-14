"use client"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-xl bg-white grid lg:grid-cols-2">
        {/* Left side - Login form */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-black">Welcome back</h1>
              <p className="text-gray-600 text-sm md:text-lg">Login to your Employee Leaderboard account</p>
            </div>

            <LoginForm />
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden lg:flex items-center justify-center bg-black relative overflow-hidden">
          <Image
            src="/login-mascot.png"
            alt="Mascot"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
