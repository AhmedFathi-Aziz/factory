"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([])
  const { language, isRTL } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
      })
      .catch(err => {
        setError(language === "ar" ? "تعذر تحميل المعرض" : "Failed to load gallery")
        setLoading(false)
      })
  }, [language])

  // Always render header and footer
  return (
    <>
      <Header />
      <main>
        {loading ? (
          <div className="text-center py-20 text-lg pt-28">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
        ) : error ? (
          <div className="text-center py-20 text-red-600 text-lg pt-28">{error}</div>
        ) : (
          <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 pt-28">
            <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "معرض الصور" : "Gallery"}</h1>
            {!gallery.length ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="w-16 h-16 text-emerald-400 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" /></svg>
                <h2 className={`text-2xl font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "لا توجد صور بعد" : "No images yet"}</h2>
                <p className={`text-gray-600 mb-6 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "لم يتم إضافة صور للمعرض بعد." : "No gallery images have been added yet."}</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl">
                <Carousel>
                  <CarouselContent>
                    <AnimatePresence initial={false} mode="wait">
                      <CarouselItem key={gallery[current].id}>
                        <motion.div
                          key={gallery[current].id}
                          initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center"
                        >
                          <Card className="overflow-hidden shadow-xl border-0">
                            <CardContent className="p-0">
                              <img
                                src={gallery[current].imageUrl}
                                alt={gallery[current].caption}
                                className="w-full h-96 object-cover rounded-lg"
                              />
                            </CardContent>
                          </Card>
                          <div className={`mt-4 text-lg text-gray-800 ${isRTL ? "font-arabic" : ""}`}>
                            {language === "ar" ? gallery[current].captionAr : gallery[current].caption}
                          </div>
                        </motion.div>
                      </CarouselItem>
                    </AnimatePresence>
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setCurrent((c) => (c - 1 + gallery.length) % gallery.length)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    {language === "ar" ? "السابق" : "Previous"}
                  </button>
                  <button onClick={() => setCurrent((c) => (c + 1) % gallery.length)} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">
                    {language === "ar" ? "التالي" : "Next"}
                  </button>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {gallery.map((item, idx) => (
                    <span
                      key={item.id}
                      className={`inline-block w-3 h-3 rounded-full ${idx === current ? "bg-emerald-600" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  )
} 