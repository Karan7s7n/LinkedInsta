import { motion } from "framer-motion"

const features = [
  { title: "Voice Sculpting", icon: "✨" },
  { title: "Network Intelligence", icon: "🧠" },
  { title: "Growth Prediction", icon: "📈" },
]

export default function FeaturesPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* background layer */}

      {/* content */}
      <div className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl w-full">

        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: "easeOut",
            }}
            whileHover={{ y: -14, scale: 1.03 }}
            className="
              p-10 rounded-3xl
              bg-white/10 dark:bg-white/5
              backdrop-blur-xl
              border border-white/20
              shadow-2xl
              text-white
            "
          >
            <div className="text-4xl mb-6">{f.icon}</div>

            <h3 className="text-2xl font-bold mb-3">
              {f.title}
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Smart AI systems designed to scale your presence automatically.
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  )
}
