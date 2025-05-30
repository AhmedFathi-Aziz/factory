"use client"
import { AuthGuard } from "@/components/admin/auth-guard"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactAdminPage() {
  return (
    <AuthGuard>
      <ContactContent />
    </AuthGuard>
  )
}

function ContactContent() {
  const [info, setInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => { setInfo(data); setLoading(false) })
      .catch(() => { setError("Failed to load contact info"); setLoading(false) })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      })
      if (!res.ok) throw new Error("Failed to update contact info")
      setSuccess("Contact info updated successfully!")
    } catch (err) {
      setError("Failed to update contact info")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!info) return <div className="p-8 text-center text-red-500">{error || "No contact info found."}</div>

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Edit Contact Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Mobile" name="mobile" value={info.mobile || ""} onChange={handleChange} required />
            <Input label="Telephone" name="telephone" value={info.telephone || ""} onChange={handleChange} required />
            <Input label="Fax" name="fax" value={info.fax || ""} onChange={handleChange} required />
            <Input label="Address" name="address" value={info.address || ""} onChange={handleChange} required />
            <Input label="Email" name="email" value={info.email || ""} onChange={handleChange} required type="email" />
            <Input label="Website" name="website" value={info.website || ""} onChange={handleChange} required />
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            {success && <div className="text-green-600 mt-2">{success}</div>}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 