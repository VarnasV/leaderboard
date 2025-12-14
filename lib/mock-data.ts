export interface Employee {
  id: string
  name: string
  dvdScore: number
  avatar: string
}

// Mock employee data for demonstration
export const mockEmployeesThisMonth: Employee[] = [
  { id: "1", name: "Sarah Mitchell", dvdScore: 2847, avatar: "SM" },
  { id: "2", name: "James Rodriguez", dvdScore: 2635, avatar: "JR" },
  { id: "3", name: "Emily Chen", dvdScore: 2521, avatar: "EC" },
  { id: "4", name: "Michael Brown", dvdScore: 2398, avatar: "MB" },
  { id: "5", name: "Lisa Anderson", dvdScore: 2287, avatar: "LA" },
  { id: "6", name: "David Kim", dvdScore: 2156, avatar: "DK" },
  { id: "7", name: "Rachel Green", dvdScore: 2089, avatar: "RG" },
  { id: "8", name: "Tom Wilson", dvdScore: 1974, avatar: "TW" },
  { id: "9", name: "Anna Martinez", dvdScore: 1856, avatar: "AM" },
  { id: "10", name: "Chris Taylor", dvdScore: 1743, avatar: "CT" },
]

export const mockEmployeesLastMonth: Employee[] = [
  { id: "11", name: "James Rodriguez", dvdScore: 2912, avatar: "JR" },
  { id: "12", name: "Emily Chen", dvdScore: 2801, avatar: "EC" },
  { id: "13", name: "Michael Brown", dvdScore: 2654, avatar: "MB" },
]
