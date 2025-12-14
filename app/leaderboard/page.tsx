"use client"

import { useState, useEffect } from "react"
import { LeaderboardPodium } from "@/components/leaderboard-podium"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ObdelevenLogo } from "@/components/obdeleven-logo"
import { createClient } from "@/lib/supabase/client"

const SLIDE_DURATION = 15000 // 15 seconds per slide

interface Employee {
  id: string
  name: string
  dvdScore: number
  avatar: string
}

export default function LeaderboardPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [employeesThisMonth, setEmployeesThisMonth] = useState<Employee[]>([])
  const [employeesLastMonth, setEmployeesLastMonth] = useState<Employee[]>([])
  const router = useRouter()
  const supabase = createClient()

  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })

  const slides = [
    {
      component: (
        <LeaderboardPodium 
          employees={employeesThisMonth} 
          title={
            <div className="flex flex-col items-center justify-center mb-10">
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
          employees={employeesThisMonth} 
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
          employees={employeesLastMonth} 
          title={
            <div className="flex flex-col items-center justify-center mb-10">
            <ObdelevenLogo className="h-8 md:h-12 w-auto inline-block mx-3 text-black mb-5" />
            Top 3 App Users  {lastMonth}
          </div>
          } 
        />
      ),
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          router.push("/login")
          return
        }
        
        setIsAuthenticated(true)

        // Fetch employees
        const { data: employees, error: dbError } = await supabase
          .from('employees')
          .select('*')

        if (dbError) {
          console.error("Error fetching employees:", dbError)
          return
        }

        if (employees) {
          // Map to local interface
          const formattedEmployeesThisMonth = employees
            .map(e => ({
              id: e.id,
              name: e.name,
              dvdScore: e.dvd_score || 0,
              avatar: e.avatar
            }))
            .sort((a, b) => b.dvdScore - a.dvdScore)

          setEmployeesThisMonth(formattedEmployeesThisMonth)

          const formattedEmployeesLastMonth = employees
            .filter(e => e.last_month_dvd_score && e.last_month_dvd_score > 0)
            .map(e => ({
              id: e.id,
              name: e.name,
              dvdScore: e.last_month_dvd_score || 0,
              avatar: e.avatar
            }))
            .sort((a, b) => b.dvdScore - a.dvdScore)

          setEmployeesLastMonth(formattedEmployeesLastMonth)
        }

      } catch (error) {
        console.error("Error:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
      router.refresh()
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