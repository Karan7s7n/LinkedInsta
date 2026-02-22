import { motion } from "framer-motion"

export default function FeaturesPage() {
  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden">

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-14 text-white">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-0.5 bg-violet-400" />
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase">
              The Prism Reveal
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold">
            A Lensed Perspective on Growth
          </h1>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10">

          {/* BIG LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            whileHover={{ y: -12 }}
            className="
              rounded-3xl p-10 min-h-105
              bg-white/10 backdrop-blur-2xl
              border border-white/20 shadow-2xl
              flex flex-col justify-between
            "
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-8 text-xl">
                ✨
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Voice Sculpting
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Our proprietary AI refines your natural tone into a high-impact
                signature style — polishing your perspective across every platform.
              </p>
            </div>

            {/* subtle wave bars */}
            <div className="mt-10 h-24 rounded-2xl bg-white/10 flex items-center justify-center gap-3">
              {[18, 30, 42, 30, 18].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded bg-violet-400"
                  animate={{ height: [h, h + 12, h] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{ height: h }}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-10">

            {/* TOP CARD */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              whileHover={{ y: -10 }}
              className="
                flex gap-8 rounded-3xl p-10
                bg-white/10 backdrop-blur-2xl
                border border-white/20 shadow-xl
              "
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                🔗
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">
                  Network Insight
                </h3>

                <p className="text-slate-300">
                  AI-driven mapping uncovers powerful connections and strategic growth paths.
                </p>
              </div>
            </motion.div>

            {/* BOTTOM MINI CARDS */}
            <div className="grid sm:grid-cols-2 gap-10">

              {[
                { icon: "📈", title: "Growth Synthesis", desc: "Predict performance before publishing." },
                { icon: "⚙️", title: "Refraction Engine", desc: "Adaptive strategy in real time." },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="
                    rounded-3xl p-7
                    bg-white/10 backdrop-blur-2xl
                    border border-white/20 shadow-xl
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4 text-lg">
                    {f.icon}
                  </div>

                  <h3 className="font-bold mb-2">
                    {f.title}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
