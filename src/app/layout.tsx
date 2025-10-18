import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rapid Sites',
  description: 'Multi-tenant website framework for small businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
