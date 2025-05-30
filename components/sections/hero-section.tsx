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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 sm:pt-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content - Always centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`space-y-4 sm:space-y-6 bg-white/90 lg:bg-white rounded-xl shadow-lg p-6 sm:p-10 lg:p-14 max-w-2xl mx-auto lg:mx-0 animate-fade-in ${isRTL ? 'text-right lg:text-right font-arabic' : 'text-center lg:text-left'}`}
          >
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary ${isRTL ? "font-arabic" : ""}`}
            >
              {t("heroTitle")}
            </h1>
            <p
              className={`text-lg sm:text-xl text-gray-700 max-w-2xl mb-4 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("heroSubtitle")}
            </p>
            <p className={`text-base sm:text-lg text-gray-600 max-w-2xl mb-8 ${isRTL ? "font-arabic" : ""}`}>{t("heroDescription")}</p>
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'justify-end' : 'justify-center lg:justify-start'} pt-4`}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 w-full sm:w-auto text-sm sm:text-base"
              >
                {t("getStarted")}
                <ArrowRight className={`${isRTL ? "mr-2" : "ml-2"} h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 w-full sm:w-auto text-sm sm:text-base">
                <Play className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4`} />
                {t("learnMore")}
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual - Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 w-full max-w-xl mx-auto"
          >
            <ImageSlider 
              images={[1,2,3,4,5,6].map(num => `/images/${num}.jpg`)}
              autoPlay={true}
              speed={3}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
