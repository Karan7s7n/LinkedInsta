import { useState } from "react"
import { motion, easeOut } from "framer-motion"

export default function AuthPage() {

  const [platform, setPlatform] = useState("linkedin")
  const [mode, setMode] = useState("login")

  const platforms = [
    { id: "linkedin", label: "LinkedIn", icon: "💼" },
    { id: "instagram", label: "Instagram", icon: "📸" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full top-20 left-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="
        relative z-10
        w-full max-w-md p-10 rounded-3xl

        bg-white/40 dark:bg-white/5
        backdrop-blur-2xl

        border border-black/10 dark:border-white/10

        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
        dark:shadow-[0_0_60px_rgba(120,150,255,0.25)]
      "
      >

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1
            className="
            text-3xl font-extrabold mb-2

            text-transparent bg-clip-text
            bg-linear-to-r
            from-blue-500 via-violet-500 to-purple-500

            bg-size-[200%_200%]
            animate-[gradientFlow_6s_linear_infinite]
          "
          >
            Connect Your Account
          </h1>

          <p className="text-sm text-black/60 dark:text-white/60">
            Login or create your creator dashboard
          </p>

        </div>

        {/* LOGIN / SIGNUP SWITCH */}

        <div className="relative flex bg-white/50 dark:bg-white/5 rounded-xl p-1 mb-8">

          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 rounded-lg bg-violet-500/20"
            animate={{ x: mode === "login" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />

          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative w-1/2 py-2 text-sm font-semibold ${
                mode === m
                  ? "text-black dark:text-white"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              {m === "login" ? "Login" : "Signup"}
            </button>
          ))}

        </div>

        {/* PLATFORM SELECTOR */}

        <div className="relative flex gap-3 bg-white/50 dark:bg-white/5 rounded-2xl p-2 mb-8">

          <motion.div
            layoutId="platformSelector"
            className="
            absolute top-2 bottom-2 w-1/2 rounded-xl
            bg-white dark:bg-white/10
            shadow
          "
            animate={{
              x: platform === "linkedin" ? 0 : "100%"
            }}
          />

          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className="relative flex items-center justify-center gap-2 w-1/2 py-3 font-medium"
            >
              <span className="text-lg">{p.icon}</span>
              {p.label}
            </button>
          ))}

        </div>

        {/* FORM */}

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="
            w-full p-3 rounded-xl

            bg-white/70 dark:bg-white/5
            border border-black/10 dark:border-white/10

            focus:outline-none
            focus:ring-2 focus:ring-violet-500
            transition
          "
          />

          <input
            type="password"
            placeholder="Password"
            className="
            w-full p-3 rounded-xl

            bg-white/70 dark:bg-white/5
            border border-black/10 dark:border-white/10

            focus:outline-none
            focus:ring-2 focus:ring-violet-500
            transition
          "
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="
              w-full p-3 rounded-xl

              bg-white/70 dark:bg-white/5
              border border-black/10 dark:border-white/10

              focus:outline-none
              focus:ring-2 focus:ring-violet-500
            "
            />
          )}

          {/* BUTTON */}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
            w-full p-3 rounded-xl font-semibold

            text-white
            bg-linear-to-r
            from-blue-500 via-violet-500 to-purple-500

            shadow-lg
            hover:shadow-[0_0_25px_rgba(120,120,255,0.6)]
          "
          >
            {mode === "login" ? "Login" : "Create Account"}
          </motion.button>

        </div>

        {/* FOOTER */}

        <p className="text-center mt-6 text-xs text-black/50 dark:text-white/50">
          By continuing you agree to our Terms & Privacy Policy
        </p>

      </motion.div>

    </section>
  )
}
