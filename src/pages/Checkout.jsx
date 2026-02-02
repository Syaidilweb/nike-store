import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Checkout() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Nike Air Force 1",
      price: 2100000,
      qty: 1,
      size: "42",
      sizes: ["39", "40", "41", "42", "43", "44"],
    },
  ])

  const tambahQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ))
  }

  const kurangQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ))
  }

  const hapusProduk = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const gantiSize = (id, sizeBaru) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, size: sizeBaru } : item
    ))
  }

  const totalHarga = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* BACK */}
          <Link
            to="/"
            className="inline-flex items-center gap-2
                       text-sm text-gray-600 hover:text-black mb-6"
          >
            ← Kembali ke Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART LIST */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-6">
                Checkout
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-500">Keranjang kosong</p>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b pb-6">

                      {/* INFO */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>

                        <div className="flex items-center gap-4 mt-4">

                          <select
                            value={item.size}
                            onChange={(e) => gantiSize(item.id, e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm"
                          >
                            {item.sizes.map(size => (
                              <option key={size} value={size}>
                                EU {size}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => kurangQty(item.id)}
                              className="px-3 py-1 text-lg hover:bg-gray-200"
                            >
                              −
                            </button>
                            <span className="px-4 text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => tambahQty(item.id)}
                              className="px-3 py-1 text-lg hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ACTION */}
                      <button
                        onClick={() => hapusProduk(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 self-start"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h3 className="font-semibold text-lg mb-4">
                Ringkasan Belanja
              </h3>

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Total Item</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-base font-semibold mb-6">
                <span>Total Harga</span>
                <span>
                  Rp {totalHarga.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                className="w-full bg-black text-white py-3 rounded-lg
                           hover:opacity-90 transition"
              >
                Bayar Sekarang
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
