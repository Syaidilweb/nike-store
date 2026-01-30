import { useState } from "react"
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

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong</p>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 border-b pb-6"
                >
                  {/* INFO PRODUK */}
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                    </div>

                    {/* HAPUS */}
                    <button
                      onClick={() => hapusProduk(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0"
                    >
                      Hapus
                    </button>
                  </div>

                  {/* SIZE & QTY */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* SIZE SELECT */}
                    <select
                      value={item.size}
                      onChange={(e) => gantiSize(item.id, e.target.value)}
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {item.sizes.map(size => (
                        <option key={size} value={size}>
                          EU {size}
                        </option>
                      ))}
                    </select>

                    {/* QTY */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => kurangQty(item.id)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="px-4">{item.qty}</span>
                      <button
                        onClick={() => tambahQty(item.id)}
                        className="px-3 py-1 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FORM PENGIRIMAN */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="border w-full p-3 mb-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Alamat Pengiriman"
              className="border w-full p-3 mb-6 rounded-lg"
            />
          </div>

          {/* TOTAL */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-gray-600">Total Harga</p>
              <p className="text-xl font-bold">
                Rp {totalHarga.toLocaleString("id-ID")}
              </p>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-80">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
