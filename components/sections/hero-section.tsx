"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import ImageSlider from "@/app/admin/components/ImageSlider"

export function HeroSection() {
  const { t, isRTL, language } = useLanguage()

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 sm:pt-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Full-width Image Slider */}
      <div className="w-full px-4 md:px-12 lg:px-24">
        <ImageSlider 
          images={[1,2,3,4,5,6].map(num => `/images/${num}.jpg`)}
          autoPlay={true}
          speed={3}
        />
      </div>
      {/* Text Content Below Slider */}
      <div className="w-full px-4 md:px-12 lg:px-24 mt-8">
        <div className="max-w-4xl mx-auto text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`space-y-4 sm:space-y-6 bg-white/90 rounded-xl shadow-lg p-6 sm:p-10 lg:p-14 animate-fade-in ${isRTL ? 'text-right font-arabic' : 'text-right'}`}
          >
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primary"
            >
              {t("heroTitle")}
            </h1>
            <p
              className="text-base sm:text-lg text-gray-700 max-w-2xl mb-4"
            >
              {t("heroSubtitle")}
            </p>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mb-8">{t("heroDescription")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
