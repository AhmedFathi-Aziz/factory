"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";

export default function NewsPage() {
  const { language, isRTL } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [language]);

  return (
    <>
      <Header />
      <div className={`max-w-4xl mx-auto py-12 px-4 mt-24`} dir={isRTL ? "rtl" : "ltr"}>
        <h1 className={`text-3xl font-bold mb-8 ${isRTL ? "font-arabic" : ""}`}>
          {language === "ar" ? "آخر الأخبار" : "Latest News"}
        </h1>
        <div className="space-y-8">
          {loading && (
            <div className="text-gray-500">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          )}
          {!loading && news.length === 0 && (
            <div className="text-gray-500">
              {language === "ar" ? "لا توجد أخبار" : "No news found."}
            </div>
          )}
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow transition-shadow duration-200 border border-gray-100 p-6 md:p-8 hover:shadow-lg group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div>
                  <h2 className={`text-2xl font-extrabold ${isRTL ? "font-arabic" : ""} text-slate-800 group-hover:text-emerald-700 transition-colors duration-200`}>
                    {language === "ar" ? item.titleAr : item.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 font-semibold tracking-wide shadow-sm">
                      {language === "ar" ? item.categoryAr : item.category}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 md:mt-0 flex-shrink-0 font-medium">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className={`text-slate-700 text-base leading-relaxed ${isRTL ? "font-arabic" : ""}`}
                  dir={isRTL ? "rtl" : "ltr"}>
                  {language === "ar" ? item.contentAr : item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
} 