import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-bold tracking-widest">
          NIKE
        </Link>

        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3 md:gap-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/checkout" className="hover:text-gray-300">
            Checkout
          </Link>
          <Link
            to="/admin"
            className="bg-white text-black px-4 py-2 rounded-full text-center hover:bg-gray-200"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
