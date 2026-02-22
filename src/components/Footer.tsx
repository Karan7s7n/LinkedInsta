import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Footer() {
  const [isDark, setIsDark] = useState<boolean>(false)

  // Initialize theme (system + saved preference)
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", systemDark)
      setIsDark(systemDark)
    }
  }, [])

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <footer className="relative mt-32 px-6 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* Glass Container */}
        <div className="
          backdrop-blur-2xl
          bg-white/60 dark:bg-white/5
          border border-slate-200 dark:border-white/10
          rounded-3xl
          px-10 py-16
          transition-colors duration-500
        ">

          {/* Top Section */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              LinkedInsta
            </h2>

            <p className="mt-4 text-slate-600 dark:text-white/60 text-sm sm:text-base">
              Build influence with AI. Create smarter. Grow faster.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-white/70">
            {["Features", "Pricing", "About", "Contact", "Careers"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Bottom */}
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-white/50">

            <p>
              © {new Date().getFullYear()} LinkedInsta
            </p>

            <div className="flex items-center gap-6">

              <button
                onClick={toggleTheme}
                className="
                  px-4 py-2 rounded-full
                  text-xs font-medium
                  bg-slate-900 text-white
                  dark:bg-white dark:text-black
                  transition-all duration-300
                  hover:scale-105
                "
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>

              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">
                Privacy
              </a>

              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">
                Terms
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
