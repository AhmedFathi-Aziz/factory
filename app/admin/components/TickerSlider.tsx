"use client"

import { useRef, useEffect } from "react"

interface TickerSliderProps {
  images: string[]
  speed?: number // pixels per second
}

export default function TickerSlider({ images, speed = 60 }: TickerSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let start: number | null = null
    let scrollLeft = 0

    function step(timestamp: number) {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const distance = (elapsed / 1000) * speed
      container.scrollLeft = scrollLeft + distance

      // Loop
      if (container.scrollLeft >= container.scrollWidth / 2) {
        scrollLeft = 0
        container.scrollLeft = 0
        start = timestamp
      }
      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [images, speed])

  // Duplicate images for seamless loop
  const allImages = [...images, ...images]

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-hidden whitespace-nowrap bg-white py-4"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
    >
      {allImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="inline-block h-32 w-auto mx-6 object-contain"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      ))}
    </div>
  )
} 