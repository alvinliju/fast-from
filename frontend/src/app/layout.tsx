import { type Metadata } from 'next'
import { Toaster } from "@/components/ui/sonner"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FastForm - Forms that don\'t suck',
  description: 'Create beautiful, mobile-first forms with a Notion-style editor. Better than Google Forms.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}