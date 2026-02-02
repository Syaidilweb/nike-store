import { Link } from "react-router-dom"
import {
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiLogOut,
} from "react-icons/fi"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col">
        <div className="px-6 py-5 text-2xl font-bold tracking-widest border-b border-gray-700">
          NIKE
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          <p className="text-gray-400 text-xs uppercase mb-2">
            Dashboard
          </p>

          <div className="bg-white text-black rounded-lg px-4 py-2 font-medium">
            Overview
          </div>

          <Link to="#" className="block px-4 py-2 rounded-lg hover:bg-gray-800">
            Produk
          </Link>
          <Link to="#" className="block px-4 py-2 rounded-lg hover:bg-gray-800">
            Order
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <FiLogOut />
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP BAR */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>

          <Link
            to="/"
            className="text-sm bg-black text-white px-5 py-2 rounded-lg hover:opacity-80"
          >
            Kembali ke Home
          </Link>
        </header>

        {/* CONTENT */}
        <main className="px-6 py-8 max-w-7xl mx-auto">

          {/* GREETING */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm">Selamat datang kembali</p>
            <h2 className="text-3xl font-bold">Admin 👋</h2>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

            <StatCard
              icon={<FiBox size={28} />}
              label="Total Produk"
              value="3"
            />

            <StatCard
              icon={<FiShoppingCart size={28} />}
              label="Total Order"
              value="12"
            />

            <StatCard
              icon={<FiDollarSign size={28} />}
              label="Pendapatan"
              value="Rp 12.500.000"
            />

          </div>

          {/* QUICK ACTION */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Quick Actions
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80">
                Tambah Produk
              </button>
              <button className="border px-6 py-3 rounded-lg hover:bg-gray-100">
                Lihat Order
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

/* ===== SMALL COMPONENT ===== */
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
      <div className="bg-gray-100 p-4 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}
