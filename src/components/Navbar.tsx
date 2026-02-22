import { Link, useNavigate } from "react-router-dom"

type Props = {
  isLoggedIn: boolean
}

export default function Navbar({ isLoggedIn }: Props) {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/")
  }

  const linkStyle =
    "text-sm font-medium text-white/70 hover:text-white transition"

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-6 pointer-events-none">
      
      <div
        className="
          max-w-5xl mx-auto
          backdrop-blur-2xl
          bg-white/5
          border border-white/10
          shadow-[0_8px_40px_rgba(0,0,0,0.3)]
          rounded-full
          px-8 py-3
          flex justify-between items-center
          pointer-events-auto
        "
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="text-lg font-bold text-white tracking-tight hover:opacity-80 transition"
        >
          LinkedInsta
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          {!isLoggedIn && (
            <>
              <Link to="/features" className={linkStyle}>Features</Link>
              <Link to="/pricing" className={linkStyle}>Pricing</Link>
              <Link to="/about" className={linkStyle}>About</Link>
            </>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-6">

              <Link to="/features" className={linkStyle}>Features</Link>
              <Link to="/pricing" className={linkStyle}>Pricing</Link>
              <Link to="/about" className={linkStyle}>About</Link>

              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                onClick={() => navigate("/dashboard")}
                className="w-9 h-9 rounded-full cursor-pointer border border-white/20 hover:scale-105 transition"
              />

              <button
                onClick={() => navigate("/")}
                className="
                  text-sm font-medium
                  px-4 py-1.5
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  transition
                "
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  text-sm font-semibold
                  px-5 py-1.5
                  rounded-full
                  bg-white
                  text-black
                  hover:scale-105
                  transition
                "
              >
                Get Started
              </Link>

            </div>
          )}
        </nav>
      </div>
    </div>
  )
}
