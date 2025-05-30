"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, User, Home } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/hooks/use-language"

const navigation = [
  { name: "Dashboard", nameAr: "لوحة التحكم", href: "/admin" },
  { name: "Products", nameAr: "المنتجات", href: "/admin/services" },
  { name: "News", nameAr: "الأخبار", href: "/admin/news" },
  { name: "About", nameAr: "من نحن", href: "/admin/pages/about" },
  { name: "Contact", nameAr: "اتصل بنا", href: "/admin/pages/contact" },
]

export function AdminHeader() {
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()
  const router = useRouter()

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  return (
    <header
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-emerald-200 shadow-sm z-50 transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-shrink-0 gap-2">
            <img
              src="/images/fishmeal-logo.png"
              alt="Bahr Al-Arab Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1
                className={`text-base sm:text-lg font-bold text-slate-800 transition-colors duration-200 truncate leading-tight ${isRTL ? "font-arabic" : ""}`}
                style={{ marginBottom: '0.1rem' }}
              >
                {language === "ar" ? "بحر العرب" : "Bahr Al-Arab"}
              </h1>
              <span
                className={`text-xs sm:text-sm text-emerald-700 transition-opacity duration-200 truncate leading-none ${isRTL ? "font-arabic" : ""}`}
                style={{ opacity: 0.85, fontWeight: 500 }}
              >
                {language === "ar" ? "لوحة التحكم" : "Admin Dashboard"}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={`transition-all duration-200 hover:scale-105 ${
                    pathname === item.href
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800 hover:bg-emerald-50"
                  } ${isRTL ? "font-arabic" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {language === "ar" ? item.nameAr : item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <LanguageSwitcher />

            <Link href="/" target="_blank" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <Home className="h-4 w-4 mr-2 transition-transform duration-200" />
                <span className={`hidden md:inline ${isRTL ? "font-arabic" : ""}`}>
                  {language === "ar" ? "عرض الموقع" : "View Website"}
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-110 hover:bg-slate-100"
            >
              <Bell className="h-4 w-4 transition-transform duration-200" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-110 hover:bg-slate-100"
                >
                  <User className="h-4 w-4 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="transition-all duration-200">
                <DropdownMenuItem
                  className={`transition-colors duration-150 hover:bg-slate-50 ${isRTL ? "font-arabic" : ""}`}
                >
                  <User className="h-4 w-4 mr-2" />
                  {language === "ar" ? "الملف الشخصي" : "Profile"}
                </DropdownMenuItem>
                {isLoggedIn && (
                <DropdownMenuItem
                  className={`transition-colors duration-150 hover:bg-slate-50 ${isRTL ? "font-arabic" : ""}`}
                    onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {language === "ar" ? "تسجيل الخروج" : "Logout"}
                </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-emerald-200 py-2 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={`transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                    pathname === item.href
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "text-slate-600 hover:text-slate-800 hover:bg-emerald-50"
                  } ${isRTL ? "font-arabic" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {language === "ar" ? item.nameAr : item.name}
                </Button>
              </Link>
            ))}
            <Link href="/" target="_blank" className="sm:hidden">
              <Button
                variant="outline"
                size="sm"
                className={`border-emerald-200 text-emerald-600 hover:bg-emerald-50 whitespace-nowrap ${isRTL ? "font-arabic" : ""}`}
              >
                <Home className="h-4 w-4 mr-2" />
                {language === "ar" ? "عرض الموقع" : "View Website"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
