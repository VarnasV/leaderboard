export interface Employee {
  id: string
  name: string
  dvdScore: number
  avatar: string
  department: string
}

// Mock employee data for demonstration
export const mockEmployeesThisMonth: Employee[] = [
  { id: "1", name: "Sarah Mitchell", dvdScore: 2847, avatar: "SM", department: "Engineering" },
  { id: "2", name: "James Rodriguez", dvdScore: 2635, avatar: "JR", department: "Product" },
  { id: "3", name: "Emily Chen", dvdScore: 2521, avatar: "EC", department: "Design" },
  { id: "4", name: "Michael Brown", dvdScore: 2398, avatar: "MB", department: "Engineering" },
  { id: "5", name: "Lisa Anderson", dvdScore: 2287, avatar: "LA", department: "Marketing" },
  { id: "6", name: "David Kim", dvdScore: 2156, avatar: "DK", department: "Sales" },
  { id: "7", name: "Rachel Green", dvdScore: 2089, avatar: "RG", department: "Engineering" },
  { id: "8", name: "Tom Wilson", dvdScore: 1974, avatar: "TW", department: "Product" },
  { id: "9", name: "Anna Martinez", dvdScore: 1856, avatar: "AM", department: "Design" },
  { id: "10", name: "Chris Taylor", dvdScore: 1743, avatar: "CT", department: "Engineering" },
]

export const mockEmployeesLastMonth: Employee[] = [
  { id: "11", name: "James Rodriguez", dvdScore: 2912, avatar: "JR", department: "Product" },
  { id: "12", name: "Emily Chen", dvdScore: 2801, avatar: "EC", department: "Design" },
  { id: "13", name: "Michael Brown", dvdScore: 2654, avatar: "MB", department: "Engineering" },
]
