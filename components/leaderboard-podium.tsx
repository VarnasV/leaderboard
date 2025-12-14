import type { Employee } from "@/lib/mock-data"
import { Trophy } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface LeaderboardPodiumProps {
  employees: Employee[]
  title: React.ReactNode
}

export function LeaderboardPodium({ employees, title }: LeaderboardPodiumProps) {
  const top3 = employees.slice(0, 3)
  
  const places = [1, 2, 3]
  // OBDeleven brand colors: Blue #004EFF, Yellow #FFB100, Cyan #00C8F0
  const accentColors = ['#FFB100', '#004EFF', '#111827'] // Gold, Blue, Black/Dark

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-6 bg-gray-50 overflow-hidden font-sans">
      <div className="w-full max-w-7xl px-4">
        <CardHeader className="text-center pb-8 md:pb-12">
          <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3">
            {title}
          </CardTitle>
        </CardHeader>

        <div className="flex items-end justify-center gap-4 md:gap-8 lg:gap-12 w-full">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 relative z-10">
              {/* Profile Image */}
              <div className="flex justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-[#004EFF]/30 blur-2xl"></div>
                <Avatar className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-xl relative z-10 ring-4 ring-[#004EFF]/20">
                  <AvatarImage src={top3[1].avatar} alt={top3[1].name} />
                  <AvatarFallback className="text-3xl font-bold text-white bg-[#004EFF]">
                    {top3[1].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 truncate max-w-[200px]">
                {top3[1].name}
              </h3>
              
              {/* Box */}
              <div className="w-60 md:w-72 rounded-t-2xl bg-white p-6 shadow-[0_-10px_40px_-15px_rgba(0,78,255,0.3)] border-t-4 border-[#004EFF] relative h-64 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-b from-[#004EFF]/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-2 pt-4">
                  <div className="relative w-12 h-12">
                    <Image 
                      src="/mascot-2nd.png" 
                      alt="2nd Place Mascot" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-600">
                    {top3[1].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
                
                <div className="relative z-10 text-center pb-4">
                  <div className="text-6xl font-black text-[#004EFF]/80 select-none">
                    2
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-20 -mx-4 md:mx-0">
              {/* Profile Image */}
              <div className="flex justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-[#FFB100]/30 blur-2xl"></div>
                <Avatar className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-4 border-white shadow-2xl relative z-10 ring-4 ring-[#FFB100]/20">
                  <AvatarImage src={top3[0].avatar} alt={top3[0].name} />
                  <AvatarFallback className="text-4xl lg:text-5xl font-bold text-black bg-[#FFB100]">
                    {top3[0].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 truncate max-w-[240px]">
                {top3[0].name}
              </h3>
              
              {/* Box */}
              <div className="w-72 md:w-80 lg:w-96 rounded-t-2xl bg-white p-8 shadow-[0_-15px_50px_-15px_rgba(255,177,0,0.4)] border-t-4 border-[#FFB100] relative h-80 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFB100]/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-3 pt-6">
                  <div className="relative w-16 h-16">
                    <Image 
                      src="/mascot-1st.png" 
                      alt="1st Place Mascot" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-medium text-gray-600">
                    {top3[0].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
                
                <div className="relative z-10 text-center pb-6">
                  <div className="text-8xl font-black text-[#FFB100]/80 select-none">
                    1
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 relative z-10">
              {/* Profile Image */}
              <div className="flex justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-gray-900/30 blur-2xl"></div>
                <Avatar className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-white shadow-xl relative z-10 ring-4 ring-gray-900/20">
                  <AvatarImage src={top3[2].avatar} alt={top3[2].name} />
                  <AvatarFallback className="text-2xl md:text-3xl lg:text-4xl font-bold text-white bg-gray-900">
                    {top3[2].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 truncate max-w-[200px]">
                {top3[2].name}
              </h3>
              
              {/* Box */}
              <div className="w-60 md:w-72 rounded-t-2xl bg-white p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t-4 border-gray-900 relative h-56 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-2 pt-4">
                  <div className="relative w-12 h-12">
                    <Image 
                      src="/mascot-3rd.png" 
                      alt="3rd Place Mascot" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-600">
                    {top3[2].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
                
                <div className="relative z-10 text-center pb-4">
                  <div className="text-6xl font-black text-gray-900/80 select-none">
                    3
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}