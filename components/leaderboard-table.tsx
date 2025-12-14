import type { Employee } from "@/lib/mock-data"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface LeaderboardTableProps {
  employees: Employee[]
  title: React.ReactNode
}

export function LeaderboardTable({ employees, title }: LeaderboardTableProps) {
  // OBDeleven brand colors
  const colors = {
    gold: '#FFB100',
    blue: '#004EFF',
    dark: '#111827'
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="relative w-8 h-8">
          <Image 
            src="/mascot-1st.png" 
            alt="1st Place" 
            fill
            className="object-contain"
          />
        </div>
      )
    }
    if (rank === 2) {
      return (
        <div className="relative w-7 h-7">
          <Image 
            src="/mascot-2nd.png" 
            alt="2nd Place" 
            fill
            className="object-contain"
          />
        </div>
      )
    }
    if (rank === 3) {
      return (
        <div className="relative w-6 h-6">
          <Image 
            src="/mascot-3rd.png" 
            alt="3rd Place" 
            fill
            className="object-contain"
          />
        </div>
      )
    }
    return null
  }

  const getRowStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-[#FFB100]/10 to-transparent border-l-4 border-[#FFB100]"
    if (rank === 2) return "bg-gradient-to-r from-[#004EFF]/10 to-transparent border-l-4 border-[#004EFF]"
    if (rank === 3) return "bg-gradient-to-r from-gray-900/5 to-transparent border-l-4 border-gray-900"
    return "hover:bg-gray-50 border-l-4 border-transparent"
  }

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 bg-gray-50 overflow-hidden font-sans">
      <div className="max-w-[70%] mx-auto w-full flex flex-col h-full">
        <CardHeader className="text-center pb-4 flex-shrink-0">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3 whitespace-nowrap">
            {title}
          </CardTitle>
        </CardHeader>

        <Card className="overflow-hidden flex-1 flex flex-col min-h-0 shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            {/* Header Row */}
            <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-100 bg-white/50 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div className="w-16 text-center">Rank</div>
              <div className="flex-1 pl-2">Employee</div>
              <div className="text-right pr-2">DVD</div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-2">
              {employees.map((employee, index) => (
                <div 
                  key={employee.id}
                  className={`
                    group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 
                    animate-in fade-in slide-in-from-bottom-2
                    ${getRowStyle(index + 1)}
                    ${index < 3 ? 'shadow-sm bg-white' : ''}
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Rank Section */}
                  <div className="flex items-center justify-center w-16 gap-2">
                    <span className={`text-2xl font-bold ${index < 3 ? 'scale-110' : 'text-gray-400'}`} style={{
                      color: index === 0 ? colors.gold : index === 1 ? colors.blue : index === 2 ? colors.dark : ''
                    }}>
                      {index + 1}
                    </span>
                    {index < 3 && getRankIcon(index + 1)}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative">
                      {index === 0 && <div className="absolute inset-0 bg-[#FFB100]/30 blur-lg rounded-full" />}
                      {index === 1 && <div className="absolute inset-0 bg-[#004EFF]/30 blur-lg rounded-full" />}
                      <Avatar className={`
                        w-12 h-12 border-2 relative z-10
                        ${index === 0 ? 'border-[#FFB100]' : index === 1 ? 'border-[#004EFF]' : index === 2 ? 'border-gray-900' : 'border-gray-100'}
                      `}>
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback className={`
                          font-bold text-lg
                          ${index === 0 ? 'bg-[#FFB100] text-black' : index === 1 ? 'bg-[#004EFF] text-white' : index === 2 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}
                        `}>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex flex-col min-w-0 justify-center">
                      <span className="text-lg font-bold text-gray-900 truncate group-hover:text-[#004EFF] transition-colors">
                        {employee.name}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right pr-4">
                    <div className="text-2xl font-bold text-gray-900 tracking-tight">
                      {employee.dvdScore.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}