"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/hooks/use-language"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    titleAr: "مهمتنا",
    description:
      "To provide high-quality fish meal products and market them on a wider scale in the UAE and Middle East, while contributing to the development of human capital and society.",
    descriptionAr:
      "تقديم منتجات مسحوق السمك عالية الجودة وتسويقها على نطاق واسع في دولة الإمارات والشرق الأوسط، مع المساهمة في تنمية رأس المال البشري والمجتمع.",
  },
  {
    icon: Award,
    title: "Our Vision",
    titleAr: "رؤيتنا",
    description:
      "To be recognized as the leading company in the production of high-quality fish meal powder in the Middle East region.",
    descriptionAr: "أن يتم الاعتراف بنا كشركة رائدة في إنتاج مسحوق السمك عالي الجودة في منطقة الشرق الأوسط.",
  },
  {
    icon: Users,
    title: "Our Values",
    titleAr: "قيمنا",
    description:
      "We take care of the full condition of safety and health for staff and products, following international standards for fish meal production.",
    descriptionAr:
      "نحرص على الشروط الكاملة للسلامة وصحة الموظفين والمنتجات، متبعين المعايير الدولية لإنتاج مسحوق السمك.",
  },
  {
    icon: Globe,
    title: "Our Reach",
    titleAr: "نطاق عملنا",
    description:
      "Serving businesses across the UAE and Middle East with deep understanding of regional market dynamics and industry requirements.",
    descriptionAr:
      "خدمة الشركات في جميع أنحاء دولة الإمارات والشرق الأوسط مع فهم عميق لديناميكيات السوق الإقليمية ومتطلبات الصناعة.",
  },
]

const team = [
  {
    name: "Ahmed Al-Mansouri",
    nameAr: "أحمد المنصوري",
    position: "Managing Director",
    positionAr: "المدير العام",
    image: "/placeholder.svg?height=300&width=300",
    bio: "15+ years of experience in fish meal production and regional market development.",
    bioAr: "أكثر من 15 عاماً من الخبرة في إنتاج مسحوق السمك وتطوير الأسواق الإقليمية.",
  },
  {
    name: "Omar Hassan",
    nameAr: "عمر حسان",
    position: "Production Manager",
    positionAr: "مدير الإنتاج",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Expert in fish meal processing with focus on quality control and international standards.",
    bioAr: "خبير في معالجة مسحوق السمك مع التركيز على مراقبة الجودة والمعايير الدولية.",
  },
  {
    name: "Fatima Al-Zahra",
    nameAr: "فاطمة الزهراء",
    position: "Quality Assurance Manager",
    positionAr: "مديرة ضمان الجودة",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Specialized in food safety standards and export quality certification processes.",
    bioAr: "متخصصة في معايير سلامة الأغذية وعمليات شهادات جودة التصدير.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutContent />
      <Footer />
    </div>
  )
}

function AboutContent() {
  const { language, isRTL } = useLanguage();
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => setAbout(data));
  }, [language]);

  if (!about) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? (about?.titleAr || "عن بحر العرب") : (about?.title || "About Bahr Al-Arab")}
            </h1>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar"
                ? (about?.subtitleAr || "نحن فريق متحمس من المتخصصين المتفانين في مساعدة الشركات في دولة الإمارات على إنتاج مسحوق السمك عالي الجودة للأعلاف الحيوانية")
                : (about?.subtitle || "We are a passionate team of specialists dedicated to helping businesses in the UAE produce high-quality fish meal for animal feed industry")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isRTL ? "lg:order-2" : ""}`}>
              <img
                src="/images/1.jpg"
                alt="Bahr Al-Arab Factory"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className={`space-y-6 ${isRTL ? "lg:order-1" : ""}`}>
              <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "صناعة مسحوق السمك المتميز" : "Crafting Premium Fish Meal"}
              </h2>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? (about?.missionAr || "تأسس مصنع بحر العرب برؤية لتحويل كيفية إنتاج وتوزيع مسحوق السمك عالي الجودة في دولة الإمارات العربية المتحدة. نحن ندرك أنه في المشهد التنافسي اليوم، منتج مسحوق السمك عالي الجودة ليس مجرد أصل - إنه ضرورة.")
                  : (about?.mission || "Founded with a vision to transform how high-quality fish meal is produced and distributed in the UAE, Bahr Al-Arab Factory has been at the forefront of feed industry innovation. We understand that in today's competitive landscape, premium fish meal is not just an asset—it's a necessity.")}
              </p>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? (about?.visionAr || "نهجنا يجمع بين التفكير الاستراتيجي والتميز في الإنتاج، مما يضمن أن كل منتج نقوم بإنتاجه لا يبدو استثنائياً فحسب، بل يحقق أيضاً نتائج قابلة للقياس لعملائنا.")
                  : (about?.vision || "Our approach combines strategic thinking with production excellence, ensuring that every product we manufacture not only meets exceptional standards but also delivers measurable results for our clients.")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-100 text-blue-700">
                  {language === "ar" ? (about?.experienceAr || "أكثر من 10 سنوات خبرة") : (about?.experience || "10+ Years Experience")}
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  {language === "ar" ? (about?.productionAr || "200+ طن شهرياً") : (about?.production || "200+ Tons Monthly")}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  {language === "ar" ? (about?.clientsAr || "50+ عميل راضٍ") : (about?.clients || "50+ Happy Clients")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center font-arabic whitespace-pre-line">
            {`رحلة العومة.. ما بعد البحر\nصحيفة البيان الإماراتية`}
          </h3>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/8IsrlgL6_Qo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar" ? "أسسنا ومبادئنا" : "Our Foundation & Principles"}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? "font-arabic" : ""}`}>
              {language === "ar"
                ? (about?.valuesAr || "المبادئ والقيم التي توجه عملنا وتحدد التزامنا بالتميز في صناعة مسحوق السمك")
                : (about?.values || "The principles and values that guide our work and define our commitment to excellence in fish meal production")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                    <v.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold text-gray-900 mb-3 ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? v.titleAr : v.title}</h3>
                  <p className={`text-gray-600 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>{language === "ar" ? v.descriptionAr : v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isRTL ? "lg:order-2" : ""}`}>
              <img
                src="/images/6.jpg"
                alt="Fish Meal Production"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className={`space-y-6 ${isRTL ? "lg:order-1" : ""}`}>
              <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar" ? "قصة شركتنا" : "Our Company Story"}
              </h2>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? (about?.storyAr || "يقع مصنع بحر العرب في أم القيوين، دولة الإمارات العربية المتحدة، ويختص في إنتاج مسحوق السمك عالي الجودة من السردين والأنشوجة. موقعنا الاستراتيجي يمكننا من الوصول إلى أفضل مصادر الأسماك الطازجة.")
                  : (about?.story || "Located in Umm Al Quwain, UAE, Bahr Al-Arab Factory specializes in producing high-quality fish meal from sardines and anchovies. Our strategic location enables us to access the finest sources of fresh fish.")}
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className={`font-semibold text-gray-900 mb-3 ${isRTL ? "font-arabic" : ""}`}>
                  {language === "ar" ? "التزامنا بالجودة" : "Our Quality Commitment"}
                </h4>
                <p className={`text-gray-600 text-sm ${isRTL ? "font-arabic" : ""}`}>
                  {language === "ar"
                    ? (about?.qualityAr || "نحن ملتزمون بأعلى معايير الجودة والسلامة في جميع مراحل الإنتاج، من اختيار المواد الخام إلى التعبئة النهائية.")
                    : (about?.quality || "We are committed to the highest quality and safety standards throughout all production stages, from raw material selection to final packaging.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      

    </div>
  )
}
