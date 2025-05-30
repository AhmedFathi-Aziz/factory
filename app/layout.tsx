import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/hooks/use-language"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "Bahr Al-Arab | بحر العرب - Fish Meal Factory",
  description:
    "Leading fish meal powder manufacturer in the UAE specializing in high-quality animal feed meal from sardines and anchovies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
