"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useEffect, useState } from "react"

export function Footer() {
  const { t, language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <footer className="bg-gray-900 text-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-3 mb-6`}>
              <img src="/images/fishmeal-logo.png" alt="Bahr Al-Arab Logo" className="w-12 h-12 object-contain" />
              <div>
                <span className={`text-xl font-bold ${isRTL ? "font-arabic" : ""}`}>
                  {language === "ar" ? "بحر العرب" : "Bahr Al-Arab"}
                </span>
                <p className={`text-sm text-gray-300 mt-1 ${isRTL ? "font-arabic" : ""}`}>
                  {language === "ar" ? "مصنع العلف الحيواني المحدود" : "Fish Meal Factory L.L.C"}
                </p>
              </div>
            </div>
            <p className={`text-gray-300 mb-6 max-w-md leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
              {t("footerDescription")}
            </p>
            <div className={`flex ${isRTL ? "space-x-reverse" : ""} space-x-4`}>
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isRTL ? "text-right" : ""}`}>
            <h3 className={`text-lg font-semibold mb-6 ${isRTL ? "font-arabic" : ""}`}>{t("quickLinks")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className={`text-gray-300 hover:text-white transition-colors ${isRTL ? "font-arabic" : ""}`}>{t("about")}</Link>
              </li>
              <li>
                <Link href="/products" className={`text-gray-300 hover:text-white transition-colors ${isRTL ? "font-arabic" : ""}`}>{t("products")}</Link>
              </li>
              <li>
                <Link href="/news" className={`text-gray-300 hover:text-white transition-colors ${isRTL ? "font-arabic" : ""}`}>{t("news")}</Link>
              </li>
              <li>
                <Link href="/gallery" className={`text-gray-300 hover:text-white transition-colors ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "المعرض" : "Gallery"}</Link>
              </li>
              <li>
                <Link href="/contact" className={`text-gray-300 hover:text-white transition-colors ${isRTL ? "font-arabic" : ""}`}>{t("contact")}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`${isRTL ? "text-right" : ""}`}>
            <h3 className={`text-lg font-semibold mb-3 ${isRTL ? "font-arabic pr-2" : ""}`}>{t("contactInfo")}</h3>
            <div className="space-y-3">
              <div
                className={`flex items-start ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? "gap-x-3" : "gap-x-2"}`}
              >
                <Phone className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>M: +971 50 6356063</p>
                  <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>T: +971 6 7681152</p>
                  <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>F: +971 6 7681153</p>
                </div>
              </div>
              <div
                className={`flex items-start ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? "gap-x-3" : "gap-x-2"}`}
              >
                <Mail className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>bahr-alarab@hotmail.com</p>
              </div>
              <div
                className={`flex items-start ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? "gap-x-3" : "gap-x-2"}`}
              >
                <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>2138, Umm Al Quwain, U.A.E</p>
              </div>
              <div
                className={`flex items-start ${isRTL ? "flex-row-reverse" : ""} ${isRTL ? "gap-x-3" : "gap-x-2"}`}
              >
                <Globe className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <p className={`text-gray-300 text-sm ${isRTL ? "font-arabic" : ""}`}>www.fishmealuae.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className={`text-gray-400 ${isRTL ? "font-arabic" : ""}`}>
            © 2025 {language === "ar" ? "بحر العرب" : "Bahr Al-Arab"}.{" "}
            {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
        </div>
      </div>
    </footer>
  )
}
