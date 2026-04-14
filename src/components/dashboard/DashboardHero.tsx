"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { easeInOut, motion } from "framer-motion"

/* ===== Animated Text (No cn / alias issues) ===== */
function AnimatedText({ text }: { text: string }) {

  const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easeInOut // ✅ FIX
    }
  }
}

  return (
    <div className="flex flex-col items-center justify-center gap-2">

      <div className="relative">

        {/* MAIN TEXT */}
        <motion.h1
          className="
            text-4xl md:text-6xl font-extrabold text-center

            text-transparent bg-clip-text
            bg-linear-to-r
            from-blue-500 via-violet-500 to-purple-500
            dark:from-white dark:via-blue-300 dark:to-purple-400
          "
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          {text}
        </motion.h1>

        {/* ✨ UNDERLINE */}
        <motion.svg
          width="100%"
          height="20"
          viewBox="0 0 300 20"
          className="absolute -bottom-4 left-0"
        >
          <motion.path
            d="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              d: "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
              transition: { duration: 0.8 },
            }}
          />
        </motion.svg>

      </div>
    </div>
  )
}

/* ===== MAIN COMPONENT ===== */
export default function DashboardHero() {

  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [username, setUsername] = useState("User")

  useEffect(() => {
    const portfolio = localStorage.getItem("portfolio")

    if (!portfolio) {
      setShowPopup(true)
      setUsername("User")
    } else {
      const data = JSON.parse(portfolio)
      setUsername(data.name || "User")
      setShowPopup(false)
    }
  }, [])

  return (
    <section className="text-center relative">

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl z-50">

          <div className="
            p-8 rounded-3xl w-100 text-center

            bg-white/70 dark:bg-white/5
            backdrop-blur-2xl

            border border-slate-200/60 dark:border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          ">

            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
              Complete your Portfolio 🚀
            </h2>

            <p className="text-sm text-black/70 dark:text-white/70 mb-6">
              Unlock full features by building your portfolio
            </p>

            <button
              onClick={() => navigate("/portfolio-buildup")}
              className="
                w-full py-3 rounded-xl font-medium

                bg-black text-white
                dark:bg-white dark:text-black

                hover:scale-105 active:scale-95
                transition
              "
            >
              Build Portfolio
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-sm text-black/60 dark:text-white/60 hover:opacity-100"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* ===== HERO TEXT ===== */}
      <AnimatedText text={`Welcome ${username}`} />

    </section>
  )
}
