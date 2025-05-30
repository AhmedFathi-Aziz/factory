"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Users, Fish, Home, Phone, Edit } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { AuthGuard } from "@/components/admin/auth-guard"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}

function DashboardContent() {
  const { language, isRTL } = useLanguage()

  const [counts, setCounts] = useState({ products: 0, news: 0, partners: 0 })

  useEffect(() => {
    async function fetchCounts() {
      const [productsRes, newsRes, partnersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/news"),
        fetch("/api/partners"),
      ])
      const [products, news, partners] = await Promise.all([
        productsRes.json(),
        newsRes.json(),
        partnersRes.json(),
      ])
      setCounts({
        products: Array.isArray(products) ? products.length : 0,
        news: Array.isArray(news) ? news.length : 0,
        partners: Array.isArray(partners) ? partners.length : 0,
      })
    }
    fetchCounts()
  }, [])

  const stats = [
    {
      title: "Products",
      titleAr: "المنتجات",
      value: counts.products,
      icon: Fish,
      color: "bg-emerald-500",
      href: "/admin/services",
    },
    {
      title: "News",
      titleAr: "الأخبار",
      value: counts.news,
      icon: MessageSquare,
      color: "bg-blue-500",
      href: "/admin/news",
    },
    {
      title: "Partners",
      titleAr: "الشركاء",
      value: counts.partners,
      icon: Users,
      color: "bg-orange-500",
      href: "/admin/partners",
    },
  ]

  const pageActions = [
    {
      title: "Edit Home Page",
      titleAr: "تحرير الصفحة الرئيسية",
      description: "Update hero section and content",
      descriptionAr: "تحديث القسم الرئيسي والمحتوى",
      href: "/admin/pages/home",
      icon: Home,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      title: "Edit About Page",
      titleAr: "تحرير صفحة من نحن",
      description: "Manage company information",
      descriptionAr: "إدارة معلومات الشركة",
      href: "/admin/pages/about",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Edit Contact Page",
      titleAr: "تحرير صفحة الاتصال",
      description: "Update contact details",
      descriptionAr: "تحديث تفاصيل الاتصال",
      href: "/admin/pages/contact",
      icon: Phone,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <div className={`space-y-6 sm:space-y-8 ${isRTL ? "rtl-spacing" : ""}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 sm:p-8 text-white">
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>
          {language === "ar" ? "مرحباً بك في لوحة تحكم بحر العرب" : "Welcome to Bahr Al-Arab Dashboard"}
        </h1>
        <p className={`text-emerald-100 text-sm sm:text-base ${isRTL ? "font-arabic" : ""}`}>
          {language === "ar"
            ? "إدارة محتوى موقع مصنع مسحوق السمك ومراقبة الأداء"
            : "Manage your fish meal factory website content and monitor performance"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <CardContent className={`p-4 sm:p-6 ${isRTL ? "rtl-padding" : ""}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-slate-600 mb-2 ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? stat.titleAr : stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Content Management */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-lg sm:text-xl text-slate-800 flex items-center ${isRTL ? "font-arabic" : ""}`}>
            <Edit className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-emerald-600`} />
            {language === "ar" ? "إدارة المحتوى" : "Content Management"}
          </CardTitle>
        </CardHeader>
        <CardContent className={`p-4 sm:p-6 ${isRTL ? "rtl-padding" : ""}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Manage Content */}
            {stats.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${item.color} mr-3`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className={`font-semibold text-slate-800 ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? `إدارة ${item.titleAr}` : `Manage ${item.title}`}
                    </h3>
                  </div>
                  <p className={`text-sm text-slate-600 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar"
                      ? `إضافة وتحرير وحذف ${item.titleAr}`
                      : `Add, edit and delete ${item.title.toLowerCase()}`}
                  </p>
                </div>
              </Link>
            ))}

            {/* Edit Pages */}
            {pageActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className={`font-semibold text-slate-800 ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? action.titleAr : action.title}
                    </h3>
                  </div>
                  <p className={`text-sm text-slate-600 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? action.descriptionAr : action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
