"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Award, Users, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

export function AboutPreview() {
  const { t, language, isRTL } = useLanguage()

  const values = [
    {
      icon: Target,
      title: "Vision & Mission",
      titleAr: "الرؤية والرسالة",
      description:
        "Our Vision is to be recognized as the leading company in the production of high-quality fish meal powder in the Middle East.",
      descriptionAr: "رؤيتنا هي أن يتم الاعتراف بنا كشركة رائدة في إنتاج مسحوق السمك في الشرق الأوسط.",
    },
    {
      icon: Award,
      title: "Quality Standards",
      titleAr: "معايير الجودة",
      description:
        "We take care of the full condition of safety and health for staff and the product with international standards.",
      descriptionAr: "نحرص على الشروط الكاملة للسلامة وصحة الموظفين والمنتج وفقاً للمعايير الدولية.",
    },
    {
      icon: Users,
      title: "Our Commitment",
      titleAr: "التزامنا",
      description: "Contributing to the development of human capital, especially local fishermen, and society.",
      descriptionAr: "الإسهام في تنمية رأس المال البشري، خصوصاً الصيادين المحليين، والمجتمع.",
    },
  ]

  return (
    <section className={
      `py-16 sm:py-24 bg-white animate-fade-in animate-slide-in-left ${isRTL ? "rtl-spacing" : ""}`
    } dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-primary mb-6 text-center ${isRTL ? "font-arabic" : ""}`}>
            {t("vision") + " & " + t("coreValues")}
          </h2>
          <div className={`text-lg text-gray-700 max-w-3xl mx-auto mb-8 text-center space-y-4 ${isRTL ? "font-arabic text-right" : ""}`}>
            <p>{t("visionText")}</p>
            <p>{t("missionText")}</p>
            <p>{t("coreValuesText")}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold text-gray-900 mb-3 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? value.titleAr : value.title}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? value.descriptionAr : value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/about">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              {t("readMore")} {t("about")}
              <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
