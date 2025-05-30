"use client"
import { AuthGuard } from "@/components/admin/auth-guard"
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function GalleryAdminPage() {
  return (
    <AuthGuard>
      <GalleryAdminContent />
    </AuthGuard>
  )
}

function GalleryAdminContent() {
  const { language, isRTL } = useLanguage();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ caption: "", captionAr: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch(() => {
        setError(language === "ar" ? "تعذر تحميل المعرض" : "Failed to load gallery");
        setLoading(false);
      });
  }, [language]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError(language === "ar" ? "الملف المحدد ليس صورة. الرجاء اختيار صورة فقط." : "Selected file is not an image. Please select an image only.");
      setImageFile(null);
      setImagePreview("");
      return;
    }
    setFileError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setFileError(language === "ar" ? "يرجى اختيار صورة." : "Please select an image.");
      return;
    }
    setSubmitting(true);
    // Upload image to server
    const formData = new FormData();
    formData.append("file", imageFile);
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadRes.json();
    if (!uploadData.url) {
      setFileError(language === "ar" ? "فشل رفع الصورة." : "Image upload failed.");
      setSubmitting(false);
      return;
    }
    // Add gallery entry
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: uploadData.url, caption: form.caption, captionAr: form.captionAr }),
    });
    setForm({ caption: "", captionAr: "" });
    setImageFile(null);
    setImagePreview("");
    setSubmitting(false);
    // Refresh gallery
    setLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setGallery(gallery.filter((item) => item.id !== id));
  };

  return (
    <section className="py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{language === "ar" ? "إدارة المعرض" : "Manage Gallery"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {fileError && <div className="text-red-600 text-sm">{fileError}</div>}
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
        )}
        <Input name="caption" value={form.caption} onChange={handleChange} placeholder={language === "ar" ? "التسمية (إنجليزي)" : "Caption (English)"} required />
        <Input name="captionAr" value={form.captionAr} onChange={handleChange} placeholder={language === "ar" ? "التسمية (عربي)" : "Caption (Arabic)"} required />
        <Button type="submit" disabled={submitting}>{submitting ? (language === "ar" ? "جارٍ الإضافة..." : "Adding...") : (language === "ar" ? "إضافة صورة" : "Add Image")}</Button>
      </form>
      {loading ? (
        <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((item) => (
            <Card key={item.id} className="relative">
              <CardContent className="p-4">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-48 object-cover rounded mb-2" />
                <div className="font-bold mb-1">{language === "ar" ? item.captionAr : item.caption}</div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="absolute top-2 right-2">{language === "ar" ? "حذف" : "Delete"}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
} 