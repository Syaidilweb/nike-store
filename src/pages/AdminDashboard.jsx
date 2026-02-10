import { useState } from "react"
import { Link } from "react-router-dom"
import {
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiLogOut,
} from "react-icons/fi"
import { Trash2 } from "lucide-react"

import { useProducts } from "../context/useProducts"
import ProductModal from "../components/ProductModal"

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct } = useProducts()

  const [activeTab, setActiveTab] = useState("overview")
  const [openModal, setOpenModal] = useState(false)

  const totalProduk = products.length
  const totalOrder = 12 // dummy
  const totalPendapatan = products.reduce(
    (sum, p) => sum + p.price,
    0
  )

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col">
        <div className="px-6 py-5 text-2xl font-bold border-b border-gray-700">
          NIKE
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="text-gray-400 text-xs uppercase mb-3">
            Dashboard
          </p>

          <SidebarButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </SidebarButton>

          <SidebarButton
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          >
            Produk
          </SidebarButton>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <FiLogOut />
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>

          <Link
            to="/"
            className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-80"
          >
            Kembali ke Home
          </Link>
        </header>

        {/* CONTENT */}
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="mb-8">
                <p className="text-gray-500 text-sm">
                  Selamat datang kembali
                </p>
                <h2 className="text-3xl font-bold">
                  Admin 👋
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <StatCard
                  icon={<FiBox size={28} />}
                  label="Total Produk"
                  value={totalProduk}
                />
                <StatCard
                  icon={<FiShoppingCart size={28} />}
                  label="Total Order"
                  value={totalOrder}
                />
                <StatCard
                  icon={<FiDollarSign size={28} />}
                  label="Pendapatan"
                  value={`Rp ${totalPendapatan.toLocaleString("id-ID")}`}
                />
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Quick Actions
                </h3>

                <button
                  onClick={() => {
                    setActiveTab("products")
                    setOpenModal(true)
                  }}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80"
                >
                  Tambah Produk
                </button>
              </div>
            </>
          )}

          {/* PRODUCTS */}
          {activeTab === "products" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Manajemen Produk
                </h2>
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Tambah Produk
                </button>
              </div>

              <div className="bg-white shadow rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Produk</th>
                      <th className="p-3 text-center">Harga</th>
                      <th className="p-3 text-center">Stok</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-6 text-center text-gray-500"
                        >
                          Belum ada produk
                        </td>
                      </tr>
                    )}

                    {products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border"
                            onError={(e) => {
                              e.target.src = "/placeholder.png"
                            }}
                          />
                          <span className="font-medium">
                            {p.name}
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          Rp {p.price.toLocaleString("id-ID")}
                        </td>

                        <td className="p-3 text-center">
                          {p.stock}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-red-600 hover:opacity-70"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </main>
      </div>

      {/* MODAL */}
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={addProduct}
      />
    </div>
  )
}

/* ===== COMPONENTS ===== */

function SidebarButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg ${
        active
          ? "bg-white text-black font-medium"
          : "hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
      <div className="bg-gray-100 p-4 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">
          {label}
        </p>
        <p className="text-2xl font-bold">
          {value}
        </p>
      </div>
    </div>
  )
}
