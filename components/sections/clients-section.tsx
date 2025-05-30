"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"

export function ClientsSection() {
  const { t, language, isRTL } = useLanguage()

  const clientRegions = [
    {
      icon: Building2,
      region: "Jordan",
      regionAr: "الأردن",
      clients: ["Provimi Jordan", "Sunukrut Poultry Farm", "National Poultry Farm"],
      clientsAr: ["بروفيمي الأردن", "مزرعة سونوكروت للدواجن", "المزرعة الوطنية للدواجن"],
      description: "Main suppliers to Jordan feed concentrate manufacturers",
      descriptionAr: "الموردون الرئيسيون لمصانع مركزات الأعلاف في الأردن",
    },
    {
      icon: MapPin,
      region: "Egypt",
      regionAr: "مصر",
      clients: ["Egyptian Distribution Companies"],
      clientsAr: ["شركات التوزيع المصرية"],
      description: "Product distributed through Egyptian companies",
      descriptionAr: "يتم توزيع المنتج من خلال الشركات المصرية",
    },
    {
      icon: Users,
      region: "UAE & Middle East",
      regionAr: "الإمارات والشرق الأوسط",
      clients: ["Local Feed Manufacturers", "Poultry Farms"],
      clientsAr: ["مصانع الأعلاف المحلية", "مزارع الدواجن"],
      description: "Serving the wider Middle East market",
      descriptionAr: "خدمة السوق الأوسع في الشرق الأوسط",
    },
  ]

  return (
    <section className="py-20 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? "font-arabic" : ""}`}>
            {t("clients")}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? "font-arabic" : ""}`}>{t("clientsText")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientRegions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                    <region.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold text-gray-900 mb-3 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? region.regionAr : region.region}
                  </h3>
                  <p className={`text-gray-600 mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? region.descriptionAr : region.description}
                  </p>
                  <ul className="space-y-2">
                    {(language === "ar" ? region.clientsAr : region.clients).map((client, idx) => (
                      <li key={idx} className={`text-sm text-gray-500 flex items-center ${isRTL ? "font-arabic" : ""}`}>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {client}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
