import { motion, easeOut } from "framer-motion"

export default function CTAPage() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easeOut
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-4xl"
      >

        {/* Heading */}
        <div className="relative inline-block">

          {/* MOVING GLOW LAYER */}
          <motion.h1
            variants={item}
            className="
            absolute inset-0
            text-5xl md:text-7xl xl:text-8xl
            font-extrabold leading-[0.92]

            text-transparent bg-clip-text
            bg-linear-to-r

            from-white via-blue-200 to-white

            bg-size-[200%_200%]
            animate-[gradientFlow_6s_linear_infinite]

            blur-[25px]
            opacity-60

            pointer-events-none
            "
          >
            Start Scaling Now
          </motion.h1>


          {/* MAIN TEXT */}
          <motion.h1
            variants={item}
            className="
            relative
            text-5xl md:text-7xl xl:text-8xl
            font-extrabold leading-[0.92]

            text-transparent bg-clip-text
            bg-linear-to-r

            from-blue-900 via-blue-500 to-blue-900
            dark:from-white dark:via-blue-300 dark:to-purple-400

            
            animate-[gradientFlow_6s_linear_infinite]

            [text-shadow:
            0_0_30px_rgba(0,0,0,0.7),]
            "
          >
            Start Scaling Now
          </motion.h1>

        </div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="
          mt-8 text-xl md:text-2xl lg:text-3xl

          text-black/80 dark:text-white/85

          drop-shadow-[0_4px_15px_rgba(0,0,0,0.12)]
          dark:drop-shadow-[0_0_25px_rgba(200,220,255,0.35)]
        "
        >
          Join creators using AI to grow faster.
        </motion.p>

        {/* Button */}
        <motion.div
          variants={item}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
            className="
            mt-12 px-12 py-4 rounded-full
            font-semibold relative overflow-hidden

            text-black dark:text-white

            bg-white/70 dark:bg-black/60
            backdrop-blur-xl

            border border-white/30 dark:border-white/10

            shadow-[0_10px_40px_rgba(120,150,255,0.25)]
            dark:shadow-[0_0_45px_rgba(150,180,255,0.35)]

            hover:shadow-[0_15px_70px_rgba(120,150,255,0.45)]
            dark:hover:shadow-[0_0_90px_rgba(150,200,255,0.6)]

            transition-all duration-300
            "
          >

            {/* Glow layer */}
            <span
              className="
              absolute inset-0
              opacity-0 hover:opacity-100

              bg-linear-to-r
              from-purple-500 via-blue-400 to-indigo-500

              blur-2xl
              transition duration-500
              "
            />

            <span className="relative z-10">
              Get Started Free
            </span>

          </motion.button>
        </motion.div>

      </motion.div>

    </section>
  )
}
