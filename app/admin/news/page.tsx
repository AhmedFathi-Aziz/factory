"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Calendar, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { AuthGuard } from "@/components/admin/auth-guard"
import { useLanguage } from "@/hooks/use-language"

interface NewsItem {
  id: number
  title: string
  titleAr: string
  content: string
  contentAr: string
  category: string
  categoryAr: string
  date: string
  featured: boolean
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "Bahr Al-Arab Expands Production Capacity to Meet Growing Regional Demand",
    titleAr: "بحر العرب يوسع الطاقة الإنتاجية لتلبية الطلب الإقليمي المتزايد",
    content:
      "Bahr Al-Arab Factory has successfully expanded its production capacity to 300 tons per month to meet the increasing demand for high-quality fish meal in the Middle East region.",
    contentAr:
      "نجح مصنع بحر العرب في توسيع طاقته الإنتاجية إلى 300 طن شهرياً لتلبية الطلب المتزايد على مسحوق السمك عالي الجودة في منطقة الشرق الأوسط.",
    category: "Expansion",
    categoryAr: "التوسع",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    title: "New Strategic Partnership with Leading Jordanian Feed Manufacturers",
    titleAr: "شراكة استراتيجية جديدة مع كبرى مصانع الأعلاف الأردنية",
    content:
      "We are pleased to announce our new partnership with major feed manufacturers in Jordan, strengthening our position in the regional market.",
    contentAr: "يسعدنا الإعلان عن شراكتنا الجديدة مع كبرى مصانع الأعلاف في الأردن، مما يعزز موقعنا في السوق الإقليمية.",
    category: "Partnership",
    categoryAr: "شراكة",
    date: "2024-01-10",
    featured: false,
  },
]

export default function NewsAdminPage() {
  return (
    <AuthGuard>
      <NewsContent />
    </AuthGuard>
  )
}

function NewsContent() {
  const { language } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: "",
    titleAr: "",
    content: "",
    contentAr: "",
    category: "",
    categoryAr: "",
    date: new Date().toISOString().split("T")[0],
    featured: false,
  })
  const { toast } = useToast()

  // Fetch news from API on mount
  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(() => {
        toast({
          title: "Failed to load news",
          variant: "destructive",
        })
      })
  }, [])

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [])

  const handleSave = async () => {
    try {
      let res, data: any
      if (editingNews) {
        res = await fetch("/api/news", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingNews.id, ...formData }),
        })
        data = await res.json()
        if (res.ok) {
          setNews((prev) => prev.map((n) => (n.id === editingNews.id ? data : n)))
          toast({
            title: "News Updated",
            description: "The news article has been successfully updated",
          })
        } else {
          throw new Error(data.error || "Update failed")
        }
      } else {
        res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        data = await res.json()
        if (res.ok) {
          setNews((prev) => [...prev, data])
          toast({
            title: "News Added",
            description: "New news article has been successfully added",
          })
        } else {
          throw new Error(data.error || "Create failed")
        }
      }
      setIsDialogOpen(false)
      setEditingNews(null)
      resetForm()
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item)
    setFormData(item)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n.id !== id))
        toast({
          title: "News Deleted",
          description: "The news article has been successfully deleted",
          variant: "destructive",
        })
      } else {
        const data = await res.json()
        throw new Error(data.error || "Delete failed")
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      titleAr: "",
      content: "",
      contentAr: "",
      category: "",
      categoryAr: "",
      date: new Date().toISOString().split("T")[0],
      featured: false,
    })
  }

  return (
    <div className={`space-y-8`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold mb-2`}>
              {language === "ar" ? "أخبار الشركة" : "Company News"}
            </h1>
            <p className={`text-blue-100`}>
              {language === "ar"
                ? "إدارة إعلانات الشركة وتحديثات الصناعة"
                : "Manage company announcements and industry updates"}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-blue-50" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                <span className={language === "ar" ? "font-arabic" : ""}>{language === "ar" ? "إضافة خبر" : "Add News"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingNews
                    ? language === "ar"
                      ? "تحرير المقال الإخباري"
                      : "Edit News Article"
                    : language === "ar"
                      ? "إضافة مقال إخباري جديد"
                      : "Add New News Article"}
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
                      placeholder={language === "ar" ? "عنوان الخبر بالإنجليزية" : "News title in English"}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
                    </label>
                    <Input
                      value={formData.titleAr || ""}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                      placeholder={language === "ar" ? "عنوان الخبر بالعربية" : "News title in Arabic"}
                      dir="rtl"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "المحتوى (إنجليزي)" : "Content (English)"}
                    </label>
                    <Textarea
                      value={formData.content || ""}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder={language === "ar" ? "محتوى الخبر بالإنجليزية" : "News content in English"}
                      rows={6}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "المحتوى (عربي)" : "Content (Arabic)"}
                    </label>
                    <Textarea
                      value={formData.contentAr || ""}
                      onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
                      placeholder={language === "ar" ? "محتوى الخبر بالعربية" : "News content in Arabic"}
                      dir="rtl"
                      rows={6}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الفئة (إنجليزي)" : "Category (English)"}
                    </label>
                    <Input
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Partnership"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الفئة (عربي)" : "Category (Arabic)"}
                    </label>
                    <Input
                      value={formData.categoryAr || ""}
                      onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                      placeholder="e.g., شراكة"
                      dir="rtl"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "التاريخ" : "Date"}
                    </label>
                    <Input
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-blue-300"
                  />
                  <label
                    htmlFor="featured"
                    className={`text-sm font-medium text-slate-700 ${language === "ar" ? "font-arabic" : ""}`}
                  >
                    {language === "ar" ? "مقال مميز" : "Featured Article"}
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-300">
                    <X className="h-4 w-4 mr-2" />
                    <span className={language === "ar" ? "font-arabic" : ""}>{language === "ar" ? "إلغاء" : "Cancel"}</span>
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    <span className={language === "ar" ? "font-arabic" : ""}>{language === "ar" ? "حفظ الخبر" : "Save News"}</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {news.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow duration-300 border-0 shadow rounded-2xl bg-white">
            <CardHeader className="bg-white rounded-t-2xl p-6 pb-4">
              <div className={`flex flex-row ${language === "ar" ? 'flex-row-reverse' : ''} justify-between items-start w-full gap-4 mb-2`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 mt-1 rounded-full px-3 py-1 bg-blue-50">
                      {language === "ar" ? (
                        <span>{item.categoryAr}</span>
                      ) : (
                        <span>{item.category}</span>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardTitle className={`text-xl leading-tight text-slate-800 font-bold ${language === "ar" ? "font-arabic" : ""}`}>
                <h2 className="text-xl font-semibold">
                  {language === "ar" ? (
                    <span>{item.titleAr}</span>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </h2>
              </CardTitle>
              <p className={`text-sm text-slate-500 mt-2 ${language === "ar" ? "font-arabic" : ""}`} dir={language === "ar" ? "rtl" : "ltr"}>
                {language === "ar" ? (
                  <span>{item.contentAr}</span>
                ) : (
                  <span>{item.content}</span>
                )}
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <div className={`flex ${language === "ar" ? 'flex-row-reverse' : ''} justify-end gap-3 mt-8 pt-4 border-t border-slate-100`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full px-4"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50 rounded-full px-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
