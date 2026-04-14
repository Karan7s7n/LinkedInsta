"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CreatorTools() {

  const tools = [
    { title: "Create Post", icon: "✍️", color: "from-pink-500/20 to-purple-500/20" },
    { title: "AI Suggestions", icon: "🤖", color: "from-blue-500/20 to-cyan-500/20" },
    { title: "Scheduler", icon: "📅", color: "from-orange-500/20 to-yellow-500/20" },
    { title: "Analytics", icon: "📊", color: "from-green-500/20 to-emerald-500/20" },
    { title: "Drafts", icon: "📝", color: "from-indigo-500/20 to-violet-500/20" },
  ]

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  // 🌀 AUTO SCROLL
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % tools.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [paused, tools.length])

  // 🧲 TILT
  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const midX = rect.width / 2
    const midY = rect.height / 2

    setRotate({
      x: ((y - midY) / midY) * -6,
      y: ((x - midX) / midX) * 6,
    })
  }

  const resetTilt = () => setRotate({ x: 0, y: 0 })

  return (
    <section className="w-full py-12">

      

      {/* ===== CAROUSEL CONTAINER ===== */}
      <div
        className="
          relative
          flex items-center justify-center
          h-[320px]
          max-w-5xl mx-auto
          overflow-hidden
        "
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {tools.map((tool, i) => {

          const offset = i - active
          const total = tools.length

          const adjusted =
            offset > total / 2
              ? offset - total
              : offset < -total / 2
              ? offset + total
              : offset

          const isActive = adjusted === 0

          return (
            <motion.div
              key={tool.title}
              onClick={() => setActive(i)}
              onMouseMove={isActive ? handleMouseMove : undefined}
              onMouseLeave={resetTilt}

              animate={{
                x: adjusted * 180, // ✅ reduced so cards stay inside
                scale: isActive ? 1 : 0.75,
                opacity: isActive ? 1 : 0.25,
                zIndex: 20 - Math.abs(adjusted),
                rotateY: adjusted * -15,
              }}

              style={
                isActive
                  ? {
                      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                    }
                  : {}
              }

              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22
              }}

              className={`
                absolute cursor-pointer group

                w-[260px] h-[300px]
                p-6

                rounded-3xl
                border border-slate-200/60 dark:border-white/10

                bg-white/60 dark:bg-white/5
                backdrop-blur-2xl

                ${isActive
                  ? "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                  : "shadow-md"}

                overflow-hidden
              `}
            >

              {/* 🌈 GLOW */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition
                bg-gradient-to-br ${tool.color}
              `} />

              {/* ✨ SHINE */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-white/10 transition
              " />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col justify-between h-full">

                <div className={`${isActive ? "text-4xl" : "text-2xl"}`}>
                  {tool.icon}
                </div>

                <div>
                  <div className={`
                    font-semibold
                    ${isActive
                      ? "text-lg text-black dark:text-white"
                      : "text-sm text-black/60 dark:text-white/60"}
                  `}>
                    {tool.title}
                  </div>

                  {isActive && (
                    <p className="text-xs mt-1 text-black/50 dark:text-white/50">
                      Auto rotating • Hover to pause
                    </p>
                  )}
                </div>

              </div>

            </motion.div>
          )
        })}

      </div>

    </section>
  )
}
