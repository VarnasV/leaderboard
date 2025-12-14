export const mockUsers = [
  {
    id: "1",
    email: "admin@company.com",
    password: "password123",
    name: "Admin User",
  },
  {
    id: "2",
    email: "user@company.com",
    password: "password",
    name: "Test User",
  },
]

export function validateUser(email: string, password: string) {
  const user = mockUsers.find((u) => u.email === email && u.password === password)
  if (user) {
    return { id: user.id, email: user.email, name: user.name }
  }
  return null
}
