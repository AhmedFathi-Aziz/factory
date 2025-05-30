"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"

const hardcodedPartners = [
  {
    name: "Provimi Jordan",
    industry: "Feed Concentrate",
    logo: "/images/jordan1.png",
  },
  {
    name: "Sunukrut Poultry Farm",
    industry: "Poultry",
    logo: "/images/sen.webp",
  },
  {
    name: "National Poultry Farm",
    industry: "Poultry",
    logo: "/images/jor3.jpg",
  },
  {
    name: "Egyptian feed companies",
    industry: "Feed Manufacturer",
    logo: "/images/egypt.png",
  },
  {
    name: "UAE feed companies",
    industry: "Feed Manufacturer",
    logo: "/images/uae.png",
  },
];

export function PartnersTicker() {
  const { language, isRTL } = useLanguage();

  // Duplicate the partners for seamless looping
  const tickerPartners = [...hardcodedPartners, ...hardcodedPartners];

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
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, // Adjust speed here
                ease: "linear",
              },
            }}
          >
            {tickerPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col items-center justify-center h-44 sm:h-52 w-60 sm:w-72 lg:w-80 mx-3"
              >
                <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 w-full h-full flex flex-col justify-center shadow-lg">
                  <img
                    src={partner.logo}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
