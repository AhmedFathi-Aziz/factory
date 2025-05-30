"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"

export default function ContactPage() {
  const { t, language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [contactInfo, setContactInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => {
        setContactInfo(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50" dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className={`text-4xl md:text-5xl font-bold text-primary mb-4 ${isRTL ? "font-arabic" : ""}`}>{t("contactTitle")}</h1>
            <p className={`text-xl text-gray-900 font-semibold max-w-2xl mx-auto mb-0 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "تواصل معنا للحصول على منتجات مسحوق السمك عالية الجودة" : "Contact us for high-quality fish meal products"}</p>
          </div>
        </div>
      </section>

      {/* Contact Info - Single Card Vertical List */}
      <section className="py-4 sm:py-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <Card className="w-full bg-white/95 rounded-2xl shadow-xl border border-gray-100 p-8">
                <CardContent>
              <h2 className={`text-2xl font-bold text-primary mb-6 text-center ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "معلومات التواصل" : "Contact Information"}</h2>
              {loading ? (
                <div className="text-center py-8 text-gray-500">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
              ) : contactInfo ? (
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "جوال" : "Mobile"}:</span>
                  <span className="text-gray-700 text-base" dir="ltr">{contactInfo.mobile}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "هاتف" : "Telephone"}:</span>
                  <span className="text-gray-700 text-base" dir="ltr">{contactInfo.telephone}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-purple-600 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "فاكس" : "Fax"}:</span>
                  <span className="text-gray-700 text-base" dir="ltr">{contactInfo.fax}</span>
                </li>
                <li className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "العنوان" : "Address"}:</span>
                  <span className="text-gray-700 text-base">{contactInfo.address}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "البريد الإلكتروني" : "Email"}:</span>
                  <span className="text-gray-700 text-base" dir="ltr">{contactInfo.email}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Globe className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <span className="font-semibold w-28 block text-gray-700">{language === "ar" ? "الموقع الإلكتروني" : "Website"}:</span>
                  <span className="text-gray-700 text-base" dir="ltr">{contactInfo.website}</span>
                </li>
              </ul>
              ) : (
                <div className="text-center py-8 text-red-500">{language === "ar" ? "تعذر تحميل معلومات التواصل" : "Failed to load contact info"}</div>
              )}
                </CardContent>
              </Card>
        </div>
      </section>

      {/* Map Section - Centered Below */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-100 via-white to-teal-100 rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold text-primary mb-4 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "موقعنا" : "Find Us"}</h2>
              <p className={`text-gray-700 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "موقعنا في أم القيوين، الإمارات العربية المتحدة" : "Located in Umm Al Quwain, U.A.E."}</p>
          </div>
            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden w-full h-72 mb-4 border-2 border-blue-200 shadow-lg">
              <iframe
                title={language === "ar" ? "خريطة مصنع بحر العرب" : "Bahr Al-Arab Factory Map"}
                src="https://www.google.com/maps?q=25.564,55.555&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className={`text-sm text-gray-500 mt-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "2138، أم القيوين، الإمارات العربية المتحدة" : "2138, Umm Al Quwain, U.A.E"}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
