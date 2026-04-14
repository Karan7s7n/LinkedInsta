"use client"

import { motion } from "framer-motion"
import CircularGallery from "../components/CircularGallery"

export default function FeaturesPage() {

  const features = [
    {
      title: "AI Content Creation",
      subtitle: "Generate high-quality posts instantly",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
    {
      title: "Smart Scheduling",
      subtitle: "Post at perfect times automatically",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    },
    {
      title: "Analytics Engine",
      subtitle: "Track performance in real-time",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
    {
      title: "AI Suggestions",
      subtitle: "Improve engagement with smart ideas",
      image: "https://images.unsplash.com/photo-1674027392885-68c8b3f1e2f7",
    },
    {
      title: "Draft System",
      subtitle: "Save and refine your ideas",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
    {
      title: "Growth Insights",
      subtitle: "Predict what works before posting",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
  ]

  return (
    <section className="relative min-h-screen px-6 pt-36 pb-20">

      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="
          text-4xl md:text-6xl font-extrabold

          text-transparent bg-clip-text
          bg-linear-to-r

          from-blue-900 via-blue-500 to-blue-900
          dark:from-white dark:via-blue-300 dark:to-purple-400

          bg-size-[200%_200%]
          animate-[gradientFlow_6s_linear_infinite]
        ">
          Explore Features
        </h1>

        <p className="mt-6 text-black/70 dark:text-white/70 max-w-xl mx-auto">
          Experience the future of content creation with immersive tools.
        </p>
      </motion.div>

      {/* ===== 3D GALLERY ===== */}
      <CircularGallery items={features} />

    </section>
  )
}
