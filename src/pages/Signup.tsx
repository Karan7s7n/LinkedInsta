import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {

  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // 🔁 Auto-detect returning users (mock)
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/dashboard")
    }
  }, [])

  const handleAuth = () => {
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem("user", "true") // mock auth
      window.dispatchEvent(new Event("storage"))
      navigate("/dashboard")
    }, 1200)
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div
        className="
        w-full max-w-md p-10 rounded-3xl
        bg-white/40 dark:bg-white/5
        backdrop-blur-2xl
        border border-black/10 dark:border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
      "
      >

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500">
            Connect Account
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Login or create your account
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <div className="mb-6 relative group">

  {/* ✨ Adaptive Glow */}
  <div
    className="
    absolute -inset-[2px] rounded-xl
    bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500
    opacity-0 group-hover:opacity-80 dark:group-hover:opacity-100
    blur-md dark:blur-lg
    transition duration-500
  "
  />

  {/* 🌟 Button */}
  <button
    onClick={handleAuth}
    disabled={loading}
    className="
    relative flex h-12 w-full items-center justify-center gap-3 rounded-xl

    /* LIGHT MODE */
    bg-white text-black border border-black/10

    /* DARK MODE */
    dark:bg-white/10 dark:text-white dark:border-white/10

    backdrop-blur-xl
    font-medium transition-all duration-300

    hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
    group-hover:scale-[1.02]
  "
  >

    {/* Spinner OR Icon */}
    {loading ? (
      <div className="
        h-5 w-5 border-2 rounded-full animate-spin

        /* LIGHT */
        border-black/30 border-t-black

        /* DARK */
        dark:border-white/30 dark:border-t-white
      " />
    ) : (
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.4 0 6.4 1.2 8.8 3.5l6.6-6.6C35.3 2.4 30 0 24 0 14.6 0 6.5 5.5 2.6 13.5l7.7 6C12.4 13 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.5c-.5 2.9-2.2 5.3-4.6 6.9l7.2 5.6c4.2-3.9 7-9.7 7-17z"/>
        <path fill="#FBBC05" d="M10.3 28.5c-.5-1.4-.8-2.9-.8-4.5s.3-3.1.8-4.5l-7.7-6C1 16.7 0 20.2 0 24s1 7.3 2.6 10.5l7.7-6z"/>
        <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.2-5.6c-2 1.4-4.6 2.3-8.8 2.3-6.3 0-11.6-4.2-13.5-10l-7.7 6C6.5 42.5 14.6 48 24 48z"/>
      </svg>
    )}

    <span className="tracking-tight">
      {loading ? "Connecting..." : "Continue with Google"}
    </span>

  </button>
</div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-6">
          <hr className="w-full border-black/10 dark:border-white/10"/>
          <span className="text-sm text-black/60 dark:text-white/60">OR</span>
          <hr className="w-full border-black/10 dark:border-white/10"/>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <input
            type="email"
            placeholder="Enter your work email"
            className="w-full p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}

          <motion.button
            onClick={handleAuth}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="
            w-full p-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-500 to-violet-500
            shadow-lg flex items-center justify-center gap-2
          "
          >
            {loading && (
              <div className="h-4 w-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
            )}
            {mode === "login" ? "Login" : "Create Account"}
          </motion.button>

        </div>

        {/* TOGGLE */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm text-violet-500 hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>

      </div>

    </section>
  )
}
