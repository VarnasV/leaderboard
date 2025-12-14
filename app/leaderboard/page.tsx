"use client"

import { useState, useEffect } from "react"
import { LeaderboardPodium } from "@/components/leaderboard-podium"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { mockEmployeesThisMonth, mockEmployeesLastMonth } from "@/lib/mock-data"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ObdelevenLogo } from "@/components/obdeleven-logo"

const SLIDE_DURATION = 15000 // 15 seconds per slide

export default function LeaderboardPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })

  const slides = [
    {
      component: (
        <LeaderboardPodium 
          employees={mockEmployeesThisMonth} 
          title={
            <div className="flex flex-col items-center justify-center">
              <ObdelevenLogo className="h-8 md:h-12 w-auto inline-block mx-3 text-black mb-5" />
              Top 3 App Users  {currentMonth}
            </div>
          } 
        />
      ),
    },
    {
      component: (
        <LeaderboardTable 
          employees={mockEmployeesThisMonth} 
          title={
            <div className="flex flex-col items-center justify-center mb-10">
            <ObdelevenLogo className="h-8 md:h-12 w-auto inline-block mx-3 text-black mb-5" />
              App Users Leaderboard ({currentMonth})
            </div>
          } 
        />
      ),
    },
    {
      component: (
        <LeaderboardPodium 
          employees={mockEmployeesLastMonth} 
          title={
            <div className="flex flex-col items-center justify-center">
            <ObdelevenLogo className="h-8 md:h-12 w-auto inline-block mx-3 text-black mb-5" />
            Top 3 App Users  {lastMonth}
          </div>
          } 
        />
      ),
    },
  ]

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token")

        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("auth-token")
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("auth-token")
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleLogout = async () => {
    try {
      localStorage.removeItem("auth-token")
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#004EFF] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2"
      >
        <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
        <span className="text-xs md:text-sm">Logout</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 z-50 flex gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-gray-200">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-[#004EFF] w-6 h-1.5 md:w-8 md:h-2" 
                : "bg-gray-300 w-1.5 h-1.5 md:w-2 md:h-2 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 translate-x-0" 
              : index < currentSlide 
                ? "opacity-0 -translate-x-4 pointer-events-none" 
                : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          {slide.component}
        </div>
      ))}
    </div>
  )
}