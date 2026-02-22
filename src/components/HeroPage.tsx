import { motion } from "framer-motion"

export default function HeroPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* background */}

      {/* hero content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl"
      >
        <h1 className="text-6xl md:text-8xl xl:text-9xl font-extrabold leading-[0.92] text-white">
          AI That Shapes <br /> Your Digital Influence
        </h1>

        <p className="mt-6 text-2xl md:text-3xl text-slate-300">
          Build influence with intelligent automation.
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
          Start Using AI
        </motion.button>
      </motion.div>

    </section>
  )
}
