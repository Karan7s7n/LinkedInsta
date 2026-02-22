import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import SnowfallShaderBackground from "./components/SnowfallShaderBackground"

import Home from "./pages/HomePage"
import Features from "./pages/FeaturesPage"
import Pricing from "./pages/PricingPage"
import About from "./pages/AboutPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const isLoggedIn = false

  return (
    <div className="relative min-h-screen overflow-x-hidden ">
      
      {/* 🌌 Global Persistent Background */}
      <SnowfallShaderBackground />

      {/* 🧭 UI */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Navbar isLoggedIn={isLoggedIn} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </div>
  )
}
