"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import { useEffect, useState } from "react"

export function PartnersTicker() {
  const { language, isRTL } = useLanguage()
  const [partners, setPartners] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch(() => setPartners([]))
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-gray-200" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 transition-all duration-300 ${isRTL ? "font-arabic" : ""}`}
          >
            {language === "ar" ? "شركاؤنا الموثوقون" : "Trusted Business Partners"}
          </h2>
          <p
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-opacity duration-300 ${isRTL ? "font-arabic" : ""}`}
          >
            {language === "ar"
              ? "نفخر بالعمل مع أهم الشركات في صناعة الأعلاف والدواجن في المنطقة"
              : "We're proud to work with leading companies in the feed and poultry industry across the region"}
          </p>
        </div>

        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex"
            style={{ width: "200%" }}
            animate={{ x: isRTL ? [0, 100, 0] : [0, -100, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 6,
                ease: "linear",
              },
            }}
          >
            {/* First set of partners */}
            <div className="flex">
              {partners.map((partner, idx) => (
                <div
                  key={`first-${idx}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center h-44 sm:h-52 w-60 sm:w-72 lg:w-80 mx-3"
                >
                  <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 w-full h-full flex flex-col justify-center shadow-lg">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-16 sm:h-20 w-auto mx-auto mb-4 object-contain rounded-lg shadow-md bg-gray-50"
                    />
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 break-words whitespace-normal">
                      {partner.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 break-words whitespace-normal">{partner.industry}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Second set of partners (duplicate for seamless loop) */}
            {partners.length > 1 && (
              <div className="flex">
                {partners.map((partner, idx) => (
                  <div
                    key={`second-${idx}`}
                    className="flex-shrink-0 flex flex-col items-center justify-center h-44 sm:h-52 w-60 sm:w-72 lg:w-80 mx-3"
                  >
                    <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 w-full h-full flex flex-col justify-center shadow-lg">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="h-16 sm:h-20 w-auto mx-auto mb-4 object-contain rounded-lg shadow-md bg-gray-50"
                      />
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 break-words whitespace-normal">
                        {partner.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 break-words whitespace-normal">{partner.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
