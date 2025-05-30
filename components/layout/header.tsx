"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/hooks/use-language"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, isRTL } = useLanguage()

  const navigation = [
    { name: "Home", nameAr: "الرئيسية", href: "/" },
    { name: "About", nameAr: "من نحن", href: "/about" },
    { name: "Products", nameAr: "منتجاتنا", href: "/products" },
    { name: "Gallery", nameAr: "المعرض", href: "/gallery" },
    { name: "News", nameAr: "الأخبار", href: "/news" },
    { name: "Contact", nameAr: "اتصل بنا", href: "/contact" },
  ]

  return (
    <header
      className="fixed top-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 py-2 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-shrink-0">
            <img
              src="/images/fishmeal-logo.png"
              alt="Bahr Al-Arab Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span
                className={`text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate ${isRTL ? "font-arabic" : ""}`}
              >
                {language === "ar" ? "مصنع بحر العرب" : "Bahr Al-Arab Factory"}
              </span>
              <span className={`text-xs sm:text-sm text-gray-600 truncate ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "لإنتاج العلف الحيواني ذ.م.م" : "For Animal Feed Meal L.L.C."}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-slate-700 transition-colors duration-200 font-medium px-2 xl:px-3 py-2 text-sm xl:text-base animate-fade-in hover-lift ${isRTL ? "font-arabic" : ""}`}
              >
                {language === "ar" ? item.nameAr : item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-slate-700 transition-colors duration-200 font-medium px-4 py-3 ${isRTL ? "font-arabic" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "ar" ? item.nameAr : item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
