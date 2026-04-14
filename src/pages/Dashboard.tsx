"use client"

import { useState, useEffect } from "react"
import { motion, easeOut, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

import Sidebar from "../components/dashboard/Sidebar"
import DashboardHero from "../components/dashboard/DashboardHero"
import CreatorTools from "../components/dashboard/CreatorTools"
import RecentPosts from "../components/dashboard/RecentPosts"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [loadingRoute, setLoadingRoute] = useState(false)

  const navigate = useNavigate()

  // ✅ Preload routes for faster navigation feel
  useEffect(() => {
    const preload = () => {
      const links = ["/PortfolioBuildup", "/templates"]
      links.forEach((link) => {
        const a = document.createElement("link")
        a.rel = "prefetch"
        a.href = link
        document.head.appendChild(a)
      })
    }
    preload()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  }

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }

  const glassCard = `
    rounded-3xl
    border border-slate-200 dark:border-white/10
    bg-white/60 dark:bg-white/5
    backdrop-blur-2xl
    shadow-xl
    transition-all duration-500
    hover:shadow-2xl hover:scale-[1.01]
  `

  // ✅ Smooth navigation + loading state
  const handleNavigate = (path: string) => {
    setPopupOpen(false)
    setLoadingRoute(true)

    setTimeout(() => {
      navigate(path)
    }, 300)
  }

  // ✅ Close popup with ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopupOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <section className="min-h-screen text-neutral-900 dark:text-white pt-24 px-4 sm:px-6 relative">

      {/* GLOBAL LOADER */}
      <AnimatePresence>
        {loadingRoute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[200]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-[60] px-3 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black shadow-md"
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto flex flex-col gap-8 lg:ml-[300px] xl:ml-[320px]"
      >

        <motion.div variants={item}>
          <DashboardHero />
        </motion.div>

        {/* PORTFOLIO CTA */}
        <motion.div variants={item} className={`${glassCard} p-6`}>
          <h2 className="text-xl font-semibold mb-2">Get Your Portfolio Ready 🚀</h2>
          <p className="text-sm mb-4">Build and launch your developer portfolio.</p>

          <button
            onClick={() => setPopupOpen(true)}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 transition"
          >
            Start Building
          </button>
        </motion.div>

        <motion.div variants={item}>
          <CreatorTools />
        </motion.div>

        <motion.div variants={item} className={`${glassCard} p-5`}>
          <h2 className="mb-4 text-lg font-semibold">Recent Posts</h2>
          <div className="font-mono text-sm text-green-400">
            <RecentPosts />
          </div>
        </motion.div>

      </motion.div>

      {/* ===== POPUP ===== */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
            onClick={() => setPopupOpen(false)}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl"
            >
              <h3 className="text-lg font-semibold mb-3">Choose an Option</h3>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavigate("/PortfolioBuildup")}
                  className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
                >
                  Build Portfolio
                </button>

                <button
                  onClick={() => handleNavigate("/templates")}
                  className="px-4 py-2 rounded-lg border hover:scale-105 transition"
                >
                  Browse Templates
                </button>

                <button
                  onClick={() => setPopupOpen(false)}
                  className="text-sm text-gray-500 mt-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}