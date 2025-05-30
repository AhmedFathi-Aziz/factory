"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"

const galleryImages = [
  {
    src: "/images/1.jpg",
    caption: "Factory Exterior",
    captionAr: "واجهة المصنع"
  },
  {
    src: "/images/2.jpg",
    caption: "Production Line",
    captionAr: "خط الإنتاج"
  },
  {
    src: "/images/3.jpg",
    caption: "Quality Control",
    captionAr: "مراقبة الجودة"
  },
  {
    src: "/images/4.jpg",
    caption: "Warehouse",
    captionAr: "المخزن"
  },
  {
    src: "/images/5.jpg",
    caption: "Team Work",
    captionAr: "فريق العمل"
  },
  {
    src: "/images/6.jpg",
    caption: "Shipping",
    captionAr: "الشحن"
  },
];

export default function GalleryPage() {
  const { language, isRTL } = useLanguage()
  const [current, setCurrent] = useState(0)

  return (
    <>
      <Header />
      <main>
        <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 pt-28">
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? "معرض الصور" : "Gallery"}</h1>
          <div className="w-full max-w-2xl px-4 md:px-0">
            <Carousel>
              <CarouselContent>
                <AnimatePresence initial={false} mode="wait">
                  <CarouselItem key={galleryImages[current].src}>
                    <motion.div
                      key={galleryImages[current].src}
                      initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <Card className="overflow-hidden shadow-xl border-0">
                        <CardContent className="p-0">
                          <img
                            src={galleryImages[current].src}
                            alt={language === "ar" ? galleryImages[current].captionAr : galleryImages[current].caption}
                            className="w-full h-96 object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                </AnimatePresence>
              </CarouselContent>
            </Carousel>
            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrent((c) => (c - 1 + galleryImages.length) % galleryImages.length)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {language === "ar" ? "السابق" : "Previous"}
              </button>
              <button onClick={() => setCurrent((c) => (c + 1) % galleryImages.length)} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">
                {language === "ar" ? "التالي" : "Next"}
              </button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {galleryImages.map((item, idx) => (
                <span
                  key={item.src}
                  className={`inline-block w-3 h-3 rounded-full ${idx === current ? "bg-emerald-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 