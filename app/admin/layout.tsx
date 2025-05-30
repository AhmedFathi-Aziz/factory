"use client"

import type React from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { useLanguage } from "@/hooks/use-language"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isRTL } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
      <div className={`min-h-screen ${pathname === "/admin/login" ? "bg-white" : "bg-emerald-50"} ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        {pathname !== "/admin/login" && <AdminHeader />}
        <main className="pt-16 sm:pt-20 px-3 sm:px-4 lg:px-6 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
  )
}
