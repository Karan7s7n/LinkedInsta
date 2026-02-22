import { motion } from "framer-motion"

export default function CTAPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* background layer */}

      {/* content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl"
      >
        <h1 className="text-6xl md:text-7xl xl:text-8xl font-extrabold text-white">
          Start Scaling Today
        </h1>

        <p className="mt-6 text-2xl md:text-3xl text-slate-300">
          Join creators using AI to grow faster.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            mt-12 px-12 py-4 rounded-full
            bg-white text-black font-semibold
            shadow-[0_0_60px_rgba(140,170,255,0.45)]
          "
        >
          Get Started Free
        </motion.button>
      </motion.div>

    </section>
  )
}
