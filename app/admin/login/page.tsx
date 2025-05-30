"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, User, Plus, Fish, Trash2, Save, X, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { AuthGuard } from "@/components/admin/auth-guard"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, password }),
    })
    const text = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Optionally log or handle the error
    }
    setLoading(false)
    if (res.ok) {
      localStorage.setItem("token", data.token)
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        })
        router.push("/admin")
      } else {
      setError(data.error || "Login failed")
      }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-professional-xl border-0 bg-white">
        <CardHeader className="text-center pb-8">
          <img src="/images/fishmeal-logo.png" alt="Bahr Al-Arab Logo" className="w-16 h-16 object-contain rounded-2xl mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
          <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-600 mb-2">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            {/* Demo credentials label removed as requested */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProductsList() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [language, setLanguage] = useState("en")
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError("")
    fetch("/api/products")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products")
        return res.json()
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        setError(language === "ar" ? "تعذر تحميل المنتجات" : "Failed to load products")
        setLoading(false)
      })
  }, [language])

  const resetForm = () => {
    // Reset form logic here if needed
    setIsDialogOpen(true)
  }

  if (loading) return <div className="text-center py-20 text-lg">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
  if (error) return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="text-red-600 mb-4">{error}</div>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={resetForm}>
        <Plus className="h-4 w-4 mr-2" />
        <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة منتج" : "Add Product"}</span>
      </Button>
    </div>
  )

  const showEmpty = products.length === 0

  return (
    <>
      {showEmpty ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Fish className="w-16 h-16 text-emerald-400 mb-6" />
          <h2 className={`text-2xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "لا توجد منتجات بعد" : "No products yet"}</h2>
          <p className={`text-gray-600 mb-6 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "ابدأ بإضافة أول منتج لك." : "Start by adding your first product."}</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={resetForm}>
            <Plus className="h-4 w-4 mr-2" />
            <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة منتج" : "Add Product"}</span>
          </Button>
        </div>
      ) : (
        <div>
          {/* Replace this with your products grid */}
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mb-4" onClick={resetForm}>
            <Plus className="h-4 w-4 mr-2" />
            <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة منتج" : "Add Product"}</span>
          </Button>
          <ul>
            {products.map((product, idx) => (
              <li key={product.id || idx}>{product.title || product.titleAr}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export function NewsAdminPage() {
  return (
    <AuthGuard>
      <NewsContent />
    </AuthGuard>
  )
}

function NewsContent() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<any | null>(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(setNews)
  }, [])

  const resetForm = () => {
    setIsDialogOpen(true)
    setEditingNews(null)
    setFormData({})
  }

  const handleSave = async () => {
    const method = editingNews ? "PUT" : "POST"
    const url = "/api/news"
    const payload = editingNews ? { ...formData, id: editingNews.id } : formData
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      if (editingNews) {
        setNews(news.map(n => n.id === data.id ? data : n))
      } else {
        setNews([...news, data])
      }
      setIsDialogOpen(false)
      setEditingNews(null)
      resetForm()
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ id })
    })
    if (res.ok) setNews(news.filter(n => n.id !== id))
  }

  // ...rest of your NewsContent JSX...
}

export function GalleryAdminPage() {
  return (
    <AuthGuard>
      <GalleryContent />
    </AuthGuard>
  )
}

export type GalleryItem = {
  id: number;
  imageUrl: string;
  caption: string;
  captionAr: string;
  createdAt?: string;
};

function GalleryContent() {
  const { language, isRTL } = useLanguage()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    imageUrl: "",
    caption: "",
    captionAr: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    setError("")
    fetch("/api/gallery")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch gallery")
        return res.json()
      })
      .then(data => {
        setGallery(Array.isArray(data) ? data : [])
        setLoading(false)
        // Open dialog automatically if empty
        if (Array.isArray(data) && data.length === 0) {
          setIsDialogOpen(true)
        }
      })
      .catch(err => {
        setError(language === "ar" ? "تعذر تحميل المعرض" : "Failed to load gallery")
        setLoading(false)
      })
  }, [language])

  const handleEdit = (item: GalleryItem) => {
    setFormData(item)
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const isEdit = !!formData.id
    const res = await fetch("/api/gallery", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (res.ok) {
      if (isEdit) {
        setGallery(gallery.map(item => item.id === data.id ? data : item))
        toast({ title: language === "ar" ? "تم تحديث الصورة" : "Image Updated" })
      } else {
        setGallery([data, ...gallery])
        toast({ title: language === "ar" ? "تمت إضافة الصورة" : "Image Added" })
      }
      setIsDialogOpen(false)
      setFormData({ imageUrl: "", caption: "", captionAr: "" })
    } else {
      toast({ title: language === "ar" ? "فشل الحفظ" : "Save failed", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/gallery", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ id })
    })
    if (res.ok) {
      setGallery(gallery.filter(item => item.id !== id))
      toast({ title: language === "ar" ? "تم حذف الصورة" : "Image Deleted", variant: "destructive" })
    } else {
      toast({ title: language === "ar" ? "فشل الحذف" : "Delete failed", variant: "destructive" })
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-lg">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
  }

  return (
    <div className={`space-y-8 ${isRTL ? "rtl-spacing" : ""}`}>
      {/* More visible Add Image button at the top */}
      <div className="flex justify-end mb-4">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-6 py-2 rounded-lg shadow-lg" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة صورة" : "Add Image"}</span>
        </Button>
      </div>
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>
            {language === "ar" ? "معرض الصور" : "Gallery"}
          </h1>
          <p className={`text-emerald-100 ${isRTL ? "font-arabic" : ""}`}>
            {language === "ar" ? "إدارة صور المصنع" : "Manage factory images"}
          </p>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-800">
              {language === "ar" ? (formData.id ? "تعديل صورة" : "إضافة صورة جديدة") : (formData.id ? "Edit Image" : "Add New Image")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">
                {language === "ar" ? "رابط الصورة" : "Image URL"}
              </label>
              <Input
                value={formData.imageUrl || ""}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder={language === "ar" ? "أدخل رابط الصورة" : "Enter image URL"}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">
                {language === "ar" ? "التعليق (إنجليزي)" : "Caption (English)"}
              </label>
              <Input
                value={formData.caption || ""}
                onChange={e => setFormData({ ...formData, caption: e.target.value })}
                placeholder={language === "ar" ? "أدخل التعليق بالإنجليزية" : "Enter caption in English"}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">
                {language === "ar" ? "التعليق (عربي)" : "Caption (Arabic)"}
              </label>
              <Input
                value={formData.captionAr || ""}
                onChange={e => setFormData({ ...formData, captionAr: e.target.value })}
                placeholder={language === "ar" ? "أدخل التعليق بالعربية" : "Enter caption in Arabic"}
                dir="rtl"
              />
            </div>
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-300">
                <X className="h-4 w-4 mr-2" />
                <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إلغاء" : "Cancel"}</span>
              </Button>
              <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-2" />
                <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "حفظ الصورة" : "Save Image"}</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Gallery Grid or Empty State */}
      {error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Fish className="w-16 h-16 text-emerald-400 mb-6" />
          <h2 className={`text-2xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "لا توجد صور بعد" : "No images yet"}</h2>
          <p className={`text-gray-600 mb-6 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "ابدأ بإضافة أول صورة للمعرض." : "Start by adding your first gallery image."}</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة صورة" : "Add Image"}</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map(item => (
            <Card key={item.id} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-lg text-slate-800 ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? item.captionAr : item.caption}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-48 object-cover rounded-lg mb-4" />
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 mr-2"
                  >
                    <Save className="h-4 w-4" />
                    <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "تعديل" : "Edit"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
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
