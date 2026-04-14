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
import ProtectedRoute from "./components/ProtectedRoute"
import PortfolioBuildup from "./pages/PortfolioBuildup"

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* 🌌 Background */}
      <SnowfallShaderBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Portfolio Builder (can also protect if needed) */}
            <Route path="/PortfolioBuildup" element={<PortfolioBuildup />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  )
}
