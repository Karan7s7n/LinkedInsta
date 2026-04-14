"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  BarChart2,
  Folder,
  Layers,
  PieChart,
  Settings,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from "lucide-react"

type Props = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

type NavItem = {
  label: string
  icon?: any
  href?: string
  badge?: string | number
  children?: NavItem[]
}

export default function Sidebar({ isOpen, setIsOpen }: Props) {

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [active, setActive] = useState("Dashboard")

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const navItems: NavItem[] = [
    { label: "Home", icon: Home },
    { label: "Posts", icon: Layers },

    {
      label: "Folders",
      icon: Folder,
      children: [
        { label: "View all", badge: 18 },
        { label: "Recent", badge: 8 },
        { label: "Favorites", badge: 6 },
        { label: "Shared", badge: 4 },
      ]
    },

    { label: "Reporting", icon: PieChart },
    { label: "Settings", icon: Settings },

    {
      label: "Support",
      icon: MessageCircle,
      badge: "●"
    }
  ]

  return (
    <>
      {/* ===== OVERLAY ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ===== SIDEBAR ===== */}
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="
              fixed z-50
              top-0 lg:top-24
              left-0 lg:left-4

              w-72 lg:w-64
              h-full lg:h-[calc(100vh-6rem)]

              flex flex-col
              p-4

              rounded-none lg:rounded-3xl

              border border-slate-200/60 dark:border-white/10
              bg-white/60 dark:bg-white/5
              backdrop-blur-2xl

              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
          >

            {/* ===== HEADER ===== */}
            <div className="mb-6 px-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                LinkedInsta
              </h2>
            </div>

            {/* ===== NAV ===== */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">

              {navItems.map((item, i) => {
                const Icon = item.icon
                const isOpenMenu = openMenus[item.label]
                const isActive = active === item.label

                return (
                  <div key={i}>

                    {/* MAIN ITEM */}
                    <button
                      onClick={() => {
                        setActive(item.label)
                        if (item.children) toggleMenu(item.label)
                      }}
                      className={`
                        w-full flex items-center justify-between
                        px-3 py-2.5 rounded-xl text-sm

                        transition-all duration-200

                        ${isActive
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon size={18} />}
                        {item.label}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                            {item.badge}
                          </span>
                        )}

                        {item.children && (
                          <ChevronDown
                            size={16}
                            className={`transition ${isOpenMenu ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </button>

                    {/* SUB MENU */}
                    <AnimatePresence>
                      {item.children && isOpenMenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.children.map((sub, j) => (
                            <button
                              key={j}
                              className="
                                w-full text-left px-3 py-2 rounded-lg text-sm
                                text-black/60 dark:text-white/60
                                hover:bg-black/5 dark:hover:bg-white/10
                                hover:text-black dark:hover:text-white
                                transition
                              "
                            >
                              {sub.label}

                              {sub.badge && (
                                <span className="ml-2 text-xs text-green-500">
                                  ({sub.badge})
                                </span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )
              })}

            </div>

            {/* ===== FOOTER CTA ===== */}
            <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-white/10">

              <button
                className="
                  w-full px-4 py-2 rounded-xl text-sm font-medium

                  bg-black text-white
                  dark:bg-white dark:text-black

                  hover:scale-[1.02]
                  active:scale-[0.98]

                  transition
                "
              >
                Upgrade Plan 🚀
              </button>

            </div>

          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
