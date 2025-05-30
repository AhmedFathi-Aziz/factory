"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { AuthGuard } from "@/components/admin/auth-guard"

export default function HomeAdminPage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  )
}

function HomeContent() {
  const { language, isRTL } = useLanguage()
  const { toast } = useToast()

  const [homeData, setHomeData] = useState({
    heroTitle: "Leading Fish Meal Manufacturer in the UAE",
    heroTitleAr: "الشركة الرائدة في تصنيع مسحوق السمك في دولة الإمارات",
    heroSubtitle: "Producing high-quality fish meal powder from sardines and anchovies for animal feed industry",
    heroSubtitleAr: "إنتاج مسحوق السمك عالي الجودة من السردين والأنشوجة لصناعة العلف الحيواني",
    heroDescription:
      "Bahr Al-Arab Factory specializes in manufacturing premium fish meal with 60-70% protein content, serving the Middle East and North Africa region with a production capacity of 200-300 tons per month.",
    heroDescriptionAr:
      "يختص مصنع بحر العرب في تصنيع مسحوق السمك الممتاز بمحتوى بروتين 60-70%، خدمة منطقة الشرق الأوسط وشمال أفريقيا بطاقة إنتاجية 200-300 طن شهرياً.",
  })

  const handleSave = () => {
    // Here you would typically save to a database or API
    toast({
      title: language === "ar" ? "تم الحفظ بنجاح" : "Saved Successfully",
      description: language === "ar" ? "تم تحديث الصفحة الرئيسية" : "Home page has been updated",
    })
  }

  return (
    <div className={`space-y-6 ${isRTL ? "rtl-spacing" : ""}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center">
          <Home className={`h-6 w-6 ${isRTL ? "ml-3" : "mr-3"}`} />
          <div>
            <h1 className={`text-2xl font-bold ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? "تحرير الصفحة الرئيسية" : "Edit Home Page"}
            </h1>
            <p className={`text-emerald-100 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? "تحديث محتوى القسم الرئيسي" : "Update hero section content"}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section Editor */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-xl text-slate-800 ${isRTL ? "font-arabic" : ""}`}>
            {language === "ar" ? "القسم الرئيسي" : "Hero Section"}
          </CardTitle>
        </CardHeader>
        <CardContent className={`space-y-6 ${isRTL ? "rtl-padding" : ""}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "العنوان الرئيسي (إنجليزي)" : "Hero Title (English)"}
              </Label>
              <Input
                value={homeData.heroTitle}
                onChange={(e) => setHomeData({ ...homeData, heroTitle: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "العنوان الرئيسي (عربي)" : "Hero Title (Arabic)"}
              </Label>
              <Input
                value={homeData.heroTitleAr}
                onChange={(e) => setHomeData({ ...homeData, heroTitleAr: e.target.value })}
                className="mt-2"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "العنوان الفرعي (إنجليزي)" : "Hero Subtitle (English)"}
              </Label>
              <Textarea
                value={homeData.heroSubtitle}
                onChange={(e) => setHomeData({ ...homeData, heroSubtitle: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "العنوان الفرعي (عربي)" : "Hero Subtitle (Arabic)"}
              </Label>
              <Textarea
                value={homeData.heroSubtitleAr}
                onChange={(e) => setHomeData({ ...homeData, heroSubtitleAr: e.target.value })}
                className="mt-2"
                rows={3}
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
              </Label>
              <Textarea
                value={homeData.heroDescription}
                onChange={(e) => setHomeData({ ...homeData, heroDescription: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label className={`text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
              </Label>
              <Textarea
                value={homeData.heroDescriptionAr}
                onChange={(e) => setHomeData({ ...homeData, heroDescriptionAr: e.target.value })}
                className="mt-2"
                rows={4}
                dir="rtl"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
              <Save className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "حفظ التغييرات" : "Save Changes"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
