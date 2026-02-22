import { motion } from "framer-motion"

const Card = ({
  img,
  tag,
  title,
  className = "",
}: {
  img: string
  tag: string
  title: string
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ y: -18, scale: 1.03 }}
      className={`relative h-[480px] rounded-[42px] overflow-hidden shadow-2xl ${className}`}
    >
      {/* image */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />

      {/* cinematic dark fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* glow edge */}
      <div className="absolute inset-0 ring-1 ring-white/15 rounded-[42px]" />

      {/* text */}
      <div className="absolute bottom-10 left-10 text-white">
        <p className="text-xs tracking-[0.25em] text-violet-400 mb-2">
          {tag}
        </p>
        <h3 className="text-2xl font-semibold">
          {title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function ShowcasePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-10 overflow-hidden">

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white">
            Experience the Refraction
          </h1>

          <p className="mt-6 text-2xl text-slate-300">
            See how creators use AI to build standout digital identities.
          </p>
        </motion.div>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-14">

          <Card
            img="https://picsum.photos/800/1200?random=1"
            tag="CASE STUDY 01"
            title="The Minimalist Director"
          />

          <Card
            className="md:mt-14"
            img="https://picsum.photos/800/1200?random=2"
            tag="CASE STUDY 02"
            title="Tech Couture Labs"
          />

          <Card
            img="https://picsum.photos/800/1200?random=3"
            tag="CASE STUDY 03"
            title="Ethos Architecture"
          />

        </div>
      </div>
    </section>
  )
}
