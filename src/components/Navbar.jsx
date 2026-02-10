import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/useCart"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()

  const activeClass = (path) =>
    location.pathname === path
      ? "text-black font-semibold"
      : "text-gray-600 hover:text-black"

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="text-xl tracking-widest font-extrabold">
            NIKE<span className="text-gray-400">.</span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-10 text-sm">
            <Link to="/" className={activeClass("/")}>
              Home
            </Link>

            <Link
              to="/checkout"
              className={`relative ${activeClass("/checkout")}`}
            >
              Checkout
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/admin"
              className="bg-black text-white px-5 py-2 rounded-full text-xs hover:opacity-80 transition"
            >
              Admin
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white px-6 py-5 flex flex-col gap-4 border-t">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className="flex justify-between"
          >
            Checkout
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="bg-black text-white text-center py-2 rounded-lg text-sm"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
