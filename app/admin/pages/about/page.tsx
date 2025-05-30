"use client"

import { AuthGuard } from "@/components/admin/auth-guard"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function AboutAdminPage() {
  return (
    <AuthGuard>
      <AboutContent />
    </AuthGuard>
  )
}

function AboutContent() {
  const [info, setInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => { setInfo(data); setLoading(false) })
      .catch(() => { setError("Failed to load about info"); setLoading(false) })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      })
      if (!res.ok) throw new Error("Failed to update about info")
      setSuccess("About info updated successfully!")
    } catch (err) {
      setError("Failed to update about info")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!info) return <div className="p-8 text-center text-red-500">{error || "No about info found."}</div>

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Edit About Page Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" value={info.title || ""} onChange={handleChange} placeholder="Title (English)" />
            <Input name="titleAr" value={info.titleAr || ""} onChange={handleChange} placeholder="Title (Arabic)" dir="rtl" />
            <Input name="subtitle" value={info.subtitle || ""} onChange={handleChange} placeholder="Subtitle (English)" />
            <Input name="subtitleAr" value={info.subtitleAr || ""} onChange={handleChange} placeholder="Subtitle (Arabic)" dir="rtl" />
            <Textarea name="mission" value={info.mission || ""} onChange={handleChange} placeholder="Mission (English)" rows={2} />
            <Textarea name="missionAr" value={info.missionAr || ""} onChange={handleChange} placeholder="Mission (Arabic)" rows={2} dir="rtl" />
            <Textarea name="vision" value={info.vision || ""} onChange={handleChange} placeholder="Vision (English)" rows={2} />
            <Textarea name="visionAr" value={info.visionAr || ""} onChange={handleChange} placeholder="Vision (Arabic)" rows={2} dir="rtl" />
            <Textarea name="values" value={info.values || ""} onChange={handleChange} placeholder="Values (English)" rows={2} />
            <Textarea name="valuesAr" value={info.valuesAr || ""} onChange={handleChange} placeholder="Values (Arabic)" rows={2} dir="rtl" />
            <Textarea name="story" value={info.story || ""} onChange={handleChange} placeholder="Company Story (English)" rows={3} />
            <Textarea name="storyAr" value={info.storyAr || ""} onChange={handleChange} placeholder="Company Story (Arabic)" rows={3} dir="rtl" />
            <Input name="experience" value={info.experience || ""} onChange={handleChange} placeholder="Experience (English)" />
            <Input name="experienceAr" value={info.experienceAr || ""} onChange={handleChange} placeholder="Experience (Arabic)" dir="rtl" />
            <Input name="production" value={info.production || ""} onChange={handleChange} placeholder="Production (English)" />
            <Input name="productionAr" value={info.productionAr || ""} onChange={handleChange} placeholder="Production (Arabic)" dir="rtl" />
            <Input name="clients" value={info.clients || ""} onChange={handleChange} placeholder="Clients (English)" />
            <Input name="clientsAr" value={info.clientsAr || ""} onChange={handleChange} placeholder="Clients (Arabic)" dir="rtl" />
            <Textarea name="scope" value={info.scope || ""} onChange={handleChange} placeholder="Scope (English)" rows={2} />
            <Textarea name="scopeAr" value={info.scopeAr || ""} onChange={handleChange} placeholder="Scope (Arabic)" rows={2} dir="rtl" />
            <Textarea name="quality" value={info.quality || ""} onChange={handleChange} placeholder="Quality Commitment (English)" rows={2} />
            <Textarea name="qualityAr" value={info.qualityAr || ""} onChange={handleChange} placeholder="Quality Commitment (Arabic)" rows={2} dir="rtl" />
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            {success && <div className="text-green-600 mt-2">{success}</div>}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 