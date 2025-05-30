"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Fish } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import Image from 'next/image'
import ImageSlider from '../components/ImageSlider'
import fs from 'fs';
import path from 'path';
import TickerSlider from '../components/TickerSlider'
import { motion, AnimatePresence } from "framer-motion"

interface Service {
  id: number
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  features: string[]
  featuresAr: string[]
  protein: string
  certifications: string[]
  certificationsAr: string[]
  status: "active" | "draft"
}

const initialServices: Service[] = [
  {
    id: 1,
    title: "Sardine Fish Meal",
    titleAr: "مسحوق سمك السردين",
    description:
      "Premium quality fish meal powder manufactured from fresh sardines with high protein content for optimal animal nutrition",
    descriptionAr: "مسحوق سمك عالي الجودة مصنوع من السردين الطازج بمحتوى بروتين عالي للتغذية المثلى للحيوانات",
    features: ["High Protein Content", "Steam Sterilized", "Natural Product", "Anti-Oxidant Preserved"],
    featuresAr: ["محتوى بروتين عالي", "معقم بالبخار", "منتج طبيعي", "محفوظ بمضاد الأكسدة"],
    protein: "60-55%",
    certifications: ["ISO Certified", "Export Quality"],
    certificationsAr: ["معتمد ISO", "جودة التصدير"],
    status: "active",
  },
  {
    id: 2,
    title: "Anchovy Fish Meal",
    titleAr: "مسحوق سمك الأنشوجة",
    description:
      "Superior grade fish meal powder produced from fresh anchovies with premium protein concentration for enhanced feed quality",
    descriptionAr: "مسحوق سمك درجة ممتازة مصنوع من الأنشوجة الطازجة بتركيز بروتين ممتاز لجودة علف محسنة",
    features: ["Premium Quality", "High Amino Acids", "Chemical-Free", "International Standards"],
    featuresAr: ["جودة ممتازة", "أحماض أمينية عالية", "خالي من الكيماويات", "معايير دولية"],
    protein: "70-64%",
    certifications: ["Export Grade", "Quality Assured"],
    certificationsAr: ["درجة التصدير", "مضمون الجودة"],
    status: "active",
  },
]

const parseProduct = (p: any) => ({
  ...p,
  features: Array.isArray(p.features) ? p.features : JSON.parse(p.features || '[]'),
  featuresAr: Array.isArray(p.featuresAr) ? p.featuresAr : JSON.parse(p.featuresAr || '[]'),
  certifications: Array.isArray(p.certifications) ? p.certifications : JSON.parse(p.certifications || '[]'),
  certificationsAr: Array.isArray(p.certificationsAr) ? p.certificationsAr : JSON.parse(p.certificationsAr || '[]'),
});

export default function ServicesPage() {
  const { language, isRTL } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    features: [],
    featuresAr: [],
    protein: "",
    certifications: [],
    certificationsAr: [],
    status: "active",
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch products from API on mount
  useEffect(() => {
    setLoading(true)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: any) => {
        setServices(data)
        setLoading(false)
      })
      .catch(() => {
        setError(language === "ar" ? "تعذر تحميل المنتجات" : "Failed to load products")
        setLoading(false)
      })
  }, [language])

  // Add or update product
  const handleSave = async () => {
    const payload = {
      ...formData,
      features: formData.features || [],
      featuresAr: formData.featuresAr || [],
      certifications: formData.certifications || [],
      certificationsAr: formData.certificationsAr || [],
    }
    try {
      let res, data: any
    if (editingService) {
        res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id, ...payload }),
        })
        data = await res.json()
        if (res.ok) {
          setServices((prev) => prev.map((s) => (s.id === editingService.id ? parseProduct(data) : s)))
      toast({
        title: language === "ar" ? "تم تحديث المنتج" : "Product Updated",
            description: language === "ar" ? "تم تحديث منتج مسحوق السمك بنجاح" : "Fish meal product has been successfully updated",
      })
    } else {
          throw new Error(data.error || "Update failed")
        }
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        data = await res.json()
        if (res.ok) {
          setServices((prev) => [...prev, parseProduct(data)])
      toast({
        title: language === "ar" ? "تم إضافة المنتج" : "Product Added",
            description: language === "ar" ? "تم إضافة منتج مسحوق السمك الجديد بنجاح" : "New fish meal product has been successfully added",
      })
        } else {
          throw new Error(data.error || "Create failed")
        }
    }
    setIsDialogOpen(false)
    setEditingService(null)
    resetForm()
    } catch (err: any) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  // Edit product
  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData(service)
    setIsDialogOpen(true)
  }

  // Delete product
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id))
    toast({
      title: language === "ar" ? "تم حذف المنتج" : "Product Deleted",
          description: language === "ar" ? "تم حذف منتج مسحوق السمك بنجاح" : "Fish meal product has been successfully deleted",
          variant: "destructive",
        })
      } else {
        const data = await res.json()
        throw new Error(data.error || "Delete failed")
      }
    } catch (err: any) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: err.message,
      variant: "destructive",
    })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      features: [],
      featuresAr: [],
      protein: "",
      certifications: [],
      certificationsAr: [],
      status: "active",
    })
  }

  const handleArrayInput = (field: keyof Service, value: string) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    setFormData({ ...formData, [field]: arrayValue })
  }

  if (loading) return <div className="text-center py-20 text-lg">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>

  const showEmpty = services.length === 0;

  const imagePaths = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg"
  ]

  return (
    <div className={`space-y-8 ${isRTL ? "rtl-spacing" : ""}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? "منتجات مسحوق السمك" : "Fish Meal Products"}
            </h1>
            <p className={`text-emerald-100 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar"
                ? "إدارة منتجات مسحوق السمك عالية الجودة والمواصفات"
                : "Manage your high-quality fish meal products and specifications"}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة منتج" : "Add Product"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingService
                    ? language === "ar"
                      ? "تحرير منتج مسحوق السمك"
                      : "Edit Fish Meal Product"
                    : language === "ar"
                      ? "إضافة منتج مسحوق السمك جديد"
                      : "Add New Fish Meal Product"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}
                    </label>
                    <Input
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={language === "ar" ? "عنوان المنتج بالإنجليزية" : "Product title in English"}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
                    </label>
                    <Input
                      value={formData.titleAr || ""}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                      placeholder={language === "ar" ? "عنوان المنتج بالعربية" : "Product title in Arabic"}
                      dir="rtl"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
                    </label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={language === "ar" ? "وصف المنتج بالإنجليزية" : "Product description in English"}
                      rows={4}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
                    </label>
                    <Textarea
                      value={formData.descriptionAr || ""}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      placeholder={language === "ar" ? "وصف المنتج بالعربية" : "Product description in Arabic"}
                      dir="rtl"
                      rows={4}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar"
                        ? "المميزات (إنجليزي) - مفصولة بفواصل"
                        : "Features (English) - Comma separated"}
                    </label>
                    <Textarea
                      value={formData.features?.join(", ") || ""}
                      onChange={(e) => handleArrayInput("features", e.target.value)}
                      placeholder="Feature 1, Feature 2, Feature 3"
                      rows={3}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "المميزات (عربي) - مفصولة بفواصل" : "Features (Arabic) - Comma separated"}
                    </label>
                    <Textarea
                      value={formData.featuresAr?.join(", ") || ""}
                      onChange={(e) => handleArrayInput("featuresAr", e.target.value)}
                      placeholder="ميزة 1, ميزة 2, ميزة 3"
                      dir="rtl"
                      rows={3}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "محتوى البروتين" : "Protein Content"}
                    </label>
                    <Input
                      value={formData.protein || ""}
                      onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                      placeholder="e.g., 60-55%"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الشهادات (إنجليزي)" : "Certifications (English)"}
                    </label>
                    <Input
                      value={formData.certifications?.join(", ") || ""}
                      onChange={(e) => handleArrayInput("certifications", e.target.value)}
                      placeholder="ISO, Export Quality"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الشهادات (عربي)" : "Certifications (Arabic)"}
                    </label>
                    <Input
                      value={formData.certificationsAr?.join(", ") || ""}
                      onChange={(e) => handleArrayInput("certificationsAr", e.target.value)}
                      placeholder="معتمد ISO, جودة التصدير"
                      dir="rtl"
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-300">
                    <X className="h-4 w-4 mr-2" />
                    <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إلغاء" : "Cancel"}</span>
                  </Button>
                  <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    <span className={isRTL ? "font-arabic" : ""}>
                      {language === "ar" ? "حفظ المنتج" : "Save Product"}
                    </span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Empty State */}
      {showEmpty ? (
        <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl shadow-inner">
          <Fish className="w-20 h-20 text-emerald-400 mb-8" />
          <h2 className={`text-3xl font-bold mb-3 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "لا توجد منتجات بعد" : "No products yet"}</h2>
          <p className={`text-gray-600 mb-8 text-lg ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "ابدأ بإضافة أول منتج لك." : "Start by adding your first product."}</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg rounded-xl shadow" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="h-5 w-5 mr-2" />
            <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة منتج" : "Add Product"}</span>
          </Button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-2xl transition-shadow duration-300 border-0 shadow-lg rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-t-2xl p-6 pb-4">
              <div className={`flex flex-row ${isRTL ? 'flex-row-reverse' : ''} justify-between items-start w-full gap-4`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <Fish className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className={`text-2xl text-slate-800 font-bold ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? service.titleAr : service.title}</CardTitle>
                    <p className={`text-sm text-slate-500 ${isRTL ? "font-arabic" : ""}`} dir={language === "ar" ? "rtl" : "ltr"}>{language === "ar" ? service.title : service.titleAr}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[70px]">
                  <Badge className="bg-emerald-100 text-emerald-700 font-bold text-base px-4 py-1 rounded-full shadow-sm">{service.protein}</Badge>
                  <Badge
                    variant={service.status === "active" ? "default" : "secondary"}
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${service.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
                  >
                    {language === "ar" ? (service.status === "active" ? "نشط" : "مسودة") : service.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <p className={`text-slate-600 text-base mb-6 line-clamp-3 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? service.descriptionAr : service.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold text-base text-slate-800 mb-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "المميزات:" : "Features:"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(language === "ar" ? service.featuresAr : service.features).slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-emerald-200 text-emerald-700 rounded-full px-3 py-1 bg-emerald-50">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 rounded-full px-3 py-1 bg-emerald-50">
                        +{service.features.length - 3} {language === "ar" ? "المزيد" : "more"}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold text-base text-slate-800 mb-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "الشهادات:" : "Certifications:"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(language === "ar" ? service.certificationsAr : service.certifications).map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700 rounded-full px-3 py-1 bg-green-50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-end gap-3 mt-8 pt-4 border-t border-slate-100`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(service)}
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-full px-4"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50 rounded-full px-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

    </div>
  )
}
