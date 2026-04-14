import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa"

export default function Footer() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", prefersDark)
      setIsDark(prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const next = !isDark

    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)

    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <footer className="relative mt-32 px-6 pb-16">
      <div className="max-w-6xl mx-auto">

        <div
          className="
          backdrop-blur-2xl
          bg-white/60 dark:bg-white/5
          border border-slate-200 dark:border-white/10
          rounded-3xl
          px-10 py-14
          transition-colors duration-500
        "
        >

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                LinkedInsta
              </h2>

              <p className="mt-4 text-sm text-black/80 dark:text-white/70 max-w-xs">
                Build influence with AI. Create smarter. Grow faster.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
                ABOUT
              </h3>

              <div className="flex flex-col gap-3 text-sm text-black dark:text-white/80">
                <Link to="/about">About</Link>
                <Link to="/features">Features</Link>
                <Link to="/pricing">Pricing</Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
                FOLLOW US
              </h3>

              <div className="flex flex-col gap-3 text-sm text-black dark:text-white/80">
                <a href="#">Github</a>
                <a href="#">Discord</a>
                <a href="#">Twitter</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
                LEGAL
              </h3>

              <div className="flex flex-col gap-3 text-sm text-black dark:text-white/80">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">Contact</a>
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-black dark:text-white">

            <p>© {new Date().getFullYear()} LinkedInsta</p>

            <div className="flex items-center gap-6">

              {/* Social Icons */}
              <div className="flex items-center gap-5 text-lg text-black/70 dark:text-white/70">

                <a className="hover:scale-110 transition">
                  <FaGlobe />
                </a>

                <a className="hover:scale-110 transition">
                  <FaTwitter />
                </a>

                <a className="hover:scale-110 transition">
                  <FaGithub />
                </a>

                <a className="hover:scale-110 transition">
                  <FaInstagram />
                </a>

              </div>

              {/* Toggle */}
              <button
                onClick={toggleTheme}
                className="
                px-4 py-2 rounded-full
                text-xs font-medium
                bg-black text-white
                dark:bg-white dark:text-black
                transition-all duration-300
                hover:scale-105
                "
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </footer>
  )
}
