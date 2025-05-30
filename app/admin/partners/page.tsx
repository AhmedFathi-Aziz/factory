"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Building2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { AuthGuard } from "@/components/admin/auth-guard"

interface Partner {
  id: number
  name: string
  industry: string
  logo: string
  country: string
  status: "active" | "inactive"
  description: string
}

const initialPartners: Partner[] = [
  {
    id: 1,
    name: "Provimi Jordan",
    industry: "Feed Concentrate",
    logo: "/placeholder.svg?height=40&width=80&text=Provimi",
    country: "Jordan",
    status: "active",
    description: "Leading feed concentrate manufacturer in Jordan",
  },
  {
    id: 2,
    name: "Sunukrut Poultry Farm",
    industry: "Poultry",
    logo: "/placeholder.svg?height=40&width=80&text=Sunukrut",
    country: "Jordan",
    status: "active",
    description: "Major poultry farm operation",
  },
  {
    id: 3,
    name: "National Poultry Farm",
    industry: "Poultry",
    logo: "/placeholder.svg?height=40&width=80&text=National",
    country: "Jordan",
    status: "active",
    description: "National poultry farming company",
  },
]

export default function PartnersAdminPage() {
  return (
    <AuthGuard>
      <PartnersContent />
    </AuthGuard>
  )
}

function PartnersContent() {
  const { language, isRTL } = useLanguage()
  const [partners, setPartners] = useState<Partner[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    industry: "",
    logo: "",
    country: "",
    status: "active",
    description: "",
  })
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch partners from API on mount
  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners")
      const data = await res.json()
      setPartners(data)
    } catch {
      setPartners([])
    }
  }

  // Add or update partner
  const handleSave = async () => {
    try {
      let res, data: any
    if (editingPartner) {
        res = await fetch("/api/partners", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPartner.id, ...formData }),
        })
        data = await res.json()
        if (res.ok) {
      toast({
        title: language === "ar" ? "تم تحديث الشريك" : "Partner Updated",
            description: language === "ar" ? "تم تحديث الشريك التجاري بنجاح" : "Business partner has been successfully updated",
      })
    } else {
          throw new Error(data.error || "Update failed")
        }
      } else {
        res = await fetch("/api/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        data = await res.json()
        if (res.ok) {
      toast({
        title: language === "ar" ? "تم إضافة الشريك" : "Partner Added",
            description: language === "ar" ? "تم إضافة الشريك التجاري الجديد بنجاح" : "New business partner has been successfully added",
      })
        } else {
          throw new Error(data.error || "Create failed")
        }
    }
    setIsDialogOpen(false)
    setEditingPartner(null)
    resetForm()
      fetchPartners()
    } catch (err: any) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  // Edit partner
  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData(partner)
    setIsDialogOpen(true)
  }

  // Delete partner
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
    toast({
      title: language === "ar" ? "تم حذف الشريك" : "Partner Deleted",
      description: language === "ar" ? "تم حذف الشريك التجاري بنجاح" : "Business partner has been successfully deleted",
      variant: "destructive",
    })
        fetchPartners()
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
      name: "",
      industry: "",
      logo: "",
      country: "",
      status: "active",
      description: "",
    })
  }

  // Handle logo file upload
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      setFormData((prev) => ({ ...prev, logo: data.url }))
    } else {
      toast({
        title: language === "ar" ? "فشل رفع الشعار" : "Logo Upload Failed",
        description: language === "ar" ? "حدث خطأ أثناء رفع الشعار" : "An error occurred while uploading the logo",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={`space-y-8 ${isRTL ? "rtl-spacing" : ""}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? "الشركاء التجاريون" : "Business Partners"}
            </h1>
            <p className={`text-orange-100 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar"
                ? "إدارة الشركاء التجاريين الموثوقين والمتعاونين"
                : "Manage your trusted business partners and collaborators"}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-orange-600 hover:bg-orange-50" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إضافة شريك" : "Add Partner"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingPartner
                    ? language === "ar"
                      ? "تحرير الشريك التجاري"
                      : "Edit Business Partner"
                    : language === "ar"
                      ? "إضافة شريك تجاري جديد"
                      : "Add New Business Partner"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "اسم الشريك" : "Partner Name"}
                    </label>
                    <Input
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "اسم الشركة الشريكة" : "Partner company name"}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الصناعة" : "Industry"}
                    </label>
                    <Input
                      value={formData.industry || ""}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g., Feed Concentrate"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "البلد" : "Country"}
                    </label>
                    <Input
                      value={formData.country || ""}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g., Jordan"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">
                      {language === "ar" ? "الحالة" : "Status"}
                    </label>
                    <select
                      value={formData.status || "active"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="active">{language === "ar" ? "نشط" : "Active"}</option>
                      <option value="inactive">{language === "ar" ? "غير نشط" : "Inactive"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-700">
                    {language === "ar" ? "شعار الشريك" : "Partner Logo"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {formData.logo && (
                    <div className="mt-2">
                      <img
                        src={formData.logo}
                        alt="logo preview"
                        className="h-12 w-auto object-contain border rounded-md bg-white shadow"
                  />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-700">
                    {language === "ar" ? "الوصف" : "Description"}
                  </label>
                  <Input
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={language === "ar" ? "وصف مختصر للشريك" : "Brief description of the partner"}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-300">
                    <X className="h-4 w-4 mr-2" />
                    <span className={isRTL ? "font-arabic" : ""}>{language === "ar" ? "إلغاء" : "Cancel"}</span>
                  </Button>
                  <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                    <Save className="h-4 w-4 mr-2" />
                    <span className={isRTL ? "font-arabic" : ""}>
                      {language === "ar" ? "حفظ الشريك" : "Save Partner"}
                    </span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <Card key={partner.id} className={`bg-white hover:shadow-md transition-shadow duration-300 border-0 shadow rounded-2xl${isRTL ? ' font-arabic' : ''}`} style={isRTL ? {direction: 'rtl'} : {}}>
            <CardHeader className={`bg-white rounded-t-2xl p-6 pb-4${isRTL ? ' font-arabic' : ''}`}>
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse gap-4' : ''}`}> 
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse gap-4' : 'gap-3'}`}>
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <CardTitle className={`text-lg text-slate-800 ${isRTL ? 'font-arabic text-right' : ''}`}>{partner.name}</CardTitle>
                    <p className={`text-sm text-slate-500 ${isRTL ? 'font-arabic text-right' : ''}`}>{partner.country}</p>
                  </div>
                </div>
                <Badge
                  variant={partner.status === "active" ? "default" : "secondary"}
                  className={partner.status === "active" ? "bg-green-100 text-green-700" : ""}
                >
                  {language === "ar" ? (partner.status === "active" ? "نشط" : "غير نشط") : partner.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-medium text-slate-700 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? "الصناعة:" : "Industry:"}
                  </p>
                  <Badge variant="outline" className="border-blue-200 text-blue-700 mt-1">
                    {partner.industry}
                  </Badge>
                </div>

                <div>
                  <p className={`text-sm font-medium text-slate-700 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? "الوصف:" : "Description:"}
                  </p>
                  <p className={`text-sm text-slate-600 mt-1 ${isRTL ? "font-arabic" : ""}`}>{partner.description}</p>
                </div>

                {partner.logo && (
                  <div>
                    <p className={`text-sm font-medium text-slate-700 mb-2 ${isRTL ? "font-arabic" : ""}`}>
                      {language === "ar" ? "الشعار:" : "Logo:"}
                    </p>
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(partner)}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(partner.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
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
