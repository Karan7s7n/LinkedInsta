import { motion, easeOut } from "framer-motion"

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
      transition={{ duration: 0.9, ease: easeOut }}
      whileHover={{ y: -18, scale: 1.04 }}
      className={`
        relative h-120 rounded-[42px] overflow-hidden
        ${className}

        shadow-[0_25px_70px_rgba(0,0,0,0.15)]
        dark:shadow-[0_0_50px_rgba(120,150,255,0.18)]

        hover:shadow-[0_35px_90px_rgba(120,150,255,0.35)]

        transition-all duration-500
      `}
    >

      {/* IMAGE */}
      <img
        src={img}
        alt=""
        className="
        absolute inset-0 w-full h-full object-cover
        scale-110 hover:scale-125
        transition duration-700
        "
      />

      {/* GLASS OVERLAY */}
      <div
        className="
        absolute inset-0

        bg-linear-to-t
        from-white/85 via-white/40 to-transparent

        dark:from-black/80 dark:via-black/40 dark:to-transparent
      "
      />

      {/* EDGE RING */}
      <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10 rounded-[42px]" />

      {/* TEXT */}
      <div className="absolute bottom-10 left-10">

        <p className="text-xs tracking-[0.25em] text-violet-500 mb-2">
          {tag}
        </p>

        <h3 className="text-2xl font-semibold text-black dark:text-white">
          {title}
        </h3>

      </div>

    </motion.div>
  )
}

export default function ShowcasePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-10 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto w-full">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-24"
        >

          <h1
            className="
            text-5xl md:text-6xl lg:text-7xl font-extrabold

            text-transparent bg-clip-text
            bg-linear-to-r

            from-blue-900 via-blue-500 to-blue-900
            dark:from-white dark:via-blue-300 dark:to-purple-400

            bg-size-[200%_200%]
            animate-[gradientFlow_6s_linear_infinite]

            drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            dark:drop-shadow-[0_0_40px_rgba(180,200,255,0.45)]
          "
          >
            Experience the Refraction
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-black/80 dark:text-white/80">
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
