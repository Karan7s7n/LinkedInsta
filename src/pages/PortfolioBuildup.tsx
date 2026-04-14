"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function PortfolioBuilder() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    theme: "",
    layout: "",
    goal1: "",
    goal2: "",
    goal3: "",
    goal4: "",
    goal5: "",
  })

  // ✅ Auto-fill from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolioData")
    if (saved) setFormData(JSON.parse(saved))
  }, [])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  // ✅ Fake backend call (replace with real API)
  const saveToBackend = async () => {
    try {
      await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch (err) {
      console.error("Backend error", err)
    }
  }

  const handleSubmit = async () => {
    localStorage.setItem("portfolioData", JSON.stringify(formData))
    await saveToBackend()
    alert("Portfolio saved 🚀")
  }

  const inputStyle = "w-full p-3 rounded-lg border bg-transparent"

  const progress = (step / 4) * 100

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl">

        {/* ✅ Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-black dark:bg-white h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Build Your Portfolio (Step {step}/4)
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-4">
              <input name="name" value={formData.name} placeholder="Your Name" className={inputStyle} onChange={handleChange} />
              <input name="email" value={formData.email} placeholder="Email" className={inputStyle} onChange={handleChange} />
              <input name="role" value={formData.role} placeholder="Your Role" className={inputStyle} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-4">
              <select name="theme" value={formData.theme} className={inputStyle} onChange={handleChange}>
                <option value="">Select Theme</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>

              <select name="layout" value={formData.layout} className={inputStyle} onChange={handleChange}>
                <option value="">Select Layout</option>
                <option value="minimal">Minimal</option>
                <option value="modern">Modern</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-4">
              <input name="goal1" value={formData.goal1} placeholder="Main goal" className={inputStyle} onChange={handleChange} />
              <input name="goal2" value={formData.goal2} placeholder="Target audience" className={inputStyle} onChange={handleChange} />
              <input name="goal3" value={formData.goal3} placeholder="Key features" className={inputStyle} onChange={handleChange} />
              <input name="goal4" value={formData.goal4} placeholder="Design inspiration" className={inputStyle} onChange={handleChange} />
              <input name="goal5" value={formData.goal5} placeholder="Anything extra" className={inputStyle} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        {/* STEP 4 PREVIEW */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-lg font-semibold mb-4">Preview</h3>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {formData.name}</p>
              <p><b>Email:</b> {formData.email}</p>
              <p><b>Role:</b> {formData.role}</p>
              <p><b>Theme:</b> {formData.theme}</p>
              <p><b>Layout:</b> {formData.layout}</p>
              <p><b>Goal:</b> {formData.goal1}</p>
            </div>
          </motion.div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={prevStep} className="px-4 py-2 rounded-lg border">Back</button>
          )}

          {step < 4 ? (
            <button onClick={nextStep} className="ml-auto px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">Next</button>
          ) : (
            <button onClick={handleSubmit} className="ml-auto px-4 py-2 rounded-lg bg-green-500 text-white">Save & Finish</button>
          )}
        </div>

      </div>
    </section>
  )
}