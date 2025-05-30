"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ImageSliderProps {
  images: string[]
  autoPlay?: boolean
  speed?: number // seconds per image
  isRTL?: boolean // pass this if you want RTL support
}

export default function ImageSlider({ images, autoPlay = true, speed = 3, isRTL = false }: ImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return undefined;
    timer.current = setInterval(() => {
      handleChange((current + 1) % images.length, "right")
    }, speed * 1000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [autoPlay, images.length, speed, current])

  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  const handleChange = (idx: number, dir: "left" | "right") => {
    setDirection(dir)
    setCurrent(idx)
  }

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full h-72 md:h-96 bg-white mt-8 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-72 md:h-96 flex items-center justify-center">
        {images.map((src, idx) => (
          <motion.img
            key={src}
            src={src}
            alt={`Slider image ${idx + 1}`}
            className="w-full h-72 md:h-96 object-cover rounded-2xl absolute"
            initial={false}
            animate={{
              opacity: idx === current ? 1 : 0,
              x: idx === current ? 0 : (direction === "right" ? (isRTL ? -100 : 100) : (isRTL ? 100 : -100)),
              zIndex: idx === current ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            draggable={false}
            style={{ userSelect: "none", pointerEvents: idx === current ? "auto" : "none" }}
          />
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow"
        onClick={() => handleChange((current - 1 + images.length) % images.length, "left")}
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow"
        onClick={() => handleChange((current + 1) % images.length, "right")}
      >
        &#8594;
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => handleChange(idx, idx > current ? "right" : "left")}
            className={`inline-block w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${idx === current ? "bg-emerald-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
} 