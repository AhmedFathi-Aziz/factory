"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fish, ArrowRight, Award, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { useState, useEffect } from "react"

export function ProductsPreview() {
  const { t, language, isRTL } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError(language === "ar" ? "تعذر تحميل المنتجات" : "Failed to load products")
        setLoading(false)
      })
  }, [language])

  if (loading) return <div className="text-center py-20 text-lg">{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>

  return (
    <section className={`py-16 sm:py-20 bg-gray-50 ${isRTL ? "rtl-spacing" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 ${isRTL ? "font-arabic" : ""}`}
          >
            {t("ourProducts")}
          </h2>
          <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? "font-arabic" : ""}`}>
            {t("productsDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {products.slice(0, 2).map((product, index) => (
            <motion.div
              key={product.id || product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg bg-white">
                <CardContent className={`p-6 sm:p-8 ${isRTL ? "rtl-padding" : ""}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-slate-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <Fish className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 text-base sm:text-lg font-bold px-3 py-1">
                      {product.protein}
                    </Badge>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? product.titleAr : product.title}
                  </h3>

                  <p className={`text-gray-600 mb-6 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                    {language === "ar" ? product.descriptionAr : product.description}
                  </p>

                  <div className="mb-6">
                    <h4 className={`font-semibold text-gray-800 mb-4 flex items-center ${isRTL ? "font-arabic" : ""}`}>
                      <Shield className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-blue-600`} />
                      {language === "ar" ? "المواصفات" : "Specifications"}
                    </h4>
                    <ul className={`space-y-3 ${isRTL ? "rtl-spacing" : ""}`}>
                      {(language === "ar" ? product.featuresAr : product.features)?.map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className={`text-sm text-gray-600 flex items-center ${isRTL ? "font-arabic" : ""}`}
                        >
                          <div
                            className={`w-2 h-2 bg-blue-600 rounded-full ${isRTL ? "ml-3" : "mr-3"} flex-shrink-0`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className={`font-semibold text-gray-800 mb-3 flex items-center ${isRTL ? "font-arabic" : ""}`}>
                      <Award className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-green-600`} />
                      {language === "ar" ? "الشهادات" : "Certifications"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === "ar" ? product.certificationsAr : product.certifications)?.map((cert: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800"
            >
              <span className={isRTL ? "font-arabic" : ""}>
                {language === "ar" ? "عرض جميع المنتجات" : "View All Products"}
              </span>
              <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
