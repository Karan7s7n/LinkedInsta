"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"


// ✅ Proper type added
type Action = {
  text: string
  onClick: () => void
  primary?: boolean
}

export default function HeroPage() {
  const navigate = useNavigate()

  const actions: Action[] = [
    {
      text: "Start Using AI",
      onClick: () => navigate("/login"),
      primary: true, // ✅ FIXED
    }
  ]

  const stats = [
    { value: "10K+", label: "Creators", icon: "🔥" },
    { value: "2M+", label: "Posts Generated", icon: "⚡" },
    { value: "95%", label: "Growth Rate", icon: "📈" },
  ]

  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  ]

  return (
    <section className="relative w-full overflow-hidden pt-40 pb-20 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ===== LEFT SIDE ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          className="text-center lg:text-left"
        >

          {/* ===== GRADIENT HEADING ===== */}
          <div className="relative inline-block">

            {/* Glow Layer */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                absolute inset-0
                text-5xl md:text-7xl xl:text-8xl
                font-extrabold leading-[0.92]

                text-transparent bg-clip-text
                bg-linear-to-r from-white via-blue-200 to-white

                blur-[30px] opacity-60
                pointer-events-none
              "
            >
              <br />AI That Shapes <br /> Your Digital Influence
            </motion.h1>

            {/* Main Text */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                relative
                text-5xl md:text-7xl xl:text-8xl
                font-extrabold leading-[0.92]

                text-transparent bg-clip-text
                bg-linear-to-r
                from-blue-900 via-blue-500 to-blue-900
                dark:from-white dark:via-blue-300 dark:to-purple-400
              "
            >
              AI That Shapes <br /> Your Digital Influence
            </motion.h1>

          </div>

          {/* ===== SUBTITLE ===== */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-8 text-lg md:text-xl
              text-black/80 dark:text-white/80
              max-w-lg mx-auto lg:mx-0
            "
          >
            Build influence with intelligent automation. Create, schedule, and grow faster with AI-powered tools.
          </motion.p>

          {/* ===== ACTION BUTTONS ===== */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`
                  px-6 py-3 rounded-full text-sm font-medium

                  ${action.primary === true
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white/60 dark:bg-white/5 text-black dark:text-white border border-white/20"}

                  backdrop-blur-xl
                  hover:scale-105 active:scale-95
                  transition
                `}
              >
                {action.text}
              </button>
            ))}
          </motion.div>

          {/* ===== STATS ===== */}
          <motion.div
            className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 dark:bg-white/10 backdrop-blur">
                  {stat.icon}
                </div>

                <div>
                  <p className="font-bold text-black dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {stat.label}
                  </p>
                </div>

              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* ===== RIGHT SIDE (IMAGE COLLAGE) ===== */}
        <motion.div className="relative h-100 w-full">

          {/* Floating shapes */}
          <div className="absolute top-0 left-1/3 w-16 h-16 bg-blue-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-purple-400/20 rounded-lg blur-xl" />

          {/* Images */}
          <motion.img
            src={images[0]}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 object-cover rounded-2xl shadow-xl"
          />

          <motion.img
            src={images[1]}
            className="absolute right-0 top-1/3 w-52 h-52 object-cover rounded-2xl shadow-xl"
          />

          <motion.img
            src={images[2]}
            className="absolute bottom-0 left-0 w-44 h-44 object-cover rounded-2xl shadow-xl"
          />

        </motion.div>

      </div>

    </section>
  )
}
