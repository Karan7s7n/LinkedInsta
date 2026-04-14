"use client"

import React, { useState, useEffect, useRef } from "react"

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

export interface GalleryItem {
  title: string
  subtitle: string
  image: string
}

export default function CircularGallery({
  items,
  radius = 500,
  autoRotateSpeed = 0.05,
}: {
  items: GalleryItem[]
  radius?: number
  autoRotateSpeed?: number
}) {
  const [rotation, setRotation] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const scrollTimeoutRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)

  /* ===== SCROLL ROTATION ===== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      const progress = window.scrollY / maxScroll
      setRotation(progress * 360)

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 120)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ===== AUTO ROTATE ===== */
  useEffect(() => {
    const animate = () => {
      if (!isScrolling) {
        setRotation((prev) => prev + autoRotateSpeed)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isScrolling, autoRotateSpeed])

  const angleStep = 360 / items.length

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center"
      style={{ perspective: "2000px" }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, i) => {
          const angle = i * angleStep

          return (
            <div
              key={i}
              className="absolute w-[280px] h-[380px]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                left: "50%",
                top: "50%",
                marginLeft: "-140px",
                marginTop: "-190px",
              }}
            >
              {/* CARD */}
              <div
                className="
                group relative w-full h-full rounded-3xl overflow-hidden

                bg-white/60 dark:bg-white/5
                backdrop-blur-2xl

                border border-black/10 dark:border-white/10

                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                hover:shadow-[0_30px_80px_rgba(120,150,255,0.25)]

                transition-all duration-500
                "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-5 text-white">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-xs opacity-70">{item.subtitle}</p>
                </div>

                {/* HOVER GLOW */}
                <div className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-blue-500/20 to-purple-500/20
                  transition
                " />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
