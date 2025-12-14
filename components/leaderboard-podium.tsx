import type { Employee } from "@/lib/types"
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
    <div className="h-full w-full flex flex-col items-center justify-center p-2 md:p-6 bg-gray-50 overflow-hidden font-sans">
      <div className="w-full max-w-7xl px-4 overflow-y-auto md:overflow-visible h-full flex flex-col justify-center">
        <CardHeader className="text-center pb-4 md:pb-12 flex-shrink-0">
          <CardTitle className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-2 md:gap-3">
            {title}
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-8 lg:gap-12 w-full pb-4 md:pb-0">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="order-2 md:order-1 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 relative z-10 w-full md:w-auto">
              {/* Profile Image */}
              <div className="flex justify-center mb-2 md:mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-[#004EFF]/30 blur-2xl"></div>
                <Avatar className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-2 md:border-4 border-white shadow-xl relative z-10 ring-2 md:ring-4 ring-[#004EFF]/20">
                  <AvatarImage src={top3[1].avatar} alt={top3[1].name} />
                  <AvatarFallback className="text-lg md:text-3xl font-bold text-white bg-[#004EFF]">
                    {top3[1].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 text-center mb-2 md:mb-6 truncate max-w-[300px] md:max-w-none md:overflow-visible md:whitespace-normal">
                {top3[1].name}
              </h3>
              
              {/* Box */}
              <div className="w-full max-w-[90%] md:max-w-none md:w-72 rounded-xl md:rounded-t-2xl bg-white p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,78,255,0.3)] border-t-4 border-[#004EFF] relative h-auto md:h-64 flex flex-col items-center md:justify-between justify-center gap-2 md:gap-4">
                <div className="absolute inset-0 bg-gradient-to-b from-[#004EFF]/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col md:flex-col items-center gap-2 md:pt-4 w-full">
                  <div className="flex flex-row items-center justify-center gap-4 md:flex-col md:gap-2">
                    <div className="relative w-8 h-8 md:w-12 md:h-12 order-1">
                      <Image 
                        src="/mascot-2nd.png" 
                        alt="2nd Place Mascot" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="text-4xl md:text-6xl font-black text-[#004EFF]/80 select-none order-2 md:order-3 leading-none flex items-center">
                      2
                    </div>
                  </div>

                  <span className="text-sm md:text-lg font-medium text-gray-600 order-3 md:order-2">
                    {top3[1].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="order-1 md:order-2 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-20 -mx-4 md:mx-0 w-full md:w-auto">
              {/* Profile Image */}
              <div className="flex justify-center mb-2 md:mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-[#FFB100]/30 blur-2xl"></div>
                <Avatar className="w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-4 border-white shadow-2xl relative z-10 ring-4 ring-[#FFB100]/20">
                  <AvatarImage src={top3[0].avatar} alt={top3[0].name} />
                  <AvatarFallback className="text-2xl md:text-4xl lg:text-5xl font-bold text-black bg-[#FFB100]">
                    {top3[0].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-2 md:mb-6 truncate max-w-[320px] md:max-w-none md:overflow-visible md:whitespace-normal">
                {top3[0].name}
              </h3>
              
              {/* Box */}
              <div className="w-full max-w-[95%] md:max-w-none md:w-80 lg:w-96 rounded-xl md:rounded-t-2xl bg-white p-4 md:p-8 shadow-[0_-15px_50px_-15px_rgba(255,177,0,0.4)] border-t-4 border-[#FFB100] relative h-auto md:h-80 flex flex-col items-center md:justify-between justify-center gap-2 md:gap-4">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFB100]/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col md:flex-col items-center gap-2 md:pt-6 w-full">
                  <div className="flex flex-row items-center justify-center gap-4 md:flex-col md:gap-3">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 order-1">
                      <Image 
                        src="/mascot-1st.png" 
                        alt="1st Place Mascot" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="text-5xl md:text-8xl font-black text-[#FFB100]/80 select-none order-2 md:order-3 leading-none flex items-center">
                      1
                    </div>
                  </div>

                  <span className="text-base md:text-xl font-medium text-gray-600 order-3 md:order-2">
                    {top3[0].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="order-3 md:order-3 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 relative z-10 w-full md:w-auto">
              {/* Profile Image */}
              <div className="flex justify-center mb-2 md:mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-gray-900/30 blur-2xl"></div>
                <Avatar className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-2 md:border-4 border-white shadow-xl relative z-10 ring-2 md:ring-4 ring-gray-900/20">
                  <AvatarImage src={top3[2].avatar} alt={top3[2].name} />
                  <AvatarFallback className="text-lg md:text-2xl md:text-3xl lg:text-4xl font-bold text-white bg-gray-900">
                    {top3[2].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name */}
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 text-center mb-2 md:mb-6 truncate max-w-[300px] md:max-w-none md:overflow-visible md:whitespace-normal">
                {top3[2].name}
              </h3>
              
              {/* Box */}
              <div className="w-full max-w-[90%] md:max-w-none md:w-72 rounded-xl md:rounded-t-2xl bg-white p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] border-t-4 border-gray-900 relative h-auto md:h-56 flex flex-col items-center md:justify-between justify-center gap-2 md:gap-4">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 flex flex-col md:flex-col items-center gap-2 md:pt-4 w-full">
                  <div className="flex flex-row items-center justify-center gap-4 md:flex-col md:gap-2">
                    <div className="relative w-8 h-8 md:w-12 md:h-12 order-1">
                      <Image 
                        src="/mascot-3rd.png" 
                        alt="3rd Place Mascot" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="text-4xl md:text-6xl font-black text-gray-900/80 select-none order-2 md:order-3 leading-none flex items-center">
                      3
                    </div>
                  </div>

                  <span className="text-sm md:text-lg font-medium text-gray-600 order-3 md:order-2">
                    {top3[2].dvdScore.toLocaleString()} DVD
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
