import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OBDeleven Leaderboard',
  description: 'OBDeleven Leaderboard',
  generator: 'v0.app',
  icons: {
    icon: '/mascot-3rd.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} style={{ fontFamily: "'Gilroy', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
