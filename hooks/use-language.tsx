"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    products: "Products",
    factory: "Factory",
    quality: "Quality",
    news: "News",
    contact: "Contact",

    // Hero Section
    heroTitle: "Leading Fish Meal Manufacturer in the UAE",
    heroSubtitle: "Producing high-quality fish meal powder from sardines and anchovies for animal feed industry",
    heroDescription:
      "Bahr Al-Arab Factory specializes in manufacturing premium fish meal with 60-70% protein content, serving the Middle East and North Africa region with a production capacity of 200-300 tons per month.",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Products
    ourProducts: "Our Products",
    productsDescription:
      "We produce two main types of high-quality fish meal powder with different protein concentrations",
    sardineProduct: "Sardine Fish Meal",
    sardineDescription: "High-quality fish meal powder made from fresh sardines with 60-55% protein content",
    anchovyProduct: "Anchovy Fish Meal",
    anchovyDescription: "Premium fish meal powder made from fresh anchovies with 70-64% protein content",

    // About
    aboutTitle: "About Bahr Al-Arab",
    vision: "Vision & Mission",
    visionText:
      "Our Vision is to be recognized as the leading company in the production of high-quality fish meal powder in the Middle East.",
    missionText:
      "The company's mission is to provide a high quality product and market it on a wider scale in the United Arab Emirates and the Middle East. Additionally, we aim to contribute to the development of human capital (specially the local fishermen) and society.",

    // Core Values
    coreValues: "Core Values",
    coreValuesText:
      "In Bahr Al Arab we take care of the full condition of safety and health for staff and the product. Also we took in our consideration the usual standard for preserving and production of fishmeal powder.",

    // Clients
    clients: "Our Clients",
    clientsText:
      "We are the main suppliers to Jordan in fish meal powder to feed concentrate manufacturers like Provimi Jordan and Poultry Plants like Sunukrut Poultry Farm, National Poultry Farm, and other companies. Also, our product is distributed in Egypt by Egyptian Companies.",

    // Advantages
    advantages: "Fishmeal Advantages",
    advantagesText:
      "We produce steam sterilized fish meal that is a high amino acids and protein, as the percentage of the protein range between 50% to 70%. Fish meal is natural meal that doesn't have any other chemical mixtures except anti oxide material that preserve this material.",

    // Factory
    factoryTitle: "Our Factory",
    productionCapacity: "Production Capacity",
    capacityText: "200-300 tons per month",
    capacityNote: "It depends on Fish availability and season of hunt.",

    // Contact
    contactTitle: "Contact Us",
    contactDescription: "Get in touch with us for high-quality fish meal products",

    // Footer
    footerDescription:
      "Leading fish meal powder manufacturer in the UAE specializing in high-quality animal feed meal from sardines and anchovies.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    businessHours: "Business Hours",

    // Common
    readMore: "Read More",
    viewAll: "View All",
    phone: "Phone",
    email: "Email",
    address: "Address",
    website: "Website",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "من نحن",
    products: "منتجاتنا",
    factory: "المصنع",
    quality: "الجودة",
    news: "الأخبار",
    contact: "اتصل بنا",

    // Hero Section
    heroTitle: "الشركة الرائدة في تصنيع مسحوق السمك في دولة الإمارات",
    heroSubtitle: "إنتاج مسحوق السمك عالي الجودة من السردين والأنشوجة لصناعة العلف الحيواني",
    heroDescription:
      "يختص مصنع بحر العرب في تصنيع مسحوق السمك الممتاز بمحتوى بروتين 60-70%، خدمة منطقة الشرق الأوسط وشمال أفريقيا بطاقة إنتاجية 200-300 طن شهرياً.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",

    // Products
    ourProducts: "منتجاتنا",
    productsDescription: "ننتج نوعين رئيسيين من مسحوق السمك عالي الجودة بتراكيز بروتين مختلفة",
    sardineProduct: "مسحوق سمك السردين",
    sardineDescription: "مسحوق سمك عالي الجودة مصنوع من السردين الطازج بمحتوى بروتين 60-55%",
    anchovyProduct: "مسحوق سمك الأنشوجة",
    anchovyDescription: "مسحوق سمك ممتاز مصنوع من الأنشوجة الطازجة بمحتوى بروتين 70-64%",

    // About
    aboutTitle: "عن بحر العرب",
    vision: "الرؤية والرسالة",
    visionText: "رؤيتنا هي أن يتم الاعتراف بنا كشركة رائدة في إنتاج مسحوق السمك في الشرق الأوسط.",
    missionText:
      "رسالة الشركة تتمثل في تقديم منتج ذا جودة عالية وتسويقه على نطاق واسع في دولة الإمارات العربية المتحدة والشرق الأوسط. بالإضافة إلى الإسهام في تنمية رأس المال البشري (خصوصاً الصيادين المحليين) والمجتمع.",

    // Core Values
    coreValues: "القيم الأساسية",
    coreValuesText:
      "في بحر العرب نحرص على الشروط الكاملة للسلامة وصحة الموظفين والمنتج أيضاً. كما أخذنا بعين الاعتبار المعايير المعتادة لحفظ وإنتاج مسحوق السمك.",

    // Clients
    clients: "عملاؤنا",
    clientsText:
      "نحن الموردون الرئيسيون لمصانع مركزات الأعلاف في الأردن مثل شركة بروفيمي الأردن ومزارع الدواجن مثل مزرعة مفاصل الدواجن الوطنية للدواجن وشركات أخرى. كما يتم توزيع منتجنا في مصر من قبل شركات مصرية.",

    // Advantages
    advantages: "مميزات مسحوق السمك",
    advantagesText:
      "ننتج مسحوق السمك المعقم بالبخار وهو غني بالأحماض الأمينية والبروتين، حيث تتراوح نسبة البروتين بين 50% إلى 70%. مسحوق السمك هو علف طبيعي لا يحتوي على أي خلطات كيميائية أخرى باستثناء مادة مضادة للأكسدة التي تحافظ على هذه المادة.",

    // Factory
    factoryTitle: "مصنعنا",
    productionCapacity: "الطاقة الإنتاجية للمصنع",
    capacityText: "200-300 طن شهرياً",
    capacityNote: "ويعتمد ذلك على توافر الأسماك وموسم الصيد.",

    // Contact
    contactTitle: "اتصل بنا",
    contactDescription: "تواصل معنا للحصول على منتجات مسحوق السمك عالية الجودة",

    // Footer
    footerDescription:
      "الشركة الرائدة في تصنيع مسحوق السمك في دولة الإمارات المتخصصة في علف الحيوانات عالي الجودة من السردين والأنشوجة.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    businessHours: "ساعات العمل",

    // Common
    readMore: "اقرأ المزيد",
    viewAll: "عرض الكل",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    website: "الموقع الإلكتروني",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language, mounted]);

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key;
  };

  const isRTL = language === "ar";

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
