import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const navRef = useRef<HTMLDivElement>(null)

  const [scrolled, setScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const linkStyle =
    "magnetic relative text-sm font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition"

  /* ---------------- Logo Click ---------------- */

  const handleLogoClick = () => {
    // ✅ always check fresh state
    const user = localStorage.getItem("user")
    navigate(user ? "/dashboard" : "/")
  }

  /* ---------------- Auth Sync ---------------- */

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user")
      setLoggedIn(!!user)
    }

    checkUser()

    // ✅ updates when tab refocuses
    window.addEventListener("focus", checkUser)

    return () => window.removeEventListener("focus", checkUser)
  }, [])

  /* ---------------- Logout ---------------- */

  const handleLogout = () => {
  localStorage.removeItem("user")

  setLoggedIn(false)

  navigate("/", { replace: true })

  // 🔥 force React reset (important)
  window.location.reload()
}

  /* ---------------- Scroll Morph ---------------- */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ---------------- Magnetic Buttons ---------------- */

  useEffect(() => {
    const magnets = document.querySelectorAll(".magnetic")

    magnets.forEach((el) => {
      const element = el as HTMLElement

      const move = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        element.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
      }

      const reset = () => {
        element.style.transform = `translate(0px,0px)`
      }

      element.addEventListener("mousemove", move)
      element.addEventListener("mouseleave", reset)

      return () => {
        element.removeEventListener("mousemove", move)
        element.removeEventListener("mouseleave", reset)
      }
    })
  }, [])

  /* ---------------- Cursor Light Reflection ---------------- */

  useEffect(() => {
    const moveLight = (e: MouseEvent) => {
      if (!navRef.current) return

      const rect = navRef.current.getBoundingClientRect()

      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      navRef.current.style.setProperty("--x", `${x}%`)
      navRef.current.style.setProperty("--y", `${y}%`)
    }

    window.addEventListener("mousemove", moveLight)
    return () => window.removeEventListener("mousemove", moveLight)
  }, [])

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-6 pointer-events-none">
      <div className="relative max-w-5xl mx-auto pointer-events-auto">

        {/* Gradient Glow */}
        <div className="absolute inset-0 -z-20 blur-3xl opacity-60 scale-110 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient" />

        {/* Navbar */}
        <div
          ref={navRef}
          className={`
          relative overflow-hidden
          transition-all duration-500
          rounded-full
          flex justify-between items-center
          border border-black/10 dark:border-white/20
          backdrop-blur-3xl
          bg-white/40 dark:bg-white/10
          shadow-[0_8px_40px_rgba(0,0,0,0.15)]
          
          ${scrolled ? "px-6 py-2 scale-95" : "px-8 py-3"}
          `}
        >

          {/* Light reflection */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.5), transparent 40%)",
            }}
          />

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="logo-glow magnetic text-lg font-bold text-black dark:text-white tracking-tight transition"
          >
            LinkedInsta
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-8">

            {/* Common Links */}
            <Link to="/features" className={linkStyle}>Features</Link>
            <Link to="/pricing" className={linkStyle}>Pricing</Link>
            <Link to="/about" className={linkStyle}>About</Link>

            {loggedIn ? (
              <div className="flex items-center gap-6">

                {/* Profile */}
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  onClick={() => navigate("/dashboard")}
                  className="magnetic w-9 h-9 rounded-full cursor-pointer border border-black/10 dark:border-white/30 hover:scale-105 transition"
                />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                  magnetic
                  text-sm font-medium
                  px-4 py-1.5
                  rounded-full
                  bg-black/10 hover:bg-black/20
                  dark:bg-white/10 dark:hover:bg-white/20
                  text-black dark:text-white
                  transition
                  "
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                {/* Get Started */}
                <Link
                  to="/signup"
                  className="
                  btn-glow
                  magnetic
                  text-sm font-semibold
                  px-5 py-1.5
                  rounded-full
                  bg-violet-600 text-white
                  hover:scale-105
                  transition
                  "
                >
                  Get Started
                </Link>

              </div>
            )}

          </nav>
        </div>
      </div>
    </div>
  )
}
