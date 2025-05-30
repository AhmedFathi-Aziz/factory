"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

const newsItems = [
  {
    id: 1,
    title: "Bahr Al-Arab Expands Production Capacity to Meet Growing Regional Demand",
    titleAr: "بحر العرب يوسع الطاقة الإنتاجية لتلبية الطلب الإقليمي المتزايد",
    date: "2024-01-15",
    category: "Expansion",
    categoryAr: "التوسع",
  },
  {
    id: 2,
    title: "New Strategic Partnership with Leading Jordanian Feed Manufacturers",
    titleAr: "شراكة استراتيجية جديدة مع كبرى مصانع الأعلاف الأردنية",
    date: "2024-01-10",
    category: "Partnership",
    categoryAr: "شراكة",
  },
  {
    id: 3,
    title: "Quality Certification Achieved for International Export Standards",
    titleAr: "الحصول على شهادة الجودة لمعايير التصدير الدولية",
    date: "2024-01-05",
    category: "Quality",
    categoryAr: "الجودة",
  },
]

export function NewsTicker() {
  const { language, isRTL } = useLanguage()

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-r from-slate-700 to-blue-700 text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-2 transition-all duration-300 ${isRTL ? "font-arabic" : ""}`}
            >
              {language === "ar" ? "آخر الأخبار والتحديثات" : "Latest News & Updates"}
            </h2>
            <p
              className={`text-blue-100 text-sm sm:text-base transition-opacity duration-300 ${isRTL ? "font-arabic" : ""}`}
            >
              {language === "ar"
                ? "ابق على اطلاع بآخر إنجازاتنا ورؤانا الصناعية"
                : "Stay updated with our latest achievements and industry insights"}
            </p>
          </div>
          <Link href="/news">
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              {language === "ar" ? "عرض جميع الأخبار" : "View All News"}
              <ArrowRight
                className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} h-4 w-4 transition-transform duration-200`}
              />
            </Button>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -100] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 8,
                ease: "linear",
              },
            }}
            className="flex"
            style={{ width: "200%" }}
          >
            {/* First set of news items */}
            <div className="flex w-1/2 justify-around">
              {newsItems.map((item) => (
                <div
                  key={`first-${item.id}`}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 w-72 sm:w-80 lg:w-96 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl cursor-pointer mx-2"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-blue-200 transition-transform duration-200" />
                    <span className="text-xs sm:text-sm text-blue-200 transition-opacity duration-200">
                      {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-AE" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full transition-all duration-200 hover:bg-white/30">
                      {language === "ar" ? item.categoryAr : item.category}
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold leading-tight transition-colors duration-200 hover:text-blue-100 ${isRTL ? "font-arabic" : ""} break-words whitespace-normal`}
                  >
                    {language === "ar" ? item.titleAr : item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Second set of news items (duplicate for continuous scrolling) */}
            <div className="flex w-1/2 justify-around">
              {newsItems.map((item) => (
                <div
                  key={`second-${item.id}`}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 w-72 sm:w-80 lg:w-96 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl cursor-pointer mx-2"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-blue-200 transition-transform duration-200" />
                    <span className="text-xs sm:text-sm text-blue-200 transition-opacity duration-200">
                      {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-AE" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full transition-all duration-200 hover:bg-white/30">
                      {language === "ar" ? item.categoryAr : item.category}
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold leading-tight transition-colors duration-200 hover:text-blue-100 ${isRTL ? "font-arabic" : ""} break-words whitespace-normal`}
                  >
                    {language === "ar" ? item.titleAr : item.title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
